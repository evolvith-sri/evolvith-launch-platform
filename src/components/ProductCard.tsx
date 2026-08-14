import Link from 'next/link';
import { Product } from '@/lib/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 relative group border border-white/10">
      <div className="space-y-5">
        {/* Header & Pricing */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            {product.badge}
          </span>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-white font-mono">${product.price}</span>
            <span className="text-[10px] text-gray-400 block font-mono">One-Time Perpetual</span>
          </div>
        </div>

        {/* Product Identity */}
        <div>
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
            {product.id.toUpperCase()}
          </span>
          <h3 className="text-xl font-bold text-white font-heading leading-snug group-hover:text-cyan-300 transition-colors mt-0.5">
            {product.title}
          </h3>
        </div>

        <p className="text-xs text-gray-400 font-medium font-mono">
          {product.subtitle}
        </p>

        {/* Primary Business Problem Solved */}
        <div className="border-t border-white/10 pt-4 space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">Primary Operational Friction Solved</span>
          <p className="text-xs text-gray-300 leading-relaxed font-normal">
            {product.problemsSolved[0]}
          </p>
        </div>

        {/* Key Modeled Target Outcome */}
        {product.outcomes && product.outcomes[0] && (
          <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 text-xs text-cyan-300 font-mono font-medium">
            <span className="text-[10px] uppercase text-cyan-400/80 block font-bold">MODELED TARGET — NOT HISTORICAL PERFORMANCE:</span>
            <span>{product.outcomes[0]}</span>
          </div>
        )}

        {/* Target Audience */}
        <div className="space-y-1 bg-surface/50 p-3 rounded-xl border border-white/5 text-xs text-gray-400">
          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">Designed For</span>
          <p className="text-gray-300 font-medium text-[11px] truncate">{product.whoItIsFor[0]}</p>
        </div>

        {/* Authentic Quality & Deployment Proof */}
        <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>QG4 Certified</span>
          </div>
          <span className="text-gray-400">48h Setup Protocol</span>
        </div>
      </div>

      <div className="pt-6">
        <Link
          href={`/products/${product.id}`}
          className="btn-primary block w-full py-3.5 text-center text-xs font-bold tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Inspect System Blueprint (${product.price})
        </Link>
      </div>
    </div>
  );
}

