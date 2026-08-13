import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { TrustLayer } from '@/components/TrustLayer';
import { MovementPhilosophy } from '@/components/MovementPhilosophy';
import { DeploymentCredibility } from '@/components/DeploymentCredibility';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { WAVE_1_PRODUCTS } from '@/lib/products';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="space-y-20 pb-20">
        {/* 1. Hero Section (Answers: What is Evolvith? Why does it matter? What to do next?) */}
        <Hero />

        {/* 2. Authentic Trust & Engineering Evidence */}
        <TrustLayer />

        {/* 3. The Movement & Philosophy (Why Evolvith Exists; Software vs Management Consulting) */}
        <MovementPhilosophy />

        {/* 4. Wave 1 Commercial Operating Systems Catalog */}
        <section className="max-w-7xl mx-auto px-6 space-y-10" aria-labelledby="catalog-heading">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
              Pre-Built Operating Systems
            </span>
            <h2 id="catalog-heading" className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Wave 1 Commercial Operating Systems
            </h2>
            <p className="text-gray-400 text-sm">
              Codified enterprise architectures engineered to eliminate operational friction and standardize execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WAVE_1_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 5. CIO/CTO Deployment & Integration Governance */}
        <DeploymentCredibility />

        {/* 6. 4-Layer Master Genome Architecture Framework */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-surface/50 border border-white/10 rounded-3xl p-12 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold font-heading text-white">
                The 4-Layer Master Genome Architecture
              </h2>
              <p className="text-xs text-cyan-400 font-mono">
                Every Evolvith Operating System inherits from 4 fundamental genetic layers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-panel p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 mb-4">
                  L1
                </div>
                <h4 className="font-bold text-white text-base">Business DNA</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Strategy, operational taxonomy, RACI matrices, and economic models.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-indigo-400 mb-4">
                  L2
                </div>
                <h4 className="font-bold text-white text-base">Product DNA</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Feature blueprints, UI components, workflows, and AST schemas.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 mb-4">
                  L3
                </div>
                <h4 className="font-bold text-white text-base">Customer DNA</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Onboarding journeys, documentation quad, and support SLAs.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-amber-400 mb-4">
                  L4
                </div>
                <h4 className="font-bold text-white text-base">Factory DNA</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Quality Gates QG0-QG6, automated packaging, and release runbooks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Call To Action */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="glass-panel p-12 rounded-3xl border border-cyan-500/30 text-center space-y-6 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white max-w-2xl mx-auto">
              Ready to Eliminate Operational Friction?
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Select one of our 6 Wave 1 commercial operating systems and deploy complete enterprise governance in under 48 hours.
            </p>
            <div className="pt-2">
              <Link href="/products" className="btn-primary inline-block px-8 py-4 text-base">
                Explore All Wave 1 Operating Systems
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}
