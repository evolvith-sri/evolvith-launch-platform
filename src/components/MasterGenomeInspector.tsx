'use client';

import { useState } from 'react';

interface GenomeLayer {
  id: string;
  code: string;
  name: string;
  tagline: string;
  color: string;
  accentBorder: string;
  badgeBg: string;
  subsystems: string[];
  description: string;
  deliverableSpec: string;
}

const GENOME_LAYERS: GenomeLayer[] = [
  {
    id: 'l1',
    code: 'L1',
    name: 'Business DNA',
    tagline: 'Strategy, Operational Taxonomy & Economic Models',
    color: 'text-cyan-400',
    accentBorder: 'border-cyan-500/40',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    subsystems: ['G01 Business Strategy & Taxonomy', 'G02 RACI Execution Framework', 'G03 Economic & Financial Model', 'G04 Compliance & Governance Protocols'],
    description: 'Defines institutional strategy, business unit RACI matrices, economic unit boundaries, and regulatory compliance targets prior to code execution.',
    deliverableSpec: 'Codified Business Architecture Schema (.yaml & .json AST specs)',
  },
  {
    id: 'l2',
    code: 'L2',
    name: 'Product DNA',
    tagline: 'Feature Blueprints, AST Schemas & UI Components',
    color: 'text-indigo-400',
    accentBorder: 'border-indigo-500/40',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    subsystems: ['G05 Feature Blueprints & Workflows', 'G06 AST Schema Registry', 'G07 UI Components & Design Tokens', 'G08 Telemetry & Telemetric Pipelines'],
    description: 'Translates business specifications into executable AST schemas, UI design tokens, component hierarchies, and automated telemetry collectors.',
    deliverableSpec: 'Executable Next.js / TypeScript Core Modules & AST AST Blueprints',
  },
  {
    id: 'l3',
    code: 'L3',
    name: 'Customer DNA',
    tagline: 'Onboarding Quad, SLA Framework & Support Models',
    color: 'text-emerald-400',
    accentBorder: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    subsystems: ['G09 48h Rapid Onboarding Runbooks', 'G10 Executive SLA Framework', 'G11 Documentation Quad (Tech/Ops/Exec)', 'G12 Customer Success Metrics'],
    description: 'Standardizes post-purchase installation, customer onboarding journeys, executive SLAs, and multi-tier technical playbooks.',
    deliverableSpec: 'Complete 48-Hour Rapid Installation Runbook & Documentation Quad',
  },
  {
    id: 'l4',
    code: 'L4',
    name: 'Factory DNA',
    tagline: 'Quality Gates QG0-QG6 & Automated Packaging',
    color: 'text-amber-400',
    accentBorder: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    subsystems: ['G13 Quality Gates QG0-QG6 Audit', 'G14 Automated Packaging Engine', 'G15 Security Header & Vulnerability Scan', 'G16 Release Candidate Graduation'],
    description: 'Enforces strict quality governance auditing code syntax, security boundaries, and performance benchmarks before commercial release.',
    deliverableSpec: '100% Quality Gate Certified Commercial Release Package',
  },
];

export function MasterGenomeInspector() {
  const [activeLayerId, setActiveLayerId] = useState<string>('l1');
  const activeLayer = GENOME_LAYERS.find((l) => l.id === activeLayerId) || GENOME_LAYERS[0];

  return (
    <section id="genome-inspector" className="max-w-7xl mx-auto px-6 py-12" aria-labelledby="genome-heading">
      <div className="bg-surface/50 border border-white/10 rounded-3xl p-8 sm:p-12 space-y-10 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            The Evolvith Manufacturing Engine
          </span>
          <h2 id="genome-heading" className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            The 4-Layer Master Genome Architecture
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Every Evolvith Commercial Operating System inherits directly from four fundamental genetic layers. Click a layer below to inspect its operational subsystems and governance controls.
          </p>
        </div>

        {/* Connected Layer Pipeline Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {GENOME_LAYERS.map((layer, idx) => {
            const isActive = layer.id === activeLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 relative border ${
                  isActive
                    ? `glass-panel ${layer.accentBorder} bg-surface/90 shadow-xl ring-1 ring-cyan-500/50`
                    : 'glass-panel border-white/10 hover:border-white/20 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${layer.badgeBg}`}>
                    {layer.code}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Layer 0{idx + 1}</span>
                </div>
                <h4 className="font-bold text-white text-lg">{layer.name}</h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{layer.tagline}</p>

                {isActive && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                    <span>INSPECTING</span>
                    <span>→</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Layer Deep-Inspection Detail Panel */}
        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 space-y-6 bg-surface/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-md text-xs font-mono font-bold border ${activeLayer.badgeBg}`}>
                GENOME LAYER {activeLayer.code}
              </span>
              <h3 className="text-xl font-bold text-white font-heading">{activeLayer.name} Subsystem Blueprint</h3>
            </div>
            <div className="text-xs font-mono text-gray-400">
              Inheritance: <span className="text-emerald-400 font-semibold">100% Certified Across Wave 1</span>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed max-w-4xl">
            {activeLayer.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-surface/60 p-5 rounded-xl border border-white/5 space-y-3">
              <h5 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Genetic Subsystems Encapsulated
              </h5>
              <ul className="space-y-2 text-xs text-gray-300">
                {activeLayer.subsystems.map((sub, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface/60 p-5 rounded-xl border border-white/5 space-y-3">
              <h5 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                Deliverable Architecture Specification
              </h5>
              <p className="text-xs text-gray-300 leading-relaxed font-mono">
                {activeLayer.deliverableSpec}
              </p>
              <div className="pt-2 text-[11px] text-gray-400">
                Guarantees zero monolithic tech debt and seamless multi-decade extensibility.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
