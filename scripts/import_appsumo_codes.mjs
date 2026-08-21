#!/usr/bin/env node

/**
 * AppSumo Code Batch Importer CLI (Node.js ESM)
 * 
 * Usage:
 *   node scripts/import_appsumo_codes.mjs --file <path-to-csv> [--product forecast-os-01] [--db ./data/appsumo.db] [--dry-run]
 *   node scripts/import_appsumo_codes.mjs --file <path-to-csv> --api-url https://www.evolvith.com --admin-key <SECRET_KEY>
 */

import fs from 'fs';
import path from 'path';
import { DatabaseSync } from 'node:sqlite';

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    filePath: '',
    productId: 'forecast-os-01',
    dbPath: process.env.APPSUMO_DB_PATH || path.join(process.cwd(), 'data', 'appsumo.db'),
    apiUrl: '',
    adminKey: process.env.APPSUMO_ADMIN_KEY || '',
    dryRun: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--file' || arg === '-f') {
      options.filePath = args[++i];
    } else if (arg === '--product' || arg === '-p') {
      options.productId = args[++i];
    } else if (arg === '--db' || arg === '-d') {
      options.dbPath = args[++i];
    } else if (arg === '--api-url' || arg === '-u') {
      options.apiUrl = args[++i];
    } else if (arg === '--admin-key' || arg === '-k') {
      options.adminKey = args[++i];
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
AppSumo Code Batch Importer CLI
===============================
Ingests 1,000 to 10,000+ AppSumo codes from CSV/text into persistent production storage.

Options:
  --file, -f <path>       Path to AppSumo CSV / text file (Required)
  --product, -p <id>      Product identifier (Default: forecast-os-01)
  --db, -d <path>         Local SQLite database path (Default: ./data/appsumo.db)
  --api-url, -u <url>     Import via HTTP Admin API instead of local SQLite
  --admin-key, -k <key>   Admin authentication key for API import
  --dry-run               Validate and parse CSV without committing to database
  --help, -h              Display this help message
`);
}

function normalizeCode(raw) {
  return raw.trim().toUpperCase();
}

function isValidCodeFormat(code) {
  if (!code || typeof code !== 'string') return false;
  const trimmed = code.trim();
  if (trimmed.length < 4 || trimmed.length > 64) return false;
  return /^[A-Z0-9_\-]+$/i.test(trimmed);
}

async function main() {
  const options = parseArgs();

  if (!options.filePath) {
    console.error('Error: Missing required argument --file <path-to-csv>');
    printHelp();
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), options.filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: File not found at ${resolvedPath}`);
    process.exit(1);
  }

  console.log(`\n======================================================`);
  console.log(`🚀 AppSumo Batch Importer for ${options.productId.toUpperCase()}`);
  console.log(`📂 Source File: ${resolvedPath}`);
  if (options.dryRun) {
    console.log(`⚠️  Mode: DRY-RUN (No database writes will occur)`);
  }
  console.log(`======================================================\n`);

  const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
  const lines = fileContent.split(/\r?\n/);
  console.log(`Read ${lines.length} total lines from CSV file.`);

  const seenInBatch = new Set();
  const validBatch = [];
  let malformedCount = 0;
  let duplicateInBatchCount = 0;

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    // Ignore CSV header if present
    if (trimmed.toLowerCase() === 'code' || trimmed.toLowerCase() === 'coupon_code') {
      continue;
    }

    if (!isValidCodeFormat(trimmed)) {
      malformedCount++;
      continue;
    }

    const norm = normalizeCode(trimmed);
    if (seenInBatch.has(norm)) {
      duplicateInBatchCount++;
      continue;
    }

    seenInBatch.add(norm);
    validBatch.push(norm);
  }

  console.log(`Parsing Summary:`);
  console.log(` - Total lines read:       ${lines.length}`);
  console.log(` - Valid formatted codes:  ${validBatch.length}`);
  console.log(` - File duplicates skipped: ${duplicateInBatchCount}`);
  console.log(` - Malformed lines skipped: ${malformedCount}`);

  if (validBatch.length === 0) {
    console.warn('\n⚠️  No valid codes found to import.');
    process.exit(0);
  }

  if (options.dryRun) {
    console.log('\n✅ Dry-run validation passed. All ' + validBatch.length + ' codes conform to schema.');
    process.exit(0);
  }

  // HTTP API Import mode
  if (options.apiUrl) {
    console.log(`\nImporting via Admin API: ${options.apiUrl}/api/admin/import-codes...`);
    const endpoint = `${options.apiUrl.replace(/\/$/, '')}/api/admin/import-codes`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': options.adminKey,
      },
      body: JSON.stringify({
        product: options.productId,
        codes: validBatch,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`API Error (${res.status}): ${errText}`);
      process.exit(1);
    }

    const result = await res.json();
    console.log(`\n🎉 Import Successful!`);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  }

  // Local SQLite Direct Import mode
  console.log(`\nConnecting to SQLite database: ${options.dbPath}...`);
  const parentDir = path.dirname(options.dbPath);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }

  const db = new DatabaseSync(options.dbPath);
  db.exec('PRAGMA journal_mode = WAL;');

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
  `);

  const startTime = Date.now();
  let insertedCount = 0;
  let duplicateInDbCount = 0;

  db.exec('BEGIN IMMEDIATE;');
  try {
    const insertStmt = db.prepare(`
      INSERT OR IGNORE INTO appsumo_codes (code, status, product_id, created_at)
      VALUES (?, 'unused', ?, ?)
    `);

    for (const code of validBatch) {
      const info = insertStmt.run(code, options.productId.toLowerCase(), startTime);
      if (Number(info.changes) > 0) {
        insertedCount++;
      } else {
        duplicateInDbCount++;
      }
    }

    db.exec('COMMIT;');
  } catch (err) {
    db.exec('ROLLBACK;');
    console.error('Transaction failed:', err);
    process.exit(1);
  }

  const elapsedMs = Date.now() - startTime;

  // Retrieve current stats
  const totalCount = Number(db.prepare('SELECT COUNT(*) as c FROM appsumo_codes WHERE product_id = ?').get(options.productId.toLowerCase()).c);
  const unusedCount = Number(db.prepare("SELECT COUNT(*) as c FROM appsumo_codes WHERE product_id = ? AND status = 'unused'").get(options.productId.toLowerCase()).c);
  const redeemedCount = Number(db.prepare("SELECT COUNT(*) as c FROM appsumo_codes WHERE product_id = ? AND status = 'redeemed'").get(options.productId.toLowerCase()).c);

  console.log(`\n🎉 Batch Import Completed in ${elapsedMs}ms!`);
  console.log(`------------------------------------------------------`);
  console.log(`New codes inserted:      ${insertedCount}`);
  console.log(`DB duplicates skipped:   ${duplicateInDbCount}`);
  console.log(`------------------------------------------------------`);
  console.log(`Current Total Inventory: ${totalCount}`);
  console.log(`Unused / Available:      ${unusedCount}`);
  console.log(`Redeemed:                ${redeemedCount}`);
  console.log(`------------------------------------------------------\n`);

  db.close();
}

main().catch((err) => {
  console.error('Fatal import error:', err);
  process.exit(1);
});
