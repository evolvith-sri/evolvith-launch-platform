'use client';

import { useState } from 'react';

interface GateSpec {
  code: string;
  name: string;
  focus: string;
  status: string;
}

const QUALITY_GATES: GateSpec[] = [
  { code: 'QG0', name: 'Genome Inheritance', focus: 'Validates 4-layer DNA structure adherence', status: 'PASSED' },
  { code: 'QG1', name: 'Business RACI Audit', focus: 'Verifies taxonomy & role accountability', status: 'PASSED' },
  { code: 'QG2', name: 'AST Schema Validation', focus: 'Audits syntax & workflow schema integrity', status: 'PASSED' },
  { code: 'QG3', name: 'Customer Onboarding Quad', focus: 'Verifies 48h installation playbooks', status: 'PASSED' },
  { code: 'QG4', name: 'Factory Packaging Scan', focus: 'Audits automated build & config binding', status: 'PASSED' },
  { code: 'QG5', name: 'Security Boundary Scan', focus: 'Injects CSP headers & audits access boundaries', status: 'PASSED' },
  { code: 'QG6', name: 'Release Candidate Graduation', focus: 'Final production release candidate verification', status: 'GRADUATED' },
];

export function TrustLayer() {
  const [activeGateCode, setActiveGateCode] = useState<string>('QG4');
  const activeGate = QUALITY_GATES.find((g) => g.code === activeGateCode) || QUALITY_GATES[4];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12" aria-labelledby="trust-heading">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-8 bg-surface/70">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              Evolvith Internal Architecture Governance
            </span>
            <h2 id="trust-heading" className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-2">
              Built on Uncompromising Quality Governance
            </h2>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            Zero Unsubstantiated Claims • 100% Quality Gate Certified Architecture
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 bg-surface/60 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-xs font-mono">
              QG
            </div>
            <h4 className="font-bold text-white text-base">Quality Gate Certification (QG0-QG6)</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every Evolvith Operating System passes 7 internal quality gates auditing AST syntax, RACI clarity, security headers, and deployment SLAs before graduation.
            </p>
          </div>

          <div className="space-y-3 bg-surface/60 p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-xs font-mono">
              DNA
            </div>
            <h4 className="font-bold text-white text-base">Master Genome Architecture</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Standardized across 16 genetic subsystems (G01 Business Strategy to G16 Release Graduation) to guarantee zero monolithic technical debt.
            </p>
          </div>

          <div className="space-y-3 bg-surface/60 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-xs font-mono">
              EDR
            </div>
            <h4 className="font-bold text-white text-base">Executive Decision Registry (EDR)</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Governed under Layer 0 Executive Intelligence to log institutional decisions, track operational changes, and enforce constitutional rules.
            </p>
          </div>
        </div>

        {/* Interactive Quality Gate Matrix Bar */}
        <div className="bg-surface/90 p-6 rounded-2xl border border-cyan-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
              Quality Gate Verification Register (QG0 → QG6)
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              STATUS: {activeGate.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {QUALITY_GATES.map((gate) => {
              const isSelected = gate.code === activeGateCode;
              return (
                <button
                  key={gate.code}
                  onClick={() => setActiveGateCode(gate.code)}
                  className={`p-3 rounded-xl text-left font-mono transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                      : 'bg-surface/50 border-white/5 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300">{gate.code}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 truncate">{gate.name}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-2 text-xs text-gray-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono">
            <div>
              <span className="text-cyan-400 font-bold">{activeGate.code} Focus:</span>{' '}
              <span className="text-gray-300">{activeGate.focus}</span>
            </div>
            <span className="text-[10px] text-gray-500 uppercase">Evolvith Internal Audit Standard</span>
          </div>
        </div>
      </div>
    </section>
  );
}

