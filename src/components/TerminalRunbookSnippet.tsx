'use client';

import { useState } from 'react';

interface TerminalRunbookSnippetProps {
  productId?: string;
}

export function TerminalRunbookSnippet({ productId = 'system' }: TerminalRunbookSnippetProps) {
  const [copied, setCopied] = useState(false);

  const commandText = `python install.py`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#070A10] rounded-2xl border border-cyan-500/30 overflow-hidden font-mono shadow-2xl space-y-0">
      {/* Terminal Window Top Bar */}
      <div className="bg-[#0D121F] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] text-gray-400 font-mono ml-2">
            bash — {productId.toUpperCase()}_v1.0.0/runbook (Walkthrough Preview)
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10 transition-colors"
          aria-label="Copy installation command"
        >
          {copied ? '✓ COPIED' : 'COPY COMMAND'}
        </button>
      </div>

      {/* Terminal Output Code Area */}
      <div className="p-5 text-xs space-y-3 leading-relaxed text-gray-300">
        <div className="space-y-1">
          <p className="text-gray-500 text-[11px]"># Phase 1: Environment initialization via automated installer</p>
          <p className="text-cyan-300 font-bold flex items-center gap-2">
            <span className="text-emerald-400">$</span> python install.py
          </p>
          <p className="text-gray-400 pl-4 text-[11px]">[RUNBOOK] Initializing {productId.toUpperCase()} installer...</p>
          <p className="text-gray-400 pl-4 text-[11px]">[RUNBOOK] Binding Master Genome L1-L4 inheritance schemas...</p>
        </div>

        <div className="space-y-1 pt-2 border-t border-white/5">
          <p className="text-gray-500 text-[11px]"># Phase 2: Workflow execution and integration verification</p>
          <p className="text-cyan-300 font-bold flex items-center gap-2">
            <span className="text-emerald-400">$</span> python src/cli.py run
          </p>
          <p className="text-gray-400 pl-4 text-[11px]">[WORKFLOW] Executing baseline workflow diagnostics...</p>
          <p className="text-gray-400 pl-4 text-[11px]">[INTEGRATION] Webhook and telemetry interfaces verified.</p>
        </div>

        <div className="space-y-1 pt-2 border-t border-white/5">
          <p className="text-gray-500 text-[11px]"># Phase 3: System health diagnostics & QG audit pass</p>
          <p className="text-cyan-300 font-bold flex items-center gap-2">
            <span className="text-emerald-400">$</span> python src/cli.py health
          </p>
          <p className="text-emerald-400 pl-4 text-[11px]">[HEALTH] Status: HEALTHY — All operational modules reporting.</p>
          <p className="text-cyan-400 pl-4 text-[11px]">[GOVERNANCE] Logging active in Executive Decision Registry.</p>
        </div>
      </div>

      {/* Terminal Footer Note */}
      <div className="bg-[#090D17] px-4 py-2 border-t border-white/5 text-[10px] text-gray-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span>Illustrative runbook walkthrough demonstration.</span>
        <span className="text-cyan-400/80">Python 3.9+ Runtime Required</span>
      </div>
    </div>
  );
}
