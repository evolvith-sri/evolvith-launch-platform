import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { WaveEcosystem } from '@/components/WaveEcosystem';
import { TransformationEngine } from '@/components/TransformationEngine';
import { TrustLayer } from '@/components/TrustLayer';
import { PromptVsOSComparison } from '@/components/PromptVsOSComparison';
import { FulfillmentJourney } from '@/components/FulfillmentJourney';
import { MasterGenomeInspector } from '@/components/MasterGenomeInspector';
import { DeploymentProtocol } from '@/components/DeploymentProtocol';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ALL_PRODUCTS } from '@/lib/products';
import { Terminal, Play, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="space-y-16 sm:space-y-24 pb-20">
        {/* 1. Hero Section: What Evolvith Is & Core Value Proposition */}
        <Hero />

        {/* 2. Featured Systems Catalog: What You Can Buy Now ($49+ Tier 1 & Tier 2) */}
        <div id="wave-catalog">
          <WaveEcosystem products={ALL_PRODUCTS} />
        </div>

        {/* 3. Why the Architecture Matters: Old Way vs. Evolvith Codified Systems */}
        <TransformationEngine />

        {/* 4. Engineering Quality & Governance Standards */}
        <TrustLayer />

        {/* 5. Category Distinction: Codified Operating System vs. Generic AI Prompt */}
        <PromptVsOSComparison />

        {/* 6. Live Interactive Workstations Callout (Test Directly in Browser) */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 relative overflow-hidden bg-surface/80 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Installation Required</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                Experience Live Operating Workstations
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Test <strong className="text-white">PIPE-OS-01</strong>, <strong className="text-white">AUDIT-OS-01</strong>, and <strong className="text-white">SEO-AUDIT-OS-01</strong> directly in your browser. Experience local-first deterministic execution with zero cloud data leaks.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <Link
                href="/workstations"
                className="btn-primary px-8 py-4 text-xs font-mono uppercase font-bold tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Play className="w-4 h-4" />
                <span>Explore Live Workstations</span>
              </Link>
              <Link
                href="/products/pipe-os-01"
                className="glass-panel px-6 py-4 text-xs font-mono text-gray-300 hover:text-white rounded-lg transition-colors w-full sm:w-auto text-center"
              >
                PIPE-OS-01 Specs
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Commercial Fulfillment Journey: Choose -> Receive -> Deploy */}
        <FulfillmentJourney />

        {/* 8. Deep Architecture: 4-Layer Master Genome Architecture Inspector */}
        <MasterGenomeInspector />

        {/* 9. Deployment Protocol: 48-Hour Rapid Installation Standard */}
        <DeploymentProtocol />

        {/* 10. Executive Action CTA */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-cyan-500/30 text-center space-y-6 relative overflow-hidden bg-surface/80">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
            <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              Execute Transformation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white max-w-3xl mx-auto">
              Ready to Eliminate Operational Friction?
            </h2>
            <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
              Select a targeted <strong className="text-cyan-400">$49–$99</strong> focused operating system or full-stack enterprise architecture to deploy standardized governance within 48 hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/store" className="btn-primary inline-block px-8 py-4 text-sm font-bold uppercase font-mono tracking-wider w-full sm:w-auto">
                Commercial Store ($49+) →
              </Link>
              <Link href="/products" className="glass-panel px-8 py-4 text-sm font-bold font-mono tracking-wider text-gray-200 hover:text-white rounded-lg w-full sm:w-auto">
                Browse Architecture Catalog
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}
