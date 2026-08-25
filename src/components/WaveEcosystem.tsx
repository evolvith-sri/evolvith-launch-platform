'use client';

import { useState } from 'react';
import { ProductCard } from './ProductCard';
import {
  Product,
  TIER_1_PRODUCTS,
  TIER_2A_PRODUCTS,
  TIER_2B_PRODUCTS,
  TIER_3_PRODUCTS,
} from '@/lib/products';

interface WaveEcosystemProps {
  products?: Product[];
}

type ActiveTierType = 'tier1' | 'tier2a' | 'tier2b' | 'tier3';

export function WaveEcosystem({ products }: WaveEcosystemProps) {
  const [activeTier, setActiveTier] = useState<ActiveTierType>('tier1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const currentProducts: Product[] =
    activeTier === 'tier1'
      ? TIER_1_PRODUCTS
      : activeTier === 'tier2a'
      ? TIER_2A_PRODUCTS
      : activeTier === 'tier2b'
      ? TIER_2B_PRODUCTS
      : TIER_3_PRODUCTS;

  const filteredProducts = currentProducts.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'developer') return p.category.toLowerCase().includes('developer') || p.category.toLowerCase().includes('tool') || p.category.toLowerCase().includes('qa');
    if (activeCategory === 'revenue') return p.category.toLowerCase().includes('revenue');
    if (activeCategory === 'financial') return p.category.toLowerCase().includes('financial') || p.category.toLowerCase().includes('finance');
    if (activeCategory === 'customer') return p.category.toLowerCase().includes('customer');
    if (activeCategory === 'operations') return p.category.toLowerCase().includes('operation');
    if (activeCategory === 'data_gov') return p.category.toLowerCase().includes('data') || p.category.toLowerCase().includes('governance');
    if (activeCategory === 'synthesis') return p.category.toLowerCase().includes('synthesis');
    return true;
  });

  return (
    <section id="wave-catalog" className="max-w-7xl mx-auto px-6 space-y-12" aria-labelledby="catalog-heading">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            Commercial Operating System Architecture
          </span>
          <a
            href="/store"
            className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
          >
            <span>Store View</span>
            <span>→</span>
          </a>
        </div>
        <h2 id="catalog-heading" className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
          Codified Enterprise Operating Systems
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          From purpose-built focused systems at <strong className="text-cyan-400">$49–$99</strong> to full-depth enterprise systems and future synthesis organisms.
        </p>
      </div>

      {/* 4-Tier Navigation Switcher */}
      <div className="max-w-4xl mx-auto bg-surface/80 p-1.5 rounded-2xl border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-1">
        {/* Tier 1 */}
        <button
          onClick={() => {
            setActiveTier('tier1');
            setActiveCategory('all');
          }}
          className={`py-3 px-3 rounded-xl text-xs font-mono font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
            activeTier === 'tier1'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>TIER 1 • Focused & Wave 1</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
              activeTier === 'tier1' ? 'bg-black/20 text-black' : 'bg-cyan-500/20 text-cyan-300'
            }`}
          >
            {TIER_1_PRODUCTS.length} Systems · From $49
          </span>
        </button>

        {/* Tier 2A */}
        <button
          onClick={() => {
            setActiveTier('tier2a');
            setActiveCategory('all');
          }}
          className={`py-3 px-3 rounded-xl text-xs font-mono font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
            activeTier === 'tier2a'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>TIER 2A • Enterprise</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
              activeTier === 'tier2a' ? 'bg-black/20 text-black' : 'bg-indigo-500/20 text-indigo-300'
            }`}
          >
            {TIER_2A_PRODUCTS.length} Systems · $149–$349
          </span>
        </button>

        {/* Tier 2B */}
        <button
          onClick={() => {
            setActiveTier('tier2b');
            setActiveCategory('all');
          }}
          className={`py-3 px-3 rounded-xl text-xs font-mono font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
            activeTier === 'tier2b'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>TIER 2B • Strategic Entry</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
              activeTier === 'tier2b' ? 'bg-black/20 text-black' : 'bg-emerald-500/20 text-emerald-300'
            }`}
          >
            {TIER_2B_PRODUCTS.length} System · $99 Launch
          </span>
        </button>

        {/* Tier 3 */}
        <button
          onClick={() => {
            setActiveTier('tier3');
            setActiveCategory('all');
          }}
          className={`py-3 px-3 rounded-xl text-xs font-mono font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
            activeTier === 'tier3'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>TIER 3 • Organisms</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
              activeTier === 'tier3' ? 'bg-black/20 text-black' : 'bg-purple-500/20 text-purple-300'
            }`}
          >
            {TIER_3_PRODUCTS.length} in Dev · Architecture
          </span>
        </button>
      </div>

      {/* Tier Context Explanation Banners */}
      {activeTier === 'tier1' && (
        <div className="bg-surface/60 border border-cyan-500/20 p-6 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest block">
              Tier 1 • Focused Operating Systems
            </span>
            <h3 className="text-base font-bold text-white font-heading">
              Practical, Purpose-Built Systems for Specific Operating Bottlenecks
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Engineered with intentional architectural focus to solve specific, high-friction operational failure modes. One-time perpetual license ($49–$99) with unlimited internal seats.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-2 rounded-xl text-cyan-300">
            {TIER_1_PRODUCTS.length} Systems ($49–$99)
          </div>
        </div>
      )}

      {activeTier === 'tier2a' && (
        <div className="bg-surface/60 border border-indigo-500/20 p-6 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-widest block">
              Tier 2A • Enterprise Operating Systems
            </span>
            <h3 className="text-base font-bold text-white font-heading">
              Deeper Systems Designed Around Major Business Functions & Organizational Workflows
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Comprehensive operational brains coordinating departmental telemetry, board reporting, pipeline execution, and corporate governance. Individually governed pricing ($149–$349).
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-2 rounded-xl text-indigo-300">
            {TIER_2A_PRODUCTS.length} Enterprise Systems
          </div>
        </div>
      )}

      {activeTier === 'tier2b' && (
        <div className="bg-surface/60 border border-emerald-500/20 p-6 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-widest block">
              Tier 2B • Strategic Entry Systems
            </span>
            <h3 className="text-base font-bold text-white font-heading">
              High-Leverage Entry Systems Into Deeper Evolvith Architecture
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Targeted high-leverage entry points for cash collections and receivables governance at an accessible $99 Launch Edition pricing structure.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-emerald-300">
            {TIER_2B_PRODUCTS.length} System ($99 Launch Edition)
          </div>
        </div>
      )}

      {activeTier === 'tier3' && (
        <div className="bg-surface/60 border border-purple-500/20 p-6 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-purple-300 font-bold tracking-widest block">
              Tier 3 • Synthesis Organisms (Architecture Preview)
            </span>
            <h3 className="text-base font-bold text-white font-heading">
              Cross-System Operational Intelligence & Decision Support Organisms
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Synthesizes distributed signals across revenue, financial, and customer systems into real-time executive decision intelligence. In architectural development (Not commercially purchasable).
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs bg-purple-500/10 border border-purple-500/30 px-3.5 py-2 rounded-xl text-purple-300">
            {TIER_3_PRODUCTS.length} Synthesis Organisms (In Dev)
          </div>
        </div>
      )}

      {activeTier === 'tier3' && (
        <div className="bg-surface/60 border border-purple-500/20 p-6 rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-purple-300 font-bold tracking-widest block">
              Tier 3 • Synthesis Organisms
            </span>
            <h3 className="text-base font-bold text-white font-heading">
              Cross-System Synthesis & Organizational Command Infrastructure
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Designed as future cross-system architectures synthesizing multiple operating systems into higher-level organizational intelligence. In development; strictly non-purchasable.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs bg-purple-500/10 border border-purple-500/30 px-3.5 py-2 rounded-xl text-purple-300">
            4 in Development (Portfolio Capped at 6)
          </div>
        </div>
      )}

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeCategory === 'all'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
          }`}
        >
          All ({currentProducts.length})
        </button>
        {activeTier !== 'tier3' ? (
          <>
            <button
              onClick={() => setActiveCategory('developer')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCategory === 'developer'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
              }`}
            >
              Developer Tools
            </button>
            <button
              onClick={() => setActiveCategory('revenue')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCategory === 'revenue'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
              }`}
            >
              Revenue Ops
            </button>
            <button
              onClick={() => setActiveCategory('financial')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCategory === 'financial'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
              }`}
            >
              Financial Ops
            </button>
            <button
              onClick={() => setActiveCategory('customer')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCategory === 'customer'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
              }`}
            >
              Customer Success
            </button>
            <button
              onClick={() => setActiveCategory('operations')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCategory === 'operations'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
              }`}
            >
              Operations Systems
            </button>
            <button
              onClick={() => setActiveCategory('data_gov')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCategory === 'data_gov'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
              }`}
            >
              Data & Governance
            </button>
          </>
        ) : (
          <button
            onClick={() => setActiveCategory('synthesis')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeCategory === 'synthesis'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
            }`}
          >
            Synthesis Architecture
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
