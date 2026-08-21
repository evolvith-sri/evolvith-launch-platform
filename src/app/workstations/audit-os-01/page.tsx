'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface WebhookTrap {
  trapId: string;
  name: string;
  publicUrl: string;
  targetLocalhostUrl: string;
  createdAt: number;
}

interface CapturedEvent {
  eventId: string;
  trapId: string;
  httpMethod: string;
  headers: Record<string, string>;
  rawBody: string;
  bodyJson?: any;
  receivedAt: number;
}

export default function AuditOsWorkstationPage() {
  const [traps, setTraps] = useState<WebhookTrap[]>([]);
  const [activeTrap, setActiveTrap] = useState<WebhookTrap | null>(null);
  const [events, setEvents] = useState<CapturedEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CapturedEvent | null>(null);
  
  // Tabs: 'inspector' | 'diff' | 'codegen' | 'replay' | 'mock' | 'hmac'
  const [activeTab, setActiveTab] = useState<'inspector' | 'diff' | 'codegen' | 'replay' | 'mock' | 'hmac'>('inspector');
  
  // Diff state
  const [baselineJson, setBaselineJson] = useState<string>(
    JSON.stringify({ id: 'evt_01', amount: 4900, currency: 'usd', customer_id: 'cus_99' }, null, 2)
  );
  const [incomingJson, setIncomingJson] = useState<string>(
    JSON.stringify({ id: 'evt_02', amount: '4900', currency: 'usd', customer: { id: 'cus_99' } }, null, 2)
  );
  const [diffResults, setDiffResults] = useState<any>(null);
  const [isDiffing, setIsDiffing] = useState(false);

  // Codegen state
  const [codegenLang, setCodegenLang] = useState<'ts' | 'zod' | 'pydantic'>('ts');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  
  // Replay state
  const [replayUrl, setReplayUrl] = useState<string>('http://localhost:3000/api/webhooks/stripe');
  const [confirmRemote, setConfirmRemote] = useState<boolean>(false);
  const [replayResult, setReplayResult] = useState<any>(null);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);

  // HMAC state
  const [hmacSecret, setHmacSecret] = useState<string>('whsec_test_secret_key_123');
  const [hmacFormat, setHmacFormat] = useState<string>('stripe');
  const [hmacSignature, setHmacSignature] = useState<string>('t=1787300000,v1=5d41402abc4b2a76b9719d911017c592');
  const [hmacResult, setHmacResult] = useState<any>(null);

  // Mock server state
  const [mockScript, setMockScript] = useState<string>('');

  // Initial fetch of traps
  useEffect(() => {
    fetch('/api/audit/traps')
      .then((res) => res.json())
      .then((data) => {
        if (data.traps && data.traps.length > 0) {
          setTraps(data.traps);
          setActiveTrap(data.traps[0]);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch events when activeTrap changes
  useEffect(() => {
    if (!activeTrap) return;
    fetch(`/api/audit/events?trapId=${activeTrap.trapId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setEvents(data.events);
          if (data.events.length > 0) setSelectedEvent(data.events[0]);
        }
      })
      .catch(() => {});
  }, [activeTrap]);

  // Run Diff
  const runDiff = async () => {
    setIsDiffing(true);
    try {
      const bObj = JSON.parse(baselineJson);
      const iObj = JSON.parse(incomingJson);
      const res = await fetch('/api/audit/diff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseline: bObj, incoming: iObj })
      });
      const data = await res.json();
      setDiffResults(data);
    } catch (err: any) {
      setDiffResults({ error: 'JSON Parse Error: ' + err.message });
    } finally {
      setIsDiffing(false);
    }
  };

  // Run Codegen
  const runCodegen = async (lang: 'ts' | 'zod' | 'pydantic') => {
    setCodegenLang(lang);
    try {
      const payload = selectedEvent?.bodyJson || JSON.parse(incomingJson);
      const res = await fetch('/api/audit/codegen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload, language: lang, modelName: 'StripePaymentEvent' })
      });
      const data = await res.json();
      setGeneratedCode(data.code || '');
    } catch (err) {}
  };

  // Run Replay
  const runReplay = async () => {
    setIsReplaying(true);
    try {
      const res = await fetch('/api/audit/replay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: replayUrl,
          method: 'POST',
          headers: selectedEvent?.headers || { 'Content-Type': 'application/json' },
          body: selectedEvent?.rawBody || incomingJson,
          confirmRemote
        })
      });
      const data = await res.json();
      setReplayResult(data);
    } catch (err: any) {
      setReplayResult({ success: false, error: err.message });
    } finally {
      setIsReplaying(false);
    }
  };

  // Run HMAC Verification
  const runHmacVerify = async () => {
    try {
      const res = await fetch('/api/audit/hmac', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawPayload: selectedEvent?.rawBody || incomingJson,
          secret: hmacSecret,
          signature: hmacSignature,
          format: hmacFormat
        })
      });
      const data = await res.json();
      setHmacResult(data);
    } catch (err: any) {
      setHmacResult({ error: err.message });
    }
  };

  // Generate Mock Script
  const generateMockScript = async () => {
    try {
      const routes = {
        'POST /api/webhooks/stripe': {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: selectedEvent?.bodyJson || JSON.parse(incomingJson)
        }
      };
      const res = await fetch('/api/audit/mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routes, port: 4000 })
      });
      const data = await res.json();
      setMockScript(data.script || '');
    } catch (err) {}
  };

  const isLocalhostTarget =
    replayUrl.startsWith('http://localhost') ||
    replayUrl.startsWith('http://127.0.0.1') ||
    replayUrl.startsWith('http://[::1]');

  return (
    <div className="pt-28 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface/90 p-5 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">AUDIT-OS-01</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                LOCAL-FIRST WORKSTATION ACTIVE
              </span>
            </div>
            <h1 className="text-xl font-bold font-heading text-white">Visual API Contract & Webhook QA Workstation</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/products/audit-os-01"
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono border border-white/10 transition-colors"
          >
            ← System Specs
          </Link>
          <button
            onClick={() => {
              const name = prompt('Enter Webhook Trap Name:', 'Shopify Orders Trap');
              if (name) {
                fetch('/api/audit/traps', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name })
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.trap) {
                      setTraps([data.trap, ...traps]);
                      setActiveTrap(data.trap);
                    }
                  });
              }
            }}
            className="btn-primary px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider"
          >
            + New Trap
          </button>
        </div>
      </div>

      {/* Trap Selector & Public Endpoint Banner */}
      {activeTrap && (
        <div className="bg-surface/60 p-4 rounded-2xl border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400">ACTIVE TRAP:</span>
            <span className="text-white font-bold">{activeTrap.name}</span>
            <span className="text-gray-600">({activeTrap.trapId})</span>
          </div>

          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 max-w-xl truncate">
            <span className="text-gray-400 shrink-0">PUBLIC TRAP URL:</span>
            <span className="text-cyan-300 truncate select-all">{activeTrap.publicUrl}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(activeTrap.publicUrl);
                alert('Copied Public Webhook Trap URL to Clipboard!');
              }}
              className="text-cyan-400 hover:text-cyan-300 text-[11px] uppercase font-bold shrink-0 ml-2"
            >
              Copy URL
            </button>
          </div>
        </div>
      )}

      {/* Main Workstation 3-Column IDE Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Event Stream Timeline (3 Cols) */}
        <div className="lg:col-span-3 glass-panel p-4 rounded-2xl border border-white/10 space-y-3 bg-surface/80">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-mono uppercase text-gray-400 font-bold">Captured Events</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono">
              {events.length} Recorded
            </span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {events.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-gray-500 space-y-2">
                <span className="text-2xl block">📡</span>
                <span>Listening for incoming webhooks... Send a test payload to your public trap URL.</span>
              </div>
            ) : (
              events.map((evt) => (
                <button
                  key={evt.eventId}
                  onClick={() => {
                    setSelectedEvent(evt);
                    setIncomingJson(evt.rawBody || JSON.stringify(evt.bodyJson, null, 2));
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-mono space-y-1 block ${
                    selectedEvent?.eventId === evt.eventId
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-lg'
                      : 'bg-surface/50 border-white/5 text-gray-400 hover:text-gray-200 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400">{evt.httpMethod}</span>
                    <span className="text-[10px] text-gray-500">
                      {new Date(evt.receivedAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-[11px] truncate text-gray-300">
                    {evt.bodyJson?.id || evt.bodyJson?.type || evt.eventId}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* CENTER & RIGHT COLUMN: Inspection, Diff, Codegen, Replay (9 Cols) */}
        <div className="lg:col-span-9 space-y-4">
          {/* Action Tabs Bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
            {[
              { id: 'inspector', label: '🔬 01 Inspector' },
              { id: 'diff', label: '🧬 02 AST Schema Diff' },
              { id: 'codegen', label: '💻 03 Code Generator' },
              { id: 'replay', label: '🔁 04 Replay Studio' },
              { id: 'mock', label: '🚀 05 Mock Server' },
              { id: 'hmac', label: '🛡️ 06 HMAC Sandbox' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id === 'diff') runDiff();
                  if (tab.id === 'codegen') runCodegen(codegenLang);
                  if (tab.id === 'mock') generateMockScript();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'glass-panel text-gray-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: INSPECTOR */}
          {activeTab === 'inspector' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 bg-surface/70">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono uppercase text-gray-400 font-bold">
                  Raw Payload & Header Inspector
                </span>
                {selectedEvent && (
                  <span className="text-xs font-mono text-cyan-400">
                    Event ID: {selectedEvent.eventId}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-gray-400 font-bold block">
                    HTTP Request Headers
                  </span>
                  <div className="bg-black/50 p-4 rounded-xl border border-white/5 max-h-[400px] overflow-y-auto font-mono text-xs text-gray-300 space-y-1">
                    {selectedEvent ? (
                      Object.entries(selectedEvent.headers).map(([k, v]) => (
                        <div key={k} className="flex gap-2">
                          <span className="text-cyan-400 font-bold">{k}:</span>
                          <span className="text-gray-300 break-all">{v}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">No event selected.</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-gray-400 font-bold block">
                    Formatted JSON Body
                  </span>
                  <pre className="bg-black/50 p-4 rounded-xl border border-white/5 max-h-[400px] overflow-y-auto font-mono text-xs text-emerald-300">
                    {selectedEvent
                      ? JSON.stringify(selectedEvent.bodyJson || selectedEvent.rawBody, null, 2)
                      : 'No payload data.'}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AST SCHEMA DIFF */}
          {activeTab === 'diff' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 bg-surface/70">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold font-mono text-white">Deterministic AST Schema Mutation Comparator</h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Compares Baseline Schema vs Incoming Payload. Highlights Breaking Mutations.
                  </p>
                </div>
                <button
                  onClick={runDiff}
                  disabled={isDiffing}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold"
                >
                  {isDiffing ? 'Analyzing...' : 'Re-Run Diff'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-gray-400 font-bold">Baseline Contract Schema (JSON):</span>
                  <textarea
                    rows={8}
                    value={baselineJson}
                    onChange={(e) => setBaselineJson(e.target.value)}
                    className="w-full bg-black/50 p-3 rounded-xl border border-white/10 font-mono text-xs text-cyan-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-gray-400 font-bold">Incoming Webhook Payload (JSON):</span>
                  <textarea
                    rows={8}
                    value={incomingJson}
                    onChange={(e) => setIncomingJson(e.target.value)}
                    className="w-full bg-black/50 p-3 rounded-xl border border-white/10 font-mono text-xs text-emerald-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Visual Diff Glow Results */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase text-gray-400 font-bold block">
                  Observed Structural Mutations
                </span>
                {diffResults ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className={`px-2.5 py-1 rounded font-bold ${
                        diffResults.hasBreakingChanges
                          ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                          : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                      }`}>
                        {diffResults.hasBreakingChanges ? '🔴 BREAKING MUTATIONS DETECTED' : '🟢 100% CONTRACT COMPLIANT'}
                      </span>
                      <span className="text-gray-400">Total Mutations: {diffResults.totalMutations}</span>
                    </div>

                    <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                      {diffResults.diffs && diffResults.diffs.length > 0 ? (
                        diffResults.diffs.map((d: any, idx: number) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border font-mono text-xs flex items-start gap-3 ${
                              d.severity === 'BREAKING'
                                ? 'bg-red-500/10 border-red-500/30 text-red-300'
                                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            }`}
                          >
                            <span className="font-bold shrink-0">{d.severity === 'BREAKING' ? '❌' : '✓'}</span>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{d.path}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 font-bold uppercase">{d.type}</span>
                              </div>
                              <p className="text-[11px] opacity-90">{d.message}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                          Zero structural mutations. Payload conforms perfectly to baseline schema.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="text-xs font-mono text-gray-500">Run diff to inspect mutations.</span>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CODE GENERATOR */}
          {activeTab === 'codegen' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 bg-surface/70">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono uppercase text-gray-400 font-bold">
                  Deterministic Code & Validator Generator
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => runCodegen('ts')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                      codegenLang === 'ts' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-gray-300'
                    }`}
                  >
                    TypeScript
                  </button>
                  <button
                    onClick={() => runCodegen('zod')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                      codegenLang === 'zod' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-gray-300'
                    }`}
                  >
                    Zod Schema
                  </button>
                  <button
                    onClick={() => runCodegen('pydantic')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                      codegenLang === 'pydantic' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-gray-300'
                    }`}
                  >
                    Python Pydantic
                  </button>
                </div>
              </div>

              <div className="relative">
                <pre className="bg-black/60 p-5 rounded-xl border border-white/10 max-h-[450px] overflow-y-auto font-mono text-xs text-cyan-300">
                  {generatedCode || '// Click a language tab to generate types.'}
                </pre>
                {generatedCode && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      alert('Code Copied to Clipboard!');
                    }}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold"
                  >
                    Copy Code
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: REPLAY STUDIO */}
          {activeTab === 'replay' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 bg-surface/70">
              <div className="space-y-1 border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold font-mono text-white">Parameterized HTTP Replay Studio</h3>
                <p className="text-[11px] text-gray-400 font-mono">
                  Re-dispatches captured payloads to local or staging endpoints to verify handler logic.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-gray-400 font-bold">Target Destination URL:</span>
                  <input
                    type="text"
                    value={replayUrl}
                    onChange={(e) => setReplayUrl(e.target.value)}
                    className="w-full bg-black/50 px-4 py-2.5 rounded-xl border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {!isLocalhostTarget && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs font-mono text-amber-300">
                    <div className="flex items-center gap-2 font-bold">
                      <span>⚠️</span>
                      <span>NON-LOCALHOST DESTINATION DETECTED</span>
                    </div>
                    <p className="text-[11px] text-amber-200/80">
                      Replaying to external or staging URLs may trigger real transactions. Explicit confirmation required.
                    </p>
                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmRemote}
                        onChange={(e) => setConfirmRemote(e.target.checked)}
                        className="rounded border-amber-500/40 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="font-bold text-white">I confirm that replaying to this remote endpoint is safe.</span>
                    </label>
                  </div>
                )}

                <button
                  onClick={runReplay}
                  disabled={isReplaying || (!isLocalhostTarget && !confirmRemote)}
                  className="btn-primary px-6 py-3 text-xs font-bold font-mono uppercase tracking-wider disabled:opacity-50"
                >
                  {isReplaying ? 'Replaying...' : '🚀 Replay Payload to Target'}
                </button>

                {replayResult && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono uppercase text-gray-400 font-bold block">
                      Target Execution Result
                    </span>
                    <pre className={`p-4 rounded-xl border font-mono text-xs max-h-[300px] overflow-y-auto ${
                      replayResult.success && replayResult.statusCode >= 200 && replayResult.statusCode < 300
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-red-500/10 border-red-500/30 text-red-300'
                    }`}>
                      {JSON.stringify(replayResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: MOCK SERVER */}
          {activeTab === 'mock' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 bg-surface/70">
              <div className="space-y-1 border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold font-mono text-white">Zero-Dependency Standalone Mock Server Exporter</h3>
                <p className="text-[11px] text-gray-400 font-mono">
                  Compiles a standalone, single-file Node.js mock API server script from captured payloads.
                </p>
              </div>

              <div className="relative">
                <pre className="bg-black/60 p-5 rounded-xl border border-white/10 max-h-[450px] overflow-y-auto font-mono text-xs text-cyan-300">
                  {mockScript || '// Generating mock script...'}
                </pre>
                {mockScript && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(mockScript);
                      alert('Mock Script Copied to Clipboard!');
                    }}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold"
                  >
                    Copy Script
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: HMAC SANDBOX */}
          {activeTab === 'hmac' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 bg-surface/70">
              <div className="space-y-1 border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold font-mono text-white">HMAC Webhook Signature Verification Sandbox</h3>
                <p className="text-[11px] text-gray-400 font-mono">
                  Test and verify HMAC signatures offline without deploying to production.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-gray-400 font-bold">Webhook Secret:</span>
                  <input
                    type="text"
                    value={hmacSecret}
                    onChange={(e) => setHmacSecret(e.target.value)}
                    className="w-full bg-black/50 px-3 py-2 rounded-xl border border-white/10 font-mono text-xs text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-gray-400 font-bold">Format:</span>
                  <select
                    value={hmacFormat}
                    onChange={(e) => setHmacFormat(e.target.value)}
                    className="w-full bg-black/50 px-3 py-2 rounded-xl border border-white/10 font-mono text-xs text-white"
                  >
                    <option value="stripe">Stripe (t=..., v1=...)</option>
                    <option value="shopify">Shopify (Base64 SHA256)</option>
                    <option value="github">GitHub (sha256=...)</option>
                    <option value="hex">Standard Hex (HMAC-SHA256)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-mono text-gray-400 font-bold">Received Signature Header:</span>
                <input
                  type="text"
                  value={hmacSignature}
                  onChange={(e) => setHmacSignature(e.target.value)}
                  className="w-full bg-black/50 px-3 py-2 rounded-xl border border-white/10 font-mono text-xs text-white"
                />
              </div>

              <button
                onClick={runHmacVerify}
                className="btn-primary px-5 py-2.5 text-xs font-bold font-mono uppercase tracking-wider"
              >
                Verify Signature
              </button>

              {hmacResult && (
                <div className="space-y-2 pt-2">
                  <pre className={`p-4 rounded-xl border font-mono text-xs ${
                    hmacResult.isValid
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}>
                    {JSON.stringify(hmacResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
