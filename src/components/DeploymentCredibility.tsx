export function DeploymentCredibility() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12" aria-labelledby="deployment-heading">
      <div className="bg-surface/60 border border-white/10 p-10 rounded-3xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono uppercase">
              CIO & CTO Integration Governance
            </span>
            <h2 id="deployment-heading" className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-2">
              48-Hour Rapid Deployment & Enterprise SLA Framework
            </h2>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            Zero Monolithic Lock-In • REST / Webhook Integration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl space-y-2 border border-white/5">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Speed</span>
            <h4 className="font-bold text-white text-base">48-Hour Setup</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Pre-built runbooks allow full installation and configuration within 2 business days.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-2 border border-white/5">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase">Integration</span>
            <h4 className="font-bold text-white text-base">API & Webhooks</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Native compatibility with Salesforce, HubSpot, Snowflake, SAP, and custom REST APIs.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-2 border border-white/5">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Risk</span>
            <h4 className="font-bold text-white text-base">Zero Lock-In</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Perpetual commercial licensing ensures your team retains 100% control over deployed assets.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-2 border border-white/5">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase">Support</span>
            <h4 className="font-bold text-white text-base">Architecture SLA</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Direct access to Evolvith systems engineers for implementation guidance and SOP updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
