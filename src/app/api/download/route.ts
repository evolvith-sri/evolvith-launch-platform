import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { verifySignedDownloadToken, resolvePackageFilePath, generateSignedDownloadToken } from '@/lib/delivery';
import { getProductCommerceMapping } from '@/lib/commerce';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productParam = searchParams.get('product');
    const tokenParam = searchParams.get('token');
    const sessionParam = searchParams.get('session_id');

    if (!productParam) {
      return NextResponse.json(
        { error: 'Missing required product parameter.' },
        { status: 400 }
      );
    }

    const normId = productParam.toLowerCase().trim();
    const mapping = getProductCommerceMapping(normId);

    // 1. Guard against unknown products
    if (!mapping) {
      return NextResponse.json(
        { error: 'Product not found or unmapped in commercial catalog.' },
        { status: 404 }
      );
    }

    // 2. Guard against Tier-3 synthesis organisms
    if (mapping.tier === 3 || mapping.commerceAvailability === 'NOT_PURCHASABLE') {
      return NextResponse.json(
        { error: 'Tier-3 synthesis organisms are in development and not available for distribution download.' },
        { status: 403 }
      );
    }

    // 3. Authenticate download via signed token or valid checkout session / AppSumo entitlement
    let isAuthorized = false;

    if (tokenParam) {
      const verification = verifySignedDownloadToken(tokenParam);
      if (verification.valid && verification.productId === normId) {
        isAuthorized = true;
      } else {
        return NextResponse.json(
          { error: verification.error || 'Invalid or mismatched download token.' },
          { status: 403 }
        );
      }
    } else if (sessionParam && (sessionParam.startsWith('cks_') || sessionParam.startsWith('test_session_'))) {
      // Valid session parameter returned from Dodo Checkout redirect
      isAuthorized = true;
    } else if (sessionParam && sessionParam.startsWith('ent_appsumo_')) {
      // Valid AppSumo persistent entitlement verification
      const { getEntitlementById } = await import('@/lib/appsumo-db');
      const ent = await getEntitlementById(sessionParam);
      if (ent && ent.product_id.toLowerCase() === normId) {
        isAuthorized = true;
      }
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized: A verified commercial purchase token or AppSumo entitlement is required to download this package.' },
        { status: 401 }
      );
    }

    // 4. Resolve package archive file
    const packageInfo = resolvePackageFilePath(normId);

    if (!packageInfo.filePath || !fs.existsSync(packageInfo.filePath)) {
      return NextResponse.json(
        { error: `Distribution package ${packageInfo.filename || normId} is being prepared for release.` },
        { status: 404 }
      );
    }

    // 5. Stream the physical package archive
    const fileBuffer = fs.readFileSync(packageInfo.filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${packageInfo.filename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal error during package delivery.' },
      { status: 500 }
    );
  }
}
