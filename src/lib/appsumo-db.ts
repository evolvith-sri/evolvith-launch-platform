import path from 'path';
import fs from 'fs';

// SQLite statement interface
export interface ISQLiteStatement {
  all(...params: any[]): any[];
  get(...params: any[]): any;
  run(...params: any[]): { changes: number | bigint; lastInsertRowid: number | bigint };
}

export interface ISQLiteDatabase {
  exec(sql: string): void;
  prepare(sql: string): ISQLiteStatement;
  close(): void;
}

let localDbInstance: ISQLiteDatabase | null = null;
let currentDbPath: string | null = null;

export interface AppSumoCodeRecord {
  code: string;
  status: 'unused' | 'redeemed';
  product_id: string;
  customer_email: string | null;
  redeemed_at: number | null;
  entitlement_id: string | null;
  created_at: number;
}

export interface AppSumoEntitlementRecord {
  entitlement_id: string;
  code: string;
  product_id: string;
  system_code: string;
  customer_email: string;
  license_type: string;
  source: string;
  created_at: number;
}

export interface ImportResult {
  totalLines: number;
  validCodes: number;
  insertedCount: number;
  duplicateCount: number;
  malformedCount: number;
}

export interface RedemptionResult {
  success: boolean;
  error?: string;
  entitlement?: AppSumoEntitlementRecord;
  alreadyRedeemedAt?: number;
}

/**
 * Normalizes redemption codes (uppercase, trimmed).
 */
export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase();
}

/**
 * Validates code format.
 */
export function isValidCodeFormat(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  const trimmed = code.trim();
  if (trimmed.length < 4 || trimmed.length > 64) return false;
  return /^[A-Z0-9_\-]+$/i.test(trimmed);
}

function getDatabaseSyncClass(): any {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { DatabaseSync } = require('node:sqlite');
    return DatabaseSync;
  } catch (err) {
    throw new Error('node:sqlite DatabaseSync is required for local AppSumo storage.');
  }
}

/**
 * Remote Turso / libSQL HTTP pipeline execution helper.
 */
async function executeRemoteLibSql(
  statements: Array<{ sql: string; args?: any[] }>
): Promise<any[]> {
  const url = process.env.TURSO_DATABASE_URL || process.env.LIBSQL_URL || process.env.APPSUMO_DATABASE_URL;
  const token = process.env.TURSO_AUTH_TOKEN || process.env.LIBSQL_AUTH_TOKEN || process.env.APPSUMO_DATABASE_AUTH_TOKEN;

  if (!url) {
    throw new Error('Remote database URL not configured');
  }

  // Convert libsql:// or https:// to https://
  const httpUrl = url.replace(/^libsql:\/\//, 'https://').replace(/\/$/, '') + '/v2/pipeline';

  const requests = statements.map((s) => ({
    type: 'execute',
    stmt: {
      sql: s.sql,
      args: (s.args || []).map((a) => {
        if (a === null || a === undefined) return { type: 'null' };
        if (typeof a === 'number') {
          return Number.isInteger(a) ? { type: 'integer', value: String(a) } : { type: 'float', value: a };
        }
        return { type: 'text', value: String(a) };
      }),
    },
  }));

  const res = await fetch(httpUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`,
    },
    body: JSON.stringify({ requests }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Remote database HTTP error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.results || [];
}

/**
 * Checks if remote serverless database is configured.
 */
export function isRemoteDbConfigured(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL || process.env.LIBSQL_URL || process.env.APPSUMO_DATABASE_URL);
}

/**
 * Resolves local SQLite database.
 */
export function getLocalDatabase(customPath?: string): ISQLiteDatabase {
  let targetPath = customPath || process.env.APPSUMO_DB_PATH;

  if (!targetPath) {
    // If running inside Vercel serverless without remote DB, fallback to /tmp
    if (process.env.VERCEL) {
      targetPath = '/tmp/appsumo.db';
    } else {
      targetPath = path.join(process.cwd(), 'data', 'appsumo.db');
    }
  }

  if (localDbInstance && currentDbPath === targetPath) {
    return localDbInstance;
  }

  if (targetPath !== ':memory:') {
    const parentDir = path.dirname(targetPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
  }

  const DatabaseSyncClass = getDatabaseSyncClass();
  const db: ISQLiteDatabase = new DatabaseSyncClass(targetPath);

  if (targetPath !== ':memory:') {
    try {
      db.exec('PRAGMA journal_mode = WAL;');
      db.exec('PRAGMA synchronous = NORMAL;');
      db.exec('PRAGMA busy_timeout = 5000;');
    } catch {
      // ignore
    }
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS appsumo_codes (
      code TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'unused',
      product_id TEXT NOT NULL,
      customer_email TEXT,
      redeemed_at INTEGER,
      entitlement_id TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_codes_status ON appsumo_codes(status);
    CREATE INDEX IF NOT EXISTS idx_codes_email ON appsumo_codes(customer_email);

    CREATE TABLE IF NOT EXISTS appsumo_entitlements (
      entitlement_id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      product_id TEXT NOT NULL,
      system_code TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      license_type TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'APPSUMO',
      created_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_entitlements_code ON appsumo_entitlements(code);
    CREATE INDEX IF NOT EXISTS idx_entitlements_email ON appsumo_entitlements(customer_email);

    CREATE TABLE IF NOT EXISTS admin_audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      details TEXT,
      created_at INTEGER NOT NULL
    );
  `);

  localDbInstance = db;
  currentDbPath = targetPath;
  return db;
}

export function closeAppSumoDatabase(): void {
  if (localDbInstance) {
    try {
      localDbInstance.close();
    } catch {
      // ignore
    }
    localDbInstance = null;
    currentDbPath = null;
  }
}

/**
 * Initializes remote database schema if remote database is active.
 */
export async function initRemoteDatabaseSchema(): Promise<void> {
  if (!isRemoteDbConfigured()) return;

  await executeRemoteLibSql([
    {
      sql: `CREATE TABLE IF NOT EXISTS appsumo_codes (
        code TEXT PRIMARY KEY,
        status TEXT NOT NULL DEFAULT 'unused',
        product_id TEXT NOT NULL,
        customer_email TEXT,
        redeemed_at INTEGER,
        entitlement_id TEXT,
        created_at INTEGER NOT NULL
      );`,
    },
    { sql: `CREATE INDEX IF NOT EXISTS idx_codes_status ON appsumo_codes(status);` },
    { sql: `CREATE INDEX IF NOT EXISTS idx_codes_email ON appsumo_codes(customer_email);` },
    {
      sql: `CREATE TABLE IF NOT EXISTS appsumo_entitlements (
        entitlement_id TEXT PRIMARY KEY,
        code TEXT NOT NULL,
        product_id TEXT NOT NULL,
        system_code TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        license_type TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'APPSUMO',
        created_at INTEGER NOT NULL
      );`,
    },
    { sql: `CREATE INDEX IF NOT EXISTS idx_entitlements_code ON appsumo_entitlements(code);` },
    { sql: `CREATE INDEX IF NOT EXISTS idx_entitlements_email ON appsumo_entitlements(customer_email);` },
  ]);
}

/**
 * Batch imports codes (supports both local SQLite and remote serverless database).
 */
export async function importCodesBatch(
  rawCodes: string[],
  productId: string = 'forecast-os-01',
  dbPath?: string
): Promise<ImportResult> {
  const normProductId = productId.toLowerCase().trim();
  const now = Date.now();

  const seenInBatch = new Set<string>();
  let malformedCount = 0;
  let duplicateCount = 0;
  const validBatch: string[] = [];

  for (const raw of rawCodes) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    if (trimmed.toLowerCase() === 'code' || trimmed.toLowerCase() === 'coupon_code') {
      continue;
    }

    if (!isValidCodeFormat(trimmed)) {
      malformedCount++;
      continue;
    }

    const norm = normalizeCode(trimmed);
    if (seenInBatch.has(norm)) {
      duplicateCount++;
      continue;
    }

    seenInBatch.add(norm);
    validBatch.push(norm);
  }

  if (validBatch.length === 0) {
    return {
      totalLines: rawCodes.length,
      validCodes: 0,
      insertedCount: 0,
      duplicateCount,
      malformedCount,
    };
  }

  if (isRemoteDbConfigured()) {
    await initRemoteDatabaseSchema();
    const stmts = validBatch.map((code) => ({
      sql: `INSERT OR IGNORE INTO appsumo_codes (code, status, product_id, created_at) VALUES (?, 'unused', ?, ?)`,
      args: [code, normProductId, now],
    }));

    const results = await executeRemoteLibSql(stmts);
    let insertedCount = 0;
    for (const r of results) {
      if (r.type === 'ok' && r.response?.result?.rows_affected > 0) {
        insertedCount++;
      } else {
        duplicateCount++;
      }
    }

    return {
      totalLines: rawCodes.length,
      validCodes: validBatch.length,
      insertedCount,
      duplicateCount,
      malformedCount,
    };
  }

  // Local SQLite execution
  const db = getLocalDatabase(dbPath);
  let insertedCount = 0;
  db.exec('BEGIN IMMEDIATE;');

  try {
    const insertStmt = db.prepare(`
      INSERT OR IGNORE INTO appsumo_codes (code, status, product_id, created_at)
      VALUES (?, 'unused', ?, ?)
    `);

    for (const code of validBatch) {
      const info = insertStmt.run(code, normProductId, now);
      if (Number(info.changes) > 0) {
        insertedCount++;
      } else {
        duplicateCount++;
      }
    }

    db.exec('COMMIT;');
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }

  return {
    totalLines: rawCodes.length,
    validCodes: validBatch.length,
    insertedCount,
    duplicateCount,
    malformedCount,
  };
}

/**
 * Atomically redeems an AppSumo code (supports local SQLite & remote serverless database).
 */
export async function redeemCodeAtomic(
  rawCode: string,
  email: string,
  productId: string = 'forecast-os-01',
  dbPath?: string
): Promise<RedemptionResult> {
  const normCode = normalizeCode(rawCode);
  const normEmail = email.trim().toLowerCase();
  const normProductId = productId.toLowerCase().trim();
  const systemCode = normProductId.toUpperCase();
  const now = Date.now();

  if (!isValidCodeFormat(normCode)) {
    return { success: false, error: 'Invalid AppSumo code format.' };
  }

  const entitlementId = `ent_appsumo_${normCode.replace(/[^A-Z0-9]/g, '')}_${now.toString(36)}`;
  const licenseType = 'One-Time Perpetual Commercial License';

  if (isRemoteDbConfigured()) {
    try {
      await initRemoteDatabaseSchema();
      // Atomic query + conditional update pipeline
      const results = await executeRemoteLibSql([
        {
          sql: 'SELECT code, status, product_id, customer_email, redeemed_at FROM appsumo_codes WHERE code = ?',
          args: [normCode],
        },
        {
          sql: "UPDATE appsumo_codes SET status = 'redeemed', customer_email = ?, redeemed_at = ?, entitlement_id = ? WHERE code = ? AND status = 'unused'",
          args: [normEmail, now, entitlementId, normCode],
        },
      ]);

      const selectResult = results[0]?.response?.result;
      const updateResult = results[1]?.response?.result;

      if (!selectResult || !selectResult.rows || selectResult.rows.length === 0) {
        return { success: false, error: 'The provided AppSumo redemption code was not found.' };
      }

      const row = selectResult.rows[0];
      const status = row[1]?.value || row.status;
      const redeemedAt = row[4]?.value || row.redeemed_at;

      if (status === 'redeemed' || (updateResult && updateResult.rows_affected === 0)) {
        return {
          success: false,
          error: 'This AppSumo redemption code has already been redeemed.',
          alreadyRedeemedAt: redeemedAt ? Number(redeemedAt) : undefined,
        };
      }

      const prodId = String(row[2]?.value || row.product_id).toLowerCase().trim();
      const actualSystemCode = prodId.toUpperCase();
      const targetSystemCode = normProductId ? normProductId.toUpperCase() : actualSystemCode;

      if (normProductId && normProductId !== 'auto' && prodId !== normProductId) {
        return {
          success: false,
          error: `This code is valid for ${actualSystemCode}, not ${targetSystemCode}.`,
        };
      }

      // Record entitlement in ledger
      await executeRemoteLibSql([
        {
          sql: `INSERT INTO appsumo_entitlements (
            entitlement_id, code, product_id, system_code, customer_email, license_type, source, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, 'APPSUMO', ?)`,
          args: [entitlementId, normCode, prodId, actualSystemCode, normEmail, licenseType, now],
        },
      ]);

      return {
        success: true,
        entitlement: {
          entitlement_id: entitlementId,
          code: normCode,
          product_id: prodId,
          system_code: actualSystemCode,
          customer_email: normEmail,
          license_type: licenseType,
          source: 'APPSUMO',
          created_at: now,
        },
      };
    } catch (err: any) {
      return {
        success: false,
        error: `Database transaction error: ${err?.message || String(err)}`,
      };
    }
  }

  // Local SQLite execution
  const db = getLocalDatabase(dbPath);
  db.exec('BEGIN IMMEDIATE;');

  try {
    const checkStmt = db.prepare(`
      SELECT code, status, product_id, customer_email, redeemed_at, entitlement_id
      FROM appsumo_codes
      WHERE code = ?
    `);
    const existing = checkStmt.get(normCode) as AppSumoCodeRecord | undefined;

    if (!existing) {
      db.exec('ROLLBACK;');
      return { success: false, error: 'The provided AppSumo redemption code was not found.' };
    }

    if (existing.status === 'redeemed') {
      db.exec('ROLLBACK;');
      return {
        success: false,
        error: 'This AppSumo redemption code has already been redeemed.',
        alreadyRedeemedAt: existing.redeemed_at || undefined,
      };
    }

    const prodId = existing.product_id.toLowerCase().trim();
    const actualSystemCode = prodId.toUpperCase();
    const targetSystemCode = normProductId ? normProductId.toUpperCase() : actualSystemCode;

    if (normProductId && normProductId !== 'auto' && prodId !== normProductId) {
      db.exec('ROLLBACK;');
      return {
        success: false,
        error: `This code is valid for ${actualSystemCode}, not ${targetSystemCode}.`,
      };
    }

    const updateStmt = db.prepare(`
      UPDATE appsumo_codes
      SET status = 'redeemed',
          customer_email = ?,
          redeemed_at = ?,
          entitlement_id = ?
      WHERE code = ? AND status = 'unused'
    `);

    const updateInfo = updateStmt.run(normEmail, now, entitlementId, normCode);

    if (Number(updateInfo.changes) === 0) {
      db.exec('ROLLBACK;');
      return {
        success: false,
        error: 'This AppSumo redemption code was redeemed concurrently by another request.',
      };
    }

    const insertEntStmt = db.prepare(`
      INSERT INTO appsumo_entitlements (
        entitlement_id, code, product_id, system_code, customer_email, license_type, source, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'APPSUMO', ?)
    `);

    insertEntStmt.run(
      entitlementId,
      normCode,
      prodId,
      actualSystemCode,
      normEmail,
      licenseType,
      now
    );

    db.exec('COMMIT;');

    return {
      success: true,
      entitlement: {
        entitlement_id: entitlementId,
        code: normCode,
        product_id: prodId,
        system_code: actualSystemCode,
        customer_email: normEmail,
        license_type: licenseType,
        source: 'APPSUMO',
        created_at: now,
      },
    };
  } catch (err: any) {
    db.exec('ROLLBACK;');
    return {
      success: false,
      error: `Database transaction error: ${err?.message || String(err)}`,
    };
  }
}

/**
 * Retrieves entitlement by ID.
 */
export async function getEntitlementById(
  entitlementId: string,
  dbPath?: string
): Promise<AppSumoEntitlementRecord | null> {
  if (isRemoteDbConfigured()) {
    const results = await executeRemoteLibSql([
      {
        sql: 'SELECT entitlement_id, code, product_id, system_code, customer_email, license_type, source, created_at FROM appsumo_entitlements WHERE entitlement_id = ?',
        args: [entitlementId],
      },
    ]);
    const row = results[0]?.response?.result?.rows?.[0];
    if (!row) return null;
    return {
      entitlement_id: String(row[0]?.value || row.entitlement_id),
      code: String(row[1]?.value || row.code),
      product_id: String(row[2]?.value || row.product_id),
      system_code: String(row[3]?.value || row.system_code),
      customer_email: String(row[4]?.value || row.customer_email),
      license_type: String(row[5]?.value || row.license_type),
      source: String(row[6]?.value || row.source),
      created_at: Number(row[7]?.value || row.created_at),
    };
  }

  const db = getLocalDatabase(dbPath);
  const stmt = db.prepare(`
    SELECT entitlement_id, code, product_id, system_code, customer_email, license_type, source, created_at
    FROM appsumo_entitlements
    WHERE entitlement_id = ?
  `);
  return (stmt.get(entitlementId) as AppSumoEntitlementRecord) || null;
}

/**
 * Returns inventory stats.
 */
export async function getAppSumoInventoryStats(
  productId?: string,
  dbPath?: string
): Promise<{ total: number; unused: number; redeemed: number }> {
  if (isRemoteDbConfigured()) {
    const norm = productId ? productId.toLowerCase().trim() : null;
    const results = await executeRemoteLibSql([
      {
        sql: norm
          ? 'SELECT COUNT(*) as c FROM appsumo_codes WHERE product_id = ?'
          : 'SELECT COUNT(*) as c FROM appsumo_codes',
        args: norm ? [norm] : [],
      },
      {
        sql: norm
          ? "SELECT COUNT(*) as c FROM appsumo_codes WHERE product_id = ? AND status = 'unused'"
          : "SELECT COUNT(*) as c FROM appsumo_codes WHERE status = 'unused'",
        args: norm ? [norm] : [],
      },
      {
        sql: norm
          ? "SELECT COUNT(*) as c FROM appsumo_codes WHERE product_id = ? AND status = 'redeemed'"
          : "SELECT COUNT(*) as c FROM appsumo_codes WHERE status = 'redeemed'",
        args: norm ? [norm] : [],
      },
    ]);

    const total = Number(results[0]?.response?.result?.rows?.[0]?.[0]?.value || 0);
    const unused = Number(results[1]?.response?.result?.rows?.[0]?.[0]?.value || 0);
    const redeemed = Number(results[2]?.response?.result?.rows?.[0]?.[0]?.value || 0);

    return { total, unused, redeemed };
  }

  const db = getLocalDatabase(dbPath);
  let totalStmt: ISQLiteStatement;
  let unusedStmt: ISQLiteStatement;
  let redeemedStmt: ISQLiteStatement;

  if (productId) {
    const norm = productId.toLowerCase().trim();
    totalStmt = db.prepare('SELECT COUNT(*) as c FROM appsumo_codes WHERE product_id = ?');
    unusedStmt = db.prepare("SELECT COUNT(*) as c FROM appsumo_codes WHERE product_id = ? AND status = 'unused'");
    redeemedStmt = db.prepare("SELECT COUNT(*) as c FROM appsumo_codes WHERE product_id = ? AND status = 'redeemed'");

    return {
      total: Number((totalStmt.get(norm) as any)?.c || 0),
      unused: Number((unusedStmt.get(norm) as any)?.c || 0),
      redeemed: Number((redeemedStmt.get(norm) as any)?.c || 0),
    };
  } else {
    totalStmt = db.prepare('SELECT COUNT(*) as c FROM appsumo_codes');
    unusedStmt = db.prepare("SELECT COUNT(*) as c FROM appsumo_codes WHERE status = 'unused'");
    redeemedStmt = db.prepare("SELECT COUNT(*) as c FROM appsumo_codes WHERE status = 'redeemed'");

    return {
      total: Number((totalStmt.get() as any)?.c || 0),
      unused: Number((unusedStmt.get() as any)?.c || 0),
      redeemed: Number((redeemedStmt.get() as any)?.c || 0),
    };
  }
}
