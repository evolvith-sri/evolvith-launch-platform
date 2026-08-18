'use client';

export function PromptVsOSComparison() {
  const comparisonDimensions = [
    {
      dimension: 'Execution Architecture',
      aiPrompt: 'Generates conversational natural-language text per interaction; operational procedures remain with the individual user.',
      evolvithOS: 'Executes pre-built, structured Python workflow engines, deterministic AST schemas, and automated CLI diagnostic pipelines.',
    },
    {
      dimension: 'Governance & Accountability',
      aiPrompt: 'Ad-hoc, unversioned prompts dependent on subjective user memory and variable phrasing.',
      evolvithOS: 'Codified business unit RACI execution frameworks and immutable SOP manuals embedded directly into system blueprints.',
    },
    {
      dimension: 'Enterprise Integration',
      aiPrompt: 'Operates in isolated conversational sessions; manual copy-pasting of data between business systems.',
      evolvithOS: 'Standardized REST endpoints and webhook bridges connecting directly into Salesforce, SAP, and Snowflake data pipelines.',
    },
    {
      dimension: 'Quality Verification',
      aiPrompt: 'Variable outputs evaluated informally on a prompt-by-prompt basis without standardized regression tests.',
      evolvithOS: 'Certified across 7 internal engineering Quality Gates (QG0–QG6) auditing AST syntax, security boundaries, and packaging integrity.',
    },
    {
      dimension: 'Deployment & Ownership',
      aiPrompt: 'Cloud-hosted third-party SaaS interface requiring perpetual monthly user subscription fees.',
      evolvithOS: 'One-time perpetual commercial license deployed entirely within customer self-hosted or private cloud infrastructure.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12" aria-labelledby="ai-vs-os-heading">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden space-y-10 bg-surface/70">
        <div className="max-w-3xl space-y-3">
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            Category Architecture Distinction
          </span>
          <h2 id="ai-vs-os-heading" className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Operating System vs. General-Purpose AI Prompt
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            While general-purpose AI assistants excel at open-ended conversational drafting, enduring enterprise performance requires codified operating architecture, standardized schemas, and institutional governance.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* General AI Column Header */}
          <div className="lg:col-span-6 bg-surface/50 p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider">
                  Approach 01
                </span>
                <h3 className="text-lg font-bold font-heading text-white mt-1">
                  General-Purpose AI & Prompts
                </h3>
              </div>
              <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                Conversational / Ad-Hoc
              </span>
            </div>

            <div className="space-y-4">
              {comparisonDimensions.map((item, idx) => (
                <div key={idx} className="space-y-1 bg-surface/40 p-4 rounded-xl border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-gray-400 font-semibold block">
                    {item.dimension}
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item.aiPrompt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Evolvith Operating System Column */}
          <div className="lg:col-span-6 bg-surface/90 p-6 rounded-2xl border border-cyan-500/40 space-y-6 shadow-2xl shadow-cyan-500/5 relative ring-1 ring-cyan-500/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  Approach 02
                </span>
                <h3 className="text-lg font-bold font-heading text-white mt-1">
                  Evolvith Codified Operating System
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                Architectural / Codified
              </span>
            </div>

            <div className="space-y-4">
              {comparisonDimensions.map((item, idx) => (
                <div key={idx} className="space-y-1 bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/20">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold block">
                    {item.dimension}
                  </span>
                  <p className="text-xs text-gray-200 leading-relaxed font-medium">
                    {item.evolvithOS}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="bg-surface/90 p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
            <p className="text-gray-300">
              <strong className="text-white">The Evolvith Standard:</strong> Enterprise transformation is achieved through codified, repeatable software systems—not ephemeral chat sessions.
            </p>
          </div>
          <span className="text-[10px] text-gray-400 shrink-0">
            Master Genome Architecture
          </span>
        </div>
      </div>
    </section>
  );
}
