import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export interface CustomerFeedbackEntry {
  id: string;
  productId: string;
  primaryProblemSolved: string;
  onboardingClarityRating: number; // 1 to 5
  nextDesiredSystem: string;
  additionalNotes?: string;
  createdAt: number;
}

// In-memory feedback store (logged safely for founder research)
const CUSTOMER_FEEDBACK_LOG: CustomerFeedbackEntry[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productId = String(body.productId || 'UNKNOWN');
    const primaryProblemSolved = String(body.primaryProblemSolved || '').trim();
    const onboardingClarityRating = Math.min(5, Math.max(1, Number(body.onboardingClarityRating) || 5));
    const nextDesiredSystem = String(body.nextDesiredSystem || '').trim();
    const additionalNotes = body.additionalNotes ? String(body.additionalNotes).trim().slice(0, 1000) : undefined;

    if (!primaryProblemSolved && !nextDesiredSystem) {
      return NextResponse.json(
        { error: 'Please provide feedback on your primary problem or requested next system.' },
        { status: 400 }
      );
    }

    const entry: CustomerFeedbackEntry = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      productId,
      primaryProblemSolved,
      onboardingClarityRating,
      nextDesiredSystem,
      additionalNotes,
      createdAt: Date.now(),
    };

    CUSTOMER_FEEDBACK_LOG.push(entry);

    return NextResponse.json(
      {
        success: true,
        message: 'Feedback received. Thank you for helping shape the Evolvith product roadmap!',
      },
      { status: 200 }
    );
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
