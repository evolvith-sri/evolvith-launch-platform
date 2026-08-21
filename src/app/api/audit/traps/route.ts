import { NextRequest, NextResponse } from 'next/server';
import { AuditDbStore, WebhookTrapRecord } from '@/lib/audit-db';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  const traps = await AuditDbStore.listTraps();
  return NextResponse.json({ success: true, traps });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const trapId = body.trapId || `t_${crypto.randomBytes(8).toString('hex')}`;
    const token = crypto.randomBytes(16).toString('hex');
    const publicUrl = `https://trap.evolvith.com/v1/inbound/${trapId}`;

    const newTrap: WebhookTrapRecord = {
      trapId,
      projectId: body.projectId || 'proj_default',
      name: body.name || 'New Webhook Trap',
      token,
      publicUrl,
      targetLocalhostUrl: body.targetLocalhostUrl || 'http://localhost:3000/api/webhook',
      hmacSecret: body.hmacSecret || '',
      hmacHeader: body.hmacHeader || 'stripe',
      createdAt: Date.now()
    };

    const saved = await AuditDbStore.createTrap(newTrap);
    return NextResponse.json({ success: true, trap: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
