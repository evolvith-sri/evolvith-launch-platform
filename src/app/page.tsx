import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { MasterGenomeInspector } from '@/components/MasterGenomeInspector';
import { WaveEcosystem } from '@/components/WaveEcosystem';
import { TrustLayer } from '@/components/TrustLayer';
import { TransformationEngine } from '@/components/TransformationEngine';
import { PromptVsOSComparison } from '@/components/PromptVsOSComparison';
import { FulfillmentJourney } from '@/components/FulfillmentJourney';
import { DeploymentProtocol } from '@/components/DeploymentProtocol';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ALL_PRODUCTS } from '@/lib/products';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="space-y-16 sm:space-y-24 pb-20">
        {/* 1. System Topology Hero Section with $99 Commercial Bridge */}
        <Hero />

        {/* 2. Authentic Quality Gate & Engineering Governance Layer */}
        <TrustLayer />

        {/* 3. Interactive 4-Layer Master Genome Architecture Inspector */}
        <MasterGenomeInspector />

        {/* 4. Tiered Commercial Operating Systems Ecosystem (Tier 1 $99 & Tier 2) */}
        <WaveEcosystem products={ALL_PRODUCTS} />

        {/* 5. Transformation Engine (Old Way vs. Evolvith Codified Architecture) */}
        <TransformationEngine />

        {/* 6. Category Distinction: Operating System vs. General-Purpose AI Prompt */}
        <PromptVsOSComparison />

        {/* 7. Commercial Fulfillment Protocol: Choose -> Receive -> Deploy */}
        <FulfillmentJourney />

        {/* 8. CIO/CTO 48-Hour Rapid Deployment Protocol */}
        <DeploymentProtocol />

        {/* 9. Executive Action CTA */}
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
