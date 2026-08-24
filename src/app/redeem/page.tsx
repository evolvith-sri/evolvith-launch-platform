'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CustomerFeedbackForm } from '@/components/CustomerFeedbackForm';
import {
  KeyRound,
  Mail,
  CheckCircle2,
  AlertCircle,
  Download,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Terminal,
  Clock,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface EntitlementResponse {
  entitlementId: string;
  product: string;
  title: string;
  customerEmail: string;
  licenseType: string;
  source: string;
  redeemedAt: string;
  distributionPackage: string;
}

export default function RedeemPage() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<'forecast-os-01' | 'audit-os-01'>('audit-os-01');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    entitlement: EntitlementResponse;
    downloadUrl: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedCode = code.trim().toUpperCase();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedCode) {
      setError('Please enter your AppSumo redemption code.');
      return;
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid work or corporate email address.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: trimmedCode,
          email: trimmedEmail,
          product: 'auto',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Redemption failed. Please verify your code and try again.');
        setIsLoading(false);
        return;
      }

      setSuccessData({
        entitlement: data.entitlement,
        downloadUrl: data.downloadUrl,
      });
    } catch (err: any) {
      setError('A network or server error occurred. Please check your connection and retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Top Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AppSumo Marketplace Partner Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
          Redeem Your License
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Activate your perpetual commercial license for <strong className="text-white">FORECAST-OS-01</strong> or <strong className="text-white">AUDIT-OS-01</strong> and instantly receive your unencrypted digital product package.
        </p>
      </div>

      {!successData ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Product Info Card */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="space-y-3 pb-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  Tier 1 Codified Operating System
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase font-bold border border-emerald-500/30">
                  Perpetual Grant
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-heading">
                FORECAST-OS-01
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Deterministic revenue & sales forecasting engine. Replaces opaque SaaS black boxes with an inspectable local Python runtime.
              </p>
            </div>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Unlimited internal team seats</span>
              </div>
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Local & private cloud execution</span>
              </div>
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Complete unencrypted Python runtime + AST</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Lifetime v1.x maintenance updates</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                Official Package Identifier
              </span>
              <p className="text-xs font-mono text-cyan-300">
                FORECAST-OS-01_v1.0.0.zip
              </p>
            </div>
          </div>

          {/* Right: Redemption Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white font-heading">
                License Activation
              </h2>
              <p className="text-xs text-gray-400">
                Enter your AppSumo voucher code and recipient email address below.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <div className="space-y-1">
                  <p className="font-semibold text-rose-200">Redemption Notice</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="appsumo-code"
                  className="block text-xs font-mono uppercase text-gray-300 font-semibold tracking-wider"
                >
                  AppSumo Redemption Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="appsumo-code"
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. AS-FORECAST-XXXX-XXXX"
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-white/15 rounded-xl text-white font-mono text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 uppercase transition-all"
                  />
                </div>
                <p className="text-[11px] text-gray-500">
                  Find your code in your AppSumo account under Purchases / Products.
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="customer-email"
                  className="block text-xs font-mono uppercase text-gray-300 font-semibold tracking-wider"
                >
                  Licensee Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="customer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-white/15 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
                <p className="text-[11px] text-gray-500">
                  Your perpetual license entitlement will be registered to this address.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3.5 text-xs font-bold uppercase font-mono tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code & Generating Entitlement...</span>
                  </>
                ) : (
                  <>
                    <span>Redeem Code & Activate License</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <span>Need assistance?</span>
              <a
                href="mailto:support@evolvith.com"
                className="text-cyan-400 hover:underline font-mono"
              >
                support@evolvith.com
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Success State View */
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/30 space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider block">
                  Perpetual Entitlement Activated
                </span>
                <h2 className="text-xl font-bold text-white font-heading">
                  {successData.entitlement.product} — {successData.entitlement.title}
                </h2>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-mono uppercase text-gray-400 block">Licensee</span>
              <span className="text-sm font-semibold text-white font-mono">{successData.entitlement.customerEmail}</span>
            </div>
          </div>

          {/* Primary Fulfillment Action */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider block">
                Instant Package Download
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                Ready for Download: {successData.entitlement.distributionPackage}
              </h3>
              <p className="text-xs text-gray-300">
                Complete unencrypted Python runtime engine, CLI installer, AST schemas, and deployment documentation.
              </p>
            </div>
            <a
              href={successData.downloadUrl}
              download={successData.entitlement.distributionPackage}
              className="btn-primary px-7 py-3.5 text-xs font-bold uppercase font-mono tracking-wider shrink-0 shadow-lg shadow-emerald-500/20 text-center w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Package (.zip)</span>
            </a>
          </div>

          {/* Entitlement Metadata Ledger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface/80 border border-white/5 text-xs">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Entitlement ID</span>
              <span className="font-mono text-cyan-300 truncate block mt-0.5">{successData.entitlement.entitlementId}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase block">License Model</span>
              <span className="text-white font-semibold block mt-0.5">{successData.entitlement.licenseType}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Acquisition Channel</span>
              <span className="text-cyan-400 font-mono block mt-0.5">{successData.entitlement.source}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Activation Timestamp</span>
              <span className="text-gray-300 font-mono block mt-0.5">
                {new Date(successData.entitlement.redeemedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Rapid Deployment Runbook */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-gray-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>48-Hour Rapid Installation Runbook</span>
            </h3>

            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-gray-300 space-y-3">
              <p className="text-gray-400"># 1. Unzip the distribution package:</p>
              <p className="text-cyan-300 pl-3">unzip {successData.entitlement.distributionPackage} -d ./{successData.entitlement.product.toLowerCase()}</p>
              <p className="text-gray-400"># 2. Run automated CLI installer and environment diagnostics:</p>
              <p className="text-cyan-300 pl-3">cd {successData.entitlement.product.toLowerCase()} &amp;&amp; python install.py</p>
              <p className="text-gray-400"># 3. Launch local command line interface or workstation:</p>
              <p className="text-cyan-300 pl-3">
                {successData.entitlement.product.toLowerCase().includes('audit')
                  ? 'python src/audit_cli.py --help'
                  : 'python run_forecast.py --input sample_pipeline.csv'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={successData.entitlement.product.toLowerCase().includes('audit') ? '/products/audit-os-01' : '/products/forecast-os-01'}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              ← View {successData.entitlement.product} Master Blueprint
            </Link>
            {successData.entitlement.product.toLowerCase().includes('audit') && (
              <Link
                href="/workstations/audit-os-01"
                className="btn-primary px-4 py-2 text-xs font-mono font-bold"
              >
                ⚡ Open AUDIT-OS-01 Workstation
              </Link>
            )}
            <Link
              href="/"
              className="glass-panel px-6 py-2.5 text-xs font-bold uppercase font-mono tracking-wider text-gray-300 hover:text-white"
            >
              Return to Platform Overview
            </Link>
          </div>

          {/* Customer Feedback & Research Loop */}
          <div className="pt-6">
            <CustomerFeedbackForm
              productId={successData.entitlement.product.toLowerCase()}
              systemTitle={successData.entitlement.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}
