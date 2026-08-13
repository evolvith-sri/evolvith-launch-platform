import Link from 'next/link';
import { Product } from '@/lib/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="glass-panel p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 relative group">
      <div className="space-y-5">
        {/* Header & Pricing */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
            {product.badge}
          </span>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-white">${product.price}</span>
            <span className="text-[10px] text-gray-500 block font-mono">Perpetual License</span>
          </div>
        </div>

        {/* 1. WHAT IS IT? */}
        <h3 className="text-xl font-bold text-white font-heading leading-snug group-hover:text-cyan-300 transition-colors">
          {product.title}
        </h3>

        <p className="text-xs text-cyan-400 font-medium font-mono">
          {product.subtitle}
        </p>

        {/* 2. WHY DOES IT MATTER? */}
        <p className="text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-4">
          {product.description}
        </p>

        {/* 3. WHO IS IT FOR? */}
        <div className="space-y-1.5 bg-surface/50 p-3.5 rounded-xl border border-white/5 text-xs text-gray-400">
          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">Target Audience</span>
          <p className="text-gray-300 font-medium">{product.whoItIsFor[0]}</p>
        </div>

        {/* 4. WHY SHOULD I TRUST IT? */}
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Quality Gate QG4 Certified • 48h Deployment</span>
        </div>
      </div>

      <div className="pt-6">
        <Link
          href={`/products/${product.id}`}
          className="btn-primary block w-full py-3.5 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Inspect System Architecture & Buy (${product.price})
        </Link>
      </div>
    </div>
  );
}
