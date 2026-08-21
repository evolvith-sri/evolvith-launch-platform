import { NextRequest, NextResponse } from 'next/server';
import { MockCompiler } from '@/lib/audit-engine';

export async function POST(req: NextRequest) {
  try {
    const { routes, port = 4000 } = await req.json();
    if (!routes || typeof routes !== 'object') {
      return NextResponse.json({ success: false, error: 'Routes mapping dictionary is required.' }, { status: 400 });
    }

    const script = MockCompiler.compileNodeJs(routes, port);
    return NextResponse.json({
      success: true,
      port,
      script,
      routeCount: Object.keys(routes).length
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
