'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, ArrowRight, Play, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

interface WorkstationItem {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  capabilities: string[];
  route: string;
  specRoute: string;
  price: string;
}

const LIVE_WORKSTATIONS: WorkstationItem[] = [
  {
    id: 'pipe-os-01',
    code: 'PIPE-OS-01',
    name: 'Local B2B Lead Waterfall & Prospect Enrichment Engine',
    category: 'Lead Generation',
    description: 'Clean, deduplicate, validate RFC syntax, verify live DNS MX mailservers, and waterfall-enrich prospect lists locally using your own BYOK provider keys with zero platform markups.',
    badge: 'Sales Ops OS',
    capabilities: [
      'Multi-key CSV lead deduplication & casing normalization',
      'RFC 5322 syntax & disposable domain detection',
      'Real-time DNS MX mailserver reachability audit',
      'Direct BYOK provider routing (Apollo, Hunter, Clearbit)'
    ],
    route: '/workstations/pipe-os-01',
    specRoute: '/products/pipe-os-01',
    price: '$49'
  },
  {
    id: 'audit-os-01',
    code: 'AUDIT-OS-01',
    name: 'Visual API Contract & Webhook QA Workstation',
    category: 'Developer Tools',
    description: 'Intercept live webhooks, detect silent upstream schema drift via deterministic AST diffs, and replay test payloads to localhost with zero cloud fees.',
    badge: 'Developer OS',
    capabilities: [
      'Stateless edge webhook trap & local replay harness',
      'Deterministic AST schema extraction & visual diffing',
      'Instant code generation (TypeScript, Zod, Pydantic v2)',
      'Offline HMAC signature verification sandbox'
    ],
    route: '/workstations/audit-os-01',
    specRoute: '/products/audit-os-01',
    price: '$49'
  },
  {
    id: 'seo-audit-os-01',
    code: 'SEO-AUDIT-OS-01',
    name: 'Programmatic Technical SEO & Broken Link Crawler',
    category: 'SEO & Analytics',
    description: 'Crawl websites locally, detect broken links (404), redirect chains, canonical errors, and missing metadata without recurring page limits.',
    badge: 'Technical SEO OS',
    capabilities: [
      'High-speed local headless crawler with zero page limits',
      'Broken link (404) & circular redirect chain detection',
      'OpenGraph, Twitter card & JSON-LD structured data audit',
      'Instant client-ready HTML & CSV audit reports'
    ],
    route: '/workstations/seo-audit-os-01',
    specRoute: '/products/seo-audit-os-01',
    price: '$49'
  },
  {
    id: 'onboard-os-01',
    code: 'ONBOARD-OS-01',
    name: 'Client Intake & Digital Asset Handover Workstation',
    category: 'Agency Workstation',
    description: 'Standardize client intake, automate credential handover with zero-plaintext security, and generate kickoff checklists in minutes.',
    badge: 'Agency Ops OS',
    capabilities: [
      'Interactive client onboarding questionnaire builder',
      'Zero-plaintext credential & secret vault sandbox',
      'Standardized asset collection & brand kit validator',
      'Instant client intake report & kickoff runbook generation'
    ],
    route: '/workstations/onboard-os-01',
    specRoute: '/products/onboard-os-01',
    price: '$49'
  },
  {
    id: 'doc-portal-os-01',
    code: 'DOC-PORTAL-OS-01',
    name: 'OpenAPI to Interactive Developer Portal Generator',
    category: 'Developer Tools',
    description: 'Convert raw OpenAPI/Swagger specs into interactive, client-side API reference documentation portals without recurring hosted documentation subscriptions.',
    badge: 'API Documentation OS',
    capabilities: [
      'Instant OpenAPI 3.0/3.1 JSON and YAML specification parsing',
      'Interactive "Try It Live" API request sandbox with HMAC support',
      'Zero-dependency standalone HTML & CSS export bundle',
      'Code snippet generator in 6 languages (cURL, JS, Python, Go, Rust, Ruby)'
    ],
    route: '/workstations/doc-portal-os-01',
    specRoute: '/products/doc-portal-os-01',
    price: '$49'
  },
  {
    id: 'prompt-qa-os-01',
    code: 'PROMPT-QA-OS-01',
    name: 'LLM Prompt Regression Testing & Cost Workbench',
    category: 'Developer Tools',
    description: 'Run deterministic prompt regression test suites, measure token latency and costs across model versions, and enforce quality gates in CI/CD.',
    badge: 'AI Engineering OS',
    capabilities: [
      'Deterministic prompt test matrix & assertion evaluator',
      'Multi-model cost & latency comparison (OpenAI, Anthropic, Gemini)',
      'Deterministic semantic output similarity & schema validation',
      'Headless CLI test runner for automated CI/CD pipelines'
    ],
    route: '/workstations/prompt-qa-os-01',
    specRoute: '/products/prompt-qa-os-01',
    price: '$49'
  }
];

export default function WorkstationsIndexPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Browser Workstations</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
          Live Operating Workstations
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Test and experience Evolvith enterprise operating systems directly in your browser. All processing executes 100% locally with zero cloud telemetry leaks.
        </p>
      </div>

      {/* Grid of Workstations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LIVE_WORKSTATIONS.map((ws) => (
          <div
            key={ws.id}
            className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all group relative overflow-hidden bg-surface/80"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {ws.code}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                  {ws.name}
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-3">
                  {ws.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                  Core Capabilities
                </span>
                <ul className="space-y-1.5">
                  {ws.capabilities.map((cap, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
              <Link
                href={ws.route}
                className="btn-primary flex-1 py-2.5 text-xs font-mono uppercase font-bold flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch Workstation</span>
              </Link>
              <Link
                href={ws.specRoute}
                className="glass-panel px-3 py-2.5 text-xs font-mono text-gray-300 hover:text-white rounded-lg transition-colors"
                title="View Architectural Specifications"
              >
                Specs
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Info Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center max-w-3xl mx-auto space-y-4 bg-surface/60">
        <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-xs uppercase font-semibold">
          <Cpu className="w-4 h-4" />
          <span>Local-First Runtimes & Standalone CLI Packages</span>
        </div>
        <h3 className="text-xl font-bold text-white font-heading">
          Looking for Terminal & CI/CD Automated Execution?
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Every commercial license includes both the interactive browser workstation and the standalone, inspectable Python/TypeScript CLI harness for headless execution.
        </p>
        <div className="pt-2 flex items-center justify-center gap-4">
          <Link href="/store" className="btn-primary px-6 py-3 text-xs font-mono uppercase font-bold">
            Commercial Store ($49+) →
          </Link>
          <Link href="/docs" className="glass-panel px-6 py-3 text-xs font-mono text-gray-300 hover:text-white rounded-lg">
            Read Installation Runbooks
          </Link>
        </div>
      </div>
    </div>
  );
}
