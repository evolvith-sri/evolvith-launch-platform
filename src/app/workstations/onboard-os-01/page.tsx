'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { logCommercialIntent } from '@/lib/telemetry';

interface AssetItem {
  id: string;
  name: string;
  category: 'BRANDING' | 'CONTENT' | 'TECHNICAL' | 'ACCESS';
  required: boolean;
  status: 'MISSING' | 'RECEIVED' | 'VERIFIED';
  assetUrl?: string;
  notes?: string;
}

export default function OnboardOsWorkstationPage() {
  const [clientName, setClientName] = useState('Acme SaaS Corp');
  const [projectTitle, setProjectTitle] = useState('Q3 Website & Webhook Portal Redesign');
  const [activeView, setActiveView] = useState<'agency' | 'client_portal' | 'security'>('agency');
  const [reminderCopied, setReminderCopied] = useState(false);

  // Asset Checklist State
  const [assets, setAssets] = useState<AssetItem[]>([
    {
      id: 'brand_logo_vector',
      name: 'Brand Logo (Vector SVG / Figma)',
      category: 'BRANDING',
      required: true,
      status: 'RECEIVED',
      assetUrl: 'https://figma.com/file/sample-acme-brand',
      notes: 'Primary SVG logo and dark mode variations provided'
    },
    {
      id: 'brand_guidelines',
      name: 'Brand Style Guide & Colors',
      category: 'BRANDING',
      required: true,
      status: 'RECEIVED',
      assetUrl: 'https://drive.google.com/acme-brandbook.pdf',
      notes: 'Hex codes and typography scales verified'
    },
    {
      id: 'copy_content_doc',
      name: 'Approved Copywriting & Messaging Doc',
      category: 'CONTENT',
      required: true,
      status: 'MISSING',
      assetUrl: '',
      notes: ''
    },
    {
      id: 'domain_dns_access',
      name: 'DNS / Domain Access (Cloudflare / Namecheap)',
      category: 'TECHNICAL',
      required: true,
      status: 'MISSING',
      assetUrl: '',
      notes: ''
    },
    {
      id: 'analytics_access',
      name: 'Google Analytics 4 / GTM Invite',
      category: 'ACCESS',
      required: false,
      status: 'RECEIVED',
      assetUrl: 'dev-team@evolvith.com',
      notes: 'Editor access granted on GTM'
    },
    {
      id: 'stripe_byok_share',
      name: 'Payment Gateway BYOK Secret Share',
      category: 'ACCESS',
      required: false,
      status: 'MISSING',
      assetUrl: '',
      notes: ''
    }
  ]);

  // Zero-Plaintext Credential Note Scanner
  const [credNote, setCredNote] = useState('https://vault.bitwarden.com/#/share/5f8e9102-acme-cloudflare-api');
  const [credSecurityStatus, setCredSecurityStatus] = useState({
    safe: true,
    message: 'Zero-Plaintext Policy Satisfied: Using secure 1Password / Bitwarden share link.'
  });

  useEffect(() => {
    logCommercialIntent({
      eventType: 'LAUNCH_WORKSTATION',
      productId: 'onboard-os-01',
      systemCode: 'ONBOARD-OS-01',
    });
  }, []);

  const updateAssetStatus = (id: string, newStatus: 'MISSING' | 'RECEIVED' | 'VERIFIED') => {
    setAssets(assets.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleCredScan = (val: string) => {
    setCredNote(val);
    const low = val.toLowerCase();
    if (low.includes('password=') || low.includes('password:') || low.includes('pass=')) {
      setCredSecurityStatus({
        safe: false,
        message: 'Security Alert: Plaintext password pattern detected. Please use a secure secret share link (Bitwarden/1Password).'
      });
    } else {
      setCredSecurityStatus({
        safe: true,
        message: 'Zero-Plaintext Policy Satisfied: Clean encrypted reference / secret manager link.'
      });
    }
  };

  const requiredAssets = assets.filter(a => a.required);
  const receivedRequired = requiredAssets.filter(a => a.status === 'RECEIVED' || a.status === 'VERIFIED');
  const missingRequired = requiredAssets.filter(a => a.status === 'MISSING');
  const completionPct = Math.round((receivedRequired.length / requiredAssets.length) * 100);
  const isReadyToBegin = missingRequired.length === 0;

  const reminderText = `Hi ${clientName},

We're thrilled to begin work on '${projectTitle}'! To keep your target kickoff on schedule, we still need the following ${missingRequired.length} required item(s):

${missingRequired.map(m => `• ${m.name} (${m.category})`).join('\n')}

Please upload these assets via your secure client onboarding portal:
https://evolvith.com/onboard/portal?client=${encodeURIComponent(clientName)}

Thank you,
The Agency Team`;

  const copyReminder = () => {
    navigator.clipboard.writeText(reminderText);
    setReminderCopied(true);
    setTimeout(() => setReminderCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Operating System Workstation
              </span>
              <span className="text-xs font-mono text-slate-400">ONBOARD-OS-01 v1.0.0</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Client Intake & Digital Asset Handover Workstation
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              White-label client intake briefs, asset delivery checklists, automated reminder generation, and zero-plaintext credential handoff.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/products/onboard-os-01"
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
            >
              System Specs
            </Link>
            <Link
              href="/checkout?productId=onboard-os-01"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 transition"
            >
              Purchase License • $49
            </Link>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex space-x-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveView('agency')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeView === 'agency' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Agency Intake & Readiness Dashboard
          </button>
          <button
            onClick={() => setActiveView('client_portal')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeView === 'client_portal' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Client Portal Live Preview
          </button>
          <button
            onClick={() => setActiveView('security')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeView === 'security' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Zero-Plaintext Credential Safety
          </button>
        </div>

        {/* VIEW 1: AGENCY DASHBOARD */}
        {activeView === 'agency' && (
          <div className="space-y-6">
            
            {/* Project & Client Config */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <div>
                <label className="text-xs text-slate-400 font-medium">Client / Organization Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">Project Scope & Title</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Readiness & Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-center">
                <span className="text-xs text-slate-400">Intake Completion</span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <p className="text-3xl font-extrabold text-white font-mono">{completionPct}%</p>
                  <span className="text-xs text-slate-500">({receivedRequired.length}/{requiredAssets.length} required)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
                  <div className="bg-indigo-500 h-2 transition-all duration-300" style={{ width: `${completionPct}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-center">
                <span className="text-xs text-slate-400">Missing Required Assets</span>
                <p className="text-3xl font-extrabold text-amber-400 font-mono mt-1">{missingRequired.length}</p>
                <span className="text-xs text-slate-500 mt-1">Actionable client blockers</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-center">
                <span className="text-xs text-slate-400">Kickoff Readiness Gate</span>
                <div className="mt-2">
                  {isReadyToBegin ? (
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ✔ Ready to Begin
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      ⏳ Pending Client Assets
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 mt-2">100% required assets threshold</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-center">
                <span className="text-xs text-slate-400">Automated Reminder</span>
                <button
                  onClick={copyReminder}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition"
                >
                  {reminderCopied ? '✔ Copied to Clipboard!' : 'Copy Client Reminder Email'}
                </button>
              </div>
            </div>

            {/* Asset Checklist Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Project Handover Asset Checklist</h3>
                <span className="text-xs text-slate-400 font-mono">{assets.length} Total Deliverables</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Deliverable / Asset</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Required</th>
                      <th className="py-3 px-4">Delivery Status</th>
                      <th className="py-3 px-4">Asset URL / Storage Ref</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {assets.map(a => (
                      <tr key={a.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-4 font-sans font-medium text-slate-200">{a.name}</td>
                        <td className="py-3 px-4">
                          <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-800">{a.category}</span>
                        </td>
                        <td className="py-3 px-4">
                          {a.required ? (
                            <span className="text-indigo-400 font-semibold font-sans">Mandatory</span>
                          ) : (
                            <span className="text-slate-500 font-sans">Optional</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-sans font-semibold ${
                            a.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            a.status === 'RECEIVED' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                            'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 truncate max-w-xs">{a.assetUrl || '—'}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-1">
                            <button
                              onClick={() => updateAssetStatus(a.id, 'RECEIVED')}
                              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px]"
                            >
                              Received
                            </button>
                            <button
                              onClick={() => updateAssetStatus(a.id, 'VERIFIED')}
                              className="px-2 py-1 bg-emerald-800/50 hover:bg-emerald-700/50 text-emerald-300 rounded text-[10px]"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => updateAssetStatus(a.id, 'MISSING')}
                              className="px-2 py-1 bg-rose-800/30 hover:bg-rose-700/40 text-rose-300 rounded text-[10px]"
                            >
                              Missing
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: CLIENT PORTAL PREVIEW */}
        {activeView === 'client_portal' && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-6">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Client Onboarding Portal</span>
              <h2 className="text-2xl font-bold text-white mt-1">Welcome to Onboarding for {clientName}</h2>
              <p className="text-xs text-slate-400 mt-1">Project: {projectTitle}</p>
            </div>

            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-2">
              <h4 className="text-xs font-semibold text-indigo-300">Action Required: {missingRequired.length} Outstanding Asset(s)</h4>
              <p className="text-xs text-slate-400">
                To guarantee your target launch date, please upload the remaining deliverables below.
              </p>
            </div>

            <div className="space-y-4">
              {assets.map(a => (
                <div key={a.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <h5 className="text-sm font-semibold text-slate-200">{a.name}</h5>
                    <span className="text-xs text-slate-500">{a.required ? 'Mandatory for Kickoff' : 'Optional'}</span>
                  </div>

                  <div>
                    {a.status === 'MISSING' ? (
                      <button
                        onClick={() => updateAssetStatus(a.id, 'RECEIVED')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition"
                      >
                        Upload / Provide Link
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                        ✔ Submitted
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: ZERO-PLAINTEXT SECURITY */}
        {activeView === 'security' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Zero-Plaintext Credential Safety Policy</h2>
              <p className="text-xs text-slate-400 mt-1">
                Protect your agency and clients. Never accept or store plaintext passwords in emails, spreadsheets, or tickets.
              </p>
            </div>

            <div className="space-y-4 bg-slate-950 border border-slate-800 p-5 rounded-xl">
              <label className="text-xs text-slate-300 font-medium">Test Credential Storage Note Scanner</label>
              <textarea
                value={credNote}
                onChange={(e) => handleCredScan(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                placeholder="Paste client credential link or share reference..."
              />

              <div className={`p-3 rounded-lg border text-xs font-medium ${
                credSecurityStatus.safe
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
              }`}>
                {credSecurityStatus.message}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <h4 className="font-semibold text-white">1Password / Bitwarden</h4>
                <p>Clients share self-destructing secret links with 24h expiration.</p>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <h4 className="font-semibold text-white">Cloudflare / SSO Invites</h4>
                <p>Clients grant scoped collaborator or developer access directly.</p>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <h4 className="font-semibold text-white">Encrypted Client Vault</h4>
                <p>Passphrase-derived AES-GCM client-side encrypted notes.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
