import { NextRequest, NextResponse } from 'next/server';
import { verifyDodoWebhookSignature, processDodoWebhookEvent, DodoWebhookPayload } from '@/lib/dodo';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const webhookId =
      req.headers.get('webhook-id') ||
      req.headers.get('x-dodo-webhook-id') ||
      req.headers.get('msg-id');
    const signature =
      req.headers.get('webhook-signature') ||
      req.headers.get('x-dodo-signature') ||
      req.headers.get('dodo-signature');
    const timestamp =
      req.headers.get('webhook-timestamp') ||
      req.headers.get('x-dodo-timestamp') ||
      req.headers.get('dodo-timestamp');

    // Strict Webhook Authentication Guard: Fail closed if secret is unconfigured or signature is missing/invalid
    const isValid = verifyDodoWebhookSignature(rawBody, signature, timestamp, webhookId);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing or invalid webhook signature.' },
        { status: 401 }
      );
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

    // Process authenticated event with idempotency protection
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
