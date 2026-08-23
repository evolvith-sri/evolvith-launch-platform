'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product, COMMERCE_CONFIG } from '@/lib/products';
import { CheckoutModal } from './CheckoutModal';

export function ProductCard({ product }: { product: Product }) {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RELEASED':
        return { label: 'QG4 Certified • Release Ready', color: 'emerald' };
      case 'MANUFACTURING':
        return { label: 'In Manufacturing Pipeline', color: 'cyan' };
      case 'TIER_3_DEVELOPMENT':
        return { label: 'In Development • Architecture Preview', color: 'purple' };
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
    <>
      <div className="glass-panel p-7 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 relative group border border-white/10 bg-surface/80">
        <div className="space-y-5">
          {/* Header & Pricing */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
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
              <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5 pt-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    statusInfo.color === 'emerald'
                      ? 'bg-emerald-400 animate-pulse'
                      : statusInfo.color === 'cyan'
                      ? 'bg-cyan-400 animate-pulse'
                      : statusInfo.color === 'purple'
                      ? 'bg-purple-400 animate-pulse'
                      : 'bg-indigo-400'
                  }`}
                />
                <span>{statusInfo.label}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              {isPurchasable ? (
                <>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    ${product.price}
                  </span>
                  <span className="text-[10px] text-gray-400 block font-mono">
                    One-Time Perpetual
                  </span>
                </>
              ) : (
                <>
                  <span className="text-base sm:text-lg font-extrabold text-purple-300 font-mono">
                    In Development
                  </span>
                  <span className="text-[9px] text-gray-400 block font-mono uppercase">
                    Not Purchasable
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Product Identity */}
          <div>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
              {product.systemCode || product.id.toUpperCase()}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white font-heading leading-snug group-hover:text-cyan-300 transition-colors mt-0.5">
              {product.title}
            </h3>
          </div>

          <p className="text-xs text-gray-300 font-normal leading-relaxed">
            {product.oneSentencePurpose || product.subtitle}
          </p>

          {/* Architecture Inputs (for Tier 3) or Primary Operational Friction */}
          {product.architectureInputs && product.architectureInputs.length > 0 ? (
            <div className="border-t border-white/10 pt-4 space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-purple-300 block font-bold">
                Ecosystem Architecture Inputs
              </span>
              <div className="flex flex-wrap gap-1 pt-1">
                {product.architectureInputs.slice(0, 5).map((input, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-surface border border-white/10 text-[10px] font-mono text-gray-300"
                  >
                    {input}
                  </span>
                ))}
                {product.architectureInputs.length > 5 && (
                  <span className="px-2 py-0.5 text-[10px] font-mono text-gray-500">
                    +{product.architectureInputs.length - 5} more
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="border-t border-white/10 pt-4 space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-bold">
                Primary Operational Friction Solved
              </span>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                {product.operationalFriction || product.problemsSolved[0]}
              </p>
            </div>
          )}

          {/* Core Capability Module */}
          {product.capabilities && product.capabilities[0] && (
            <div className="bg-surface/60 p-3 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-bold">
                Core Capability Engine
              </span>
              <p className="text-xs text-gray-200 leading-relaxed">
                {product.capabilities[0]}
              </p>
            </div>
          )}

          {/* Modeled Target Governed Qualification */}
          {product.modeledTarget ? (
            <div className="bg-cyan-500/10 p-3.5 rounded-xl border border-cyan-500/20 text-xs font-mono">
              <span className="text-[10px] uppercase text-cyan-400 font-bold block tracking-wider">
                MODELED TARGET — NOT HISTORICAL PERFORMANCE
              </span>
              <span className="text-cyan-200 font-semibold block mt-0.5">
                {product.modeledTarget.replace('MODELED TARGET — NOT HISTORICAL PERFORMANCE:', '').trim()}
              </span>
            </div>
          ) : product.outcomes && product.outcomes[0] ? (
            <div className="bg-cyan-500/10 p-3.5 rounded-xl border border-cyan-500/20 text-xs font-mono">
              <span className="text-[10px] uppercase text-cyan-400 font-bold block tracking-wider">
                MODELED TARGET — NOT HISTORICAL PERFORMANCE
              </span>
              <span className="text-cyan-200 font-semibold block mt-0.5">
                {product.outcomes[0]}
              </span>
            </div>
          ) : null}

          {/* Designed For */}
          <div className="space-y-1 bg-surface/40 p-3 rounded-xl border border-white/5 text-xs text-gray-400">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-bold">
              Designed For
            </span>
            <p className="text-gray-300 font-medium text-[11px] leading-snug">
              {product.targetBuyer || (product.whoItIsFor && product.whoItIsFor[0])}
            </p>
          </div>
        </div>

        {/* Actions: Inspect & Commerce State */}
        <div className="pt-6 space-y-2">
          {isPurchasable ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="btn-primary w-full py-2.5 text-center text-xs font-bold tracking-wider uppercase font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Instant Buy
              </button>
              <Link
                href={`/products/${product.id}`}
                className="w-full py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white text-center transition-colors flex items-center justify-center gap-1"
              >
                <span>Blueprint</span>
                <span>→</span>
              </Link>
            </div>
          ) : (
            <Link
              href={`/products/${product.id}`}
              className="block w-full py-2.5 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-mono text-purple-300 text-center font-bold tracking-wider transition-colors"
            >
              Inspect Synthesis Architecture →
            </Link>
          )}

          {isPurchasable && product.checkoutUrl && (
            <a
              href={product.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-[10px] font-mono text-gray-500 hover:text-cyan-400 transition-colors pt-0.5"
            >
              Direct Dodo Checkout ↗
            </a>
          )}
        </div>
      </div>

      {isPurchasable && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          product={product}
        />
      )}
    </>
  );
}
