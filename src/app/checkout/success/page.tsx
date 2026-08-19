import Link from 'next/link';
import { getProductCommerceMapping } from '@/lib/commerce';
import { generateSignedDownloadToken } from '@/lib/delivery';

export const metadata = {
  title: 'Order Confirmed — Evolvith Commerce',
  description: 'Commercial license order confirmation and digital product package fulfillment.',
};

interface SuccessPageProps {
  searchParams: {
    product?: string;
    tier?: string;
    session_id?: string;
    test_mode?: string;
  };
}

export default function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const productId = searchParams.product || 'rev-os-01';
  const mapping = getProductCommerceMapping(productId) || getProductCommerceMapping('rev-os-01')!;
  const isTestMode = searchParams.test_mode === 'true';
  const hasSessionOrToken = Boolean(
    searchParams.token || (searchParams.session_id && searchParams.session_id.trim() !== '')
  );

  let downloadUrl = '';
  let canDownload = false;

  if (hasSessionOrToken) {
    const sessionId = searchParams.session_id || 'direct_session';
    try {
      const token = searchParams.token || generateSignedDownloadToken(mapping.productId, sessionId);
      downloadUrl = `/api/download?product=${mapping.productId}&token=${token}&session_id=${sessionId}`;
      canDownload = true;
    } catch (err) {
      canDownload = false;
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-10">
      {/* Top Status Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-3xl mx-auto font-mono">
          ✓
        </div>
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
            {isTestMode ? 'Test Transaction Confirmed' : 'Payment Confirmed & Verified'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Order Confirmation
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Your commercial perpetual license for <strong className="text-white">{mapping.systemCode}</strong> has been generated and provisioned.
          </p>
        </div>
      </div>

      {/* Order & Entitlement Summary Card */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block">
              Tier {mapping.tier} Operating System
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{mapping.title}</h2>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-2xl font-extrabold font-mono text-cyan-400">
              ${mapping.governedPrice} USD
            </span>
            <span className="block text-[10px] font-mono text-gray-400 uppercase">
              One-Time Perpetual License
            </span>
          </div>
        </div>

        {/* Primary Digital Delivery Download Banner */}
        {canDownload ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider block">
                Instant Package Fulfillment
              </span>
              <h3 className="text-lg font-bold text-white font-heading">
                Ready for Download: {mapping.distributionPackage}
              </h3>
              <p className="text-xs text-gray-300">
                Complete unencrypted runtime package, CLI installer, AST schemas, and deployment documentation.
              </p>
            </div>
            <a
              href={downloadUrl}
              download={mapping.distributionPackage}
              className="btn-primary px-7 py-3.5 text-xs font-bold uppercase font-mono tracking-wider shrink-0 shadow-lg shadow-cyan-500/20 text-center w-full sm:w-auto"
            >
              Download Package (.zip)
            </a>
          </div>
        ) : (
          <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider block">
                Verification Required
              </span>
              <h3 className="text-base font-bold text-white font-heading">
                No Active Purchase Session Detected
              </h3>
              <p className="text-xs text-gray-300">
                Direct navigation without an active Dodo checkout session is not authorized for package download. Please initiate checkout from the commercial catalog.
              </p>
            </div>
            <Link
              href={`/products/${mapping.productId}`}
              className="btn-primary px-6 py-2.5 text-xs font-bold uppercase font-mono shrink-0"
            >
              View System Blueprint
            </Link>
          </div>
        )}

        {/* 4-Step Governed Fulfillment Path */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-gray-200">
            Fulfillment & Rapid Deployment Protocol
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface/80 p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <span>01</span>
                <span>Digital Product Package</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Distribution archive <strong className="text-white font-mono">{mapping.distributionPackage}</strong> containing full unencrypted Python runtime engine and AST schemas.
              </p>
            </div>

            <div className="bg-surface/80 p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <span>02</span>
                <span>Commercial License Grant</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                One-time perpetual commercial license with unlimited internal user seats and zero recurring subscription fees.
              </p>
            </div>

            <div className="bg-surface/80 p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <span>03</span>
                <span>48-Hour Rapid Runbook</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Execute automated CLI diagnostics and schema bindings via <code className="text-cyan-300 font-mono text-[11px]">python install.py</code>.
              </p>
            </div>

            <div className="bg-surface/80 p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <span>04</span>
                <span>Engineering Support Channel</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Direct architect access at <a href="mailto:support@evolvith.com" className="text-cyan-400 underline">support@evolvith.com</a> for configuration telemetry, webhook bindings, and deployment verification.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <Link
            href={`/products/${mapping.productId}`}
            className="text-xs font-mono text-cyan-400 hover:underline"
          >
            ← Return to {mapping.systemCode} Blueprint
          </Link>
          <Link
            href="/"
            className="glass-panel px-6 py-3 text-xs font-bold uppercase font-mono tracking-wider w-full sm:w-auto text-center text-gray-300 hover:text-white"
          >
            Platform Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
