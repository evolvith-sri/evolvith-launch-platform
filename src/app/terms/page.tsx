export const metadata = {
  title: 'Terms of Service — Evolvith',
  description: 'Evolvith Enterprise Operating System commercial terms of service.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-8">
      <h1 className="text-4xl font-extrabold font-heading text-white">
        Terms of Service
      </h1>
      <p className="text-xs font-mono text-cyan-400">Effective Date: August 11, 2026</p>

      <div className="glass-panel p-10 rounded-3xl space-y-6 text-sm text-gray-300 leading-relaxed">
        <h3 className="text-lg font-bold text-white">1. Commercial License Grant</h3>
        <p>
          Purchasing an Evolvith Wave 1 Operating System grants the customer a perpetual, non-exclusive, internal commercial license to deploy and execute the operating system within their organization.
        </p>

        <h3 className="text-lg font-bold text-white">2. Intellectual Property Rights</h3>
        <p>
          The Master Genome Architecture, genetic subsystems, design tokens, and source code frameworks remain the exclusive intellectual property of Evolvith Enterprise Operating System.
        </p>

        <h3 className="text-lg font-bold text-white">3. Quality Certification</h3>
        <p>
          All commercial products are certified across Quality Gates QG0 through QG6. Customer modifications to underlying core files void factory warranty support.
        </p>
      </div>
    </div>
  );
}
