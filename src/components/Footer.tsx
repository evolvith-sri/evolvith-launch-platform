import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0B0F19] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
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
          <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">
            Wave 1 Products
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/products/rev-os-01" className="hover:text-cyan-400 transition-colors">REV-OS-01 Revenue Ops</Link></li>
            <li><Link href="/products/fin-os-01" className="hover:text-cyan-400 transition-colors">FIN-OS-01 Finance Ops</Link></li>
            <li><Link href="/products/cx-os-01" className="hover:text-cyan-400 transition-colors">CX-OS-01 Customer Success</Link></li>
            <li><Link href="/products/ops-os-02" className="hover:text-cyan-400 transition-colors">OPS-OS-02 Global Supply</Link></li>
            <li><Link href="/products/data-os-01" className="hover:text-cyan-400 transition-colors">DATA-OS-01 Analytics OS</Link></li>
            <li><Link href="/products/gov-os-01" className="hover:text-cyan-400 transition-colors">GOV-OS-01 Risk & Governance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Evolvith</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Sales</Link></li>
            <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">
            System Status
          </h4>
          <div className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <p className="text-xs text-gray-300 font-medium">EEOS v1.0.0 Active</p>
              <p className="text-[11px] text-gray-500">All Systems Operational</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2026 Evolvith Enterprise Operating System. All Rights Reserved.</p>
        <p>Architected under EEOS Layer 6 Brand Experience System (BES).</p>
      </div>
    </footer>
  );
}
