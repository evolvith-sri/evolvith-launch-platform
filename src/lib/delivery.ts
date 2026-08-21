import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { getProductCommerceMapping, PRODUCT_COMMERCE_MAPPINGS } from './commerce';

const DOWNLOAD_SECRET =
  process.env.DODO_PAYMENTS_WEBHOOK_SECRET ||
  process.env.DODO_PAYMENTS_API_KEY ||
  'evolvith_delivery_fallback_signing_secret_prod_2026';

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface DownloadTokenPayload {
  p: string; // productId (e.g. "forecast-os-01")
  s: string; // sessionId (e.g. "cks_...")
  t: number; // timestamp ms
}

/**
 * Generate a cryptographically signed download token for a verified purchase.
 */
export function generateSignedDownloadToken(productId: string, sessionId: string): string {
  const normId = productId.toLowerCase().trim();
  const mapping = getProductCommerceMapping(normId);
  if (!mapping || mapping.tier === 3 || mapping.commerceAvailability === 'NOT_PURCHASABLE') {
    throw new Error('Cannot generate download token for non-commercial or Tier-3 product');
  }

  const payload: DownloadTokenPayload = {
    p: normId,
    s: sessionId || 'direct_entitlement',
    t: Date.now(),
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const hmac = crypto.createHmac('sha256', DOWNLOAD_SECRET);
  hmac.update(payloadStr);
  const sig = hmac.digest('hex');

  return `${payloadStr}.${sig}`;
}

/**
 * Verify a signed download token.
 * Enforces cryptographic HMAC check, expiration, and Tier-3 / unmapped guards.
 */
export function verifySignedDownloadToken(token: string): {
  valid: boolean;
  productId?: string;
  sessionId?: string;
  error?: string;
} {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Missing or invalid token format' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'Malformed token' };
  }

  const [payloadStr, sig] = parts;

  try {
    const hmac = crypto.createHmac('sha256', DOWNLOAD_SECRET);
    hmac.update(payloadStr);
    const expectedSig = hmac.digest('hex');

    // Constant-time signature comparison to prevent timing attacks
    const sigBuf = Buffer.from(sig, 'hex');
    const expectedBuf = Buffer.from(expectedSig, 'hex');

    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return { valid: false, error: 'Invalid token signature' };
    }

    const payload: DownloadTokenPayload = JSON.parse(
      Buffer.from(payloadStr, 'base64url').toString('utf-8')
    );

    // Verify expiration (24h)
    if (Date.now() - payload.t > TOKEN_EXPIRY_MS) {
      return { valid: false, error: 'Download token expired' };
    }

    const normId = payload.p.toLowerCase().trim();
    const mapping = getProductCommerceMapping(normId);

    if (!mapping) {
      return { valid: false, error: 'Unknown product entitlement' };
    }

    if (mapping.tier === 3 || mapping.commerceAvailability === 'NOT_PURCHASABLE') {
      return { valid: false, error: 'Tier-3 synthesis organisms are not available for download' };
    }

    return {
      valid: true,
      productId: normId,
      sessionId: payload.s,
    };
  } catch (err) {
    return { valid: false, error: 'Token parsing failure' };
  }
}

/**
 * Securely resolve the physical package file path for an authorized product.
 * Guarantees zero directory traversal.
 */
export function resolvePackageFilePath(productId: string): {
  filename: string;
  filePath: string | null;
  sizeBytes: number;
} {
  const normId = productId.toLowerCase().trim();
  const mapping = getProductCommerceMapping(normId);

  if (!mapping || !mapping.distributionPackage) {
    return { filename: '', filePath: null, sizeBytes: 0 };
  }

  const filename = path.basename(mapping.distributionPackage);
  // Ensure only sanitized alphanumeric filename
  if (!/^[A-Za-z0-9_\-\.]+\.zip$/.test(filename)) {
    return { filename: '', filePath: null, sizeBytes: 0 };
  }

  // Check possible runtime locations
  const candidateDirs = [
    path.join(process.cwd(), 'packages'),
    path.join(process.cwd(), '..', 'releases'),
    path.join(process.cwd(), 'releases'),
    path.join(process.cwd(), '..', 'dist_packages'),
    path.join(process.cwd(), 'dist_packages'),
  ];

  for (const dir of candidateDirs) {
    const fullPath = path.join(dir, filename);
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      return {
        filename,
        filePath: fullPath,
        sizeBytes: stat.size,
      };
    }
  }

  return { filename, filePath: null, sizeBytes: 0 };
}
