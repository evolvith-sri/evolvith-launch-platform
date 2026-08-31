'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { logCommercialIntent } from '@/lib/telemetry';

interface SystemNode {
  id: string;
  name: string;
  code: string;
  tier: string;
  category: string;
  price: string;
  status: string;
  outcome: string;
}

const SYSTEM_NODES: SystemNode[] = [
  { id: 'audit-os-01', name: 'Visual API Contract & Webhook QA Workstation', code: 'AUDIT-OS-01', tier: 'Wave 1', category: 'Developer Tools', price: '$49', status: 'READY', outcome: 'Deterministic AST Schema Diffing' },
  { id: 'pipe-os-01', name: 'Local B2B Lead Waterfall & Prospect Enrichment Engine', code: 'PIPE-OS-01', tier: 'Wave 1', category: 'Lead Generation', price: '$49', status: 'READY', outcome: 'Local MX & BYOK Lead Enrichment' },
  { id: 'seo-audit-os-01', name: 'Programmatic Technical SEO & Broken Link Crawler', code: 'SEO-AUDIT-OS-01', tier: 'Wave 1', category: 'SEO & Analytics', price: '$49', status: 'READY', outcome: 'Local Broken Link & SEO Crawler' },
  { id: 'onboard-os-01', name: 'Client Intake & Digital Asset Handover Workstation', code: 'ONBOARD-OS-01', tier: 'Wave 1', category: 'Agency Workstation', price: '$49', status: 'READY', outcome: 'Zero-Plaintext Asset Handover' },
  { id: 'prompt-qa-os-01', name: 'LLM Prompt Regression Testing & Cost Workbench', code: 'PROMPT-QA-OS-01', tier: 'Wave 1', category: 'Developer Tools', price: '$49', status: 'READY', outcome: 'Automated Prompt CI Quality Gate' },
  { id: 'doc-portal-os-01', name: 'OpenAPI -> Interactive Developer Portal Generator', code: 'DOC-PORTAL-OS-01', tier: 'Wave 1', category: 'Developer Tools', price: '$49', status: 'READY', outcome: 'Interactive OpenAPI Portal Generator' },
  { id: 'rev-os-01', name: 'Autonomous Revenue Operations OS', code: 'REV-OS-01', tier: 'Tier 2A', category: 'Revenue Systems', price: '$249', status: 'READY', outcome: 'Enterprise Pipeline Operations' },
  { id: 'fin-os-01', name: 'Financial Intelligence OS', code: 'FIN-OS-01', tier: 'Tier 2A', category: 'Financial Ops', price: '$349', status: 'READY', outcome: 'Deterministic Financial Intelligence' },
];

export function Hero() {
  const [activeNode, setActiveNode] = useState<string>('audit-os-01');
  const selectedNode = SYSTEM_NODES.find((n) => n.id === activeNode) || SYSTEM_NODES[0];

  useEffect(() => {
    logCommercialIntent({ eventType: 'VISIT_HOMEPAGE' });
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" aria-labelledby="hero-heading">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-indigo-600/15 to-purple-600/10 blur-[140px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Top Status Badge */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-300">CODIFIED AI OPERATING SYSTEMS</span>
            <span className="text-gray-600">•</span>
            <span className="text-cyan-400 font-semibold">PRODUCTION READY</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">FROM $49 ONE-TIME PERPETUAL</span>
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Eliminate Operational Friction & <br className="hidden sm:inline" />
            <span className="text-gradient">Standardize Execution</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed">
            We manufacture codified enterprise operating systems that replace fragmented SaaS sprawl, spreadsheet entropy, and consulting dependency with quality-certified architecture.
          </p>

          {/* Commercial Bridge & Featured Entry OS */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-mono text-cyan-300">
              <span className="text-white font-bold">Featured / Recommended:</span>
              <span><strong>AUDIT-OS-01</strong> ($49), <strong>PIPE-OS-01</strong> ($49), <strong>SEO-AUDIT-OS-01</strong> ($49)</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-mono text-indigo-300">
              <span className="text-white font-bold">Wave 1 Candidates:</span>
              <span><strong>ONBOARD-OS-01</strong> ($49), <strong>PROMPT-QA-OS-01</strong> ($49), <strong>DOC-PORTAL-OS-01</strong> ($49)</span>
            </div>
          </div>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/store"
              onClick={() => logCommercialIntent({ eventType: 'CLICK_STORE_CTA' })}
              className="btn-primary px-8 py-4 text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center justify-center gap-2 font-mono uppercase text-xs tracking-wider"
            >
              <span>Commercial Store ($49+)</span>
              <span className="font-mono text-xs opacity-75">→</span>
            </Link>
            <a
              href="#wave-catalog"
              onClick={() => logCommercialIntent({ eventType: 'VIEW_CATALOG' })}
              className="px-8 py-4 text-base font-semibold text-gray-200 hover:text-white glass-panel rounded-lg w-full sm:w-auto transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 flex items-center justify-center gap-2"
            >
              <span>Explore Architecture Catalog</span>
              <span className="text-cyan-400 font-mono">↓</span>
            </a>
          </div>
        </div>

        {/* Interactive Operating System Topology Dashboard */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
                Live Evolvith Operating System Topology Visualizer
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span>Master Genome Inheritance:</span>
              <span className="text-cyan-400 font-bold">L1-L4 ACTIVE</span>
            </div>
          </div>

          {/* Node Grid Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SYSTEM_NODES.map((node) => {
              const isSelected = node.id === activeNode;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'bg-surface/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{node.code}</span>
                    <span className="text-[9px] font-mono text-gray-400">{node.tier}</span>
                  </div>
                  <p className="text-xs font-bold text-white mt-1.5 truncate">{node.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{node.price} • {node.status}</p>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Bar */}
          <div className="bg-surface/80 p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                  {selectedNode.code} ({selectedNode.tier})
                </span>
                <span className="text-sm font-bold text-white">{selectedNode.name}</span>
              </div>
              <p className="text-xs text-gray-400 font-mono">
                Category: <span className="text-gray-200">{selectedNode.category}</span> • <span className="text-cyan-400">MODELED TARGET:</span>{' '}
                <span className="text-white font-semibold">{selectedNode.outcome}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href={`/products/${selectedNode.id}`}
                onClick={() =>
                  logCommercialIntent({
                    eventType: 'VIEW_PRODUCT_BLUEPRINT',
                    productId: selectedNode.id,
                    systemCode: selectedNode.code,
                  })
                }
                className="btn-primary px-5 py-2.5 text-xs text-center w-full md:w-auto font-mono uppercase tracking-wider"
              >
                Inspect {selectedNode.code} ({selectedNode.price})
              </Link>
            </div>
          </div>
        </div>

        {/* Executive Proof Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">From $49</p>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-mono">Tier-1 Focused Systems</p>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100% QG</p>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-mono">Quality Gate Certified</p>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">Perpetual</p>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-mono">Commercial License</p>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Zero</p>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-mono">Monolithic Lock-In</p>
          </div>
        </div>
      </div>
    </section>
  );
}
