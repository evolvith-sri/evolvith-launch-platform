export function TrustLayer() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="glass-panel p-10 rounded-3xl border border-white/10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
              Enterprise Credibility & Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-2">
              Built on Uncompromising Engineering Discipline
            </h2>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            Zero Inflated Claims • 100% Quality Gate Certified Architecture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 bg-surface/50 p-6 rounded-2xl border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-sm font-mono">
              QG
            </div>
            <h4 className="font-bold text-white text-base">Quality Gate Certification</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every operating system passes 7 rigorous quality gates (QG0-QG6) auditing AST syntax, security boundaries, and SLA performance before graduation.
            </p>
          </div>

          <div className="space-y-3 bg-surface/50 p-6 rounded-2xl border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-sm font-mono">
              DNA
            </div>
            <h4 className="font-bold text-white text-base">Master Genome Architecture</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Standardized across 13 genetic subsystems (G01 Business DNA to G13 Continuous Evolution) to guarantee zero monolithic technical debt.
            </p>
          </div>

          <div className="space-y-3 bg-surface/50 p-6 rounded-2xl border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm font-mono">
              EDR
            </div>
            <h4 className="font-bold text-white text-base">Executive Decision Registry</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Governed under Layer 0 Executive Intelligence to log institutional decisions and enforce non-negotiable enterprise constitution principles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
