import { NextRequest, NextResponse } from 'next/server';
import { classifyDemandSignal, recordCustomerSignal } from '@/lib/intelligence';

export const dynamic = 'force-dynamic';

export interface CustomerFeedbackEntry {
  id: string;
  productId: string;
  primaryProblemSolved: string;
  priorToolContext?: string;
  onboardingClarityRating: number; // 1 to 5
  missingCapability?: string;
  nextDesiredSystem?: string;
  highTicketNeed?: string;
  additionalNotes?: string;
  createdAt: number;
}

// In-memory feedback store (logged safely for founder research)
const CUSTOMER_FEEDBACK_LOG: CustomerFeedbackEntry[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productId = String(body.productId || 'UNKNOWN');
    const primaryProblemSolved = String(body.primaryProblemSolved || body.primaryProblem || '').trim();
    const priorToolContext = body.priorToolContext ? String(body.priorToolContext).trim() : undefined;
    const onboardingClarityRating = Math.min(5, Math.max(1, Number(body.onboardingClarityRating) || 5));
    const missingCapability = body.missingCapability ? String(body.missingCapability).trim() : undefined;
    const nextDesiredSystem = String(body.nextDesiredSystem || '').trim();
    const highTicketNeed = body.highTicketNeed ? String(body.highTicketNeed).trim() : undefined;
    const additionalNotes = body.additionalNotes ? String(body.additionalNotes).trim().slice(0, 1000) : undefined;

    if (!primaryProblemSolved && !nextDesiredSystem && !missingCapability) {
      return NextResponse.json(
        { error: 'Please provide feedback on your primary problem, desired capabilities, or requested next system.' },
        { status: 400 }
      );
    }

    const entry: CustomerFeedbackEntry = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      productId,
      primaryProblemSolved,
      priorToolContext,
      onboardingClarityRating,
      missingCapability,
      nextDesiredSystem,
      highTicketNeed,
      additionalNotes,
      createdAt: Date.now(),
    };

    CUSTOMER_FEEDBACK_LOG.push(entry);

    // Feed signal into Customer Intelligence & Demand Engine
    try {
      const feedbackCombinedText = [
        primaryProblemSolved,
        missingCapability,
        nextDesiredSystem,
        highTicketNeed,
        additionalNotes,
      ]
        .filter(Boolean)
        .join(' ');

      const classifiedTier = classifyDemandSignal(feedbackCombinedText, 'FEEDBACK');
      const hasWtp = Boolean(highTicketNeed && highTicketNeed.length > 5);

      recordCustomerSignal({
        source: 'FEEDBACK',
        productId,
        signalTier: classifiedTier,
        summary: primaryProblemSolved || missingCapability || nextDesiredSystem || 'Customer Feedback Submitted',
        details: feedbackCombinedText,
        urgency: onboardingClarityRating <= 2 ? 'HIGH' : 'MEDIUM',
        willingnessToPayIndicator: hasWtp,
      });
    } catch {
      // Non-blocking telemetry
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to record feedback: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      totalFeedbackEntries: CUSTOMER_FEEDBACK_LOG.length,
      entries: CUSTOMER_FEEDBACK_LOG,
    },
    { status: 200 }
  );
}
