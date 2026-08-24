import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface AggregatedMetric {
  eventType: string;
  productId?: string;
  count: number;
  lastSeen: number;
}

// In-memory intent counters (reset on cold start, zero PII)
const INTENT_METRICS = new Map<string, AggregatedMetric>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = String(body.eventType || 'UNKNOWN');
    const productId = body.productId ? String(body.productId) : 'general';

    const key = `${eventType}:${productId}`;
    const existing = INTENT_METRICS.get(key) || {
      eventType,
      productId,
      count: 0,
      lastSeen: Date.now(),
    };

    existing.count += 1;
    existing.lastSeen = Date.now();
    INTENT_METRICS.set(key, existing);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET() {
  const metrics = Array.from(INTENT_METRICS.values());
  const eventCounts: Record<string, number> = {};
  for (const m of metrics) {
    eventCounts[m.eventType] = (eventCounts[m.eventType] || 0) + m.count;
  }

  const funnel = {
    landingVisits: eventCounts['VISIT_HOMEPAGE'] || 0,
    storeViews: eventCounts['VIEW_STORE'] || 0,
    productBlueprintViews: (eventCounts['VIEW_PRODUCT_PAGE'] || 0) + (eventCounts['VIEW_PRODUCT_BLUEPRINT'] || 0),
    workstationLaunches: eventCounts['LAUNCH_WORKSTATION'] || 0,
    checkoutClicks: (eventCounts['CLICK_CHECKOUT_CTA'] || 0) + (eventCounts['CLICK_INSTANT_BUY'] || 0),
    checkoutInitiations: eventCounts['INITIATE_CHECKOUT'] || 0,
    purchasesCompleted: eventCounts['PAYMENT_COMPLETED'] || 0,
    packageDownloads: eventCounts['DOWNLOAD_PACKAGE'] || 0,
    feedbackSubmitted: eventCounts['SUBMIT_FEEDBACK'] || 0,
  };

  return NextResponse.json(
    {
      success: true,
      totalEventsLogged: metrics.reduce((acc, m) => acc + m.count, 0),
      funnel,
      metrics,
    },
    { status: 200 }
  );
}
