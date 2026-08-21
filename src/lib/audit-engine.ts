/**
 * AUDIT-OS-01: TypeScript AST Schema Inference & Diff Engine
 * Real-time, deterministic schema analysis, code generation, and replay utilities.
 */

import crypto from 'crypto';

export type NodeType =
  | 'string'
  | 'integer'
  | 'float'
  | 'boolean'
  | 'null'
  | 'object'
  | 'array'
  | 'any';

export interface SchemaNode {
  type: NodeType;
  nullable: boolean;
  optional: boolean;
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode | SchemaNode[];
  enum?: any[];
}

export interface DiffItem {
  path: string;
  type: 'FIELD_ADDED' | 'FIELD_REMOVED' | 'TYPE_MUTATION' | 'NULLABLE_VIOLATION' | 'NUMERIC_WIDENING' | 'TUPLE_MISMATCH';
  severity: 'BREAKING' | 'NON_BREAKING';
  message: string;
}

export class AstSchemaEngine {
  public static inferSchema(data: any, optional: boolean = false): SchemaNode {
    if (data === null || data === undefined) {
      return { type: 'null', nullable: true, optional };
    }
    if (typeof data === 'boolean') {
      return { type: 'boolean', nullable: false, optional };
    }
    if (typeof data === 'number') {
      return {
        type: Number.isInteger(data) ? 'integer' : 'float',
        nullable: false,
        optional
      };
    }
    if (typeof data === 'string') {
      return { type: 'string', nullable: false, optional };
    }
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return { type: 'array', items: { type: 'any', nullable: false, optional: false }, nullable: false, optional };
      }
      const itemSchemas = data.map((item) => AstSchemaEngine.inferSchema(item));
      const firstType = itemSchemas[0].type;
      const allSame = itemSchemas.every((s) => s.type === firstType);
      
      if (allSame) {
        if (firstType === 'object') {
          const mergedProps: Record<string, SchemaNode> = {};
          for (const item of data) {
            if (item && typeof item === 'object' && !Array.isArray(item)) {
              for (const [k, v] of Object.entries(item)) {
                if (!mergedProps[k]) {
                  mergedProps[k] = AstSchemaEngine.inferSchema(v);
                }
              }
            }
          }
          return {
            type: 'array',
            items: { type: 'object', properties: mergedProps, nullable: false, optional: false },
            nullable: false,
            optional
          };
        }
        return { type: 'array', items: itemSchemas[0], nullable: false, optional };
      } else {
        return { type: 'array', items: itemSchemas, nullable: false, optional };
      }
    }
    if (typeof data === 'object') {
      const properties: Record<string, SchemaNode> = {};
      for (const [k, v] of Object.entries(data)) {
        properties[k] = AstSchemaEngine.inferSchema(v);
      }
      return { type: 'object', properties, nullable: false, optional };
    }
    return { type: 'string', nullable: false, optional };
  }

  public static diffSchemas(baseline: SchemaNode, incoming: SchemaNode, path: string = '$'): DiffItem[] {
    const diffs: DiffItem[] = [];

    // 1. Nullability Violation
    if (!baseline.nullable && incoming.type === 'null') {
      diffs.push({
        path,
        type: 'NULLABLE_VIOLATION',
        severity: 'BREAKING',
        message: `Field '${path}' is non-nullable in baseline, but received null value.`
      });
      return diffs;
    }

    // 2. Type Mutation
    if (baseline.type !== incoming.type && incoming.type !== 'null') {
      if (baseline.type === 'integer' && incoming.type === 'float') {
        diffs.push({
          path,
          type: 'NUMERIC_WIDENING',
          severity: 'NON_BREAKING',
          message: `Field '${path}' widened from integer to float.`
        });
      } else {
        diffs.push({
          path,
          type: 'TYPE_MUTATION',
          severity: 'BREAKING',
          message: `Field '${path}' type mutated from ${baseline.type} to ${incoming.type}.`
        });
      }
      return diffs;
    }

    // 3. Object Properties Diff
    if (baseline.type === 'object' && incoming.type === 'object') {
      const baseProps = baseline.properties || {};
      const incProps = incoming.properties || {};
      const baseKeys = Object.keys(baseProps);
      const incKeys = new Set(Object.keys(incProps));

      // Removed Keys
      for (const k of baseKeys) {
        if (!incKeys.has(k)) {
          const isOpt = baseProps[k].optional;
          diffs.push({
            path: `${path}.${k}`,
            type: 'FIELD_REMOVED',
            severity: isOpt ? 'NON_BREAKING' : 'BREAKING',
            message: `Field '${k}' was removed from object at '${path}'.`
          });
        } else {
          diffs.push(...AstSchemaEngine.diffSchemas(baseProps[k], incProps[k], `${path}.${k}`));
        }
      }

      // Added Keys
      for (const k of Object.keys(incProps)) {
        if (!baseProps[k]) {
          diffs.push({
            path: `${path}.${k}`,
            type: 'FIELD_ADDED',
            severity: 'NON_BREAKING',
            message: `New field '${k}' detected at '${path}'.`
          });
        }
      }
    }

    // 4. Array Items Diff
    if (baseline.type === 'array' && incoming.type === 'array') {
      if (baseline.items && incoming.items) {
        if (!Array.isArray(baseline.items) && !Array.isArray(incoming.items)) {
          diffs.push(...AstSchemaEngine.diffSchemas(baseline.items, incoming.items, `${path}[]`));
        } else if (Array.isArray(baseline.items) && Array.isArray(incoming.items)) {
          if (baseline.items.length !== incoming.items.length) {
            diffs.push({
              path,
              type: 'TUPLE_MISMATCH',
              severity: 'BREAKING',
              message: `Array tuple length changed from ${baseline.items.length} to ${incoming.items.length}.`
            });
          } else {
            for (let i = 0; i < baseline.items.length; i++) {
              diffs.push(...AstSchemaEngine.diffSchemas(baseline.items[i], incoming.items[i], `${path}[${i}]`));
            }
          }
        }
      }
    }

    return diffs;
  }
}

export class CodeGenerator {
  public static toPascalCase(name: string): string {
    const clean = name.replace(/[^a-zA-Z0-9]/g, ' ');
    return clean
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('') || 'GeneratedModel';
  }

  public static generateTypeScript(node: SchemaNode, name: string = 'PayloadModel'): string {
    const pascalName = CodeGenerator.toPascalCase(name);
    const nested: string[] = [];

    function renderType(n: SchemaNode, propName: string): string {
      if (n.type === 'string') return 'string';
      if (n.type === 'integer' || n.type === 'float') return 'number';
      if (n.type === 'boolean') return 'boolean';
      if (n.type === 'null') return 'null';
      if (n.type === 'array') {
        if (n.items && !Array.isArray(n.items)) {
          return `${renderType(n.items, `${propName}Item`)}[]`;
        } else if (Array.isArray(n.items)) {
          const tupleTypes = n.items.map((it, idx) => renderType(it, `${propName}Item${idx}`));
          return `[${tupleTypes.join(', ')}]`;
        }
        return 'any[]';
      }
      if (n.type === 'object') {
        const subName = CodeGenerator.toPascalCase(propName);
        const props = n.properties || {};
        const lines: string[] = [];
        for (const [k, v] of Object.entries(props)) {
          const opt = v.optional ? '?' : '';
          let tStr = renderType(v, k);
          if (v.nullable) tStr += ' | null';
          const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `"${k}"`;
          lines.push(`  ${safeKey}${opt}: ${tStr};`);
        }
        nested.push(`export interface ${subName} {\n${lines.join('\n')}\n}`);
        return subName;
      }
      return 'any';
    }

    let rootStr = '';
    if (node.type === 'object') {
      const props = node.properties || {};
      const lines: string[] = [];
      for (const [k, v] of Object.entries(props)) {
        const opt = v.optional ? '?' : '';
        let tStr = renderType(v, k);
        if (v.nullable) tStr += ' | null';
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `"${k}"`;
        lines.push(`  ${safeKey}${opt}: ${tStr};`);
      }
      rootStr = `export interface ${pascalName} {\n${lines.join('\n')}\n}`;
    } else {
      rootStr = `export type ${pascalName} = ${renderType(node, name)};`;
    }

    return [...nested, rootStr].join('\n\n');
  }

  public static generateZod(node: SchemaNode, name: string = 'PayloadModel'): string {
    const pascalName = CodeGenerator.toPascalCase(name);

    function renderZod(n: SchemaNode): string {
      if (n.type === 'string') return 'z.string()';
      if (n.type === 'integer' || n.type === 'float') return 'z.number()';
      if (n.type === 'boolean') return 'z.boolean()';
      if (n.type === 'null') return 'z.null()';
      if (n.type === 'array') {
        if (n.items && !Array.isArray(n.items)) {
          return `z.array(${renderZod(n.items)})`;
        } else if (Array.isArray(n.items)) {
          return `z.tuple([${n.items.map(renderZod).join(', ')}])`;
        }
        return 'z.array(z.any())';
      }
      if (n.type === 'object') {
        const props = n.properties || {};
        const lines: string[] = [];
        for (const [k, v] of Object.entries(props)) {
          let zExpr = renderZod(v);
          if (v.nullable) zExpr = `${zExpr}.nullable()`;
          if (v.optional) zExpr = `${zExpr}.optional()`;
          const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `"${k}"`;
          lines.push(`  ${safeKey}: ${zExpr},`);
        }
        return `z.object({\n${lines.join('\n')}\n})`;
      }
      return 'z.any()';
    }

    const zodDef = `export const ${pascalName}Schema = ${renderZod(node)};\nexport type ${pascalName} = z.infer<typeof ${pascalName}Schema>;`;
    return `import { z } from 'zod';\n\n${zodDef}`;
  }

  public static generatePydantic(node: SchemaNode, name: string = 'PayloadModel'): string {
    const pascalName = CodeGenerator.toPascalCase(name);
    const models: string[] = [];

    function renderPydanticType(n: SchemaNode, propName: string): string {
      if (n.type === 'string') return 'str';
      if (n.type === 'integer') return 'int';
      if (n.type === 'float') return 'float';
      if (n.type === 'boolean') return 'bool';
      if (n.type === 'null') return 'None';
      if (n.type === 'array') {
        if (n.items && !Array.isArray(n.items)) {
          return `List[${renderPydanticType(n.items, `${propName}Item`)}]`;
        } else if (Array.isArray(n.items)) {
          const tupleTypes = n.items.map((it, idx) => renderPydanticType(it, `${propName}Item${idx}`));
          return `Tuple[${tupleTypes.join(', ')}]`;
        }
        return 'List[Any]';
      }
      if (n.type === 'object') {
        const subName = CodeGenerator.toPascalCase(propName);
        const props = n.properties || {};
        const fields: string[] = [];
        for (const [k, v] of Object.entries(props)) {
          let tStr = renderPydanticType(v, k);
          if (v.nullable || v.optional) {
            tStr = `Optional[${tStr}] = None`;
          }
          const safeKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : `field_${k}`;
          fields.push(`    ${safeKey}: ${tStr}`);
        }
        models.push(`class ${subName}(BaseModel):\n` + (fields.length ? fields.join('\n') : '    pass'));
        return subName;
      }
      return 'Any';
    }

    if (node.type === 'object') {
      const props = node.properties || {};
      const fields: string[] = [];
      for (const [k, v] of Object.entries(props)) {
        let tStr = renderPydanticType(v, k);
        if (v.nullable || v.optional) {
          tStr = `Optional[${tStr}] = None`;
        }
        const safeKey = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : `field_${k}`;
        fields.push(`    ${safeKey}: ${tStr}`);
      }
      models.push(`class ${pascalName}(BaseModel):\n` + (fields.length ? fields.join('\n') : '    pass'));
    } else {
      models.push(`class ${pascalName}(BaseModel):\n    value: ${renderPydanticType(node, 'value')}`);
    }

    const header = `from typing import Optional, List, Dict, Any, Tuple\nfrom pydantic import BaseModel, Field\n\n`;
    return header + models.join('\n\n');
  }
}

export class HmacVerifier {
  public static verify(rawPayload: string, secret: string, signature: string, format: string = 'stripe'): { valid: boolean; expected?: string; error?: string } {
    if (!secret || !signature) {
      return { valid: false, error: 'MISSING_SECRET_OR_SIGNATURE' };
    }

    try {
      if (format.toLowerCase() === 'stripe') {
        const parts: Record<string, string> = {};
        signature.split(',').forEach((item) => {
          const [k, v] = item.split('=', 2);
          if (k && v) parts[k.trim()] = v.trim();
        });
        const timestamp = parts['t'];
        const sigV1 = parts['v1'];
        if (!timestamp || !sigV1) {
          return { valid: false, error: 'MALFORMED_STRIPE_HEADER' };
        }
        const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${rawPayload}`).digest('hex');
        const valid = crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(sigV1, 'hex'));
        return { valid, expected };
      } else if (format.toLowerCase() === 'shopify') {
        const expected = crypto.createHmac('sha256', secret).update(rawPayload, 'utf-8').digest('base64');
        return { valid: expected === signature, expected };
      } else if (format.toLowerCase() === 'github') {
        const cleanSig = signature.replace(/^sha256=/, '').trim();
        const expected = crypto.createHmac('sha256', secret).update(rawPayload, 'utf-8').digest('hex');
        const valid = crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(cleanSig, 'hex'));
        return { valid, expected };
      } else {
        const expected = crypto.createHmac('sha256', secret).update(rawPayload, 'utf-8').digest('hex');
        const valid = crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature.trim(), 'hex'));
        return { valid, expected };
      }
    } catch (e: any) {
      return { valid: false, error: e.message };
    }
  }
}

export class MockCompiler {
  public static compileNodeJs(routes: Record<string, any>, port: number = 4000): string {
    const routesStr = JSON.stringify(routes, null, 2);
    return `/**
 * AUDIT-OS-01 Standalone Node.js Mock API Server
 * Generated on ${new Date().toISOString()}
 * Run: node mock_server.js --port ${port}
 */
const http = require('http');

const PORT = process.argv.includes('--port') ? parseInt(process.argv[process.argv.indexOf('--port') + 1], 10) : ${port};
const ROUTES = ${routesStr};

const server = http.createServer((req, res) => {
  const method = req.method.toUpperCase();
  const urlPath = req.url.split('?')[0];
  const key = \`\${method} \${urlPath}\`;
  
  console.log(\`[\${new Date().toISOString()}] \${method} \${urlPath}\`);
  
  if (ROUTES[key]) {
    const r = ROUTES[key];
    res.writeHead(r.status || 200, r.headers || { 'Content-Type': 'application/json' });
    const bodyStr = typeof r.body === 'string' ? r.body : JSON.stringify(r.body);
    res.end(bodyStr);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Mock route not configured', requested: key }));
  }
});

server.listen(PORT, () => {
  console.log(\`🚀 AUDIT-OS-01 Mock Server listening on http://localhost:\${PORT}\`);
});
`;
  }
}
