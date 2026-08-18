import { NextRequest, NextResponse } from 'next/server';
import { COMMERCE_CONFIG, getProductCommerceMapping } from '@/lib/commerce';
import { createDodoCheckoutSession } from '@/lib/dodo';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, customerEmail, customerName } = body;

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid productId parameter.' },
        { status: 400 }
      );
    }

    const mapping = getProductCommerceMapping(productId);
    if (!mapping) {
      return NextResponse.json(
        { error: `Unknown product code: ${productId}` },
        { status: 404 }
      );
    }

    // Guard: Tier-3 synthesis organisms are non-purchasable
    if (mapping.tier === 3 || mapping.commerceAvailability === 'NOT_PURCHASABLE') {
      return NextResponse.json(
        { error: 'Tier-3 synthesis organisms are currently in development and not available for commercial checkout.' },
        { status: 400 }
      );
    }

    // Check centralized commerce status
    if (COMMERCE_CONFIG.status === 'PRE_LAUNCH') {
      return NextResponse.json(
        {
          success: false,
          status: 'PRE_LAUNCH',
          message: COMMERCE_CONFIG.preLaunchMessage,
          product: {
            systemCode: mapping.systemCode,
            title: mapping.title,
            tier: mapping.tier,
            subTier: mapping.subTier,
            governedPrice: mapping.governedPrice,
            currency: mapping.currency,
          },
        },
        { status: 200 }
      );
    }

    // In CONTROLLED_COMMERCE_VERIFICATION or LIVE state, create Dodo checkout session
    const sessionResult = await createDodoCheckoutSession({
      productId,
      customerEmail: customerEmail || 'customer@evolvith.com',
      customerName: customerName || 'Enterprise Customer',
    });

    if (!sessionResult.success) {
      return NextResponse.json(
        { error: sessionResult.error || 'Failed to create checkout session.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: sessionResult.checkoutUrl,
      sessionId: sessionResult.sessionId,
      product: {
        systemCode: mapping.systemCode,
        title: mapping.title,
        price: mapping.governedPrice,
        currency: mapping.currency,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
