import Link from 'next/link';

export function MovementPhilosophy() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12" aria-labelledby="movement-heading">
      <div className="glass-panel p-12 rounded-3xl border border-white/10 relative overflow-hidden space-y-8">
        <div className="max-w-3xl space-y-4">
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
            The Evolvith Movement
          </span>
          <h2 id="movement-heading" className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Why We Manufacture Software Instead of Management Consulting
          </h2>
          <p className="text-gray-300 text-base leading-relaxed">
            Traditional management consulting sells expensive PDF decks that sit on executive shelves while operational chaos resumes. We believe enterprise transformation must be codified directly into executable, autonomous software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="bg-surface/60 p-8 rounded-2xl border border-red-500/20 space-y-3">
            <span className="text-xs font-mono text-red-400 font-bold uppercase">The Old Way</span>
            <h4 className="text-lg font-bold text-white">Management Consulting & Tool Sprawl</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-2"><span className="text-red-400 font-bold">✕</span> $500K+ consulting engagements producing static slides</li>
              <li className="flex items-center gap-2"><span className="text-red-400 font-bold">✕</span> Dozens of disconnected SaaS subscriptions causing tool entropy</li>
              <li className="flex items-center gap-2"><span className="text-red-400 font-bold">✕</span> High human friction, paper policies, and recurring operational defects</li>
            </ul>
          </div>

          <div className="bg-surface/60 p-8 rounded-2xl border border-cyan-500/30 space-y-3">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">The Evolvith Way</span>
            <h4 className="text-lg font-bold text-white">Codified Enterprise Operating Systems</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2"><span className="text-cyan-400 font-bold">✓</span> Pre-built commercial operating systems ready in 48 hours</li>
              <li className="flex items-center gap-2"><span className="text-cyan-400 font-bold">✓</span> Codified genetic architecture eliminating organizational entropy</li>
              <li className="flex items-center gap-2"><span className="text-cyan-400 font-bold">✓</span> One-time perpetual commercial licensing with zero seat bloat</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <Link href="/about" className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-semibold transition-colors">
            Read Our Complete Operating Philosophy →
          </Link>
        </div>
      </div>
    </section>
  );
}
