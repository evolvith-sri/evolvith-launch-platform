import { NextResponse } from 'next/server';
import { getCustomerIntelligenceSummary } from '@/lib/intelligence';

export const dynamic = 'force-dynamic';

export async function GET() {
  const summary = getCustomerIntelligenceSummary();
  return NextResponse.json(
    {
      success: true,
      timestamp: new Date().toISOString(),
      governance: 'MWO-8 Customer Intelligence & Demand Engine',
      summary,
    },
    { status: 200 }
  );
}
