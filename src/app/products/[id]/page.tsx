'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { WAVE_1_PRODUCTS } from '@/lib/products';
import { CheckoutModal } from '@/components/CheckoutModal';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = WAVE_1_PRODUCTS.find((p) => p.id === params.id);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'problems' | 'deliverables' | 'outcomes' | 'deployment' | 'faq'>('blueprint');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!product) {
    notFound();
  }

  const crossSellProducts = WAVE_1_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="pt-32 pb-24 space-y-12">
      {/* Product Hero Header */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-center gap-3">
          <Link href="/products" className="text-xs text-gray-400 hover:text-cyan-400 font-mono transition-colors">
            ← Back to Wave 1 Ecosystem Catalog
          </Link>
          <span className="text-gray-600">•</span>
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            {product.badge}
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-xs text-gray-400 font-mono">v1.0.0-PROD</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                SYSTEM ID: {product.id.toUpperCase()}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight">
                {product.title}
              </h1>
            </div>

            <p className="text-lg text-cyan-400 font-mono font-medium">
              {product.subtitle}
            </p>

            <p className="text-gray-300 text-base leading-relaxed bg-surface/40 p-6 rounded-2xl border border-white/5">
              {product.executiveSummary}
            </p>
          </div>

          {/* Pricing & Commercial Action Card */}
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-6 bg-surface/90 sticky top-28 shadow-2xl">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-mono uppercase text-gray-400 font-semibold">Commercial License</span>
              <div className="text-right">
                <span className="text-4xl font-extrabold text-white font-mono">${product.price}</span>
                <span className="text-xs text-gray-400 block font-mono">One-Time Perpetual</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>100% Quality Gate QG4 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Master Governance Playbook Included</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Unlimited Internal User Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>48-Hour Rapid Deployment SLA</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutModalOpen(true)}
              className="btn-primary block w-full py-4 text-center text-sm font-bold tracking-wider uppercase"
            >
              Purchase Commercial License (${product.price})
            </button>
          </div>
        </div>
      </section>

      {/* Interactive System Blueprint Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'blueprint'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            01 Blueprint & Capabilities
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'problems'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            02 Friction Solved
          </button>
          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'deliverables'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            03 System Deliverables
          </button>
          <button
            onClick={() => setActiveTab('outcomes')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'outcomes'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            04 Modeled Outcomes
          </button>
          <button
            onClick={() => setActiveTab('deployment')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'deployment'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            05 48h Setup Runbook
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'faq'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            06 Governance FAQ
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-surface/70">
          {activeTab === 'blueprint' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-heading text-white">
                Core System Capabilities & Architectural Spec
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.capabilities.map((cap, idx) => (
                  <div key={idx} className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                        0{idx + 1}
                      </span>
                      <span className="font-semibold text-white text-sm">Capability Module</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pl-8">{cap}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-heading text-white">
                Primary Operational Friction Points Solved
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.problemsSolved.map((prob, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-surface/50 p-5 rounded-2xl border border-red-500/20">
                    <span className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center text-xs font-bold shrink-0">
                      !
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">{prob}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-heading text-white">
                Commercial Package Deliverables Quad
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-surface/50 p-5 rounded-2xl border border-emerald-500/20">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-mono">{del}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold font-heading text-white">
                  MODELED TARGETS — NOT HISTORICAL PERFORMANCE
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  Evolvith Architectural Target Outcomes
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.outcomes.map((out, idx) => (
                  <div key={idx} className="glass-panel p-6 rounded-2xl border border-cyan-500/20 text-center space-y-2">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 block font-bold">Target Metric 0{idx + 1}</span>
                    <p className="text-sm font-semibold text-white leading-relaxed">{out}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deployment' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-heading text-white">
                48-Hour Rapid Installation Runbook Protocol
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Hour 00-12</span>
                  <h5 className="font-bold text-white text-sm">Config Injection</h5>
                  <p className="text-xs text-gray-400">Repository provisioning and Master Genome configuration set binding.</p>
                </div>
                <div className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">Hour 12-24</span>
                  <h5 className="font-bold text-white text-sm">Telemetry Pipeline</h5>
                  <p className="text-xs text-gray-400">Webhook routing setup and API data bridge verification.</p>
                </div>
                <div className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Hour 24-36</span>
                  <h5 className="font-bold text-white text-sm">RACI Governance</h5>
                  <p className="text-xs text-gray-400">Customization of SOP manual & business unit RACI matrix.</p>
                </div>
                <div className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Hour 36-48</span>
                  <h5 className="font-bold text-white text-sm">QG4 Certification</h5>
                  <p className="text-xs text-gray-400">Final Quality Gate audit pass and executive dashboard launch.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-heading text-white">
                System Governance & Integration FAQ
              </h3>
              <div className="space-y-4">
                {product.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-surface/50 p-6 rounded-2xl space-y-2 border border-white/5">
                    <h4 className="font-bold text-white text-base">{faq.question}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Complementary Ecosystem OS Pairings */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <h3 className="text-xl font-bold font-heading text-white">
          Complementary Wave 1 Operating Systems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crossSellProducts.map((cross) => (
            <div key={cross.id} className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/10">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase">{cross.id.toUpperCase()}</span>
                <h4 className="font-bold text-white text-base mt-0.5">{cross.title}</h4>
                <p className="text-xs text-gray-400 mt-1">${cross.price} • One-Time Perpetual</p>
              </div>
              <Link
                href={`/products/${cross.id}`}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-cyan-400 text-xs font-semibold rounded-lg border border-white/10 transition-colors"
              >
                Inspect System
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Intent Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        product={product}
      />
    </div>
  );
}

