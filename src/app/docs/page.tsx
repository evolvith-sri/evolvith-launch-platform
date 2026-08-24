import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Documentation & Deployment Runbooks — Evolvith',
  description:
    'Comprehensive technical documentation, 48-hour rapid deployment protocols, AST schema guides, and CLI harnesses for Evolvith Operating Systems.',
  openGraph: {
    title: 'Evolvith Documentation & Deployment Runbooks',
    description:
      'Explore architecture specifications, CLI installers, AST schema diffing guides, and license fulfillment protocols.',
    type: 'website',
  },
};

export default function DocsPage() {
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
          <span>Enterprise Technical Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
          Evolvith Operating System <span className="text-gradient">Runbooks & Docs</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Production-grade engineering manuals, rapid deployment runbooks, schema contracts, and integration guides for all 17 active Evolvith Enterprise Operating Systems.
        </p>
      </section>

      {/* Grid of Documentation Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Index */}
        <div className="space-y-6 md:col-span-1">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 sticky top-28">
            <h3 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider">
              Documentation Index
            </h3>
            <nav className="space-y-2 text-xs font-mono">
              <a href="#quickstart" className="block text-gray-300 hover:text-cyan-400 py-1 transition-colors">
                1. 48-Hour Rapid Setup Protocol
              </a>
              <a href="#architecture" className="block text-gray-300 hover:text-cyan-400 py-1 transition-colors">
                2. Master Genome 4-Layer Architecture
              </a>
              <a href="#audit-os" className="block text-gray-300 hover:text-cyan-400 py-1 transition-colors">
                3. AUDIT-OS-01 Workstation & CLI
              </a>
              <a href="#commerce-fulfillment" className="block text-gray-300 hover:text-cyan-400 py-1 transition-colors">
                4. Dodo Commerce & Package Fulfillment
              </a>
              <a href="#appsumo-redemption" className="block text-gray-300 hover:text-cyan-400 py-1 transition-colors">
                5. AppSumo Redemption Protocol
              </a>
              <a href="#governance-eula" className="block text-gray-300 hover:text-cyan-400 py-1 transition-colors">
                6. Claim Governance & Commercial EULA
              </a>
            </nav>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/workstations/audit-os-01"
                className="block w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono text-center transition-colors"
              >
                Launch AUDIT-OS-01 Live →
              </Link>
              <Link
                href="/store"
                className="block w-full py-2.5 px-3 btn-primary text-xs font-mono text-center uppercase font-bold"
              >
                Commercial Store ($49+)
              </Link>
            </div>
          </div>
        </div>

        {/* Main Documentation Content */}
        <div className="md:col-span-2 space-y-14 text-sm text-gray-300 leading-relaxed">
          {/* Section 1 */}
          <section id="quickstart" className="space-y-4 pt-4">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Section 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              48-Hour Rapid Deployment Protocol
            </h2>
            <p>
              Evolvith operating systems are engineered as zero-dependency runtime packages designed for instant deployment without complex multi-month consulting engagements.
            </p>
            <div className="bg-[#070A11] p-5 rounded-2xl border border-white/10 font-mono text-xs text-gray-300 space-y-3">
              <div className="text-cyan-400 font-bold"># Step 1: Extract Runtime Package</div>
              <pre className="text-gray-400 overflow-x-auto p-3 bg-black/40 rounded-lg">
                unzip AUDIT-OS-01_v1.0.0.zip -d ./evolvith-workstation{'\n'}
                cd ./evolvith-workstation
              </pre>
              <div className="text-cyan-400 font-bold"># Step 2: Run Automated CLI Verification</div>
              <pre className="text-gray-400 overflow-x-auto p-3 bg-black/40 rounded-lg">
                python -m evolvith_cli verify-contract --schema ./schemas/webhook.json
              </pre>
            </div>
          </section>

          {/* Section 2 */}
          <section id="architecture" className="space-y-4 pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Section 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Master Genome 4-Layer Architecture
            </h2>
            <p>
              Every Evolvith system is manufactured according to the Master Genome specification:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
              <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-cyan-400 font-bold">Layer 1: Strategy Core</span>
                <p className="text-gray-400 text-[11px]">
                  Governed decision trees, ROI target models, and executive charter playbooks.
                </p>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-indigo-400 font-bold">Layer 2: State Machine</span>
                <p className="text-gray-400 text-[11px]">
                  Deterministic business process transitions and stage-gate SLA monitors.
                </p>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-emerald-400 font-bold">Layer 3: Schema Registry</span>
                <p className="text-gray-400 text-[11px]">
                  Zero-drift JSON Schema and AST contracts for all inbound and outbound payloads.
                </p>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-1">
                <span className="text-purple-400 font-bold">Layer 4: Runbook Engine</span>
                <p className="text-gray-400 text-[11px]">
                  CLI installers, automated test harnesses, and offline cryptographic validators.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="audit-os" className="space-y-4 pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Section 03
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              AUDIT-OS-01 Workstation & CLI Harness
            </h2>
            <p>
              AUDIT-OS-01 provides full-stack engineers and technical automation teams with local-first API contract QA:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-300 text-xs">
              <li><strong>AST Schema Diff Engine</strong>: Identifies breaking field deletions and type mutations.</li>
              <li><strong>1-Click Code Generation</strong>: Generates TypeScript interfaces, Zod validators, and Python Pydantic v2 schemas.</li>
              <li><strong>Localhost Replay Studio</strong>: Safe replay of production webhook payloads to localhost endpoints.</li>
              <li><strong>Offline HMAC Sandboxing</strong>: Instant cryptographic validation of Stripe, Shopify, and GitHub signatures.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="commerce-fulfillment" className="space-y-4 pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Section 04
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Dodo Commerce & License Fulfillment
            </h2>
            <p>
              Commercial transactions are processed securely via Dodo Payments. Upon checkout completion:
            </p>
            <ol className="space-y-2 list-decimal list-inside text-gray-300 text-xs">
              <li>Dodo verifies payment and returns a confirmed checkout session.</li>
              <li>Evolvith edge infrastructure generates a time-limited cryptographically signed fulfillment token.</li>
              <li>The customer is redirected to the verified download page with immediate package access.</li>
            </ol>
          </section>

          {/* Section 5 */}
          <section id="appsumo-redemption" className="space-y-4 pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Section 05
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              AppSumo Marketplace Redemption Protocol
            </h2>
            <p>
              AppSumo redemption operates via an isolated, atomic redemption engine:
            </p>
            <div className="bg-[#070A11] p-5 rounded-2xl border border-white/10 text-xs space-y-2 font-mono">
              <div className="text-cyan-400 font-bold">Redemption URL: https://www.evolvith.com/redeem</div>
              <p className="text-gray-400">
                Code format: <code className="text-white">EVOLVITH-XXXX-XXXX-XXXX</code> or standard AppSumo deal codes.
                Redemption automatically verifies the license database, writes atomic entitlement records, and delivers signed runtime packages.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="governance-eula" className="space-y-4 pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Section 06
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Claim Governance & Commercial EULA
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              All modeled efficiency and velocity statistics referenced across Evolvith specifications carry the required canonical notice:
              <strong className="text-white font-mono block mt-1">MODELED TARGET — NOT HISTORICAL PERFORMANCE</strong>
              Perpetual licenses grant perpetual deployment rights for internal enterprise operations, with unencrypted runtime code and zero vendor telemetry dependencies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
