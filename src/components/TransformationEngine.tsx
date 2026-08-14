'use client';

import { useState } from 'react';

interface ComparisonRow {
  dimension: string;
  oldWay: string;
  evolvithWay: string;
  impact: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: 'Delivery Vehicle',
    oldWay: 'High-cost management consulting engagements producing static recommendations and slide decks.',
    evolvithWay: '$149-$349 Codified enterprise operating systems deployed as software.',
    impact: '100% Executable Software',
  },
  {
    dimension: 'Architecture & Scale',
    oldWay: 'Dozens of fragmented SaaS subscriptions creating operational entropy.',
    evolvithWay: 'Unified 4-Layer Master Genome connecting sales, finance, & operations.',
    impact: 'Zero Tool Entropy',
  },
  {
    dimension: 'Commercial Licensing',
    oldWay: 'Spiraling monthly per-user seat fees and lock-in contracts.',
    evolvithWay: 'One-time payment perpetual commercial license with unlimited seats.',
    impact: 'Predictable TCO',
  },
  {
    dimension: 'Quality Governance',
    oldWay: 'Manual paper policies ignored by operational teams.',
    evolvithWay: 'Automated Quality Gates QG0-QG6 auditing code and SOP compliance.',
    impact: 'Zero Quality Defects',
  },
  {
    dimension: 'Speed to Value',
    oldWay: '6-12 month expensive consulting engagements.',
    evolvithWay: '48-Hour rapid deployment runbook protocol.',
    impact: 'Sub-48h Time to Market',
  },
];

export function TransformationEngine() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeRow = COMPARISON_ROWS[selectedIdx];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12" aria-labelledby="transformation-heading">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden space-y-10">
        {/* Glow backdrop */}
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            The Transformation Thesis
          </span>
          <h2 id="transformation-heading" className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Why We Manufacture Software Instead of Management Consulting
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Traditional management consulting sells static recommendations while operational chaos resumes. We believe enterprise transformation must be codified directly into executable software.
          </p>
        </div>

        {/* Interactive Matrix Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Dimension Selector List */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block font-bold px-1 mb-2">
              Select Transformation Dimension
            </span>
            {COMPARISON_ROWS.map((row, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full p-4 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg'
                      : 'bg-surface/50 border-white/5 text-gray-400 hover:text-gray-200 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{row.dimension}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{row.impact}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Comparison Detail Showcase */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="bg-surface/80 p-6 sm:p-8 rounded-2xl border border-red-500/30 space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                  The Old Way
                </span>
                <span className="w-2 h-2 rounded-full bg-red-400" />
              </div>
              <h4 className="text-base font-bold text-white">Management Consulting & SaaS Sprawl</h4>
              <p className="text-xs text-gray-300 leading-relaxed min-h-[70px]">
                {activeRow.oldWay}
              </p>
              <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-red-400/80">
                ✕ Operational Friction & Human Error
              </div>
            </div>

            {/* The Evolvith Way */}
            <div className="bg-surface/90 p-6 sm:p-8 rounded-2xl border border-cyan-500/40 space-y-4 relative shadow-xl shadow-cyan-500/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  The Evolvith Way
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <h4 className="text-base font-bold text-white">Codified Enterprise Operating Systems</h4>
              <p className="text-xs text-gray-200 leading-relaxed font-medium min-h-[70px]">
                {activeRow.evolvithWay}
              </p>
              <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-cyan-400 flex items-center justify-between">
                <span>✓ {activeRow.impact}</span>
                <span className="text-emerald-400">48h SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
