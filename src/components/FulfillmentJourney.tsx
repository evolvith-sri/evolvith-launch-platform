'use client';

import { COMMERCE_CONFIG } from '@/lib/products';

export function FulfillmentJourney() {
  const steps = [
    {
      number: '01',
      action: 'CHOOSE',
      title: 'Select Operating System',
      description: 'Choose from focused operating systems ($49–$99 one-time perpetual license) or comprehensive enterprise operating systems ($149–$349).',
      badge: 'Transparent Pricing',
      details: ['Clear system blueprint inspection', 'Unlimited internal user seats', 'Zero recurring SaaS seat taxes'],
    },
    {
      number: '02',
      action: 'RECEIVE',
      title: 'Digital Product Package',
      description: 'Receive your complete digital software release archive (.zip) containing full inspectable local Python runtime, AST schemas, and SOP playbooks directly.',
      badge: 'Digital Release (.zip)',
      details: ['Digital product package (.zip)', 'Commercial license grant', 'Product & installation documentation'],
      notice: COMMERCE_CONFIG.preLaunchMessage,
    },
    {
      number: '03',
      action: 'DEPLOY',
      title: '48-Hour Rapid Installation',
      description: 'Execute the automated quickstart installer (python install.py) to bind schemas, configure webhooks, and launch your operational dashboard.',
      badge: 'Implementation Target SLA',
      details: ['Self-hosted / Private cloud deployment', '100% Customer data ownership', 'Guided 48-hour rapid runbook'],
      notice: '48h timeline is an Implementation Target SLA requiring customer API credential readiness.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12" aria-labelledby="fulfillment-heading">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden space-y-10 bg-surface/70">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="max-w-3xl space-y-2">
            <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              Commercial Fulfillment Protocol
            </span>
            <h2 id="fulfillment-heading" className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1">
              How Commercial Delivery Works
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              From product selection to private cloud deployment in three straightforward phases.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/30 shrink-0">
            One-Time Perpetual Model
          </span>
        </div>

        {/* 3-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface/80 p-7 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono">
                  <span className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm flex items-center justify-center">
                    {step.number}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                    {step.action}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-[11px] text-gray-300">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <span className="text-cyan-400">✓</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {step.notice && (
                <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 text-[10px] font-mono text-cyan-300 leading-relaxed flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
                  <span>{step.notice}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
