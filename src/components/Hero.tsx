'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  { id: 'forecast-os-01', name: 'Revenue & Sales Forecasting', code: 'FORECAST-OS-01', tier: 'Tier 1', category: 'Revenue Ops', price: '$99', status: 'SPEC', outcome: '90% Forecast Variance Precision' },
  { id: 'pipe-os-01', name: 'Lead & Pipeline Execution', code: 'PIPE-OS-01', tier: 'Tier 2', category: 'Revenue Ops', price: '$99', status: 'READY', outcome: '35% Less Deal Slippage' },
  { id: 'cash-os-01', name: 'Cash Collection & Receivables', code: 'CASH-OS-01', tier: 'Tier 2', category: 'Financial Ops', price: '$99', status: 'READY', outcome: '40% Faster Cash Recovery' },
  { id: 'onboard-os-01', name: 'Customer Onboarding OS', code: 'ONBOARD-OS-01', tier: 'Tier 2', category: 'Customer Success', price: '$99', status: 'READY', outcome: '50% Faster Time-To-Value' },
  { id: 'rev-os-01', name: 'Autonomous Revenue Ops', code: 'REV-OS-01', tier: 'Tier 2', category: 'Revenue Systems', price: '$249', status: 'READY', outcome: '+38% Deal Velocity' },
  { id: 'fin-os-01', name: 'Financial Intelligence OS', code: 'FIN-OS-01', tier: 'Tier 2', category: 'Financial Ops', price: '$349', status: 'READY', outcome: '24h Month-End Close' },
];

export function Hero() {
  const [activeNode, setActiveNode] = useState<string>('pipe-os-01');
  const selectedNode = SYSTEM_NODES.find((n) => n.id === activeNode) || SYSTEM_NODES[0];

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
            <span className="text-gray-300">EEOS v1.0.0 ACTIVE</span>
            <span className="text-gray-600">•</span>
            <span className="text-cyan-400 font-semibold">COMMERCE ARCHITECTURE READY</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">TIER-1 & TIER-2 OPERATING SYSTEMS</span>
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

          {/* Commercial Bridge */}
          <div className="pt-1">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-mono text-cyan-300">
              <span className="text-white font-bold">Commercial Entry:</span>
              <span>Explore focused operating systems from <strong>$99</strong> one-time perpetual license.</span>
            </div>
          </div>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#wave-catalog"
              className="btn-primary px-8 py-4 text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center justify-center gap-2"
            >
              <span>Explore Operating Systems</span>
              <span className="font-mono text-xs opacity-75">↓</span>
            </a>
            <a
              href="#genome-inspector"
              className="px-8 py-4 text-base font-semibold text-gray-200 hover:text-white glass-panel rounded-lg w-full sm:w-auto transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 flex items-center justify-center gap-2"
            >
              <span>Inspect Master Genome</span>
              <span className="text-cyan-400 font-mono">→</span>
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
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">From $99</p>
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
