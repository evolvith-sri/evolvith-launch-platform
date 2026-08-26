/**
 * Evolvith Enterprise Operating System (EEOS)
 * Customer Intelligence, Demand Engine & Roadmap Decision System
 * Governance Order: MWO-8
 *
 * Privacy-First, Evidence-Driven Architecture:
 * Acquisition -> Redemption -> Activation -> Support -> Feedback -> Demand Signals -> Opportunity Scoring -> Roadmap Decisions
 */

export type SignalTier =
  | 'SIGNAL_1_COSMETIC'
  | 'SIGNAL_2_FRICTION'
  | 'SIGNAL_3_FEATURE'
  | 'SIGNAL_4_WORKFLOW'
  | 'SIGNAL_5_PRODUCT_EXPANSION'
  | 'SIGNAL_6_ENTERPRISE_OPPORTUNITY';

export type ProductDecisionState =
  | 'SCALE'
  | 'IMPROVE'
  | 'EXPAND'
  | 'BUNDLE'
  | 'ENTERPRISE'
  | 'HOLD'
  | 'RETIRE';

export interface CustomerSignal {
  id: string;
  source: 'ACQUISITION' | 'REDEMPTION' | 'ACTIVATION' | 'SUPPORT' | 'FEEDBACK';
  productId: string;
  signalTier: SignalTier;
  summary: string;
  details?: string;
  customerContext?: {
    channel?: 'APPSUMO' | 'DIRECT_STORE' | 'ORGANIC';
    companySize?: string;
    role?: string;
  };
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  willingnessToPayIndicator: boolean;
  createdAt: number;
}

export interface OpportunityScoreInput {
  requestCount: number;
  urgencyWeight: number; // 1 to 5
  willingnessToPayScore: number; // 1 to 5
  audienceBreadth: number; // 1 to 5
  strategicFit: number; // 1 to 5
  implementationComplexity: number; // 1 to 5 (higher = harder)
  supportComplexity: number; // 1 to 5 (higher = harder)
  differentiationScore: number; // 1 to 5
  enterpriseValuePotential: number; // 1 to 5
}

export interface ProductOpportunity {
  opportunityId: string;
  title: string;
  targetProduct: string;
  tier: SignalTier;
  decisionState: ProductDecisionState;
  score: number; // 0 to 100
  evidenceCount: number;
  signals: CustomerSignal[];
  monetizationTrack: 'ACQUISITION_UPGRADE' | 'TIER_2A_EXPANSION_$149_$349' | 'ENTERPRISE_$1000_PLUS';
  recommendedAction: string;
  lastUpdated: number;
}

// In-memory operational signal store (backed by persistent logs/turso in production)
const CUSTOMER_SIGNALS_LEDGER: CustomerSignal[] = [];
const OPPORTUNITY_REGISTER: Map<string, ProductOpportunity> = new Map();

/**
 * Classifies raw customer feedback or support text into an authoritative Signal Tier.
 */
export function classifyDemandSignal(text: string, category?: string): SignalTier {
  const lower = (text + ' ' + (category || '')).toLowerCase();

  // Tier 6: Enterprise / Org-wide
  if (
    lower.includes('enterprise') ||
    lower.includes('multi-team') ||
    lower.includes('sso') ||
    lower.includes('organization-wide') ||
    lower.includes('compliance audit') ||
    lower.includes('multi-department') ||
    lower.includes('custom deployment') ||
    lower.includes('1000') ||
    lower.includes('5000')
  ) {
    return 'SIGNAL_6_ENTERPRISE_OPPORTUNITY';
  }

  // Tier 5: New Standalone Product
  if (
    lower.includes('new product') ||
    lower.includes('separate system') ||
    lower.includes('can you build') ||
    lower.includes('wish you had an os for') ||
    lower.includes('alternative to salesforce') ||
    lower.includes('full standalone')
  ) {
    return 'SIGNAL_5_PRODUCT_EXPANSION';
  }

  // Tier 4: Workflow / Cross-System Integration
  if (
    lower.includes('workflow') ||
    lower.includes('integration') ||
    lower.includes('zapier') ||
    lower.includes('webhook to crm') ||
    lower.includes('hubspot') ||
    lower.includes('automated handoff') ||
    lower.includes('pipeline to accounting')
  ) {
    return 'SIGNAL_4_WORKFLOW';
  }

  // Tier 2: Activation or Usage Friction
  if (
    lower.includes('error') ||
    lower.includes('failed') ||
    lower.includes('stuck') ||
    lower.includes('broken') ||
    lower.includes('cannot install') ||
    lower.includes('unclear runbook') ||
    lower.includes('syntax error') ||
    lower.includes('token expired')
  ) {
    return 'SIGNAL_2_FRICTION';
  }

  // Tier 1: Cosmetic
  if (
    lower.includes('typo') ||
    lower.includes('dark mode') ||
    lower.includes('color') ||
    lower.includes('button padding') ||
    lower.includes('font') ||
    lower.includes('wording')
  ) {
    return 'SIGNAL_1_COSMETIC';
  }

  // Default: Feature Request
  return 'SIGNAL_3_FEATURE';
}

/**
 * Calculates deterministic Opportunity Score (0 to 100).
 */
export function calculateOpportunityScore(input: OpportunityScoreInput): number {
  const demandWeight = Math.min(input.requestCount * 4, 30); // Up to 30 pts for volume
  const urgencyWeight = (input.urgencyWeight / 5) * 15; // Up to 15 pts
  const wtpWeight = (input.willingnessToPayScore / 5) * 15; // Up to 15 pts
  const fitWeight = (input.strategicFit / 5) * 15; // Up to 15 pts
  const diffWeight = (input.differentiationScore / 5) * 10; // Up to 10 pts
  const entWeight = (input.enterpriseValuePotential / 5) * 15; // Up to 15 pts

  // Penalties for high engineering and support complexity
  const complexityPenalty = ((input.implementationComplexity + input.supportComplexity) / 10) * 15; // Up to -15 pts

  const rawScore = demandWeight + urgencyWeight + wtpWeight + fitWeight + diffWeight + entWeight - complexityPenalty;
  return Math.max(0, Math.min(100, Math.round(rawScore)));
}

/**
 * Derives the Product Decision State based on opportunity score and evidence.
 */
export function deriveDecisionState(score: number, evidenceCount: number, tier: SignalTier): ProductDecisionState {
  if (evidenceCount === 0) return 'HOLD';
  if (tier === 'SIGNAL_2_FRICTION' && evidenceCount >= 3) return 'IMPROVE';
  if (tier === 'SIGNAL_6_ENTERPRISE_OPPORTUNITY' && score >= 75) return 'ENTERPRISE';
  if (score >= 80 && evidenceCount >= 5) return 'SCALE';
  if (score >= 65 && tier === 'SIGNAL_5_PRODUCT_EXPANSION') return 'EXPAND';
  if (score >= 60 && tier === 'SIGNAL_4_WORKFLOW') return 'BUNDLE';
  if (score < 30 && evidenceCount >= 10) return 'RETIRE';
  return 'HOLD';
}

/**
 * Ingests a new customer signal and updates the Opportunity Register.
 */
export function recordCustomerSignal(signal: Omit<CustomerSignal, 'id' | 'createdAt'>): CustomerSignal {
  const fullSignal: CustomerSignal = {
    ...signal,
    id: `sig_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: Date.now(),
  };

  CUSTOMER_SIGNALS_LEDGER.push(fullSignal);

  // Update aggregated opportunity
  const oppKey = `${signal.productId}_${signal.signalTier}`;
  const existing = OPPORTUNITY_REGISTER.get(oppKey);

  const evidence = existing ? [...existing.signals, fullSignal] : [fullSignal];
  const count = evidence.length;

  const scoreInput: OpportunityScoreInput = {
    requestCount: count,
    urgencyWeight: signal.urgency === 'CRITICAL' ? 5 : signal.urgency === 'HIGH' ? 4 : signal.urgency === 'MEDIUM' ? 3 : 2,
    willingnessToPayScore: signal.willingnessToPayIndicator ? 5 : 2,
    audienceBreadth: 4,
    strategicFit: 5,
    implementationComplexity: signal.signalTier === 'SIGNAL_6_ENTERPRISE_OPPORTUNITY' ? 4 : 2,
    supportComplexity: 2,
    differentiationScore: 4,
    enterpriseValuePotential: signal.signalTier === 'SIGNAL_6_ENTERPRISE_OPPORTUNITY' ? 5 : 2,
  };

  const score = calculateOpportunityScore(scoreInput);
  const decisionState = deriveDecisionState(score, count, signal.signalTier);

  let monetizationTrack: ProductOpportunity['monetizationTrack'] = 'ACQUISITION_UPGRADE';
  if (signal.signalTier === 'SIGNAL_6_ENTERPRISE_OPPORTUNITY') {
    monetizationTrack = 'ENTERPRISE_$1000_PLUS';
  } else if (signal.signalTier === 'SIGNAL_5_PRODUCT_EXPANSION' || signal.signalTier === 'SIGNAL_4_WORKFLOW') {
    monetizationTrack = 'TIER_2A_EXPANSION_$149_$349';
  }

  OPPORTUNITY_REGISTER.set(oppKey, {
    opportunityId: oppKey,
    title: `${signal.productId}: ${signal.signalTier.replace(/_/g, ' ')}`,
    targetProduct: signal.productId,
    tier: signal.signalTier,
    decisionState,
    score,
    evidenceCount: count,
    signals: evidence,
    monetizationTrack,
    recommendedAction: getRecommendedAction(decisionState, signal.productId),
    lastUpdated: Date.now(),
  });

  return fullSignal;
}

function getRecommendedAction(state: ProductDecisionState, productId: string): string {
  switch (state) {
    case 'SCALE':
      return `Double marketing and AppSumo visibility for ${productId}. Conversion evidence is proven.`;
    case 'IMPROVE':
      return `Address documented onboarding/runbook friction before expanding traffic to ${productId}.`;
    case 'EXPAND':
      return `Develop $149–$349 Pro edition of ${productId} based on requested advanced capabilities.`;
    case 'BUNDLE':
      return `Package ${productId} into a cross-functional multi-OS workflow bundle.`;
    case 'ENTERPRISE':
      return `Log enterprise specifications into the $1,000+ Opportunity Register. Do not build until 3+ qualified discovery calls.`;
    case 'HOLD':
      return `Monitor customer redemptions and support tickets. Insufficient empirical evidence to justify major engineering allocation.`;
    case 'RETIRE':
      return `Flag for deprecation review due to persistent low demand and high support overhead.`;
  }
}

export function getCustomerIntelligenceSummary() {
  const signals = [...CUSTOMER_SIGNALS_LEDGER];
  const opportunities = Array.from(OPPORTUNITY_REGISTER.values()).sort((a, b) => b.score - a.score);

  const bySource = {
    ACQUISITION: signals.filter((s) => s.source === 'ACQUISITION').length,
    REDEMPTION: signals.filter((s) => s.source === 'REDEMPTION').length,
    ACTIVATION: signals.filter((s) => s.source === 'ACTIVATION').length,
    SUPPORT: signals.filter((s) => s.source === 'SUPPORT').length,
    FEEDBACK: signals.filter((s) => s.source === 'FEEDBACK').length,
  };

  const byTier = {
    SIGNAL_1_COSMETIC: signals.filter((s) => s.signalTier === 'SIGNAL_1_COSMETIC').length,
    SIGNAL_2_FRICTION: signals.filter((s) => s.signalTier === 'SIGNAL_2_FRICTION').length,
    SIGNAL_3_FEATURE: signals.filter((s) => s.signalTier === 'SIGNAL_3_FEATURE').length,
    SIGNAL_4_WORKFLOW: signals.filter((s) => s.signalTier === 'SIGNAL_4_WORKFLOW').length,
    SIGNAL_5_PRODUCT_EXPANSION: signals.filter((s) => s.signalTier === 'SIGNAL_5_PRODUCT_EXPANSION').length,
    SIGNAL_6_ENTERPRISE_OPPORTUNITY: signals.filter((s) => s.signalTier === 'SIGNAL_6_ENTERPRISE_OPPORTUNITY').length,
  };

  return {
    totalSignalsCaptured: signals.length,
    signalsBySource: bySource,
    signalsByTier: byTier,
    rankedOpportunities: opportunities,
    enterpriseOpportunityRegister: opportunities.filter((o) => o.monetizationTrack === 'ENTERPRISE_$1000_PLUS'),
    expansionTrackRegister: opportunities.filter((o) => o.monetizationTrack === 'TIER_2A_EXPANSION_$149_$349'),
  };
}
