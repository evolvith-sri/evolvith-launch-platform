export const metadata = {
  title: 'Privacy Policy — Evolvith',
  description: 'Evolvith Enterprise Operating System privacy policy and data governance rules.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-8">
      <h1 className="text-4xl font-extrabold font-heading text-white">
        Privacy Policy
      </h1>
      <p className="text-xs font-mono text-cyan-400">Effective Date: August 11, 2026</p>

      <div className="glass-panel p-10 rounded-3xl space-y-6 text-sm text-gray-300 leading-relaxed">
        <h3 className="text-lg font-bold text-white">1. Data Privacy Philosophy</h3>
        <p>
          Evolvith operates under strict privacy-first principles. We collect only minimal telemetry essential for product delivery, license verification, and security compliance. We never sell customer data to third parties.
        </p>

        <h3 className="text-lg font-bold text-white">2. Information Collection</h3>
        <p>
          When purchasing commercial operating systems, transaction data is processed securely through our commerce partner Lemon Squeezy. We do not store financial credit card details on Evolvith servers.
        </p>

        <h3 className="text-lg font-bold text-white">3. Telemetry & Analytics</h3>
        <p>
          Our web platform utilizes cookieless, privacy-preserving analytics to track page performance without harvesting personally identifiable information (PII).
        </p>

        <h3 className="text-lg font-bold text-white">4. Enterprise Governance</h3>
        <p>
          Enterprise operating system configurations deployed inside customer infrastructure remain 100% customer-owned and isolated.
        </p>
      </div>
    </div>
  );
}
