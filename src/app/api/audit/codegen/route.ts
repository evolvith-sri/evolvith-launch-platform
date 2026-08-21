import { NextRequest, NextResponse } from 'next/server';
import { AstSchemaEngine, CodeGenerator } from '@/lib/audit-engine';

export async function POST(req: NextRequest) {
  try {
    const { payload, schema, modelName = 'WebhookEvent', language = 'ts' } = await req.json();
    const targetSchema = schema || AstSchemaEngine.inferSchema(payload || {});

    let code = '';
    if (language === 'ts' || language === 'typescript') {
      code = CodeGenerator.generateTypeScript(targetSchema, modelName);
    } else if (language === 'zod') {
      code = CodeGenerator.generateZod(targetSchema, modelName);
    } else if (language === 'pydantic' || language === 'python') {
      code = CodeGenerator.generatePydantic(targetSchema, modelName);
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported language. Choose ts, zod, or pydantic.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      modelName,
      language,
      code,
      schema: targetSchema
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
