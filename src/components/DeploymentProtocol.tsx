'use client';

import { useState } from 'react';

interface DeploymentStep {
  hours: string;
  phase: string;
  title: string;
  deliverables: string[];
  status: string;
}

const DEPLOYMENT_STEPS: DeploymentStep[] = [
  {
    hours: '00-12 HR',
    phase: 'Phase A',
    title: 'Repository Provisioning & Genome Injection',
    deliverables: ['Modular config set binding', 'Master Genome inheritance setup', 'AST schema registry load'],
    status: 'COMPLETE IN 12H',
  },
  {
    hours: '12-24 HR',
    phase: 'Phase B',
    title: 'Data Telemetry & Webhook Integration',
    deliverables: ['REST API bridge config', 'CRM / ERP webhook hooks', 'Vector telemetry pipeline test'],
    status: 'COMPLETE IN 24H',
  },
  {
    hours: '24-36 HR',
    phase: 'Phase C',
    title: 'RACI Governance & SOP Customization',
    deliverables: ['Business unit RACI matrix', 'Executive dashboard rules', 'SOP manual alignment'],
    status: 'COMPLETE IN 36H',
  },
  {
    hours: '36-48 HR',
    phase: 'Phase D',
    title: 'QG4 Certification & Executive Briefing',
    deliverables: ['Quality Gate QG4 audit pass', 'Executive board pack release', 'Operational live activation'],
    status: 'DEPLOYED AT 48H',
  },
];

export function DeploymentProtocol() {
  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(0);
  const activeStep = DEPLOYMENT_STEPS[selectedStepIdx];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12" aria-labelledby="deployment-heading">
      <div className="bg-surface/60 border border-white/10 p-8 sm:p-10 rounded-3xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono uppercase tracking-wider">
              CIO & CTO Integration Protocol
            </span>
            <h2 id="deployment-heading" className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-2">
              48-Hour Rapid Deployment & Enterprise SLA Framework
            </h2>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            Zero Monolithic Lock-In • REST / Webhook Integration SLA
          </p>
        </div>

        {/* Step-by-step Runbook Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEPLOYMENT_STEPS.map((step, idx) => {
            const isSelected = idx === selectedStepIdx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedStepIdx(idx)}
                className={`p-6 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'glass-panel border-cyan-400 bg-surface/90 shadow-xl ring-1 ring-cyan-500/50'
                    : 'glass-panel border-white/5 opacity-80 hover:opacity-100 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between font-mono mb-3">
                  <span className="text-xs font-bold text-cyan-400">{step.hours}</span>
                  <span className="text-[10px] text-gray-500 uppercase">{step.phase}</span>
                </div>
                <h4 className="font-bold text-white text-sm line-clamp-2">{step.title}</h4>
                <div className="mt-4 pt-2 border-t border-white/10 text-[10px] font-mono text-emerald-400">
                  {step.status}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Box */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-surface/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                {activeStep.hours}
              </span>
              <h4 className="text-base font-bold text-white">{activeStep.title}</h4>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {activeStep.deliverables.map((item, dIdx) => (
                <span key={dIdx} className="text-xs text-gray-300 font-mono bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 text-right font-mono text-xs text-gray-400 border-l border-white/10 pl-6 hidden md:block">
            <span>RUNBOOK STATUS</span>
            <p className="text-cyan-400 font-bold text-sm mt-0.5">100% AUTOMATED</p>
          </div>
        </div>
      </div>
    </section>
  );
}
