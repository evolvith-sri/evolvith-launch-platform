import { ProductCard } from '@/components/ProductCard';
import { WAVE_1_PRODUCTS } from '@/lib/products';

export const metadata = {
  title: 'Commercial Operating Systems Catalog — Evolvith',
  description: 'Explore the 6 Wave 1 commercial operating systems manufactured by Evolvith.',
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
          Public Product Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
          Wave 1 Commercial Operating Systems
        </h1>
        <p className="text-gray-400 text-base leading-relaxed">
          Select from our 6 pre-built, quality-certified commercial operating systems. Each system includes complete architecture specifications, SOP playbooks, executive telemetry dashboards, and 100% Quality Gate certification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {WAVE_1_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
