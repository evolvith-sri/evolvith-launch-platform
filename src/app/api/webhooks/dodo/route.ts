import { NextRequest, NextResponse } from 'next/server';
import { verifyDodoWebhookSignature, processDodoWebhookEvent, DodoWebhookPayload } from '@/lib/dodo';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('webhook-signature') || req.headers.get('x-dodo-signature');
    const timestamp = req.headers.get('webhook-timestamp') || req.headers.get('x-dodo-timestamp');

    // Verify webhook signature in production/live environments
    if (process.env.DODO_PAYMENTS_WEBHOOK_SECRET) {
      const isValid = verifyDodoWebhookSignature(rawBody, signature, timestamp);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid webhook signature verification.' },
          { status: 401 }
        );
      }
    }

    let payload: DodoWebhookPayload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: 'Malformed JSON webhook payload.' },
        { status: 400 }
      );
    }

    // Process event with idempotency protection
    const result = processDodoWebhookEvent(payload);

    return NextResponse.json(
      {
        received: true,
        status: result.status,
        message: result.message,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Webhook processing failure: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
