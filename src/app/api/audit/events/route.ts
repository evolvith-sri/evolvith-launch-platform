import { NextRequest, NextResponse } from 'next/server';
import { AuditDbStore, CapturedEventRecord } from '@/lib/audit-db';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trapId = searchParams.get('trapId') || 't_demo_stripe_checkout';
  const events = await AuditDbStore.getEvents(trapId, 50);
  return NextResponse.json({ success: true, trapId, events });
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const trapId = searchParams.get('trapId') || 't_demo_stripe_checkout';
    const rawBody = await req.text();
    
    let bodyJson: any = null;
    try {
      bodyJson = JSON.parse(rawBody);
    } catch (_) {}

    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const eventRecord: CapturedEventRecord = {
      eventId: `evt_${crypto.randomBytes(8).toString('hex')}`,
      trapId,
      httpMethod: req.method,
      sourceIp: req.ip || '127.0.0.1',
      headers,
      queryParams: Object.fromEntries(searchParams.entries()),
      rawBody,
      bodyJson,
      contentType: req.headers.get('content-type') || 'application/json',
      contentLength: rawBody.length,
      receivedAt: Date.now()
    };

    await AuditDbStore.insertEvent(eventRecord);
    return NextResponse.json({ success: true, eventId: eventRecord.eventId, received: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
