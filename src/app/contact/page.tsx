export const metadata = {
  title: 'Contact Sales & Enterprise Consultation — Evolvith',
  description: 'Connect with Evolvith executive team for enterprise operating system consultation.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-16">
      <div className="max-w-3xl space-y-6">
        <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
          Enterprise Engagement
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
          Contact Evolvith Executive Team
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Inquire about enterprise licensing, custom operating system manufacturing, or schedule a strategic briefing with our architecture team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2 glass-panel p-10 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-2xl font-bold font-heading text-white">
            Send an Enterprise Inquiry
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-gray-400">Full Name</label>
                <input
                  type="text"
                  placeholder="Executive Name"
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-gray-400">Corporate Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-gray-400">Target Operating System</label>
              <select className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500">
                <option value="rev-os-01">REV-OS-01 Revenue Ops OS ($249)</option>
                <option value="fin-os-01">FIN-OS-01 Financial Intelligence OS ($349)</option>
                <option value="cx-os-01">CX-OS-01 Customer Success OS ($199)</option>
                <option value="ops-os-02">OPS-OS-02 Supply Chain Ops OS ($299)</option>
                <option value="data-os-01">DATA-OS-01 Data & Analytics OS ($179)</option>
                <option value="gov-os-01">GOV-OS-01 Risk & Governance OS ($149)</option>
                <option value="enterprise">Bespoke Enterprise Operating System</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-gray-400">Inquiry Message</label>
              <textarea
                rows={4}
                placeholder="Describe your enterprise requirements..."
                className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <button type="button" className="btn-primary w-full py-4 text-sm font-bold">
              Submit Enterprise Inquiry
            </button>
          </form>
        </div>

        {/* Executive Channels */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <h4 className="font-bold text-white text-base">Direct Sales</h4>
            <p className="text-xs text-gray-400">Inquire about volume licensing and custom commercial deployments.</p>
            <p className="text-sm font-mono text-cyan-400">sales@evolvith.com</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <h4 className="font-bold text-white text-base">Enterprise Advisory</h4>
            <p className="text-xs text-gray-400">Schedule architectural consultation with executive advisors.</p>
            <p className="text-sm font-mono text-cyan-400">enterprise@evolvith.com</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <h4 className="font-bold text-white text-base">Customer Support</h4>
            <p className="text-xs text-gray-400">Technical support and deployment runbook assistance.</p>
            <p className="text-sm font-mono text-cyan-400">support@evolvith.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
