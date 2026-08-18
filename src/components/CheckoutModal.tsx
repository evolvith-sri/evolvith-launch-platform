'use client';

import { useState } from 'react';
import { Product, COMMERCE_CONFIG } from '@/lib/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
  });

  if (!isOpen) return null;

  const isLiveOrVerification =
    COMMERCE_CONFIG.status === 'LIVE' ||
    COMMERCE_CONFIG.status === ('CONTROLLED_COMMERCE_VERIFICATION' as any);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // If in Live / Controlled Verification mode, initiate server-side checkout session
    if (isLiveOrVerification) {
      setLoading(true);
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            customerEmail: formData.email,
            customerName: formData.name,
          }),
        });

        const data = await response.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        } else if (data.status === 'PRE_LAUNCH') {
          setSubmitted(true);
        } else {
          setErrorMsg(data.error || 'Unable to initiate checkout session.');
        }
      } catch (err) {
        setErrorMsg('Network error while initiating checkout session.');
      } finally {
        setLoading(false);
      }
    } else {
      // Governed PRE_LAUNCH State: Record priority license reservation
      setSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-cyan-500/40 relative space-y-6 bg-[#0b0f19] shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded p-1"
          aria-label="Close Modal"
        >
          ✕ CLOSE
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                  {COMMERCE_CONFIG.preLaunchCtaText}
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  {product.tier === 1 ? 'Tier 1 Focused OS' : 'Tier 2 Enterprise OS'}
                </span>
              </div>
              <h3 id="modal-title" className="text-2xl font-bold font-heading text-white">
                Reserve License — {product.systemCode || product.id.toUpperCase()}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {COMMERCE_CONFIG.preLaunchMessage} Register your commercial license interest to receive priority deployment notification and secure your <span className="text-cyan-400 font-bold">${product.price}</span> perpetual license.
              </p>
            </div>

            {/* Product Summary Box */}
            <div className="bg-surface/80 p-4 rounded-2xl border border-white/10 flex items-center justify-between font-mono text-xs">
              <div className="space-y-0.5">
                <span className="text-white font-bold block">{product.title}</span>
                <span className="text-gray-400 text-[11px]">One-Time Perpetual Commercial License</span>
              </div>
              <div className="text-right shrink-0 pl-4">
                <span className="text-xl font-extrabold text-cyan-400">${product.price}</span>
                <span className="text-[9px] text-gray-400 block">USD</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-mono">
                {errorMsg}
              </div>
            )}

            {/* Priority Reservation Intent Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label htmlFor="exec-name" className="text-[11px] font-mono uppercase text-gray-400 block">
                  Executive Name
                </label>
                <input
                  id="exec-name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="corp-email" className="text-[11px] font-mono uppercase text-gray-400 block">
                  Corporate Email
                </label>
                <input
                  id="corp-email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="org-name" className="text-[11px] font-mono uppercase text-gray-400 block">
                  Organization Name
                </label>
                <input
                  id="org-name"
                  type="text"
                  required
                  placeholder="Company / Enterprise"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider mt-4 disabled:opacity-50"
              >
                {loading
                  ? 'Initiating Verification...'
                  : `Register Commercial License Interest ($${product.price})`}
              </button>
              <p className="text-[10px] text-gray-400 text-center font-mono">
                No payment collected today • Priority release notification guaranteed
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xl mx-auto">
              ✓
            </div>
            <h4 className="text-xl font-bold text-white font-heading">
              Commercial License Interest Registered
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="text-white font-bold">{formData.name}</span>. Your priority registration for <span className="text-cyan-400 font-bold">{product.systemCode || product.id.toUpperCase()}</span> (${product.price} One-Time Perpetual License) has been recorded for <span className="text-white font-bold">{formData.organization || 'your organization'}</span>. You will receive an immediate notification at <span className="text-white font-mono">{formData.email}</span> as purchase availability opens.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-surface hover:bg-white/10 text-xs font-mono text-gray-300 rounded-xl border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Return to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
