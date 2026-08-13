import Link from 'next/link';

export const metadata = {
  title: 'About Evolvith — Operating Philosophy & Purpose',
  description: 'Learn about Evolvith, our mission, vision, core beliefs, and operating philosophy.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-16">
      <div className="max-w-3xl space-y-6">
        <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
          Company Profile
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
          Architecting the Future of Enterprise Performance
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Evolvith is the permanent Enterprise Operating System (EEOS) company. We manufacture autonomous Business Transformation Systems designed to elevate organizational performance, eliminate operational friction, and scale for decades.
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 rounded-3xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 font-mono">
            01
          </div>
          <h3 className="text-xl font-bold font-heading text-white">Purpose</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            To architect the enduring software engine governing global business transformation.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 font-mono">
            02
          </div>
          <h3 className="text-xl font-bold font-heading text-white">Mission</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            To manufacture enterprise-grade, reusable knowledge genomes and commercial operating systems that transform operational speed.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl space-y-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 font-mono">
            03
          </div>
          <h3 className="text-xl font-bold font-heading text-white">Vision</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            To become the supreme Enterprise Operating System standard governing transformed business units worldwide.
          </p>
        </div>
      </div>

      {/* Operating Philosophy */}
      <div className="glass-panel p-10 rounded-3xl border border-white/10 space-y-6">
        <h2 className="text-2xl font-extrabold font-heading text-white">
          Our Operating Philosophy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
          <div className="space-y-2">
            <h4 className="font-bold text-white text-base">1. Systems Over Silos</h4>
            <p className="text-gray-400 leading-relaxed">
              Isolated SaaS tools create fragmented operational chaos. We build unified operating systems where strategy, product, governance, and customer success operate as one continuous engine.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-base">2. Architectural Precision</h4>
            <p className="text-gray-400 leading-relaxed">
              We do not publish informal templates or temporary hacks. Every product is engineered against our frozen Master Genome Architecture and certified across Quality Gates QG0-QG6.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8 space-y-4">
        <h3 className="text-2xl font-bold text-white font-heading">
          Explore Our Commercial Operating Systems
        </h3>
        <Link href="/products" className="btn-primary inline-block px-8 py-4 text-sm">
          View Wave 1 Products Catalog
        </Link>
      </div>
    </div>
  );
}
