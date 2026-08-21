import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0B0F19] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded flex items-center justify-center font-bold text-white">
              E
            </div>
            <span className="font-heading font-extrabold text-lg tracking-wider text-white">
              EVOLVITH
            </span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            The Enterprise Operating System governing business transformation. Architectural precision built for multi-decade scale.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase font-mono">
            Tier 1 Focused (From $49)
          </h4>
          <ul className="space-y-2 text-xs font-mono text-gray-400">
            <li><Link href="/products/audit-os-01" className="hover:text-cyan-400 transition-colors text-emerald-400 font-bold">AUDIT-OS-01 ($49 Developer)</Link></li>
            <li><Link href="/products/forecast-os-01" className="hover:text-cyan-400 transition-colors">FORECAST-OS-01 ($99)</Link></li>
            <li><Link href="/products/close-os-01" className="hover:text-cyan-400 transition-colors">CLOSE-OS-01 ($99)</Link></li>
            <li><Link href="/products/retention-os-01" className="hover:text-cyan-400 transition-colors">RETENTION-OS-01 ($99)</Link></li>
            <li><Link href="/products/inventory-os-01" className="hover:text-cyan-400 transition-colors">INVENTORY-OS-01 ($99)</Link></li>
            <li><Link href="/products/workflow-os-01" className="hover:text-cyan-400 transition-colors">WORKFLOW-OS-01 ($99)</Link></li>
            <li><Link href="/products/kpi-os-01" className="hover:text-cyan-400 transition-colors">KPI-OS-01 ($99)</Link></li>
            <li><Link href="/products/policy-os-01" className="hover:text-cyan-400 transition-colors">POLICY-OS-01 ($99)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase font-mono">
            Tier 2A Enterprise
          </h4>
          <ul className="space-y-2 text-xs font-mono text-gray-400">
            <li><Link href="/products/rev-os-01" className="hover:text-cyan-400 transition-colors">REV-OS-01 ($249)</Link></li>
            <li><Link href="/products/fin-os-01" className="hover:text-cyan-400 transition-colors">FIN-OS-01 ($349)</Link></li>
            <li><Link href="/products/cx-os-01" className="hover:text-cyan-400 transition-colors">CX-OS-01 ($199)</Link></li>
            <li><Link href="/products/ops-os-02" className="hover:text-cyan-400 transition-colors">OPS-OS-02 ($299)</Link></li>
            <li><Link href="/products/data-os-01" className="hover:text-cyan-400 transition-colors">DATA-OS-01 ($179)</Link></li>
            <li><Link href="/products/gov-os-01" className="hover:text-cyan-400 transition-colors">GOV-OS-01 ($149)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase font-mono">
            Tier 2B & Tier 3
          </h4>
          <ul className="space-y-2 text-xs font-mono text-gray-400">
            <li className="text-[10px] text-emerald-400 uppercase font-bold pt-1">Strategic Entry ($99 Launch)</li>
            <li><Link href="/products/pipe-os-01" className="hover:text-cyan-400 transition-colors">PIPE-OS-01 ($99)</Link></li>
            <li><Link href="/products/cash-os-01" className="hover:text-cyan-400 transition-colors">CASH-OS-01 ($99)</Link></li>
            <li><Link href="/products/onboard-os-01" className="hover:text-cyan-400 transition-colors">ONBOARD-OS-01 ($99)</Link></li>
            <li className="text-[10px] text-purple-300 uppercase font-bold pt-2">Synthesis Organisms (In Dev)</li>
            <li><Link href="/products/command-os-01" className="hover:text-purple-300 transition-colors">COMMAND-OS-01 (T3-01)</Link></li>
            <li><Link href="/products/synthesis-os-01" className="hover:text-purple-300 transition-colors">SYNTHESIS-OS-01 (T3-02)</Link></li>
            <li><Link href="/products/strategy-os-01" className="hover:text-purple-300 transition-colors">STRATEGY-OS-01 (T3-03)</Link></li>
            <li><Link href="/products/intelligence-os-01" className="hover:text-purple-300 transition-colors">INTELLIGENCE-OS-01 (T3-04)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase font-mono">
            Company & Governance
          </h4>
          <ul className="space-y-2 text-xs font-mono text-gray-400">
            <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Evolvith</Link></li>
            <li><Link href="/workstations/audit-os-01" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"><span>AUDIT-OS-01 Workstation</span><span className="text-[9px] px-1 py-0.2 bg-emerald-500/20 text-emerald-400 rounded">LIVE</span></Link></li>
            <li><Link href="/redeem" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Redeem AppSumo Code</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Executive Briefing</Link></li>
            <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
          </ul>
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Commerce Layer Ready (Pre-Launch)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-mono">
        <p>© 2026 Evolvith Enterprise Operating System. All Rights Reserved.</p>
        <p>Architected under EEOS Layer 6 Brand Experience System (BES).</p>
      </div>
    </footer>
  );
}
