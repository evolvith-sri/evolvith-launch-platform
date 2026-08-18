'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_PRODUCTS, COMMERCE_CONFIG } from '@/lib/products';
import { CheckoutModal } from '@/components/CheckoutModal';
import { PackageFileTree } from '@/components/PackageFileTree';
import { TerminalRunbookSnippet } from '@/components/TerminalRunbookSnippet';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = ALL_PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === params.id.toLowerCase() ||
      p.systemCode.toLowerCase() === params.id.toLowerCase()
  );
  const [activeTab, setActiveTab] = useState<
    | 'blueprint'
    | 'friction'
    | 'package'
    | 'whatYouReceive'
    | 'outcomes'
    | 'deployment'
    | 'faq'
  >('blueprint');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!product) {
    notFound();
  }

  const crossSellProducts = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.tier === product.tier
  ).slice(0, 2);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RELEASED':
        return { label: 'QG4 Certified • Release Ready', color: 'emerald' };
      case 'MANUFACTURING':
        return { label: 'Manufacturing Pipeline', color: 'cyan' };
      case 'TIER_3_DEVELOPMENT':
        return { label: 'In Architectural Development', color: 'purple' };
      case 'PORTFOLIO_SPEC':
      default:
        return { label: 'Portfolio Specification', color: 'indigo' };
    }
  };

  const getTierBadge = () => {
    if (product.subTier === '1') {
      return { label: 'Tier 1 • Focused OS', color: 'cyan' };
    }
    if (product.subTier === '2A') {
      return { label: 'Tier 2A • Enterprise OS', color: 'indigo' };
    }
    if (product.subTier === '2B') {
      return { label: 'Tier 2B • Strategic Entry ($99 Launch Edition)', color: 'emerald' };
    }
    if (product.tier === 3 || product.subTier === '3') {
      return { label: 'Tier 3 • Synthesis Organism', color: 'purple' };
    }
    return { label: `Tier ${product.tier} OS`, color: 'cyan' };
  };

  const statusInfo = getStatusBadge(product.status);
  const tierInfo = getTierBadge();
  const isPurchasable = product.availability !== 'NOT_PURCHASABLE' && product.price !== null;

  return (
    <div className="pt-32 pb-24 space-y-14">
      {/* 5-Question Immediate Answer Hero Architecture */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <Link href="/products" className="text-gray-400 hover:text-cyan-400 transition-colors">
            ← Back to Products Catalog
          </Link>
          <span className="text-gray-600">•</span>
          <span
            className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
              tierInfo.color === 'cyan'
                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                : tierInfo.color === 'emerald'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : tierInfo.color === 'purple'
                ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300'
                : 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-300'
            }`}
          >
            {tierInfo.label}
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-400 flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                statusInfo.color === 'emerald'
                  ? 'bg-emerald-400 animate-pulse'
                  : statusInfo.color === 'purple'
                  ? 'bg-purple-400 animate-pulse'
                  : 'bg-cyan-400'
              }`}
            />
            <span>{statusInfo.label}</span>
          </span>
        </div>

        {/* Core Product Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-6">
            {/* 1. System Code & System Name */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                SYSTEM CODE: {product.systemCode || product.id.toUpperCase()}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight">
                {product.title}
              </h1>
            </div>

            {/* 2. One-Sentence Purpose */}
            <div className="bg-surface/60 p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold tracking-wider block">
                One-Sentence System Purpose
              </span>
              <p className="text-sm sm:text-base text-cyan-200 font-medium leading-relaxed">
                {product.oneSentencePurpose || product.subtitle}
              </p>
            </div>

            {/* 3. Primary Operational Friction Solved or Architecture Inputs */}
            {product.architectureInputs && product.architectureInputs.length > 0 ? (
              <div className="bg-surface/40 p-5 rounded-2xl border border-purple-500/20 space-y-2">
                <span className="text-[10px] font-mono uppercase text-purple-300 font-bold tracking-wider block">
                  Multi-System Architecture Inputs Synthesized
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.architectureInputs.map((input, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-surface border border-white/10 text-xs font-mono text-gray-200"
                    >
                      {input}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-surface/40 p-5 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold tracking-wider block">
                  Primary Operational Friction Addressed
                </span>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {product.operationalFriction || product.problemsSolved[0]}
                </p>
              </div>
            )}

            {/* 4. Governed Modeled Target */}
            <div className="bg-cyan-500/10 p-5 rounded-2xl border border-cyan-500/20 space-y-1 font-mono">
              <span className="text-[10px] uppercase text-cyan-400 font-bold tracking-wider block">
                MODELED TARGET — NOT HISTORICAL PERFORMANCE
              </span>
              <p className="text-sm sm:text-base text-white font-bold">
                {product.modeledTarget
                  ? product.modeledTarget
                      .replace('MODELED TARGET — NOT HISTORICAL PERFORMANCE:', '')
                      .trim()
                  : product.outcomes && product.outcomes[0]}
              </p>
            </div>

            {/* 5. Designed For */}
            <div className="bg-surface/40 p-5 rounded-2xl border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold tracking-wider block">
                Designed For
              </span>
              <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
                {product.targetBuyer || (product.whoItIsFor && product.whoItIsFor.join(' • '))}
              </p>
            </div>
          </div>

          {/* Pricing, Deliverables & Commercial Action Card */}
          <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6 bg-surface/90 sticky top-28 shadow-2xl">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-gray-400 font-bold block">
                  {tierInfo.label}
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  {isPurchasable
                    ? 'One-Time Perpetual Commercial Grant'
                    : 'Architecture Blueprint in Development'}
                </span>
              </div>
              <div className="text-right shrink-0">
                {isPurchasable ? (
                  <>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                      ${product.price}
                    </span>
                    <span className="text-[10px] text-gray-400 block font-mono">
                      USD / Perpetual
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-extrabold text-purple-300 font-mono">
                      In Development
                    </span>
                    <span className="text-[10px] text-gray-400 block font-mono">
                      TBD / Controlled
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* What You Receive Quick Checklist */}
            <div className="space-y-2.5 text-xs text-gray-300 font-mono">
              <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block mb-1">
                {isPurchasable
                  ? 'What You Receive in Distribution Package:'
                  : 'Synthesis Architecture Scope:'}
              </span>
              {isPurchasable ? (
                <>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>Digital product package (.zip) with full Python engine</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>Perpetual Commercial License with unlimited seats</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>Master SOP manual, RACI matrix & API specs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>48-Hour rapid installation runbook documentation</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold shrink-0">🧬</span>
                    <span>Cross-System Telemetry Ingestion & Synthesis Engine</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold shrink-0">🧬</span>
                    <span>Executive War Room Strategic Decision Matrix</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold shrink-0">🧬</span>
                    <span>Portfolio capped at up to 6 synthesis organisms</span>
                  </div>
                </>
              )}
            </div>

            {/* Purchase CTA State Machine */}
            <div className="space-y-2 pt-2">
              {isPurchasable ? (
                <>
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(true)}
                    className="btn-primary block w-full py-4 text-center text-xs font-bold tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    {COMMERCE_CONFIG.status === 'LIVE'
                      ? `Purchase Commercial License ($${product.price})`
                      : `Register License Intent ($${product.price})`}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center font-mono flex items-center justify-center gap-1.5 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{COMMERCE_CONFIG.preLaunchMessage}</span>
                  </p>
                </>
              ) : (
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center space-y-1">
                  <span className="text-xs font-mono text-purple-300 font-bold block uppercase">
                    In Architectural Development
                  </span>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Not available for commercial checkout. Future cross-system architecture.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Inspection Tabbed Architecture */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'blueprint'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            01 System Capabilities
          </button>
          <button
            onClick={() => setActiveTab('friction')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'friction'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            02 Friction Solved
          </button>
          <button
            onClick={() => setActiveTab('whatYouReceive')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'whatYouReceive'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            03 What You Receive
          </button>
          {isPurchasable && (
            <button
              onClick={() => setActiveTab('package')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === 'package'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'glass-panel text-gray-300 hover:text-white'
              }`}
            >
              04 Inside Package (.zip)
            </button>
          )}
          <button
            onClick={() => setActiveTab('outcomes')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'outcomes'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            05 Modeled Targets
          </button>
          {isPurchasable && (
            <button
              onClick={() => setActiveTab('deployment')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === 'deployment'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'glass-panel text-gray-300 hover:text-white'
              }`}
            >
              06 48h Setup Runbook
            </button>
          )}
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'faq'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            07 Governance FAQ
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-surface/70">
          {activeTab === 'blueprint' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-heading text-white">
                  Core System Capabilities & Architectural Modules
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Deterministic software components executed under Master Genome standards
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                        0{idx + 1}
                      </span>
                      <span className="font-semibold text-white text-sm">Capability Engine</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed pl-8">{cap}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'friction' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-heading text-white">
                  Operational Friction Points Eliminated
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Specific structural breakdowns addressed by this operating system
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.problemsSolved.map((prob, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-surface/50 p-5 rounded-2xl border border-red-500/20"
                  >
                    <span className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center text-xs font-bold shrink-0">
                      !
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">{prob}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'whatYouReceive' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-heading text-white">
                  What You Receive in the Commercial Package
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Complete unencrypted software payload delivered upon license purchase
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(product.whatYouReceive || product.deliverables).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-surface/50 p-5 rounded-2xl border border-emerald-500/20"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </span>
                    <p className="text-xs text-gray-200 leading-relaxed font-mono">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'package' && isPurchasable && (
            <PackageFileTree productId={product.id} />
          )}

          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold font-heading text-white">
                  MODELED TARGETS — NOT HISTORICAL PERFORMANCE
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  Target operational benchmarks modeled under baseline operating conditions
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.outcomes.map((out, idx) => (
                  <div
                    key={idx}
                    className="glass-panel p-6 rounded-2xl border border-cyan-500/20 text-center space-y-2"
                  >
                    <span className="text-[10px] font-mono uppercase text-cyan-400 block font-bold">
                      Modeled Target 0{idx + 1}
                    </span>
                    <p className="text-sm font-semibold text-white leading-relaxed">{out}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deployment' && isPurchasable && (
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold font-heading text-white">
                  48-Hour Rapid Installation Runbook Protocol
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                      Hour 00-12
                    </span>
                    <h5 className="font-bold text-white text-sm">Config Injection</h5>
                    <p className="text-xs text-gray-400">
                      Environment provisioning and Master Genome configuration binding.
                    </p>
                  </div>
                  <div className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                      Hour 12-24
                    </span>
                    <h5 className="font-bold text-white text-sm">Telemetry Pipeline</h5>
                    <p className="text-xs text-gray-400">
                      Webhook routing setup and API data bridge verification.
                    </p>
                  </div>
                  <div className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                      Hour 24-36
                    </span>
                    <h5 className="font-bold text-white text-sm">RACI Governance</h5>
                    <p className="text-xs text-gray-400">
                      Customization of SOP manual & business unit RACI matrix.
                    </p>
                  </div>
                  <div className="bg-surface/50 p-5 rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                      Hour 36-48
                    </span>
                    <h5 className="font-bold text-white text-sm">QG4 Certification</h5>
                    <p className="text-xs text-gray-400">
                      Final Quality Gate audit pass and executive dashboard launch.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terminal Code Demonstration */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider block">
                  Installation Command Execution Runbook
                </span>
                <TerminalRunbookSnippet productId={product.id} />
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-heading text-white">
                System Governance & Commercial FAQ
              </h3>
              <div className="space-y-4">
                {product.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-surface/50 p-6 rounded-2xl space-y-2 border border-white/5"
                  >
                    <h4 className="font-bold text-white text-base">{faq.question}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Complementary Operating Systems in Same Tier */}
      {crossSellProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 space-y-6">
          <h3 className="text-xl font-bold font-heading text-white">
            Complementary {tierInfo.label} Systems
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crossSellProducts.map((cross) => (
              <div
                key={cross.id}
                className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/10"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">
                    {cross.systemCode || cross.id.toUpperCase()}
                  </span>
                  <h4 className="font-bold text-white text-base">{cross.title}</h4>
                  <p className="text-xs text-gray-400 font-mono">
                    {cross.price ? `$${cross.price} • One-Time Perpetual License` : 'In Development'}
                  </p>
                </div>
                <Link
                  href={`/products/${cross.id}`}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-cyan-400 text-xs font-semibold rounded-lg border border-white/10 transition-colors shrink-0 ml-4"
                >
                  Inspect System
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Commercial Intent Modal */}
      {isPurchasable && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          product={product}
        />
      )}
    </div>
  );
}
