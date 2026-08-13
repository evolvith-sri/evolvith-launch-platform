import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden" aria-labelledby="hero-heading">
      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-cyan-500/20 to-indigo-600/20 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
        {/* 1. WHAT IS EVOLVITH? */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Evolvith • Enterprise Operating Systems Manufacturer</span>
        </div>

        {/* Headline Hierarchy */}
        <h1
          id="hero-heading"
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]"
        >
          Eliminate Operational Friction & <span className="text-gradient">Standardize Execution</span>
        </h1>

        {/* 2. WHY DOES IT MATTER? */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          We manufacture autonomous operating systems that replace fragmented SaaS sprawl, manual spreadsheets, and organizational entropy with codified enterprise architecture.
        </p>

        {/* 3. WHAT SHOULD I DO NEXT? */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/products"
            className="btn-primary px-8 py-4 text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Explore Wave 1 Commercial OSs
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 text-base font-semibold text-gray-300 hover:text-white glass-panel rounded-lg w-full sm:w-auto transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Request Executive Briefing
          </Link>
        </div>

        {/* Executive Trust Badges */}
        <div className="pt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-3xl font-extrabold text-white">48 Hours</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">Rapid Deployment</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-3xl font-extrabold text-cyan-400">100%</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">Quality Gate Certified</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-3xl font-extrabold text-indigo-400">Zero</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">Monolithic Lock-In</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <p className="text-3xl font-extrabold text-white">v1.0-RC1</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">Vercel Edge Ready</p>
          </div>
        </div>
      </div>
    </section>
  );
}
