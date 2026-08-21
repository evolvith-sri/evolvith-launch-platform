import { NextRequest, NextResponse } from 'next/server';
import { redeemCodeAtomic, isValidCodeFormat } from '@/lib/appsumo-db';
import { checkRateLimit, recordFailedAttempt, getClientIp } from '@/lib/rate-limiter';
import { generateSignedDownloadToken } from '@/lib/delivery';
import { registerVerifiedEntitlement } from '@/lib/dodo';
import { getProductCommerceMapping } from '@/lib/commerce';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // 1. Enforce rate limiting per client IP to prevent brute-force code enumeration
  const rateLimit = checkRateLimit(ip, {
    maxRequests: 20,
    windowMs: 60 * 1000,
    maxFailedAttempts: 8,
    failedWindowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: rateLimit.reason || 'Too many redemption requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimit.resetMs || 60000) / 1000).toString(),
        },
      }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    recordFailedAttempt(ip);
    return NextResponse.json(
      { error: 'Invalid JSON request payload.' },
      { status: 400 }
    );
  }

  const rawCode = typeof body.code === 'string' ? body.code.trim() : '';
  const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';
  const productId = typeof body.product === 'string' && body.product.trim() ? body.product.trim().toLowerCase() : 'forecast-os-01';

  // 2. Validate input parameters
  if (!rawCode) {
    recordFailedAttempt(ip);
    return NextResponse.json(
      { error: 'Please enter your AppSumo redemption code.' },
      { status: 400 }
    );
  }

  if (!isValidCodeFormat(rawCode)) {
    recordFailedAttempt(ip);
    return NextResponse.json(
      { error: 'Invalid code format. AppSumo codes contain letters, numbers, and dashes.' },
      { status: 400 }
    );
  }

  if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
    recordFailedAttempt(ip);
    return NextResponse.json(
      { error: 'Please provide a valid work or corporate email address.' },
      { status: 400 }
    );
  }

  const requestedProduct = typeof body.product === 'string' && body.product.trim() ? body.product.trim().toLowerCase() : 'auto';

  // 3. Execute atomic database transaction
  const result = await redeemCodeAtomic(rawCode, rawEmail, requestedProduct);

  if (!result.success || !result.entitlement) {
    recordFailedAttempt(ip);
    return NextResponse.json(
      {
        error: result.error || 'Failed to redeem AppSumo code.',
        alreadyRedeemedAt: result.alreadyRedeemedAt,
      },
      { status: 400 }
    );
  }

  const entitlement = result.entitlement;
  const targetProductId = entitlement.product_id || (requestedProduct !== 'auto' ? requestedProduct : 'forecast-os-01');
  const mapping = getProductCommerceMapping(targetProductId);

  if (!mapping) {
    recordFailedAttempt(ip);
    return NextResponse.json(
      { error: `Unknown product mapping for ${targetProductId}.` },
      { status: 404 }
    );
  }

  // 4. Register entitlement with unified commercial cache
  registerVerifiedEntitlement({
    entitlementId: entitlement.entitlement_id,
    eventId: `appsumo_${entitlement.code}`,
    sessionId: entitlement.entitlement_id,
    systemCode: mapping.systemCode,
    productId: mapping.productId,
    customerEmail: entitlement.customer_email,
    governedPrice: mapping.governedPrice || 49,
    distributionPackage: mapping.distributionPackage || `${mapping.systemCode}_v1.0.0.zip`,
    createdAt: entitlement.created_at,
  });

  // 5. Generate cryptographically signed HMAC download token
  const downloadToken = generateSignedDownloadToken(mapping.productId, entitlement.entitlement_id);
  const downloadUrl = `/api/download?product=${mapping.productId}&token=${downloadToken}&session_id=${entitlement.entitlement_id}`;

  return NextResponse.json(
    {
      success: true,
      message: `Successfully redeemed perpetual commercial license for ${mapping.systemCode}.`,
      entitlement: {
        entitlementId: entitlement.entitlement_id,
        product: mapping.systemCode,
        title: mapping.title,
        customerEmail: entitlement.customer_email,
        licenseType: entitlement.license_type,
        source: entitlement.source,
        redeemedAt: new Date(entitlement.created_at).toISOString(),
        distributionPackage: mapping.distributionPackage,
      },
      downloadToken,
      downloadUrl,
    },
    { status: 200 }
  );
}
