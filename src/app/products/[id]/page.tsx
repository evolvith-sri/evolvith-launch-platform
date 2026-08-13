import { notFound } from 'next/navigation';
import Link from 'next/link';
import { WAVE_1_PRODUCTS } from '@/lib/products';

export async function generateStaticParams() {
  return WAVE_1_PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = WAVE_1_PRODUCTS.find((p) => p.id === params.id);
  if (!product) return {};
  return {
    title: `${product.title} — Evolvith Commercial OS`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = WAVE_1_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const crossSellProducts = WAVE_1_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="pt-32 pb-24 space-y-16">
      {/* Product Hero */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-center gap-3">
          <Link href="/products" className="text-xs text-gray-400 hover:text-cyan-400 font-mono transition-colors">
            ← Back to Products Catalog
          </Link>
          <span className="text-gray-600">•</span>
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            {product.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight">
              {product.title}
            </h1>
            <p className="text-lg text-cyan-400 font-mono">
              {product.subtitle}
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              {product.executiveSummary}
            </p>
          </div>

          {/* Pricing & Checkout Card */}
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-mono uppercase text-gray-400">Commercial License</span>
              <div className="text-right">
                <span className="text-4xl font-extrabold text-white">${product.price}</span>
                <span className="text-xs text-gray-400 block font-mono">One-Time Perpetual</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>100% Quality Gate QG4 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Includes Complete Master SOP Playbook</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Unlimited Seat Enterprise License</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>48-Hour Rapid Deployment Protocol</span>
              </div>
            </div>

            <a
              href={product.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block w-full py-4 text-center text-base"
            >
              Purchase Commercial License (${product.price})
            </a>
          </div>
        </div>
      </section>

      {/* Business Problems Solved */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="glass-panel p-10 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-2xl font-extrabold font-heading text-white">
            Business Problems Solved
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.problemsSolved.map((prob, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-surface/50 p-4 rounded-xl border border-white/5">
                <span className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center text-xs font-bold shrink-0">
                  !
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">{prob}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities & Deliverables */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold font-heading text-white">
            Core System Capabilities
          </h3>
          <ul className="space-y-3">
            {product.capabilities.map((cap, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-cyan-400 font-bold">→</span>
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold font-heading text-white">
            Package Deliverables
          </h3>
          <ul className="space-y-3">
            {product.deliverables.map((del, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quantifiable Outcomes */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-cyan-500/10 to-indigo-600/10 border border-cyan-500/30 p-10 rounded-3xl space-y-6">
          <h2 className="text-2xl font-extrabold font-heading text-white text-center">
            Quantifiable Transformation Outcomes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {product.outcomes.map((out, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl">
                <p className="text-sm font-semibold text-cyan-300 leading-relaxed">{out}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <h2 className="text-2xl font-extrabold font-heading text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {product.faqs.map((faq, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl space-y-2">
              <h4 className="font-bold text-white text-base">{faq.question}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross Selling Opportunities */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <h3 className="text-xl font-bold font-heading text-white">
          Complementary Wave 1 Operating Systems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crossSellProducts.map((cross) => (
            <div key={cross.id} className="glass-panel p-6 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-base">{cross.title}</h4>
                <p className="text-xs text-gray-400 mt-1">${cross.price} • {cross.badge}</p>
              </div>
              <Link href={`/products/${cross.id}`} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-cyan-400 text-xs font-semibold rounded-lg border border-white/10 transition-colors">
                Inspect System
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
