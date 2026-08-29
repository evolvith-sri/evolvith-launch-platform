import { Metadata } from 'next';
import Link from 'next/link';
import { DODO_STOREFRONT_URL } from '@/lib/products';
import { SupportClientForm } from './SupportClientForm';

export const metadata: Metadata = {
  title: 'Enterprise Support & License Assistance — Evolvith',
  description:
    'Dedicated support portal for Evolvith commercial license holders, package recovery, technical assistance, and AppSumo redemption queries.',
  openGraph: {
    title: 'Evolvith Support & Technical Assistance',
    description:
      'Access license recovery, runtime package downloads, deployment troubleshooting, and executive SLA support.',
    type: 'website',
  },
};

export default function SupportPage() {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 space-y-14">
      {/* Top Banner */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Customer & Technical Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
          Evolvith <span className="text-gradient">Support & Assistance</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Need help deploying an operating system, recovering a commercial license key, or verifying AppSumo redemption? Our engineering team is ready to assist.
        </p>
      </section>

      {/* 3 Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold text-lg">
            📦
          </div>
          <h3 className="text-lg font-bold text-white font-heading">
            Commercial Store Orders
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Instant fulfillment for all Dodo Payments purchases. Packages can be re-downloaded anytime with your verified order session ID.
          </p>
          <div className="pt-2">
            <Link href="/store" className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold">
              Browse Commercial Store →
            </Link>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-lg">
            🎟️
          </div>
          <h3 className="text-lg font-bold text-white font-heading">
            Existing AppSumo Redemption
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Redeem existing deal voucher codes, validate entitlement records, and download inspectable distribution zip packages.
          </p>
          <div className="pt-2">
            <Link href="/redeem" className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold">
              Go to Redemption Portal →
            </Link>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-mono font-bold text-lg">
            📖
          </div>
          <h3 className="text-lg font-bold text-white font-heading">
            Technical Runbooks & Docs
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Access 48-hour rapid deployment instructions, CLI installation scripts, AST schema diff guides, and mock servers.
          </p>
          <div className="pt-2">
            <Link href="/docs" className="text-xs font-mono text-indigo-400 hover:text-indigo-300 font-bold">
              Open Documentation Center →
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Support Request Form & SLA Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SupportClientForm />
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider">
              Support SLAs & Response Times
            </h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-surface rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">Commercial Licensees</span>
                  <span className="text-cyan-400">&lt; 12 Hours</span>
                </div>
                <p className="text-gray-400 text-[11px]">Direct developer assistance & package updates.</p>
              </div>

              <div className="p-3 bg-surface rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">AppSumo Redeemers</span>
                  <span className="text-emerald-400">&lt; 24 Hours</span>
                </div>
                <p className="text-gray-400 text-[11px]">Redemption validation & package delivery support.</p>
              </div>

              <div className="p-3 bg-surface rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">Direct Email</span>
                  <span className="text-white">support@evolvith.com</span>
                </div>
                <p className="text-gray-400 text-[11px]">Engineering support desk.</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider">
              Direct Commerce Layer
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              All commercial billing, invoice generation, and tax compliance are securely managed via Dodo Payments.
            </p>
            <a
              href={DODO_STOREFRONT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
            >
              <span>Visit Dodo Storefront</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
