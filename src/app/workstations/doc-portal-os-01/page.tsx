'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { logCommercialIntent } from '@/lib/telemetry';

const SAMPLE_OPENAPI = {
  openapi: '3.0.0',
  info: {
    title: 'Acme Payments & Invoicing API',
    version: '1.2.0',
    description: 'Production Developer API for real-time payment charges, customers, and webhook subscriptions.'
  },
  servers: [{ url: 'https://api.acme-payments.com/v1' }],
  paths: {
    '/charges': {
      post: {
        summary: 'Create Payment Charge',
        description: 'Initiates a credit card or digital wallet transaction.',
        tags: ['Payments'],
        requestBody: {
          content: {
            'application/json': {
              example: { amount: 4900, currency: 'USD', customer_id: 'cus_9988', metadata: { order_id: 'ord_123' } }
            }
          }
        },
        responses: {
          '200': { description: 'Charge processed successfully' },
          '400': { description: 'Invalid card or currency parameter' }
        }
      },
      get: {
        summary: 'List All Charges',
        description: 'Returns a paginated list of historical payment charges.',
        tags: ['Payments'],
        responses: {
          '200': { description: 'List of charge objects' }
        }
      }
    },
    '/customers/{id}': {
      get: {
        summary: 'Retrieve Customer Profile',
        description: 'Fetches account metadata, payment methods, and invoice history.',
        tags: ['Customers'],
        responses: {
          '200': { description: 'Customer details object' }
        }
      }
    },
    '/webhooks': {
      post: {
        summary: 'Register Webhook Listener',
        description: 'Subscribes an HTTPS endpoint to real-time event notifications.',
        tags: ['Webhooks'],
        requestBody: {
          content: {
            'application/json': {
              example: { url: 'https://mysaas.com/api/webhooks/acme', events: ['charge.succeeded', 'invoice.paid'] }
            }
          }
        },
        responses: {
          '201': { description: 'Webhook registered' }
        }
      }
    }
  }
};

export default function DocPortalWorkstationPage() {
  const [specJson, setSpecJson] = useState(JSON.stringify(SAMPLE_OPENAPI, null, 2));
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState<'curl' | 'js' | 'python' | 'go'>('curl');
  const [activeTab, setActiveTab] = useState<'preview' | 'spec_editor' | 'sandbox'>('preview');
  const [sandboxResponse, setSandboxResponse] = useState<string | null>(null);

  useEffect(() => {
    logCommercialIntent({
      eventType: 'LAUNCH_WORKSTATION',
      productId: 'doc-portal-os-01',
      systemCode: 'DOC-PORTAL-OS-01',
    });
  }, []);

  let parsed: any = null;
  try {
    parsed = JSON.parse(specJson);
  } catch (e) {
    parsed = SAMPLE_OPENAPI;
  }

  const endpoints: any[] = [];
  const tags = new Set<string>();

  if (parsed && parsed.paths) {
    Object.keys(parsed.paths).forEach(p => {
      const pathItem = parsed.paths[p];
      ['get', 'post', 'put', 'delete', 'patch'].forEach(m => {
        if (pathItem[m]) {
          const op = pathItem[m];
          const opTags = op.tags || ['General'];
          opTags.forEach((t: string) => tags.add(t));
          endpoints.push({
            id: `${m}_${p}`,
            method: m.toUpperCase(),
            path: p,
            summary: op.summary || `${m.toUpperCase()} ${p}`,
            description: op.description || '',
            tags: opTags,
            body: op.requestBody?.content?.['application/json']?.example || null,
            responses: op.responses || {}
          });
        }
      });
    });
  }

  useEffect(() => {
    if (endpoints.length > 0 && !selectedEndpoint) {
      setSelectedEndpoint(endpoints[0]);
    }
  }, [endpoints, selectedEndpoint]);

  const filteredEndpoints = endpoints.filter(ep => {
    if (selectedTag === 'ALL') return true;
    return ep.tags.includes(selectedTag);
  });

  const getSnippet = (ep: any, lang: string) => {
    if (!ep) return '';
    const baseUrl = parsed.servers?.[0]?.url || 'https://api.example.com/v1';
    const fullUrl = `${baseUrl}${ep.path}`;
    const bodyStr = ep.body ? JSON.stringify(ep.body) : null;

    if (lang === 'curl') {
      let cmd = `curl -X ${ep.method} "${fullUrl}" \\\n  -H "Authorization: Bearer <API_KEY>" \\\n  -H "Content-Type: application/json"`;
      if (bodyStr && ep.method !== 'GET') {
        cmd += ` \\\n  -d '${bodyStr}'`;
      }
      return cmd;
    }
    if (lang === 'js') {
      return `const response = await fetch("${fullUrl}", {
  method: "${ep.method}",
  headers: {
    "Authorization": "Bearer <API_KEY>",
    "Content-Type": "application/json"
  }${bodyStr && ep.method !== 'GET' ? `,\n  body: JSON.stringify(${JSON.stringify(ep.body, null, 2)})` : ''}
});
const data = await response.json();
console.log(data);`;
    }
    if (lang === 'python') {
      return `import requests

url = "${fullUrl}"
headers = {
    "Authorization": "Bearer <API_KEY>",
    "Content-Type": "application/json"
}
${bodyStr && ep.method !== 'GET' ? `payload = ${JSON.stringify(ep.body, null, 4)}\nresponse = requests.${ep.method.toLowerCase()}(url, headers=headers, json=payload)` : `response = requests.${ep.method.toLowerCase()}(url, headers=headers)`}

print(response.status_code)
print(response.json())`;
    }
    if (lang === 'go') {
      return `package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {
    req, _ := http.NewRequest("${ep.method}", "${fullUrl}", nil)
    req.Header.Set("Authorization", "Bearer <API_KEY>")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := ioutil.ReadAll(resp.Body)
    fmt.Println(string(body))
}`;
    }
    return '';
  };

  const runMockSandbox = () => {
    setSandboxResponse('Executing mock request...');
    setTimeout(() => {
      setSandboxResponse(JSON.stringify({
        status: 'success',
        http_code: 200,
        mock_data: selectedEndpoint?.body || { message: 'OK', timestamp: Date.now() },
        latency_ms: 38,
        headers: {
          'content-type': 'application/json',
          'x-ratelimit-remaining': '99',
          'x-evolvith-mock': 'true'
        }
      }, null, 2));
    }, 250);
  };

  const exportStaticHtml = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>${parsed.info?.title || 'API Documentation'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 p-8">
  <h1 class="text-3xl font-bold mb-2">${parsed.info?.title || 'API Documentation'}</h1>
  <p class="text-slate-400 mb-6">${parsed.info?.description || ''}</p>
  <div class="space-y-4">
    ${endpoints.map(e => `
      <div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
        <span class="px-2 py-1 font-mono text-xs font-bold ${e.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'} rounded">${e.method}</span>
        <span class="font-mono text-sm ml-2">${e.path}</span>
        <h3 class="font-semibold text-white mt-2">${e.summary}</h3>
      </div>
    `).join('')}
  </div>
  <footer class="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-500">Generated with DOC-PORTAL-OS-01</footer>
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'api_developer_portal.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Operating System Workstation
              </span>
              <span className="text-xs font-mono text-slate-400">DOC-PORTAL-OS-01 v1.0.0</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              OpenAPI &rarr; Interactive Developer Portal Generator
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Convert OpenAPI 3.0/3.1 specs into searchable developer documentation with multi-language code snippets and static HTML export.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/products/doc-portal-os-01"
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
            >
              System Specs
            </Link>
            <Link
              href="/checkout?productId=doc-portal-os-01"
              className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-lg shadow-sky-500/20 transition"
            >
              Purchase License • $49
            </Link>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === 'preview' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Interactive Portal Preview
            </button>
            <button
              onClick={() => setActiveTab('spec_editor')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === 'spec_editor' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              OpenAPI Spec JSON Editor
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === 'sandbox' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mock API Sandbox
            </button>
          </div>

          <button
            onClick={exportStaticHtml}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-lg transition flex items-center space-x-2"
          >
            <span>Export Offline Static HTML</span>
          </button>
        </div>

        {/* TAB 1: INTERACTIVE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Sidebar Navigation */}
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tags Filter</div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedTag('ALL')}
                    className={`px-2 py-1 text-xs rounded transition ${
                      selectedTag === 'ALL' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    All
                  </button>
                  {Array.from(tags).map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTag(t)}
                      className={`px-2 py-1 text-xs rounded transition ${
                        selectedTag === t ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">Endpoints</div>
                {filteredEndpoints.map(ep => (
                  <button
                    key={ep.id}
                    onClick={() => setSelectedEndpoint(ep)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition flex items-center space-x-2 ${
                      selectedEndpoint?.id === ep.id ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                      ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' :
                      ep.method === 'POST' ? 'bg-sky-500/20 text-sky-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="truncate">{ep.path}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Endpoint Details */}
            {selectedEndpoint && (
              <div className="md:col-span-3 space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase ${
                      selectedEndpoint.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    }`}>
                      {selectedEndpoint.method}
                    </span>
                    <span className="text-sm font-mono text-white">{selectedEndpoint.path}</span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedEndpoint.summary}</h2>
                    <p className="text-xs text-slate-400 mt-1">{selectedEndpoint.description}</p>
                  </div>

                  {/* Multi-language Snippets */}
                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Client Code Snippet</span>
                      <div className="flex space-x-1">
                        {(['curl', 'js', 'python', 'go'] as const).map(l => (
                          <button
                            key={l}
                            onClick={() => setSelectedLang(l)}
                            className={`px-2.5 py-1 rounded text-xs font-mono uppercase transition ${
                              selectedLang === l ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-sky-300 overflow-x-auto">
                      {getSnippet(selectedEndpoint, selectedLang)}
                    </pre>
                  </div>

                  {/* Request / Response Details */}
                  {selectedEndpoint.body && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sample Request Body</span>
                      <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto">
                        {JSON.stringify(selectedEndpoint.body, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: SPEC EDITOR */}
        {activeTab === 'spec_editor' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white">OpenAPI 3.0 JSON Specification</label>
              <button
                onClick={() => setSpecJson(JSON.stringify(SAMPLE_OPENAPI, null, 2))}
                className="text-xs text-sky-400 hover:underline"
              >
                Reset Default Spec
              </button>
            </div>
            <textarea
              value={specJson}
              onChange={(e) => setSpecJson(e.target.value)}
              rows={16}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 focus:outline-none focus:border-sky-500"
            />
          </div>
        )}

        {/* TAB 3: MOCK SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Safe Mock API Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">
                Simulate endpoint requests locally without executing live production mutations or transmitting credentials.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-sky-400">
                  {selectedEndpoint?.method} {selectedEndpoint?.path}
                </span>
                <button
                  onClick={runMockSandbox}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-lg transition"
                >
                  Execute Mock Request
                </button>
              </div>

              {sandboxResponse && (
                <div className="space-y-2 pt-2 border-t border-slate-900">
                  <span className="text-xs font-mono text-slate-500 uppercase">Mock Server Response</span>
                  <pre className="p-4 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto">
                    {sandboxResponse}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
