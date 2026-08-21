import { NextRequest, NextResponse } from 'next/server';
import { HmacVerifier } from '@/lib/audit-engine';

export async function POST(req: NextRequest) {
  try {
    const { rawPayload, secret, signature, format = 'stripe' } = await req.json();
    if (!rawPayload || !secret || !signature) {
      return NextResponse.json({ success: false, error: 'rawPayload, secret, and signature are required.' }, { status: 400 });
    }

    const result = HmacVerifier.verify(rawPayload, secret, signature, format);
    return NextResponse.json({
      success: true,
      format,
      isValid: result.valid,
      expectedSignature: result.expected,
      error: result.error
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
