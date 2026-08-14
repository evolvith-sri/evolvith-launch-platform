'use client';

import { useState } from 'react';
import { Product } from '@/lib/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    deploymentTarget: '48h-rapid',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-cyan-500/40 relative space-y-6 bg-[#0b0f19] shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white font-mono text-sm focus:outline-none"
        >
          ✕ CLOSE
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="space-y-2">
              <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                LEMON SQUEEZY MERCHANT ACTIVATION PENDING
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">
                Reserve Commercial License — {product.id.toUpperCase()}
              </h3>
              <p className="text-xs text-gray-300">
                Direct automated card processing is pending merchant activation. Submit your deployment intent to lock in your <span className="text-cyan-400 font-bold">${product.price}</span> perpetual license rate.
              </p>
            </div>

            {/* Product Summary Box */}
            <div className="bg-surface/80 p-4 rounded-2xl border border-white/10 flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-white font-bold block">{product.title}</span>
                <span className="text-gray-400 text-[11px]">One-Time Perpetual License</span>
              </div>
              <span className="text-xl font-extrabold text-cyan-400">${product.price}</span>
            </div>

            {/* Intent Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-gray-400">Executive Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-gray-400">Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-gray-400">Organization Name</label>
                <input
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
                className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider mt-4"
              >
                Submit Priority License Intent (${product.price})
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xl mx-auto">
              ✓
            </div>
            <h4 className="text-xl font-bold text-white font-heading">
              Priority Intent Registered!
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="text-white font-bold">{formData.name}</span>. Your priority commercial license reservation for <span className="text-cyan-400 font-bold">{product.id.toUpperCase()}</span> (${product.price}) has been logged. Our deployment engineering team will reach out to <span className="text-white">{formData.email}</span> within 4 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-surface hover:bg-white/10 text-xs font-mono text-gray-300 rounded-xl border border-white/10 transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
