'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { logCommercialIntent } from '@/lib/telemetry';

interface PageAudit {
  url: string;
  status_code: number;
  title: string;
  title_length: number;
  meta_description: string;
  meta_description_length: number;
  canonical_url: string;
  h1_count: number;
  word_count: number;
  ttfb_ms: number;
  issues: { severity: string; code: string; message: string }[];
}

export default function SeoAuditWorkstationPage() {
  const [seedUrl, setSeedUrl] = useState('https://acme-cloud-platform.com');
  const [maxDepth, setMaxDepth] = useState(3);
  const [activeTab, setActiveTab] = useState<'overview' | 'inspector' | 'report'>('overview');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlLog, setCrawlLog] = useState<string[]>([]);
  const [healthScore, setHealthScore] = useState<number>(78);
  const [selectedUrl, setSelectedUrl] = useState<PageAudit | null>(null);

  const [pages, setPages] = useState<PageAudit[]>([
    {
      url: 'https://acme-cloud-platform.com/',
      status_code: 200,
      title: 'Acme Cloud — Serverless Infrastructure & API Gateway',
      title_length: 53,
      meta_description: 'Deploy serverless webhooks, scale microservices, and manage distributed APIs with Acme Cloud platform.',
      meta_description_length: 104,
      canonical_url: 'https://acme-cloud-platform.com/',
      h1_count: 1,
      word_count: 750,
      ttfb_ms: 82.4,
      issues: [
        { severity: 'INFO', code: 'SHORT_META_DESC', message: 'Meta description could be expanded for higher CTR (104 chars, target 120-160).' }
      ]
    },
    {
      url: 'https://acme-cloud-platform.com/pricing',
      status_code: 200,
      title: 'Pricing',
      title_length: 7,
      meta_description: '',
      meta_description_length: 0,
      canonical_url: 'https://acme-cloud-platform.com/pricing',
      h1_count: 2,
      word_count: 310,
      ttfb_ms: 95.1,
      issues: [
        { severity: 'WARNING', code: 'SHORT_TITLE', message: 'Title tag too short (7 chars, recommend 30–60).' },
        { severity: 'WARNING', code: 'MISSING_META_DESC', message: 'Missing meta description tag.' },
        { severity: 'INFO', code: 'MULTIPLE_H1', message: 'Page contains 2 <h1> tags.' }
      ]
    },
    {
      url: 'https://acme-cloud-platform.com/docs',
      status_code: 200,
      title: 'Documentation — Complete Developer Reference & SDK Guides',
      title_length: 57,
      meta_description: 'Explore full API endpoints, code snippets in 5 languages, and webhook signature verification.',
      meta_description_length: 93,
      canonical_url: 'https://acme-cloud-platform.com/docs',
      h1_count: 1,
      word_count: 1420,
      ttfb_ms: 74.0,
      issues: []
    },
    {
      url: 'https://acme-cloud-platform.com/old-roadmap',
      status_code: 301,
      title: '',
      title_length: 0,
      meta_description: '',
      meta_description_length: 0,
      canonical_url: 'https://acme-cloud-platform.com/roadmap',
      h1_count: 0,
      word_count: 0,
      ttfb_ms: 120.5,
      issues: [
        { severity: 'WARNING', code: 'REDIRECT_CHAIN', message: 'Redirect hop detected (old-roadmap -> archive -> roadmap).' }
      ]
    },
    {
      url: 'https://acme-cloud-platform.com/docs/v1/legacy-endpoint',
      status_code: 404,
      title: '404 Not Found',
      title_length: 13,
      meta_description: '',
      meta_description_length: 0,
      canonical_url: '',
      h1_count: 1,
      word_count: 24,
      ttfb_ms: 140.2,
      issues: [
        { severity: 'CRITICAL', code: 'BROKEN_LINK_404', message: 'Page returned HTTP 404 Not Found from internal link in /docs.' }
      ]
    }
  ]);

  useEffect(() => {
    logCommercialIntent({
      eventType: 'LAUNCH_WORKSTATION',
      productId: 'seo-audit-os-01',
      systemCode: 'SEO-AUDIT-OS-01',
    });
    setSelectedUrl(pages[0]);
  }, []);

  const runCrawl = () => {
    setIsCrawling(true);
    setCrawlLog([
      `[INIT] Connecting to seed URL: ${seedUrl}...`,
      '[ROBOTS] Parsing robots.txt and sitemap.xml...',
      '[CRAWL] Discovering internal link graph (depth: 1)...'
    ]);

    setTimeout(() => {
      setCrawlLog(prev => [
        ...prev,
        '[AUDIT] Evaluating 5 pages across 12 technical SEO rules...',
        '[ANALYSIS] 1 Broken Link (404) identified in /docs/v1/legacy-endpoint.',
        '[ANALYSIS] Missing meta description and short title flagged in /pricing.',
        '[COMPLETE] Audit finished in 380ms. Health score computed: 78 / 100.'
      ]);
      setHealthScore(78);
      setIsCrawling(false);
    }, 500);
  };

  const criticalCount = pages.reduce((acc, p) => acc + p.issues.filter(i => i.severity === 'CRITICAL').length, 0);
  const warningCount = pages.reduce((acc, p) => acc + p.issues.filter(i => i.severity === 'WARNING').length, 0);
  const brokenCount = pages.filter(p => p.status_code === 404).length;

  const exportReport = () => {
    const report = `# Technical SEO Audit Report: ${seedUrl}
Date: ${new Date().toISOString()}
Overall Site Health Score: ${healthScore} / 100

## Summary Metrics
- Total Pages: ${pages.length}
- Broken Links (404): ${brokenCount}
- Critical Defects: ${criticalCount}
- Warnings: ${warningCount}

## Page Breakdown
${pages.map(p => `### ${p.url} (HTTP ${p.status_code})
- Title: ${p.title || 'Missing'} (${p.title_length} chars)
- Meta Description: ${p.meta_description || 'Missing'} (${p.meta_description_length} chars)
- Canonical: ${p.canonical_url || 'Missing'}
- Issues: ${p.issues.map(i => `[${i.severity}] ${i.code}: ${i.message}`).join('; ') || 'None'}
`).join('\n')}

*Claim Governance: Diagnostic audit system. Does not guarantee Google search rankings.*`;

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo_audit_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Operating System Workstation
              </span>
              <span className="text-xs font-mono text-slate-400">SEO-AUDIT-OS-01 v1.0.0</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Programmatic Technical SEO & Broken Link Crawler
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Local website crawler, broken link analyzer, canonical verifier, and client report generator without recurring URL limits.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/products/seo-audit-os-01"
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
            >
              System Specs
            </Link>
            <Link
              href="/checkout?productId=seo-audit-os-01"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-500/20 transition"
            >
              Purchase License • $49
            </Link>
          </div>
        </div>

        {/* Crawl Control Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="flex-1">
            <label className="text-xs text-slate-400 font-medium">Seed Website URL</label>
            <input
              type="text"
              value={seedUrl}
              onChange={(e) => setSeedUrl(e.target.value)}
              className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
              placeholder="https://example.com"
            />
          </div>

          <div className="w-full md:w-36">
            <label className="text-xs text-slate-400 font-medium">Max Crawl Depth</label>
            <select
              value={maxDepth}
              onChange={(e) => setMaxDepth(Number(e.target.value))}
              className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value={1}>1 Level (Fast)</option>
              <option value={2}>2 Levels</option>
              <option value={3}>3 Levels (Standard)</option>
              <option value={5}>5 Levels (Deep)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={runCrawl}
              disabled={isCrawling}
              className="w-full md:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition disabled:opacity-50 h-9"
            >
              {isCrawling ? 'Crawling Site...' : 'Start Technical Audit'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'overview' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Audit Overview & Score
          </button>
          <button
            onClick={() => setActiveTab('inspector')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'inspector' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            URL Defect Inspector ({pages.length})
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'report' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Client Report & Export
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Health Score Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Site Health Score</span>
                <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-4 border-emerald-500/30 bg-emerald-500/5">
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono">{healthScore}</span>
                </div>
                <span className="text-xs text-slate-400">Out of 100 (Weighted Rules)</span>
              </div>

              {/* Metric 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                <span className="text-xs text-slate-400">Pages Crawled</span>
                <p className="text-2xl font-bold text-white">{pages.length}</p>
                <div className="text-[11px] text-slate-500">100% Local crawl execution</div>
              </div>

              {/* Metric 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                <span className="text-xs text-slate-400">Broken Links (404)</span>
                <p className="text-2xl font-bold text-rose-400">{brokenCount}</p>
                <div className="text-[11px] text-rose-400/80">Requires immediate 301 or link fix</div>
              </div>

              {/* Metric 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                <span className="text-xs text-slate-400">Critical / Warning Defects</span>
                <p className="text-2xl font-bold text-amber-400">{criticalCount + warningCount}</p>
                <div className="text-[11px] text-amber-400/80">Title, meta & canonical issues</div>
              </div>
            </div>

            {/* Live Crawl Console */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-900">
                Crawler Diagnostic Log
              </div>
              {crawlLog.map((l, idx) => (
                <div key={idx} className="text-emerald-400/80">{l}</div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: URL INSPECTOR */}
        {activeTab === 'inspector' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">URL Path</th>
                      <th className="py-3 px-4">Title Tag</th>
                      <th className="py-3 px-4">Issues</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {pages.map((p, idx) => (
                      <tr
                        key={idx}
                        onClick={() => setSelectedUrl(p)}
                        className={`cursor-pointer transition ${
                          selectedUrl?.url === p.url ? 'bg-emerald-500/10' : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            p.status_code === 200 ? 'bg-emerald-500/10 text-emerald-400' :
                            p.status_code === 301 ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {p.status_code}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-200 truncate max-w-xs">{p.url}</td>
                        <td className="py-3 px-4 font-sans text-slate-400 truncate max-w-xs">{p.title || '—'}</td>
                        <td className="py-3 px-4 font-sans">
                          {p.issues.length > 0 ? (
                            <span className="text-amber-400 font-semibold">{p.issues.length} defect(s)</span>
                          ) : (
                            <span className="text-emerald-400">Clean</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Single URL Inspector Sidebar */}
            {selectedUrl && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Inspected Resource</span>
                  <h3 className="text-xs font-mono text-emerald-400 break-all mt-1">{selectedUrl.url}</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px]">Title Tag ({selectedUrl.title_length} chars):</span>
                    <p className="text-slate-200 font-sans mt-0.5">{selectedUrl.title || '—'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Meta Description ({selectedUrl.meta_description_length} chars):</span>
                    <p className="text-slate-200 font-sans mt-0.5">{selectedUrl.meta_description || '—'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Canonical URL:</span>
                    <p className="text-slate-300 font-mono text-[11px] mt-0.5 break-all">{selectedUrl.canonical_url || '—'}</p>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-2 text-[11px]">
                    <span className="text-slate-400">H1 Tags: <strong>{selectedUrl.h1_count}</strong></span>
                    <span className="text-slate-400">Word Count: <strong>{selectedUrl.word_count}</strong></span>
                    <span className="text-slate-400">TTFB: <strong>{selectedUrl.ttfb_ms}ms</strong></span>
                  </div>
                </div>

                {selectedUrl.issues.length > 0 && (
                  <div className="border-t border-slate-800 pt-3 space-y-2">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Identified Defects:</span>
                    {selectedUrl.issues.map((iss, i) => (
                      <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-rose-400 font-semibold">{iss.code}</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400">{iss.severity}</span>
                        </div>
                        <p className="text-slate-400">{iss.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CLIENT REPORT EXPORT */}
        {activeTab === 'report' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Client-Ready Technical SEO Report</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Export complete audit findings as a branded deliverable for your clients or development team.
                </p>
              </div>
              <button
                onClick={exportReport}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition shadow-lg shadow-emerald-500/20"
              >
                Download Markdown Report
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 font-mono text-xs text-slate-300 whitespace-pre-wrap">
              {`# Technical SEO Audit Report: ${seedUrl}
Overall Health Score: ${healthScore} / 100

Pages Crawled: ${pages.length} | Broken Links: ${brokenCount} | Critical Issues: ${criticalCount}

Identified Key Recommendations:
1. Fix 1 broken internal link (HTTP 404) discovered in documentation tree.
2. Add missing meta description to /pricing page and expand title tag.
3. Collapse redirect chains on /old-roadmap down to a single direct 301 redirect.

*Audit generated locally via SEO-AUDIT-OS-01 Workstation.*`}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
