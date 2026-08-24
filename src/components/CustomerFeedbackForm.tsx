'use client';

import { useState } from 'react';

interface CustomerFeedbackFormProps {
  productId: string;
  systemTitle?: string;
}

export function CustomerFeedbackForm({ productId, systemTitle }: CustomerFeedbackFormProps) {
  const [primaryProblem, setPrimaryProblem] = useState('');
  const [priorTool, setPriorTool] = useState('');
  const [clarityRating, setClarityRating] = useState<number>(5);
  const [missingCapability, setMissingCapability] = useState('');
  const [nextDesiredSystem, setNextDesiredSystem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          primaryProblemSolved: primaryProblem,
          priorToolContext: priorTool,
          onboardingClarityRating: clarityRating,
          missingCapability,
          nextDesiredSystem,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-3">
        <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
          ✓
        </div>
        <h3 className="text-base font-bold font-heading text-white">
          Feedback Submitted Directly to Product Leadership
        </h3>
        <p className="text-xs text-gray-300 max-w-lg mx-auto leading-relaxed">
          Thank you for providing real operational insights. Your feedback directly determines which automation workflows, CLI harnesses, and operating systems enter manufacturing next.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-surface/80 space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-wider">
          <span>Customer Insights & Direct Engineering Feedback</span>
        </div>
        <h3 className="text-lg font-bold font-heading text-white">
          Help Us Tailor Your Operating System Deployment
        </h3>
        <p className="text-xs text-gray-400">
          Takes ~60 seconds. Your answers go directly to the architects building Evolvith systems.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="primaryProblem" className="block text-xs font-mono font-bold text-gray-300">
            1. What operational problem were you trying to solve with {systemTitle || productId}? *
          </label>
          <input
            id="primaryProblem"
            type="text"
            required
            placeholder="e.g. Upstream third-party webhook schema mutations breaking our production API"
            value={primaryProblem}
            onChange={(e) => setPrimaryProblem(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono placeholder:text-gray-600"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="priorTool" className="block text-xs font-mono font-bold text-gray-300">
            2. What tool or method were you using previously?
          </label>
          <input
            id="priorTool"
            type="text"
            placeholder="e.g. Postman team seats, Hookdeck subscription, manual server log digging, spreadsheets"
            value={priorTool}
            onChange={(e) => setPriorTool(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono placeholder:text-gray-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-bold text-gray-300">
            3. How clear was the 48-Hour Rapid Setup Protocol & Documentation?
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setClarityRating(num)}
                className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                  clarityRating === num
                    ? 'bg-cyan-500 text-black border-cyan-400 font-extrabold shadow-md shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {num} {num === 5 ? '★ (Clear)' : num === 1 ? '★ (Needs Work)' : '★'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="missingCapability" className="block text-xs font-mono font-bold text-gray-300">
            4. What single feature or capability would make this 10x more useful for you?
          </label>
          <input
            id="missingCapability"
            type="text"
            placeholder="e.g. Native GitHub Actions CI/CD step for schema regression blocking"
            value={missingCapability}
            onChange={(e) => setMissingCapability(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono placeholder:text-gray-600"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="nextDesiredSystem" className="block text-xs font-mono font-bold text-gray-300">
            5. What related workflow or operating system should Evolvith manufacture next?
          </label>
          <input
            id="nextDesiredSystem"
            type="text"
            placeholder="e.g. Multi-currency Stripe reconciliation or B2B lead enrichment workstation"
            value={nextDesiredSystem}
            onChange={(e) => setNextDesiredSystem(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono placeholder:text-gray-600"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3 text-center text-xs font-bold font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {isSubmitting ? 'Submitting Insights...' : 'Submit Customer Insights →'}
        </button>
      </form>
    </div>
  );
}
