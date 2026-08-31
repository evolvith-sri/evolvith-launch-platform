import { NextRequest, NextResponse } from 'next/server';
import { TelemetryEvent, CommercialEventType } from '@/lib/telemetry';

export const dynamic = 'force-dynamic';

interface TelemetryRecord {
  eventType: CommercialEventType;
  productId: string;
  systemCode?: string;
  source: string;
  medium?: string;
  campaign?: string;
  environment: 'production' | 'development' | 'test';
  timestamp: number;
  count: number;
}

// In-memory aggregated state (reset on cold start, zero PII)
const TELEMETRY_STORE = new Map<string, TelemetryRecord>();

export async function POST(req: NextRequest) {
  try {
    const body: Partial<TelemetryEvent> = await req.json();
    if (!body.eventType) {
      return NextResponse.json({ error: 'Missing required eventType' }, { status: 400 });
    }

    const eventType = body.eventType;
    const productId = body.productId ? body.productId.toLowerCase().replace(/_/g, '-') : 'general';
    const source = (body.source || 'DIRECT').toUpperCase();
    const medium = body.medium || undefined;
    const campaign = body.campaign || undefined;
    const environment = body.environment || 'production';
    const systemCode = body.systemCode || undefined;
    const timestamp = body.timestamp || Date.now();

    // Aggregation key by event, product, source, environment
    const key = `${environment}:${eventType}:${productId}:${source}`;
    const existing = TELEMETRY_STORE.get(key) || {
      eventType,
      productId,
      systemCode,
      source,
      medium,
      campaign,
      environment,
      timestamp,
      count: 0,
    };

    existing.count += 1;
    existing.timestamp = timestamp;
    if (systemCode && !existing.systemCode) existing.systemCode = systemCode;
    TELEMETRY_STORE.set(key, existing);

    return NextResponse.json({ success: true, logged: key }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to record telemetry event', details: error instanceof Error ? error.message : String(error) },
      { status: 400 }
    );
  }
}

interface ProductFunnel {
  productId: string;
  systemCode: string;
  views: number;
  workstationLaunches: number;
  buyClicks: number;
  checkoutInitiations: number;
  purchasesCompleted: number;
  viewToWorkstationRate: string;
  viewToBuyRate: string;
  buyToCheckoutRate: string;
  checkoutToPurchaseRate: string;
  overallConversionRate: string;
}

function calculateConversionRate(numerator: number, denominator: number): string {
  if (denominator === 0 || numerator === 0) return '0.0%';
  const rate = (numerator / denominator) * 100;
  return `${rate.toFixed(1)}%`;
}

function buildProductFunnel(records: TelemetryRecord[], productId: string, defaultCode: string): ProductFunnel {
  const pRecords = records.filter((r) => r.productId === productId);
  const code = pRecords.find((r) => r.systemCode)?.systemCode || defaultCode;

  const views = pRecords
    .filter((r) => r.eventType === 'VIEW_PRODUCT_PAGE' || r.eventType === 'VIEW_PRODUCT_BLUEPRINT')
    .reduce((sum, r) => sum + r.count, 0);

  const workstationLaunches = pRecords
    .filter((r) => r.eventType === 'LAUNCH_WORKSTATION' || r.eventType === 'INTERACT_WORKSTATION')
    .reduce((sum, r) => sum + r.count, 0);

  const buyClicks = pRecords
    .filter((r) => r.eventType === 'CLICK_CHECKOUT_CTA' || r.eventType === 'CLICK_INSTANT_BUY')
    .reduce((sum, r) => sum + r.count, 0);

  const checkoutInitiations = pRecords
    .filter((r) => r.eventType === 'INITIATE_CHECKOUT')
    .reduce((sum, r) => sum + r.count, 0);

  const purchasesCompleted = pRecords
    .filter((r) => r.eventType === 'PAYMENT_COMPLETED' || r.eventType === 'CHECKOUT_SUCCESS')
    .reduce((sum, r) => sum + r.count, 0);

  return {
    productId,
    systemCode: code,
    views,
    workstationLaunches,
    buyClicks,
    checkoutInitiations,
    purchasesCompleted,
    viewToWorkstationRate: calculateConversionRate(workstationLaunches, views),
    viewToBuyRate: calculateConversionRate(buyClicks, views),
    buyToCheckoutRate: calculateConversionRate(checkoutInitiations, buyClicks),
    checkoutToPurchaseRate: calculateConversionRate(purchasesCompleted, checkoutInitiations),
    overallConversionRate: calculateConversionRate(purchasesCompleted, views),
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetEnv = searchParams.get('env'); // 'production' | 'development' | null (all)
  const filterProduct = searchParams.get('product')?.toLowerCase();

  let records = Array.from(TELEMETRY_STORE.values());
  if (targetEnv) {
    records = records.filter((r) => r.environment === targetEnv);
  }

  // 1. Overall Platform Funnel
  const eventCounts: Record<string, number> = {};
  const channelAttribution: Record<string, number> = {};

  for (const r of records) {
    eventCounts[r.eventType] = (eventCounts[r.eventType] || 0) + r.count;
    if (r.source) {
      channelAttribution[r.source] = (channelAttribution[r.source] || 0) + r.count;
    }
  }

  const landingVisits = (eventCounts['VISIT_LANDING_PAGE'] || 0) + (eventCounts['VISIT_HOMEPAGE'] || 0);
  const catalogViews = (eventCounts['VIEW_CATALOG'] || 0) + (eventCounts['VIEW_STORE'] || 0);
  const productViews = (eventCounts['VIEW_PRODUCT_PAGE'] || 0) + (eventCounts['VIEW_PRODUCT_BLUEPRINT'] || 0);
  const workstationLaunches = (eventCounts['LAUNCH_WORKSTATION'] || 0) + (eventCounts['INTERACT_WORKSTATION'] || 0);
  const buyClicks =
    (eventCounts['CLICK_CHECKOUT_CTA'] || 0) +
    (eventCounts['CLICK_INSTANT_BUY'] || 0) +
    (eventCounts['CLICK_STORE_CTA'] || 0);
  const checkoutInitiations = eventCounts['INITIATE_CHECKOUT'] || 0;
  const purchasesCompleted =
    (eventCounts['PAYMENT_COMPLETED'] || 0) + (eventCounts['CHECKOUT_SUCCESS'] || 0);
  const redemptionsInitiated = eventCounts['REDEEM_INITIATED'] || 0;
  const redemptionsCompleted = eventCounts['REDEEM_SUCCESS'] || 0;
  const docsInteractions = eventCounts['VIEW_DOCS'] || 0;
  const supportInteractions =
    (eventCounts['VIEW_SUPPORT'] || 0) + (eventCounts['SUBMIT_SUPPORT_REQUEST'] || 0);

  const globalFunnel = {
    step1_Traffic: landingVisits,
    step2_ProductCatalogViews: catalogViews + productViews,
    step3_WorkstationLaunches: workstationLaunches,
    step4_BuyClicks: buyClicks,
    step5_CheckoutInitiated: checkoutInitiations,
    step6_SuccessfulPurchases: purchasesCompleted,
    conversionRates: {
      trafficToProductView: calculateConversionRate(productViews, landingVisits),
      productViewToWorkstation: calculateConversionRate(workstationLaunches, productViews),
      productViewToBuyClick: calculateConversionRate(buyClicks, productViews),
      buyClickToCheckout: calculateConversionRate(checkoutInitiations, buyClicks),
      checkoutToPurchase: calculateConversionRate(purchasesCompleted, checkoutInitiations),
      overallTrafficToPurchase: calculateConversionRate(purchasesCompleted, landingVisits),
    },
  };

  // 2. Specific Focus: PIPE-OS-01 Standalone Funnel
  const pipeOsFunnel = buildProductFunnel(records, 'pipe-os-01', 'PIPE-OS-01');

  // 3. Wave-1 $49 Systems Funnel Breakdown
  const wave1Funnels: Record<string, ProductFunnel> = {
    'pipe-os-01': pipeOsFunnel,
    'audit-os-01': buildProductFunnel(records, 'audit-os-01', 'AUDIT-OS-01'),
    'seo-audit-os-01': buildProductFunnel(records, 'seo-audit-os-01', 'SEO-AUDIT-OS-01'),
    'onboard-os-01': buildProductFunnel(records, 'onboard-os-01', 'ONBOARD-OS-01'),
    'prompt-qa-os-01': buildProductFunnel(records, 'prompt-qa-os-01', 'PROMPT-QA-OS-01'),
    'doc-portal-os-01': buildProductFunnel(records, 'doc-portal-os-01', 'DOC-PORTAL-OS-01'),
  };

  // Support-specific product filtering
  if (filterProduct && wave1Funnels[filterProduct]) {
    return NextResponse.json(
      {
        success: true,
        product: wave1Funnels[filterProduct],
        channelAttribution,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      timestamp: Date.now(),
      totalEventsLogged: records.reduce((sum, r) => sum + r.count, 0),
      channelAttribution,
      globalFunnel,
      pipeOsFocus: pipeOsFunnel,
      wave1ProductsFunnel: wave1Funnels,
      auxiliaryMetrics: {
        redemptionsInitiated,
        redemptionsCompleted,
        docsInteractions,
        supportInteractions,
      },
      rawEventsSummary: eventCounts,
    },
    { status: 200 }
  );
}
