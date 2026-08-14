import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { MasterGenomeInspector } from '@/components/MasterGenomeInspector';
import { WaveEcosystem } from '@/components/WaveEcosystem';
import { TrustLayer } from '@/components/TrustLayer';
import { TransformationEngine } from '@/components/TransformationEngine';
import { DeploymentProtocol } from '@/components/DeploymentProtocol';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { WAVE_1_PRODUCTS } from '@/lib/products';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="space-y-16 sm:space-y-24 pb-20">
        {/* 1. System Topology Hero Section */}
        <Hero />

        {/* 2. Authentic Quality Gate & Engineering Governance Layer */}
        <TrustLayer />

        {/* 3. Interactive 4-Layer Master Genome Architecture Inspector */}
        <MasterGenomeInspector />

        {/* 4. Wave 1 Commercial Operating Systems Ecosystem */}
        <WaveEcosystem products={WAVE_1_PRODUCTS} />

        {/* 5. Transformation Engine (Old Way vs. Evolvith Codified Architecture) */}
        <TransformationEngine />

        {/* 6. CIO/CTO 48-Hour Rapid Deployment Protocol */}
        <DeploymentProtocol />

        {/* 7. Executive Action CTA */}
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
              Select one of our 6 Wave 1 commercial operating systems and deploy complete, quality-certified enterprise governance within 48 hours.
            </p>
            <div className="pt-2">
              <Link href="/products" className="btn-primary inline-block px-8 py-4 text-base font-bold">
                Explore All 6 Wave 1 Operating Systems
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}

