import { NextRequest, NextResponse } from 'next/server';
import { AstSchemaEngine } from '@/lib/audit-engine';

export async function POST(req: NextRequest) {
  try {
    const { baseline, incoming } = await req.json();
    if (!baseline || !incoming) {
      return NextResponse.json({ success: false, error: 'Both baseline and incoming payloads are required.' }, { status: 400 });
    }

    const baselineSchema = typeof baseline === 'object' && baseline.type ? baseline : AstSchemaEngine.inferSchema(baseline);
    const incomingSchema = typeof incoming === 'object' && incoming.type ? incoming : AstSchemaEngine.inferSchema(incoming);

    const diffs = AstSchemaEngine.diffSchemas(baselineSchema, incomingSchema);
    const breakingCount = diffs.filter((d) => d.severity === 'BREAKING').length;

    return NextResponse.json({
      success: true,
      hasBreakingChanges: breakingCount > 0,
      breakingCount,
      totalMutations: diffs.length,
      diffs,
      baselineSchema,
      incomingSchema
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
