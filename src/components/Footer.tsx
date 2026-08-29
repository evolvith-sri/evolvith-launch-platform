import Link from 'next/link';
import { COMMERCIAL_PRODUCTS_COUNT } from '@/lib/products';

export function Footer() {
  return (
    <footer className="bg-[#0B0F19] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        {/* Brand Column */}
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
            Codified enterprise operating systems governing business transformation. Architectural precision built for multi-decade scale.
          </p>
        </div>

        {/* 1. EXPLORE */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase font-mono">
            Explore
          </h4>
          <ul className="space-y-2.5 text-xs font-mono text-gray-400">
            <li>
              <Link href="/products" className="hover:text-cyan-400 transition-colors flex items-center justify-between">
                <span>Products Catalog</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  {COMMERCIAL_PRODUCTS_COUNT} OS
                </span>
              </Link>
            </li>
            <li>
              <Link href="/store" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center justify-between">
                <span>Commercial Store</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  $49+
                </span>
              </Link>
            </li>
            <li>
              <Link href="/workstations" className="hover:text-cyan-400 transition-colors flex items-center justify-between">
                <span>Live Workstations</span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded">
                  LIVE
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* 2. RESOURCES */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase font-mono">
            Resources
          </h4>
          <ul className="space-y-2.5 text-xs font-mono text-gray-400">
            <li>
              <Link href="/docs" className="hover:text-cyan-400 transition-colors">
                Documentation & Runbooks
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-cyan-400 transition-colors">
                Customer & License Support
              </Link>
            </li>
            <li>
              <Link href="/redeem" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                Existing AppSumo Redemption
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. COMPANY */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase font-mono">
            Company
          </h4>
          <ul className="space-y-2.5 text-xs font-mono text-gray-400">
            <li>
              <Link href="/about" className="hover:text-cyan-400 transition-colors">
                About Evolvith
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-cyan-400 transition-colors">
                Contact & Governance
              </Link>
            </li>
            <li>
              <a
                href="https://store.dodopayments.com/evolvith"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Dodo Merchant Store</span>
                <span className="text-[9px] text-gray-500">↗</span>
              </a>
            </li>
          </ul>
        </div>

        {/* 4. LEGAL */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-xs tracking-wider uppercase font-mono">
            Legal & Trust
          </h4>
          <ul className="space-y-2.5 text-xs font-mono text-gray-400">
            <li>
              <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dodo Commerce Active (Live)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
        <p>© 2026 Evolvith Enterprise Operating System. All Rights Reserved.</p>
        <p>Architected under EEOS Layer 6 Brand Experience System (BES).</p>
      </div>
    </footer>
  );
}
