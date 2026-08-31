'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { CheckoutModal } from '@/components/CheckoutModal';
import { logCommercialIntent } from '@/lib/telemetry';

interface StoreCatalogClientProps {
  allProducts: Product[];
  commercialProducts: Product[];
  dodoStorefrontUrl: string;
}

export function StoreCatalogClient({
  allProducts,
  commercialProducts,
  dodoStorefrontUrl,
}: StoreCatalogClientProps) {
  const [selectedTier, setSelectedTier] = useState<'ALL' | '1' | '2A' | '2B' | '3'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  useEffect(() => {
    logCommercialIntent({ eventType: 'VIEW_STORE' });
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => set.add(p.category));
    return ['ALL', ...Array.from(set)];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Tier filter
      if (selectedTier !== 'ALL') {
        if (selectedTier === '1' && product.subTier !== '1') return false;
        if (selectedTier === '2A' && product.subTier !== '2A') return false;
        if (selectedTier === '2B' && product.subTier !== '2B') return false;
        if (selectedTier === '3' && product.tier !== 3 && product.subTier !== '3') return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && product.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesCode = product.systemCode.toLowerCase().includes(query);
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesProblems = product.problemsSolved?.some((p) => p.toLowerCase().includes(query));
        if (!matchesCode && !matchesTitle && !matchesDesc && !matchesProblems) {
          return false;
        }
      }

      return true;
    });
  }, [allProducts, selectedTier, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
        {/* Tier Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          {[
            { id: 'ALL', label: `All Systems (${allProducts.length})`, badge: `${commercialProducts.length} Commercial OS` },
            { id: '1', label: 'Tier 1 / Wave 1: Focused OS', badge: `${allProducts.filter(p => p.subTier === '1').length} Systems · $49–$99` },
            { id: '2A', label: 'Tier 2A: Enterprise OS', badge: `${allProducts.filter(p => p.subTier === '2A').length} Systems · $149–$349` },
            { id: '2B', label: 'Tier 2B: Strategic Entry', badge: `${allProducts.filter(p => p.subTier === '2B').length} Systems · $99` },
            { id: '3', label: 'Tier 3: Synthesis', badge: `${allProducts.filter(p => p.tier === 3 || p.subTier === '3').length} in Dev` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTier(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                selectedTier === tab.id
                  ? 'bg-cyan-500 text-[#0B0F19] shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  selectedTier === tab.id
                    ? 'bg-black/20 text-black'
                    : 'bg-black/40 text-cyan-400 border border-white/10'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <input
              type="text"
              placeholder="Search by system code (e.g. AUDIT-OS-01), keyword, or problem solved..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0F19]/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 pl-10"
            />
            <span className="absolute left-3.5 top-2.5 text-gray-500 text-sm">🔍</span>
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#0B0F19]/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0B0F19]">
                  {cat === 'ALL' ? 'All Operating Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & External Store Anchor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-gray-400">
        <div>
          Showing <span className="text-white font-bold">{filteredProducts.length}</span> systems in commercial catalog
        </div>
        <div className="flex items-center gap-2">
          <span>Official Dodo Merchant Layer:</span>
          <a
            href={dodoStorefrontUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
          >
            <span>store.dodopayments.com/evolvith</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isPurchasable =
            product.availability !== 'NOT_PURCHASABLE' && product.price !== null;

          return (
            <div
              key={product.id}
              className={`glass-panel rounded-3xl p-6 border flex flex-col justify-between transition-all hover:border-cyan-500/40 relative overflow-hidden group ${
                product.subTier === '1'
                  ? 'border-cyan-500/20'
                  : product.subTier === '2A'
                  ? 'border-indigo-500/20'
                  : product.subTier === '2B'
                  ? 'border-emerald-500/20'
                  : 'border-purple-500/20'
              }`}
            >
              <div className="space-y-4">
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-surface border border-white/10 text-cyan-400 text-xs font-mono font-bold tracking-wider">
                    {product.systemCode}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      product.subTier === '1'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        : product.subTier === '2A'
                        ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                        : product.subTier === '2B'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Title & Category */}
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-white mt-1 group-hover:text-cyan-400 transition-colors">
                    {product.title}
                  </h3>
                </div>

                {/* Subtitle / Friction */}
                <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                  {product.subtitle}
                </p>

                {/* Price Display */}
                <div className="pt-2 pb-2 border-y border-white/10 flex items-center justify-between font-mono">
                  <div>
                    {isPurchasable ? (
                      <>
                        <span className="text-2xl font-extrabold text-white">
                          ${product.price}
                        </span>
                        <span className="text-xs text-gray-400 ml-1.5">USD</span>
                      </>
                    ) : (
                      <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                        In Development
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase">
                    {isPurchasable ? 'Perpetual License' : 'Tier-3 Blueprint'}
                  </span>
                </div>

                {/* Deliverable Highlights */}
                <div className="space-y-1.5 text-xs text-gray-400">
                  <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">
                    Package Deliverables:
                  </span>
                  <ul className="space-y-1 text-[11px]">
                    {product.deliverables.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 shrink-0">✓</span>
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="pt-6 space-y-2.5">
                {isPurchasable ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        logCommercialIntent({
                          eventType: 'CLICK_INSTANT_BUY',
                          productId: product.id,
                          systemCode: product.systemCode,
                          price: product.price ?? undefined,
                          tier: String(product.tier),
                        });
                        setSelectedProductForModal(product);
                      }}
                      className="btn-primary w-full py-2.5 text-center text-xs font-bold font-mono uppercase tracking-wider"
                    >
                      Instant Buy
                    </button>
                    <Link
                      href={`/products/${product.id}`}
                      onClick={() =>
                        logCommercialIntent({
                          eventType: 'VIEW_PRODUCT_BLUEPRINT',
                          productId: product.id,
                          systemCode: product.systemCode,
                          price: product.price ?? undefined,
                          tier: String(product.tier),
                        })
                      }
                      className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl border border-white/10 text-xs font-mono text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Specs</span>
                      <span>→</span>
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/products/${product.id}`}
                    onClick={() =>
                      logCommercialIntent({
                        eventType: 'VIEW_PRODUCT_BLUEPRINT',
                        productId: product.id,
                        systemCode: product.systemCode,
                      })
                    }
                    className="block w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-xl text-center text-xs font-mono font-bold tracking-wider transition-colors"
                  >
                    View Blueprint Architecture →
                  </Link>
                )}

                {isPurchasable && product.checkoutUrl && (
                  <a
                    href={product.checkoutUrl}
                    onClick={() =>
                      logCommercialIntent({
                        eventType: 'CLICK_DODO_DIRECT',
                        productId: product.id,
                        systemCode: product.systemCode,
                        price: product.price ?? undefined,
                      })
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-[10px] font-mono text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    Direct Dodo Checkout Link ↗
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Modal */}
      {selectedProductForModal && (
        <CheckoutModal
          isOpen={Boolean(selectedProductForModal)}
          onClose={() => setSelectedProductForModal(null)}
          product={selectedProductForModal}
        />
      )}
    </div>
  );
}
