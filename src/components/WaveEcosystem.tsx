'use client';

import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/lib/products';

interface WaveEcosystemProps {
  products: Product[];
}

export function WaveEcosystem({ products }: WaveEcosystemProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'commercial') return p.id === 'rev-os-01' || p.id === 'cx-os-01';
    if (activeCategory === 'financial') return p.id === 'fin-os-01' || p.id === 'ops-os-02';
    if (activeCategory === 'governance') return p.id === 'data-os-01' || p.id === 'gov-os-01';
    return true;
  });

  return (
    <section id="wave-catalog" className="max-w-7xl mx-auto px-6 space-y-10" aria-labelledby="catalog-heading">
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          Wave 1 Commercial Ecosystem
        </span>
        <h2 id="catalog-heading" className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          6 Codified Operating Systems. One Master Genome.
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Select from six specialized enterprise operating systems engineered to eliminate operational friction and standardize execution across your organization.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeCategory === 'all'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
          }`}
        >
          All 6 Operating Systems
        </button>
        <button
          onClick={() => setActiveCategory('commercial')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeCategory === 'commercial'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
          }`}
        >
          Commercial & Growth (REV, CX)
        </button>
        <button
          onClick={() => setActiveCategory('financial')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeCategory === 'financial'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
          }`}
        >
          Finance & Ops (FIN, OPS)
        </button>
        <button
          onClick={() => setActiveCategory('governance')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
            activeCategory === 'governance'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'glass-panel text-gray-300 hover:text-white hover:border-cyan-500/30'
          }`}
        >
          Data & Governance (DATA, GOV)
        </button>
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
