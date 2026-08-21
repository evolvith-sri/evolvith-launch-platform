import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { importCodesBatch, getAppSumoInventoryStats } from '@/lib/appsumo-db';

export const dynamic = 'force-dynamic';

const DEFAULT_ADMIN_KEY = 'evolvith_appsumo_admin_secret_key_2026';

function verifyAdminAuth(req: NextRequest): boolean {
  const configuredKey = process.env.APPSUMO_ADMIN_KEY || DEFAULT_ADMIN_KEY;
  if (!configuredKey) {
    return false;
  }

  const authHeader = req.headers.get('authorization');
  const customHeader = req.headers.get('x-admin-key');

  let providedKey = '';
  if (customHeader) {
    providedKey = customHeader.trim();
  } else if (authHeader && authHeader.startsWith('Bearer ')) {
    providedKey = authHeader.replace(/^Bearer\s+/i, '').trim();
  }

  if (!providedKey) {
    return false;
  }

  try {
    const bufProvided = Buffer.from(providedKey);
    const bufConfigured = Buffer.from(configuredKey);

    if (bufProvided.length !== bufConfigured.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufProvided, bufConfigured);
  } catch {
    return false;
  }
}

/**
 * GET: Retrieve code inventory counts for admin dashboard / verification.
 */
export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or missing administrative API key.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const product = searchParams.get('product') || undefined;

  const stats = await getAppSumoInventoryStats(product);

  return NextResponse.json(
    {
      success: true,
      product: product || 'ALL',
      inventory: stats,
    },
    { status: 200 }
  );
}

/**
 * POST: Import batch of AppSumo codes from CSV / text / JSON.
 */
export async function POST(req: NextRequest) {
  // 1. Strict admin authentication guard
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or missing administrative API key.' },
      { status: 401 }
    );
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    let codes: string[] = [];
    let productId = 'forecast-os-01';

    if (contentType.includes('application/json')) {
      const jsonBody = await req.json();
      productId = jsonBody.product || productId;

      if (Array.isArray(jsonBody.codes)) {
        codes = jsonBody.codes;
      } else if (typeof jsonBody.codes === 'string') {
        codes = jsonBody.codes.split(/\r?\n/);
      } else if (typeof jsonBody.csvContent === 'string') {
        codes = jsonBody.csvContent.split(/\r?\n/);
      }
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const productField = formData.get('product');
      if (productField && typeof productField === 'string') {
        productId = productField;
      }

      const file = formData.get('file');
      if (file && typeof file === 'object' && 'text' in file) {
        const text = await (file as Blob).text();
        codes = text.split(/\r?\n/);
      }
    } else {
      // Treat as plain text / CSV
      const rawText = await req.text();
      codes = rawText.split(/\r?\n/);
    }

    if (!codes || codes.length === 0) {
      return NextResponse.json(
        { error: 'No codes found in request payload.' },
        { status: 400 }
      );
    }

    // 2. Perform atomic batch import
    const result = await importCodesBatch(codes, productId);
    const updatedStats = await getAppSumoInventoryStats(productId);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully processed ${result.totalLines} lines: ${result.insertedCount} new codes imported, ${result.duplicateCount} duplicates skipped, ${result.malformedCount} malformed skipped.`,
        product: productId,
        importStats: result,
        currentInventory: updatedStats,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Import failed: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}
