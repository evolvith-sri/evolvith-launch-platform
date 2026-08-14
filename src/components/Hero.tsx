'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SystemNode {
  id: string;
  name: string;
  code: string;
  category: string;
  price: string;
  status: string;
  outcome: string;
  accent: string;
}

const SYSTEM_NODES: SystemNode[] = [
  { id: 'rev-os-01', name: 'Revenue Operations', code: 'REV-OS-01', category: 'Revenue', price: '$249', status: 'READY', outcome: '+38% Deal Velocity', accent: 'cyan' },
  { id: 'fin-os-01', name: 'Financial Intelligence', code: 'FIN-OS-01', category: 'Finance', price: '$349', status: 'READY', outcome: '24h Month-End Close', accent: 'indigo' },
  { id: 'cx-os-01', name: 'Customer Success', code: 'CX-OS-01', category: 'Customer', price: '$199', status: 'READY', outcome: '-45% Net Churn', accent: 'emerald' },
  { id: 'ops-os-02', name: 'Global Supply Chain', code: 'OPS-OS-02', category: 'Operations', price: '$299', status: 'READY', outcome: '52% Bottleneck Speed', accent: 'amber' },
  { id: 'data-os-01', name: 'Analytics & Metrics', code: 'DATA-OS-01', category: 'Data', price: '$179', status: 'READY', outcome: '100% Metric Alignment', accent: 'blue' },
  { id: 'gov-os-01', name: 'Risk & Governance', code: 'GOV-OS-01', category: 'Governance', price: '$149', status: 'READY', outcome: 'Zero Audit Defects', accent: 'purple' },
];

export function Hero() {
  const [activeNode, setActiveNode] = useState<string>('rev-os-01');
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
            <span className="text-cyan-400 font-semibold">WAVE 1 ECOSYSTEM ONLINE</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">6 OPERATING SYSTEMS CERTIFIED</span>
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

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#wave-catalog"
              className="btn-primary px-8 py-4 text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center justify-center gap-2"
            >
              <span>Explore Wave 1 Ecosystem</span>
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
                Live Evolvith Topology Visualizer
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
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">{node.code}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
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
                  {selectedNode.code}
                </span>
                <span className="text-sm font-bold text-white">{selectedNode.name}</span>
              </div>
              <p className="text-xs text-gray-400">
                Category: <span className="text-gray-200">{selectedNode.category} OS</span> • MODELED TARGET — NOT HISTORICAL PERFORMANCE:{' '}
                <span className="text-emerald-400 font-semibold">{selectedNode.outcome}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href={`/products/${selectedNode.id}`}
                className="btn-primary px-5 py-2.5 text-xs text-center w-full md:w-auto"
              >
                Inspect {selectedNode.code} System Blueprint
              </Link>
            </div>
          </div>
        </div>

        {/* Executive Proof Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">48 Hours</p>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-mono">Rapid Deployment SLA</p>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">100% QG</p>
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

