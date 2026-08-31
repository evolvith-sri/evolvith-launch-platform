'use client';

import { useState } from 'react';
import { logCommercialIntent } from '@/lib/telemetry';

export function SupportClientForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'DOWNLOAD',
    orderOrCode: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    logCommercialIntent({
      eventType: 'SUBMIT_SUPPORT_REQUEST',
    });

    // Simulate support ticket registration
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  if (submitted) {
    return (
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/40 text-center space-y-4 bg-surface">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xl mx-auto font-mono">
          ✓
        </div>
        <h3 className="text-xl font-bold text-white font-heading">
          Support Request Dispatched
        </h3>
        <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-white">{formData.name}</strong>. Your ticket regarding <strong className="text-cyan-400 font-mono">{formData.topic}</strong> has been logged. An engineering support representative will respond to <strong className="text-white font-mono">{formData.email}</strong> within your SLA window.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', topic: 'DOWNLOAD', orderOrCode: '', message: '' });
          }}
          className="px-6 py-2.5 bg-surface hover:bg-white/10 text-xs font-mono text-gray-300 rounded-xl border border-white/10 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block">
          Direct Ticket Submission
        </span>
        <h3 className="text-xl font-bold font-heading text-white">
          Submit a Support or License Inquiry
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] uppercase text-gray-400 block">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase text-gray-400 block">Work / Corporate Email</label>
            <input
              type="email"
              required
              placeholder="alex@enterprise.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] uppercase text-gray-400 block">Topic / Category</label>
            <select
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="PAYMENT">Payment & Invoicing (Dodo Payments)</option>
              <option value="REDEMPTION">AppSumo Deal Code Redemption</option>
              <option value="DOWNLOAD">Package Download & Token Recovery</option>
              <option value="INSTALLATION">Installation & CLI Runbook Setup</option>
              <option value="WORKSTATION">Live Workstation Diagnostic Access</option>
              <option value="DOCUMENTATION">Schema Specs & Technical Documentation</option>
              <option value="BUG">Bug Report / Technical Anomaly</option>
              <option value="FEATURE_REQUEST">Feature Request / Workflow Expansion</option>
              <option value="OTHER">Enterprise Procurement & General Inquiries</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] uppercase text-gray-400 block">
              Order ID / AppSumo Code (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. cks_... or EVOLVITH-XXXX"
              value={formData.orderOrCode}
              onChange={(e) => setFormData({ ...formData, orderOrCode: e.target.value })}
              className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] uppercase text-gray-400 block">Message / Description</label>
          <textarea
            required
            rows={4}
            placeholder="Describe your issue or technical question..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-xs font-bold uppercase tracking-wider font-mono disabled:opacity-50"
        >
          {loading ? 'Submitting Ticket...' : 'Submit Support Request →'}
        </button>
      </form>
    </div>
  );
}
