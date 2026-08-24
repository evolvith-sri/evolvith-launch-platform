import { getProductCommerceMapping, DODO_STOREFRONT_URL } from './commerce';

export { DODO_STOREFRONT_URL };

export type CommerceStatus =
  | 'PRE_LAUNCH'
  | 'CONTROLLED_COMMERCE_VERIFICATION'
  | 'LIVE';

export interface CommerceConfig {
  status: CommerceStatus;
  providerName: string;
  preLaunchMessage: string;
  preLaunchCtaText: string;
  liveCtaText: string;
}

export const COMMERCE_CONFIG: CommerceConfig = {
  status: 'LIVE', // Governed State: LIVE under Governance Order PR-0002O
  providerName: 'Dodo Payments',
  preLaunchMessage: 'Purchase availability is being activated.',
  preLaunchCtaText: 'Checkout Activation in Progress',
  liveCtaText: 'Purchase Commercial License',
};

export type ProductStatus =
  | 'RELEASED'
  | 'MANUFACTURING'
  | 'PORTFOLIO_SPEC'
  | 'TIER_3_DEVELOPMENT';

export type ProductAvailability = 'COMMERCIAL' | 'NOT_PURCHASABLE';

export interface Product {
  id: string;
  systemCode: string;
  tier: 1 | 2 | 3;
  subTier: '1' | '2A' | '2B' | '3';
  wave: 1 | 2 | 3;
  title: string;
  subtitle: string;
  category: string;
  price: number | null;
  badge: string;
  status: ProductStatus;
  availability: ProductAvailability;
  oneSentencePurpose: string;
  operationalFriction: string;
  modeledTarget: string;
  description: string;
  executiveSummary: string;
  problemsSolved: string[];
  capabilities: string[];
  deliverables: string[];
  whatYouReceive: string[];
  outcomes: string[];
  whoItIsFor: string[];
  targetBuyer: string;
  upgradePath?: string;
  architectureInputs?: string[];
  faqs: { question: string; answer: string }[];
  checkoutUrl?: string | null;
}

/**
 * TIER 1: Focused Systems (7 Systems — $99 each)
 * Purpose-built operating systems for specific operational bottlenecks.
 */
export const TIER_1_PRODUCTS: Product[] = [
  {
    id: "audit-os-01",
    systemCode: "AUDIT-OS-01",
    tier: 1,
    subTier: "1",
    wave: 1,
    title: "AUDIT-OS-01 Visual API Contract & Webhook QA Workstation",
    subtitle: "Capture live webhooks, detect silent schema drift with visual AST diffs, and replay test payloads to localhost with zero subscriptions.",
    category: "Developer Tools",
    price: 49,
    badge: "Developer OS",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Intercepts live third-party webhooks, detects silent schema drift via visual AST diffs, and replays test payloads to localhost without recurring cloud fees.",
    operationalFriction: "Third-party APIs mutating webhook schemas without warning, breaking production automations, and requiring hours of manual log digging.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: Sub-90s Root Cause Diagnosis of Upstream Schema Mutations & 100% Type-Safe Contract Validation.",
    description: "Local-first visual workstation engineered to capture live webhooks, detect schema drift with AST diffs, generate TypeScript/Zod/Pydantic models, and replay test events to localhost.",
    executiveSummary: "AUDIT-OS-01 provides full-stack developers and technical automation builders with a local-first QA laboratory. It eliminates silent webhook failures by mathematically comparing incoming payloads against baseline schemas, generating deterministic types, and replaying test events directly to localhost.",
    targetBuyer: "Full-Stack Developers, SaaS Founders, Technical Agency Owners, Zapier/Make Automation Engineers.",
    upgradePath: "Tier 2 Agency & Team Pro License ($99)",
    problemsSolved: [
      "Unannounced upstream API changes silently breaking webhook handlers and databases.",
      "Hours wasted manually digging through server logs to find mutated JSON field names.",
      "Expensive recurring monthly fees for cloud webhook inspection and mock servers."
    ],
    capabilities: [
      "Public Ephemeral Webhook Trap & Stateless Edge Ingestion Relay.",
      "Deterministic AST Schema Extraction & Visual Mutation Diff Engine.",
      "Instant Code Generation (TypeScript Interfaces, Zod, and Python Pydantic v2).",
      "Parameterized Localhost Payload Replayer with Non-Localhost Safety Guard.",
      "Zero-Dependency Standalone Mock Server Exporter (Node.js & Python).",
      "Offline HMAC Webhook Signature Verification Sandbox (Stripe, Shopify, GitHub, Meta)."
    ],
    deliverables: [
      "AUDIT-OS-01 Workstation Engine & CLI Harness.",
      "Deterministic AST Schema Inference & Diff Module.",
      "Standalone Mock Server Generator & HMAC Sandbox.",
      "Digital Package (.zip) with 48-Hour Rapid Installation Runbook."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python & TypeScript engine.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "API Contract & Webhook QA SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "48-Hour Rapid Installation Runbook & Architecture Guide (docs/)."
    ],
    outcomes: [
      "Sub-90s Root Cause Diagnosis of Upstream Webhook Schema Drift.",
      "Zero Silent Production Breakages from Vendor API Mutations.",
      "100% Type Safety with Instant TypeScript & Zod Code Generation."
    ],
    whoItIsFor: [
      "Full-stack developers integrating Stripe, Shopify, or custom APIs.",
      "Technical agencies maintaining webhook integrations for clients.",
      "Zapier, Make, and n8n automation builders troubleshooting broken workflows."
    ],
    faqs: [
      {
        question: "How does AUDIT-OS-01 protect data privacy?",
        answer: "All captured payloads, schema baselines, and test logs are stored 100% locally on your machine in SQLite. Evolvith cloud infrastructure never stores your payload data."
      },
      {
        question: "Does AUDIT-OS-01 work offline?",
        answer: "Core local inspection, SQLite storage, schema diffing, code generation, and localhost replay work completely offline. Ingesting public webhooks from external services requires internet connectivity."
      },
      {
        question: "What is the difference between Tier 1 ($49) and Tier 2 ($99)?",
        answer: "Tier 1 includes 5 active concurrent traps and unlimited local testing. Tier 2 ($99) includes 25 traps, OpenAPI 3.1 importer, client incident audit reports, and unlimited team seats."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "forecast-os-01",
    systemCode: "FORECAST-OS-01",
    tier: 1,
    subTier: "1",
    wave: 2,
    title: "FORECAST-OS-01 Revenue & Sales Forecasting OS",
    subtitle: "Deterministic 30/60/90-Day Pipeline Weighting & Revenue Projection System",
    category: "Revenue Operations",
    price: 99,
    badge: "Focused OS",
    status: "PORTFOLIO_SPEC",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Replaces spreadsheet guesswork with deterministic probability weighting and historical win-rate regression models.",
    operationalFriction: "Inaccurate quarter-end revenue projections caused by spreadsheet-based guesswork and subjective sales rep confidence ratings.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 90% Revenue Forecasting Variance Precision within 60-Day Horizons.",
    description: "Targeted operating system engineered to eliminate forecasting variance and manual revenue spreadsheet compilation.",
    executiveSummary: "FORECAST-OS-01 provides deterministic revenue forecasting by applying AST-verified probability weights to open opportunities, tracking sudden deal variance, and compiling weekly executive briefing packs.",
    targetBuyer: "VPs of Sales, Head of RevOps, Scaling B2B Founders.",
    upgradePath: "REV-OS-01 Autonomous Revenue Operations OS ($249)",
    problemsSolved: [
      "Subjective sales rep confidence ratings distorting quarterly revenue projections.",
      "Manual spreadsheet stitching consuming hours of management bandwidth each week.",
      "Late detection of deal push-outs and unexpected slippages."
    ],
    capabilities: [
      "AST-verified 30/60/90-day pipeline probability weighting algorithm.",
      "Deal variance tracker detecting sudden push-outs or deal-size reductions.",
      "Automated weekly Markdown/JSON forecast summary generation for leadership."
    ],
    deliverables: [
      "FORECAST-OS-01 Core Execution Engine & CLI Harness.",
      "Deterministic Probability Weighting Algorithms.",
      "Weekly Executive Markdown/JSON Briefing Generator.",
      "Standard Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Revenue Forecasting SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "90% Revenue Forecasting Variance Precision within 60-Day Horizons.",
      "Elimination of 6+ Hours/Week of Manual Forecast Assembly.",
      "Real-Time Pipeline Variance Tracking."
    ],
    whoItIsFor: [
      "VPs of Sales seeking deterministic pipeline visibility.",
      "Revenue Operations Managers managing multi-channel pipelines.",
      "Founders needing reliable board-ready revenue projections."
    ],
    faqs: [
      {
        question: "How does FORECAST-OS-01 calculate projections?",
        answer: "It applies deterministic probability weighting and historical regression models against active opportunity parameters rather than relying on subjective rep confidence."
      },
      {
        question: "Can this expand into full Revenue Ops?",
        answer: "Yes, FORECAST-OS-01 is architecturally mapped to expand seamlessly into REV-OS-01 ($249)."
      },
      {
        question: "What is the delivery model?",
        answer: "Delivered as a complete digital software package (.zip) with installation documentation and commercial license."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "close-os-01",
    systemCode: "CLOSE-OS-01",
    tier: 1,
    subTier: "1",
    wave: 2,
    title: "CLOSE-OS-01 Month-End Financial Close OS",
    subtitle: "Step-by-Step Ledger Close Orchestration & Account Reconciliation Gates",
    category: "Financial Operations",
    price: 99,
    badge: "Focused OS",
    status: "PORTFOLIO_SPEC",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Compresses financial closing cycles by orchestrating sequential ledger tasks and enforcing balance sheet parity gates.",
    operationalFriction: "Protracted 2-to-3 week month-end financial closing cycles plagued by manual checklist handoffs and unverified journal entries.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 60% Reduction in Month-End Financial Close Duration.",
    description: "Targeted operating system engineered to compress financial close cycles and eliminate reconciliation errors.",
    executiveSummary: "CLOSE-OS-01 orchestrates the month-end closing process through sequential dependency gate enforcement, automated balance sheet parity checking, and executive closing pack generation.",
    targetBuyer: "Chief Accounting Officers, Corporate Controllers, Finance Team Leads.",
    upgradePath: "FIN-OS-01 Enterprise Financial Intelligence OS ($349)",
    problemsSolved: [
      "Protracted closing timelines delaying executive financial reporting.",
      "Unverified journal entries and spreadsheet reconciliation discrepancies.",
      "Ambiguous task handoffs between regional accounting team members."
    ],
    capabilities: [
      "Sequential dependency gate enforcement for ledger close tasks.",
      "Balance sheet parity checker flagging unmapped ledger deltas.",
      "Executive close summary pack builder for CFO review."
    ],
    deliverables: [
      "CLOSE-OS-01 Core Execution Engine & CLI Harness.",
      "Sequential Dependency Close Orchestrator.",
      "Balance Sheet Parity Verification Engine.",
      "Standard Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Month-End Close SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "60% Reduction in Month-End Financial Close Duration.",
      "100% Reconciliation Verification Gate Enforcement.",
      "Zero Unmapped Ledger Deltas at Close."
    ],
    whoItIsFor: [
      "Corporate Controllers standardizing closing cycles.",
      "Accounting Team Leads managing distributed finance teams.",
      "CFOs demanding rapid, error-free financial closing."
    ],
    faqs: [
      {
        question: "Does CLOSE-OS-01 replace ERPs?",
        answer: "No, it governs the task sequence and reconciliation checkpoints above your existing general ledger or ERP."
      },
      {
        question: "What is the upgrade path?",
        answer: "Expands into FIN-OS-01 ($349) for multi-entity capital allocation and margin telemetry."
      },
      {
        question: "What is the delivery model?",
        answer: "Delivered as a complete digital software package (.zip) with installation documentation and commercial license."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "retention-os-01",
    systemCode: "RETENTION-OS-01",
    tier: 1,
    subTier: "1",
    wave: 2,
    title: "RETENTION-OS-01 Customer Retention & Churn Alert OS",
    subtitle: "Multi-Signal Churn Risk Scoring & Early-Warning Intervention Playbooks",
    category: "Customer Success",
    price: 99,
    badge: "Focused OS",
    status: "PORTFOLIO_SPEC",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Mitigates surprise cancellations with multi-signal telemetry risk scoring and automated escalation playbooks.",
    operationalFriction: "Surprise client cancellations caused by undetected sentiment decline and unmonitored usage drop-offs.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 30% Reduction in Unanticipated Customer Churn Events.",
    description: "Targeted operating system engineered to eliminate surprise churn events and automate account rescue playbooks.",
    executiveSummary: "RETENTION-OS-01 continuously monitors account health signals, evaluates churn probability across engagement parameters, and triggers automated rescue playbooks before renewal risk escalates.",
    targetBuyer: "Head of Retention, CS Operations Leads, SaaS Growth Leads.",
    upgradePath: "CX-OS-01 Autonomous Customer Success OS ($199)",
    problemsSolved: [
      "Clients churning unexpectedly without advance operational warning.",
      "Lack of standardized intervention protocols when account health drops.",
      "Fragmented usage signals across disconnected support and product tools."
    ],
    capabilities: [
      "Health risk matrix evaluating login frequency, ticket sentiment, and sponsor changes.",
      "Instant escalation dispatcher alerting account teams when an account becomes At-Risk.",
      "Intervention playbook selector matching specific risk factors to rescue SOPs."
    ],
    deliverables: [
      "RETENTION-OS-01 Core Execution Engine & CLI Harness.",
      "Multi-Signal Account Health Risk Matrix.",
      "Automated Churn Escalation Dispatcher.",
      "Standard Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Customer Retention SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "30% Reduction in Unanticipated Customer Churn Events.",
      "Sub-24h Intervention Dispatch for At-Risk Accounts.",
      "Objective Account Health Visibility."
    ],
    whoItIsFor: [
      "Heads of Retention seeking structured churn defense.",
      "CS Operations Leads implementing early-warning alerts.",
      "Growth Leads optimizing account expansion and gross retention."
    ],
    faqs: [
      {
        question: "How are churn signals detected?",
        answer: "Evaluates activity telemetry drop-offs, ticket escalations, and sponsor transition markers against codified risk thresholds."
      },
      {
        question: "What is the upgrade path?",
        answer: "Expands into CX-OS-01 ($199) for enterprise-wide customer journey automation."
      },
      {
        question: "What is the delivery model?",
        answer: "Delivered as a complete digital software package (.zip) with installation documentation and commercial license."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "inventory-os-01",
    systemCode: "INVENTORY-OS-01",
    tier: 1,
    subTier: "1",
    wave: 2,
    title: "INVENTORY-OS-01 Inventory Control & Stockout Defense OS",
    subtitle: "Dynamic Reorder Point Calculation, Safety Stock Buffers & Dead-Stock Defense",
    category: "Operations Systems",
    price: 99,
    badge: "Focused OS",
    status: "PORTFOLIO_SPEC",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Defends against stockouts and dead inventory carrying costs with dynamic reorder point formulas and velocity audits.",
    operationalFriction: "Frequent stockouts on high-velocity SKUs and bloated carrying costs on dead inventory due to lack of automated reorder point calculation.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 45% Decrease in Critical SKU Stockout Incidents.",
    description: "Targeted operating system engineered to eliminate SKU stockouts and optimize inventory carrying costs.",
    executiveSummary: "INVENTORY-OS-01 automates reorder point calculation using historical velocity and supplier lead times, enforces safety stock buffers, and audits dead stock to free up trapped working capital.",
    targetBuyer: "Inventory Managers, Supply Chain Coordinators, E-commerce Operations Leads.",
    upgradePath: "OPS-OS-02 Global Supply Chain & Operations OS ($299)",
    problemsSolved: [
      "Running out of stock on core SKUs during peak sales periods.",
      "Working capital tied up in slow-moving or dead inventory items.",
      "Manual spreadsheet calculations for lead-time safety stock buffers."
    ],
    capabilities: [
      "Dynamic reorder point calculator updating thresholds based on demand velocity.",
      "Stockout risk monitor alerting when buffer falls below safety margins.",
      "Dead inventory auditor isolating items with zero movement over 90 days."
    ],
    deliverables: [
      "INVENTORY-OS-01 Core Execution Engine & CLI Harness.",
      "Dynamic Reorder Point (ROP) Calculation Module.",
      "Dead-Stock & SKU Velocity Audit Pipeline.",
      "Standard Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Inventory Control SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "45% Decrease in Critical SKU Stockout Incidents.",
      "25% Reduction in Working Capital Tied in Dead Inventory.",
      "Automated Lead-Time Reorder Calculations."
    ],
    whoItIsFor: [
      "Inventory Managers overseeing multi-SKU product catalogs.",
      "Supply Chain Coordinators optimizing safety stock buffers.",
      "Operations Leads balancing stock availability with holding costs."
    ],
    faqs: [
      {
        question: "Does INVENTORY-OS-01 integrate with ERPs?",
        answer: "Accepts inventory telemetry feeds via JSON/CSV and triggers replenishment webhooks."
      },
      {
        question: "What is the upgrade path?",
        answer: "Expands into OPS-OS-02 ($299) for end-to-end global supply chain and vendor SLA governance."
      },
      {
        question: "What is the delivery model?",
        answer: "Delivered as a complete digital software package (.zip) with installation documentation and commercial license."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "workflow-os-01",
    systemCode: "WORKFLOW-OS-01",
    tier: 1,
    subTier: "1",
    wave: 2,
    title: "WORKFLOW-OS-01 Cross-Functional Task Execution OS",
    subtitle: "Deterministic Inter-Departmental Handoff State Machine & Milestone SLA Tracking",
    category: "Operations Systems",
    price: 99,
    badge: "Focused OS",
    status: "PORTFOLIO_SPEC",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Compresses project handoff latency by enforcing sequential handoff verification and milestone SLA monitoring.",
    operationalFriction: "Inter-departmental project delays caused by ambiguous task ownership, manual status chasing, and missing handoff checkpoints.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 40% Compression in Cross-Functional Project Handoff Latency.",
    description: "Targeted operating system engineered to eliminate cross-functional project bottlenecks and handoff delays.",
    executiveSummary: "WORKFLOW-OS-01 enforces deterministic task transitions between business units. It measures SLA durations between milestones and automatically routes escalations when handoffs stall.",
    targetBuyer: "Chief of Staff, Operations Leads, Project Management Office Directors.",
    upgradePath: "OPS-OS-02 Global Supply Chain & Operations OS ($299)",
    problemsSolved: [
      "Projects stalling at departmental handoffs due to unclear accountability.",
      "Hours wasted in weekly status meetings manually chasing task updates.",
      "Incomplete deliverable packages passed between teams without verification."
    ],
    capabilities: [
      "Handoff state machine enforcing strict sequential task transitions between departments.",
      "Milestone SLA tracker measuring handoff latency and alerting on delays.",
      "Escalation router automatically notifying department heads upon SLA breach."
    ],
    deliverables: [
      "WORKFLOW-OS-01 Core Execution Engine & CLI Harness.",
      "Cross-Functional Handoff State Machine.",
      "Overdue Milestone SLA Escalation Engine.",
      "Standard Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Cross-Functional Workflow SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "40% Compression in Cross-Functional Project Handoff Latency.",
      "100% Deliverable Checkpoint Verification.",
      "Automated Milestone SLA Escalations."
    ],
    whoItIsFor: [
      "Chiefs of Staff orchestrating executive cross-functional initiatives.",
      "Operations Leads standardizing inter-team workflows.",
      "PMO Directors eliminating manual project status overhead."
    ],
    faqs: [
      {
        question: "Does WORKFLOW-OS-01 replace project management tools?",
        answer: "It provides deterministic governance and automated state-machine verification over your existing tools."
      },
      {
        question: "What is the upgrade path?",
        answer: "Expands into OPS-OS-02 ($299) for comprehensive enterprise operations and supplier SLA governance."
      },
      {
        question: "What is the delivery model?",
        answer: "Delivered as a complete digital software package (.zip) with installation documentation and commercial license."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "kpi-os-01",
    systemCode: "KPI-OS-01",
    tier: 1,
    subTier: "1",
    wave: 2,
    title: "KPI-OS-01 Executive KPI & Metrics Layer OS",
    subtitle: "Declarative Semantic Metric Dictionary, Scorecard Generator & Variance Detection",
    category: "Data Systems",
    price: 99,
    badge: "Focused OS",
    status: "PORTFOLIO_SPEC",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Aligns enterprise metrics into a declarative semantic dictionary and generates automated weekly executive scorecards.",
    operationalFriction: "Conflicting departmental metrics (e.g., Marketing vs. Sales defining \"Lead\" differently) and slow manual compilation of weekly executive KPI dashboards.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 100% Definition Alignment Across Core Enterprise KPIs.",
    description: "Targeted operating system engineered to eliminate conflicting departmental metrics and automate executive KPI reporting.",
    executiveSummary: "KPI-OS-01 codifies enterprise metrics into declarative schemas, audits incoming data feeds against standardized formulas, and generates automated weekly scorecards with variance alerting.",
    targetBuyer: "BI Managers, Analytics Leads, Founders & Managing Partners.",
    upgradePath: "DATA-OS-01 Enterprise Data & Analytics OS ($179)",
    problemsSolved: [
      "Disputed metric definitions causing boardroom friction between department heads.",
      "Days spent each week manually compiling executive KPI spreadsheets.",
      "Delayed detection of metric deviations from quarterly targets."
    ],
    capabilities: [
      "Metric schema validator auditing incoming metrics against standard formulas.",
      "Executive scorecard generator building weekly Markdown/JSON board summaries.",
      "KPI variance detector triggering alerts when metrics deviate > 15% from targets."
    ],
    deliverables: [
      "KPI-OS-01 Core Execution Engine & CLI Harness.",
      "Declarative Semantic Metric Definition Dictionary (YAML/JSON).",
      "Automated Weekly Executive Scorecard Generator.",
      "Standard Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Enterprise Metrics Dictionary SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "100% Definition Alignment Across Core Enterprise KPIs.",
      "Sub-Minute Weekly Executive Scorecard Generation.",
      "Real-Time Threshold Deviation Alerting."
    ],
    whoItIsFor: [
      "BI Managers enforcing single-source-of-truth metric definitions.",
      "Analytics Leads building standardized data layers.",
      "Managing Partners and Founders needing trustworthy executive scorecards."
    ],
    faqs: [
      {
        question: "What format are metric definitions written in?",
        answer: "Written in standard declarative YAML/JSON schemas that validate data feeds programmatically."
      },
      {
        question: "How does it upgrade to DATA-OS-01?",
        answer: "KPI-OS-01 handles executive metrics governance ($99); DATA-OS-01 ($179) provides full enterprise knowledge graphs, vector telemetry, and warehouse pipelines."
      },
      {
        question: "What is the delivery model?",
        answer: "Delivered as a complete digital software package (.zip) with installation documentation and commercial license."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "policy-os-01",
    systemCode: "POLICY-OS-01",
    tier: 1,
    subTier: "1",
    wave: 2,
    title: "POLICY-OS-01 Policy Enforcement & Compliance OS",
    subtitle: "Declarative Policy Codification, Audit Checklist Validator & Exception Logging",
    category: "Governance Systems",
    price: 99,
    badge: "Focused OS",
    status: "PORTFOLIO_SPEC",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Transforms static compliance documents into active code validation rules, automated audit checklists, and exception logs.",
    operationalFriction: "Static PDF security and operational policies that are ignored during day-to-day execution, creating severe audit and compliance exposure.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 80% Faster Internal Audit Preparation Cycle Times.",
    description: "Targeted operating system engineered to eliminate compliance exposure and automate internal audit readiness.",
    executiveSummary: "POLICY-OS-01 converts static compliance documents into active validation rules, performs continuous audit readiness scans against baseline frameworks (SOC2/ISO), and maintains an immutable exception log.",
    targetBuyer: "Compliance Officers, Information Security Leads, Risk Managers.",
    upgradePath: "GOV-OS-01 Enterprise Governance & Risk OS ($149)",
    problemsSolved: [
      "Policies stored in unread PDF binders leaving companies vulnerable during audits.",
      "Lack of documented exception logs when policy overrides occur.",
      "Painful, multi-week scramble before SOC2 or ISO compliance audits."
    ],
    capabilities: [
      "Policy rule engine evaluating operational configurations against compliance baselines.",
      "Audit readiness scanner generating instant compliance summaries for leadership.",
      "Immutable exception logger recording authorized overrides in a structured audit log."
    ],
    deliverables: [
      "POLICY-OS-01 Core Execution Engine & CLI Harness.",
      "Declarative Policy Rule Engine (SOC2/ISO Baselines).",
      "Immutable Policy Exception Logging Subsystem.",
      "Standard Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Master Policy Enforcement SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "80% Faster Internal Audit Preparation Cycle Times.",
      "100% Policy Exception Logging and Traceability.",
      "Continuous Compliance Readiness."
    ],
    whoItIsFor: [
      "Compliance Officers preparing for SOC2 or ISO27001 certifications.",
      "Information Security Leads automating policy enforcement checks.",
      "Risk Managers eliminating unmonitored operational deviations."
    ],
    faqs: [
      {
        question: "Which compliance baselines are supported?",
        answer: "Includes pre-configured baseline rulesets aligned with SOC2, ISO27001, and operational governance standards."
      },
      {
        question: "How does it upgrade to GOV-OS-01?",
        answer: "POLICY-OS-01 focuses on policy codification and audit readiness ($99); GOV-OS-01 ($149) adds the full Executive Decision Registry (EDR) and Defect Elimination Protocol (DEP)."
      },
      {
        question: "What is the delivery model?",
        answer: "Delivered as a complete digital software package (.zip) with installation documentation and commercial license."
      }
    ],
    checkoutUrl: null
  }
];

/**
 * TIER 2A: Enterprise Systems (6 Systems — $149–$349)
 * Deeper systems designed around major business functions and organizational workflows.
 */
export const TIER_2A_PRODUCTS: Product[] = [
  {
    id: "rev-os-01",
    systemCode: "REV-OS-01",
    tier: 2,
    subTier: "2A",
    wave: 1,
    title: "REV-OS-01 Autonomous Revenue Operations OS",
    subtitle: "End-to-End Autonomous Pipeline & Revenue Forecasting System",
    category: "Revenue Systems",
    price: 249,
    badge: "Enterprise OS",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Transforms pipeline tracking into an autonomous, self-optimizing revenue engine with integrated forecasting and renewal propensity.",
    operationalFriction: "Unreliable quarter-end revenue forecasts, manual spreadsheet stitching, and high rep administrative overhead.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 38% Increase in Sales Velocity across Enterprise Accounts.",
    description: "Transforms pipeline tracking into an autonomous, self-optimizing revenue engine.",
    executiveSummary: "REV-OS-01 is a pre-built commercial operating system that replaces manual CRM entry, fragmented sales tools, and static spreadsheets with an autonomous revenue engine. Built on Evolvith's Master Genome Architecture, REV-OS-01 coordinates pipeline hygiene, deal scoring, churn prediction, and automated executive reporting.",
    targetBuyer: "Chief Revenue Officers & VPs of Sales managing $5M–$100M ARR.",
    problemsSolved: [
      "Unreliable quarter-end revenue forecasts and manual spreadsheet stitching.",
      "High rep time wasted on manual CRM data entry and activity logging.",
      "Hidden pipeline risks and undetected deal stagnation.",
      "Disconnected sales, marketing, and customer success data silos."
    ],
    capabilities: [
      "Autonomous Deal Velocity Engine & Real-Time Slippage Alerts.",
      "AI-Native Deal Health Scoring Matrix across 12 behavioral parameters.",
      "Automated Weekly Executive Revenue Board Briefing Pack Generator.",
      "Integrated Renewal & Expansion Propensity Forecasting Module."
    ],
    deliverables: [
      "Complete REV-OS-01 Operating Architecture & Modular Config Sets.",
      "Master Pipeline Governance SOP Manual & RACI Matrix.",
      "Automated Executive Dashboard & Telemetry Pipelines.",
      "100% Quality Gate QG4 Certified Deployment Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) containing full unencrypted Python runtime engine.",
      "Master Pipeline Governance SOP Manual & RACI Execution Matrix.",
      "Automated Executive Telemetry Pipeline & Dashboard Configs.",
      "API Specification, CLI tools, and 48-hour rapid deployment runbook.",
      "One-Time Perpetual Commercial License Grant with unlimited internal seats."
    ],
    outcomes: [
      "38% Increase in Sales Velocity across Enterprise Accounts.",
      "94% Accuracy in 90-Day Revenue Forecasting Accuracy.",
      "Elimination of 12 Hours/Week per Rep of Administrative Overhead."
    ],
    whoItIsFor: [
      "Chief Revenue Officers & VPs of Sales managing $5M–$100M ARR.",
      "Revenue Operations Leaders scaling multi-tier sales teams.",
      "Enterprise Founders replacing manual sales management tools."
    ],
    faqs: [
      {
        question: "How long does it take to deploy REV-OS-01?",
        answer: "REV-OS-01 is fully operational within 48 hours using our automated deployment runbook."
      },
      {
        question: "Does REV-OS-01 replace our existing CRM?",
        answer: "REV-OS-01 overlays directly above your existing CRM (Salesforce/HubSpot) as an executive governance layer."
      },
      {
        question: "What licensing model is included?",
        answer: "Includes a perpetual Commercial License with unlimited internal user seats."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "fin-os-01",
    systemCode: "FIN-OS-01",
    tier: 2,
    subTier: "2A",
    wave: 1,
    title: "FIN-OS-01 Enterprise Financial Intelligence OS",
    subtitle: "Automated Multi-Entity Cash Flow, Margin & Capital Allocation System",
    category: "Financial Operations",
    price: 349,
    badge: "Enterprise OS",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Establishes permanent financial governance, consolidating multi-currency cash flows, unit economics, and capital allocation.",
    operationalFriction: "Delayed month-end closing, opaque unit economics, undetected margin erosion, and fragmented multi-account cash flows.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: Month-End Closing Time Reduced from 14 Days to 24 Hours.",
    description: "Real-time capital allocation, unit economics governance, and audit intelligence.",
    executiveSummary: "FIN-OS-01 establishes permanent financial governance across enterprise entities. It consolidates multi-currency cash flows, unit economics, gross margin telemetry, and capital allocation budgets under a single operational brain.",
    targetBuyer: "Chief Financial Officers & VPs of Finance seeking real-time governance.",
    problemsSolved: [
      "Delayed month-end financial closing and delayed board reporting.",
      "Opaque unit economics and undetected margin erosion across product lines.",
      "Manual cash flow forecasting across fragmented bank accounts."
    ],
    capabilities: [
      "Real-Time Gross Margin & Unit Economics Telemetry Engine.",
      "Automated Multi-Entity Consolidation & Reconciliation Pipeline.",
      "10-Bucket Capital Allocation Governance & Variance Alerting."
    ],
    deliverables: [
      "FIN-OS-01 Master Financial Governance Operating System.",
      "Consolidated Cash Flow & Variance Forecasting Playbooks.",
      "Board-Ready Financial Telemetry Dashboards.",
      "Quality Gate QG4 Certified Deployment Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) containing full unencrypted Python financial brain.",
      "Consolidated Cash Flow & Variance Forecasting Playbooks.",
      "Board-Ready Financial Telemetry Dashboards.",
      "48-Hour Rapid Installation Runbook & CLI Diagnostics.",
      "One-Time Perpetual Commercial License Grant with unlimited internal seats."
    ],
    outcomes: [
      "Month-End Closing Time Reduced from 14 Days to 24 Hours.",
      "Complete Visibility into Product Line Net Margin Performance.",
      "Zero Unapproved Capital Variance across Operating Units."
    ],
    whoItIsFor: [
      "Chief Financial Officers & VPs of Finance seeking real-time governance.",
      "Private Equity Portfolio Managers standardizing financial ops."
    ],
    faqs: [
      {
        question: "Does FIN-OS-01 support multi-currency accounting?",
        answer: "Yes, FIN-OS-01 supports real-time multi-currency consolidation across 40+ currencies."
      },
      {
        question: "What licensing model is included?",
        answer: "Includes a perpetual Commercial License with unlimited internal user seats."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "cx-os-01",
    systemCode: "CX-OS-01",
    tier: 2,
    subTier: "2A",
    wave: 1,
    title: "CX-OS-01 Autonomous Customer Success OS",
    subtitle: "Predictive Health Scoring, Onboarding & Churn Mitigation Engine",
    category: "Customer Success",
    price: 199,
    badge: "Enterprise OS",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Elevates customer retention into a scalable science with predictive health scoring, onboarding workflows, and churn mitigation.",
    operationalFriction: "Surprise churn events, inconsistent customer onboarding timelines, and lack of visibility into adoption depth.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 45% Reduction in Net Revenue Churn within 90 Days.",
    description: "Predictive churn mitigation and automated customer onboarding journeys.",
    executiveSummary: "CX-OS-01 elevates customer retention into a scalable science. By monitoring product telemetry, support ticket velocity, and executive engagement, CX-OS-01 identifies churn signals weeks before renewal dates.",
    targetBuyer: "VPs of Customer Success & Chief Customer Officers.",
    problemsSolved: [
      "Surprise churn events and reactive customer management.",
      "Inconsistent onboarding timelines across customer cohorts.",
      "Lack of visibility into customer product adoption depth."
    ],
    capabilities: [
      "Predictive Account Churn Matrix with Early Alert Triggers.",
      "Automated Onboarding Journey Workflows & Escalation SOPs.",
      "Executive Sponsor Alignment Tracking Engine."
    ],
    deliverables: [
      "CX-OS-01 Customer Success Operating Architecture.",
      "Customer Onboarding Framework & RACI Execution Playbooks.",
      "Executive Churn Mitigation Telemetry Dashboard.",
      "Quality Gate QG4 Certified Deployment Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) containing full unencrypted Python CS engine.",
      "Customer Onboarding Framework & RACI Execution Playbooks.",
      "Executive Churn Mitigation Telemetry Dashboard.",
      "48-Hour Rapid Installation Runbook & Webhook Bridges.",
      "One-Time Perpetual Commercial License Grant with unlimited internal seats."
    ],
    outcomes: [
      "45% Reduction in Net Revenue Churn within 90 Days.",
      "2.5x Increase in Customer Onboarding Completion Speed."
    ],
    whoItIsFor: [
      "VPs of Customer Success & Chief Customer Officers.",
      "B2B SaaS Leaders scaling account management teams."
    ],
    faqs: [
      {
        question: "How does CX-OS-01 detect churn signals?",
        answer: "It analyzes combined telemetry including API usage drop-offs, support ticket sentiment, and sponsor interaction frequency."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "ops-os-02",
    systemCode: "OPS-OS-02",
    tier: 2,
    subTier: "2A",
    wave: 1,
    title: "OPS-OS-02 Global Supply Chain & Operations OS",
    subtitle: "Real-Time Operational Bottleneck Elimination & Inventory Intelligence",
    category: "Operations Systems",
    price: 299,
    badge: "Enterprise OS",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Governs complex enterprise operations and supply chains, eliminating bottlenecks and enforcing standardized SOP compliance.",
    operationalFriction: "Supply chain bottlenecks causing delivery delays, vendor SLA non-compliance, and unstandardized SOP execution.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 52% Faster Resolution of Supply Chain Bottlenecks.",
    description: "Eliminates operational bottlenecks and enforces standardized SOP workflows.",
    executiveSummary: "OPS-OS-02 governs complex enterprise operations and supply chains. It identifies operational friction, tracks vendor SLA compliance, and enforces standardized SOP execution across global teams.",
    targetBuyer: "Chief Operating Officers & Operations Directors.",
    problemsSolved: [
      "Operational bottlenecks causing delivery delays and cost overruns.",
      "Inconsistent execution of standard operating procedures across locations.",
      "Vendor SLA failures and untracked supply chain risks."
    ],
    capabilities: [
      "Operational Bottleneck Detection Engine.",
      "Global Vendor SLA & Quality Audit Pipeline.",
      "Real-Time SOP Compliance & Task Escalation System."
    ],
    deliverables: [
      "OPS-OS-02 Master Operations Architecture.",
      "Standardized Execution Playbooks & RACI Templates.",
      "Live Operational Bottleneck Telemetry Dashboard.",
      "Quality Gate QG4 Certified Deployment Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) containing full unencrypted Python operations engine.",
      "Standardized Execution Playbooks & RACI Governance Templates.",
      "Live Operational Bottleneck Telemetry Dashboard.",
      "48-Hour Rapid Installation Runbook & Webhook Integrations.",
      "One-Time Perpetual Commercial License Grant with unlimited internal seats."
    ],
    outcomes: [
      "52% Faster Resolution of Supply Chain Bottlenecks.",
      "100% SOP Compliance across Regional Operating Teams."
    ],
    whoItIsFor: [
      "Chief Operating Officers & Operations Directors.",
      "Global Supply Chain & Logistics Executives."
    ],
    faqs: [
      {
        question: "Can OPS-OS-02 integrate with existing ERP systems?",
        answer: "Yes, it integrates seamlessly with major ERPs via standardized API webhooks."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "data-os-01",
    systemCode: "DATA-OS-01",
    tier: 2,
    subTier: "2A",
    wave: 1,
    title: "DATA-OS-01 Enterprise Data & Analytics OS",
    subtitle: "Unified Knowledge Graph, Vector Telemetry & Metrics Layer",
    category: "Data Systems",
    price: 179,
    badge: "Enterprise OS",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Unifies enterprise data into a semantic metric graph, eliminating conflicting KPI definitions and accelerating AI execution.",
    operationalFriction: "Conflicting KPI definitions between departments and slow, costly custom data warehouse engineering.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 100% Alignment on Enterprise KPI Definitions.",
    description: "Single source of truth data infrastructure with automated metrics layer.",
    executiveSummary: "DATA-OS-01 unifies fragmented enterprise data into a semantic metric graph. It eliminates conflicting KPI definitions between departments and provides clean data infrastructure for AI agent execution.",
    targetBuyer: "Chief Data Officers, VPs of Analytics & Lead Architects.",
    problemsSolved: [
      "Conflicting metrics between marketing, sales, and finance reports.",
      "Expensive, slow custom data warehouse pipelines.",
      "Fragmented data schemas hindering AI execution agent deployments."
    ],
    capabilities: [
      "Unified Semantic Metrics Layer & Schema Registry.",
      "Vector Telemetry Data Pipeline for AI Agent RAG.",
      "Automated Data Quality & Lineage Audit System."
    ],
    deliverables: [
      "DATA-OS-01 Core Data Operating Architecture.",
      "Enterprise Metric Definitions Specification.",
      "Data Quality Audit Telemetry Engine.",
      "Quality Gate QG4 Certified Deployment Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) containing full unencrypted Python data layer.",
      "Enterprise Metric Definitions Specification (YAML/JSON schemas).",
      "Data Quality Audit Telemetry Engine & Schemas.",
      "48-Hour Rapid Installation Runbook & Warehouse Connectors.",
      "One-Time Perpetual Commercial License Grant with unlimited internal seats."
    ],
    outcomes: [
      "100% Alignment on Enterprise KPI Definitions.",
      "Sub-Second Data Telemetry Query Speed for Executives."
    ],
    whoItIsFor: [
      "Chief Data Officers, VPs of Analytics & Lead Architects."
    ],
    faqs: [
      {
        question: "Is DATA-OS-01 compatible with Snowflake or BigQuery?",
        answer: "Yes, it connects directly to modern cloud warehouses including Snowflake, BigQuery, and Databricks."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "gov-os-01",
    systemCode: "GOV-OS-01",
    tier: 2,
    subTier: "2A",
    wave: 1,
    title: "GOV-OS-01 Enterprise Governance & Risk OS",
    subtitle: "Institutional Policy Enforcement, Compliance & Defect Elimination",
    category: "Governance Systems",
    price: 149,
    badge: "Enterprise OS",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Codifies policies into active software rules, managing institutional decision logs and eliminating recurring defects.",
    operationalFriction: "Paper compliance policies ignored by employees and lack of institutional records for executive decisions.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: Zero Policy Non-Compliance Defects in Audits.",
    description: "Codifies policies into automated software enforcement rules.",
    executiveSummary: "GOV-OS-01 converts static paper policies into active software governance. It enforces compliance gates, manages institutional decision logs, and eliminates recurring defects across all business units.",
    targetBuyer: "Chief Risk Officers, General Counsels & Executive Boards.",
    problemsSolved: [
      "Paper policies ignored by employees and contractors.",
      "Lack of institutional record for executive decisions.",
      "Recurring compliance and operational defects during audits."
    ],
    capabilities: [
      "Executive Decision Registry (EDR) Master Logging Engine.",
      "Quality Gate & Policy Enforcement Pipeline.",
      "Defect Elimination Protocol (DEP) Workflow Engine."
    ],
    deliverables: [
      "GOV-OS-01 Master Governance System.",
      "Enterprise Policy Enforcement Code Modules.",
      "Executive Decision & Risk Telemetry Dashboard.",
      "Quality Gate QG4 Certified Deployment Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) containing full unencrypted Python governance brain.",
      "Enterprise Policy Enforcement Code Modules & EDR Schemas.",
      "Executive Decision & Risk Telemetry Dashboard.",
      "48-Hour Rapid Installation Runbook & Audit Harness.",
      "One-Time Perpetual Commercial License Grant with unlimited internal seats."
    ],
    outcomes: [
      "Zero Policy Non-Compliance Defects in Audits.",
      "Complete Institutional Audit Log of Executive Decisions."
    ],
    whoItIsFor: [
      "Chief Risk Officers, General Counsels & Executive Boards."
    ],
    faqs: [
      {
        question: "Does GOV-OS-01 support ISO and SOC2 compliance?",
        answer: "Yes, it includes pre-mapped policy rulesets for SOC2, ISO27001, and GDPR compliance."
      }
    ],
    checkoutUrl: null
  }
];

/**
 * TIER 2B: Strategic Entry Systems (3 Systems — $99 Launch Edition)
 * High-leverage systems providing an accessible entry point into deeper Evolvith operating architecture.
 */
export const TIER_2B_PRODUCTS: Product[] = [
  {
    id: "pipe-os-01",
    systemCode: "PIPE-OS-01",
    tier: 2,
    subTier: "2B",
    wave: 2,
    title: "PIPE-OS-01 Lead & Pipeline Execution OS",
    subtitle: "Standardized Lead Qualification, Stage-Gate Enforcement & Pipeline Velocity",
    category: "Revenue Operations",
    price: 99,
    badge: "$99 Launch Edition",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Eliminates lead leakage and deal slippage by enforcing deterministic qualification gates and automated stagnation escalation.",
    operationalFriction: "High lead leakage, unstandardized sales stage progression, and manual deal qualification drop-off in early-stage pipelines.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 35% Reduction in Stalled Deal Aging Across Active Pipeline.",
    description: "Strategic entry operating system engineered to eliminate early-stage pipeline friction and SDR/AE handoff leakage.",
    executiveSummary: "PIPE-OS-01 is a strategic entry operating system engineered to eliminate early-stage sales friction. It replaces subjective pipeline stages with deterministic qualification criteria, automated lead scoring against ideal customer profiles, and programmatic stagnation alerts.",
    targetBuyer: "Sales Directors, Revenue Operations Managers, Agency Founders ($500K–$10M ARR).",
    upgradePath: "REV-OS-01 Autonomous Revenue Operations OS ($249)",
    problemsSolved: [
      "Unstandardized lead intake qualification causing sales rep pipeline congestion.",
      "Early-stage deals stalling without automated alerts or executive visibility.",
      "Inconsistent SDR to AE handoff documentation and missing qualification data."
    ],
    capabilities: [
      "Automated ICP lead qualification scoring against 8 business parameters.",
      "Deterministic pipeline stage-gate validator script.",
      "Automated 14-day stalled deal webhook escalation dispatcher."
    ],
    deliverables: [
      "PIPE-OS-01 Core Execution Engine & CLI Harness.",
      "Lead Intake Validation Matrix & ICP Scoring Rules.",
      "Master Pipeline Governance SOP Manual & RACI Matrix.",
      "Quality Gate QG4 Certified Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Master Pipeline Governance SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "35% Reduction in Stalled Deal Aging Across Active Pipeline.",
      "100% SDR/AE Qualification Handoff Adherence.",
      "Automated Real-Time Deal Stagnation Alerts."
    ],
    whoItIsFor: [
      "Sales Directors scaling early-stage B2B sales pipelines.",
      "Revenue Operations Managers standardizing CRM stage gates.",
      "Agency and SaaS Founders seeking structured deal velocity."
    ],
    faqs: [
      {
        question: "What is included in the PIPE-OS-01 digital product package?",
        answer: "The package includes the full unencrypted Python execution engine, command-line diagnostic tool, AST blueprint schema, master SOP manual, RACI matrix, API specification, and a perpetual commercial license."
      },
      {
        question: "How does PIPE-OS-01 relate to REV-OS-01?",
        answer: "PIPE-OS-01 provides high-leverage entry into pipeline qualification ($99 Launch Edition), expanding into REV-OS-01 ($249) for comprehensive enterprise revenue forecasting."
      },
      {
        question: "What is the commercial licensing model?",
        answer: "Includes a one-time perpetual commercial license with unlimited internal seats and zero recurring SaaS subscription fees."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "cash-os-01",
    systemCode: "CASH-OS-01",
    tier: 2,
    subTier: "2B",
    wave: 2,
    title: "CASH-OS-01 Cash Collection & Receivables OS",
    subtitle: "Automated Accounts Receivable Aging, Dunning Cadence & DSO Optimization",
    category: "Financial Operations",
    price: 99,
    badge: "$99 Launch Edition",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Accelerates overdue invoice recovery through automated aging bucket categorization, structured escalation triggers, and DSO telemetry.",
    operationalFriction: "Aging accounts receivable (A/R), overdue client invoices, and lack of structured collections escalation protocols.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 40% Acceleration in Outstanding Invoice Recovery Speed.",
    description: "Strategic entry operating system engineered to eliminate aging accounts receivable and optimize cash collection velocity.",
    executiveSummary: "CASH-OS-01 establishes automated accounts receivable governance. It analyzes invoice aging across 30, 60, and 90+ day buckets, triggers tiered dunning notifications, and computes rolling Days Sales Outstanding (DSO).",
    targetBuyer: "Financial Controllers, Accounting Managers, Bootstrap Founders.",
    upgradePath: "FIN-OS-01 Enterprise Financial Intelligence OS ($349)",
    problemsSolved: [
      "Mounting unpaid invoices causing unpredictable working capital constraints.",
      "Awkward, manual email follow-ups resulting in irregular collections cadences.",
      "Lack of visibility into rolling Days Sales Outstanding (DSO) metrics."
    ],
    capabilities: [
      "Automated invoice aging categorization across 30, 60, and 90+ day tiers.",
      "Structured dunning cadence triggers (courtesy reminder → formal notice → executive hold).",
      "Rolling DSO calculation and collection velocity telemetry engine."
    ],
    deliverables: [
      "CASH-OS-01 Core Execution Engine & CLI Harness.",
      "Automated Aging Bucket Analyzer (30/60/90+ Days).",
      "Escalating Collections Cadence Notification Generator.",
      "Quality Gate QG4 Certified Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Master A/R Collections SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "40% Acceleration in Outstanding Invoice Recovery Speed.",
      "50% Reduction in Overdue 60+ Day Receivables.",
      "Automated Multi-Stage Collections Escalation."
    ],
    whoItIsFor: [
      "Financial Controllers managing enterprise client receivables.",
      "Accounting Managers seeking structured collections workflows.",
      "Founders maintaining tight working capital discipline."
    ],
    faqs: [
      {
        question: "Does CASH-OS-01 connect to accounting software?",
        answer: "Accepts standardized JSON and CSV invoice feeds and outputs webhook notifications and structured email payloads."
      },
      {
        question: "How does it relate to FIN-OS-01?",
        answer: "CASH-OS-01 specializes in accounts receivable recovery ($99 Launch Edition), pairing with FIN-OS-01 ($349) for full enterprise cash flow and capital allocation."
      },
      {
        question: "What is the delivery model?",
        answer: "Delivered as a complete digital software package (.zip) with installation documentation and commercial license."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "onboard-os-01",
    systemCode: "ONBOARD-OS-01",
    tier: 2,
    subTier: "2B",
    wave: 2,
    title: "ONBOARD-OS-01 Customer Onboarding & Activation OS",
    subtitle: "Milestone-Based Client Onboarding, TTFV Acceleration & Stall Detection",
    category: "Customer Success",
    price: 99,
    badge: "$99 Launch Edition",
    status: "RELEASED",
    availability: "COMMERCIAL",
    oneSentencePurpose: "Accelerates time-to-first-value and eliminates customer drop-off with 5-gate implementation tracking and stall detection.",
    operationalFriction: "Customer drop-off during onboarding, extended time-to-first-value (TTFV), and inconsistent implementation milestone tracking.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 50% Faster Time-to-First-Value (TTFV) Across Standard Customer Onboardings.",
    description: "Strategic entry operating system engineered to eliminate onboarding bottlenecks and accelerate time-to-first-value.",
    executiveSummary: "ONBOARD-OS-01 structures post-sales implementation into five strict milestone gates. It includes automated stall detection for stagnant accounts and calculates activation health scores.",
    targetBuyer: "Customer Success Managers, Onboarding Leads, Operations Directors.",
    upgradePath: "CX-OS-01 Autonomous Customer Success OS ($199)",
    problemsSolved: [
      "Extended implementation timelines causing buyer remorse and delayed value.",
      "Customer accounts stalling silently in onboarding without CS alert triggers.",
      "Inconsistent milestone execution between different onboarding specialists."
    ],
    capabilities: [
      "Milestone tracker monitoring progress across 5 implementation gates.",
      "Stall detection engine flagging accounts inactive > 5 business days.",
      "Activation health scorer evaluating core configuration completion."
    ],
    deliverables: [
      "ONBOARD-OS-01 Core Execution Engine & CLI Harness.",
      "5-Stage Implementation Gate Tracking Engine.",
      "Automated Onboarding Stall Detection Dispatcher.",
      "Quality Gate QG4 Certified Distribution Package."
    ],
    whatYouReceive: [
      "Digital product package (.zip) with complete unencrypted Python engine & CLI.",
      "Standardized AST JSON Blueprint Schema (blueprint.json).",
      "Client Onboarding SOP Manual & RACI Matrix (SOP_MANUAL.md).",
      "API & Webhook Integration Specification (API_SPEC.md).",
      "One-Time Perpetual Commercial License Grant (LICENSE_EULA.md).",
      "Executive Architecture & Implementation Playbook (docs/)."
    ],
    outcomes: [
      "50% Faster Time-to-First-Value (TTFV) Across Standard Customer Onboardings.",
      "Zero Undetected Onboarding Stalls Past 5 Days.",
      "Standardized 5-Stage Implementation Delivery."
    ],
    whoItIsFor: [
      "Customer Success Managers managing high-touch client implementations.",
      "Onboarding Leads scaling customer activation workflows.",
      "Operations Directors standardizing post-sales delivery."
    ],
    faqs: [
      {
        question: "How does ONBOARD-OS-01 track progress?",
        answer: "Tracks accounts through 5 deterministic implementation milestone gates with automated stall alerts."
      },
      {
        question: "How does it relate to CX-OS-01?",
        answer: "ONBOARD-OS-01 focuses specifically on post-sale onboarding ($99 Launch Edition); CX-OS-01 ($199) covers full lifecycle health scoring, churn prediction, and retention."
      },
      {
        question: "What is the delivery model?",
        answer: "Delivered as a complete digital software package (.zip) with installation documentation and commercial license."
      }
    ],
    checkoutUrl: null
  }
];

/**
 * TIER 3: Synthesis Organisms (2 Initial Definitions — In Development)
 * Cross-system architectures designed to synthesize multiple Evolvith operating systems into higher-level organizational intelligence.
 * Strictly non-purchasable with checkout disabled and no Dodo IDs created.
 */
export const TIER_3_PRODUCTS: Product[] = [
  {
    id: "command-os-01",
    systemCode: "COMMAND-OS-01",
    tier: 3,
    subTier: "3",
    wave: 3,
    title: "COMMAND-OS-01 Enterprise Command & Decision Organism",
    subtitle: "Cross-System Executive Command & Strategic Decision Synthesis Architecture",
    category: "Synthesis Organisms",
    price: null, // Non-purchasable / Controlled
    badge: "In Development",
    status: "TIER_3_DEVELOPMENT",
    availability: "NOT_PURCHASABLE",
    oneSentencePurpose: "Designed as a future cross-system synthesis architecture intended to coordinate signals and outputs from multiple Evolvith operating systems into a higher-level executive decision and command layer.",
    operationalFriction: "Fragmented executive decision-making across disparate department operating systems and lack of unified cross-domain strategic orchestration.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: Sub-Minute Synthesis of Multi-Department Enterprise Telemetry.",
    description: "Future synthesis architecture designed to integrate revenue, financial, customer, operations, and governance systems into a unified executive command organ.",
    executiveSummary: "COMMAND-OS-01 is an enterprise organism currently in development. It is engineered to ingest telemetry from multiple Evolvith operating systems, synthesize cross-department signals, and provide autonomous strategic decision recommendations for executive leadership.",
    targetBuyer: "Enterprise CEOs, Executive Boards, Managing Partners.",
    architectureInputs: [
      "REV-OS-01 (Revenue Systems)",
      "FIN-OS-01 (Financial Operations)",
      "CX-OS-01 (Customer Success)",
      "OPS-OS-02 (Global Operations)",
      "DATA-OS-01 (Data & Analytics)",
      "GOV-OS-01 (Institutional Governance)",
      "KPI-OS-01 (Metrics Layer)",
      "FORECAST-OS-01 (Forecasting)",
      "POLICY-OS-01 (Compliance)"
    ],
    problemsSolved: [
      "Fragmented executive decision-making across disparate departmental tools.",
      "Lack of real-time multi-system synthesis during strategic pivots.",
      "Opaque cross-department dependencies causing operational inertia."
    ],
    capabilities: [
      "Cross-System Telemetry Ingestion & Synthesis Engine.",
      "Executive War Room Strategic Decision Matrix.",
      "Multi-Domain Autonomous Governance Orchestrator."
    ],
    deliverables: [
      "Enterprise Command Synthesis Blueprint Specification.",
      "Cross-System Telemetry Schema Definitions (YAML/JSON).",
      "Executive Decision Simulation Playbooks."
    ],
    whatYouReceive: [
      "Portfolio architecture blueprint in development (Not currently available for commercial checkout)."
    ],
    outcomes: [
      "Unified Multi-Department Strategic Visibility.",
      "Autonomous Cross-Domain Escalation & Intervention Routing.",
      "Real-Time Executive Command Telemetry."
    ],
    whoItIsFor: [
      "Enterprise CEOs coordinating multi-business unit operations.",
      "Executive Boards evaluating enterprise-wide health metrics.",
      "Managing Partners managing large operating portfolios."
    ],
    faqs: [
      {
        question: "Is COMMAND-OS-01 currently purchasable?",
        answer: "No. COMMAND-OS-01 is a Tier-3 Synthesis Organism currently in architectural development and is not available for commercial checkout."
      },
      {
        question: "How does it interact with other Evolvith systems?",
        answer: "Designed to ingest telemetry from Tier-1 and Tier-2 systems (REV-OS, FIN-OS, CX-OS, OPS-OS, DATA-OS, GOV-OS) to generate high-level decision intelligence."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "synthesis-os-01",
    systemCode: "SYNTHESIS-OS-01",
    tier: 3,
    subTier: "3",
    wave: 3,
    title: "SYNTHESIS-OS-01 Enterprise Operating Synthesis Organism",
    subtitle: "Full-Stack Coherent Enterprise Operating Model Synthesis Architecture",
    category: "Synthesis Organisms",
    price: null, // Non-purchasable / Controlled
    badge: "In Development",
    status: "TIER_3_DEVELOPMENT",
    availability: "NOT_PURCHASABLE",
    oneSentencePurpose: "Future portfolio-level architecture intended to synthesize multiple Evolvith operating systems into a coherent enterprise operating model spanning finance, revenue, operations, customer, data, and governance.",
    operationalFriction: "Tool sprawl, architectural entropy, and fragmented operating models across scaling enterprise business units.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 100% Coherence Across Multi-Department Operating Models.",
    description: "Future portfolio-level synthesis architecture engineered to unite financial, revenue, customer, and operational brains into a single coherent Master Genome.",
    executiveSummary: "SYNTHESIS-OS-01 is a Tier-3 synthesis organism in development. It models the complete enterprise operating fabric, ensuring seamless data contracts, state synchronization, and defect elimination across all deployed Evolvith systems.",
    targetBuyer: "Enterprise CEOs, Chief Operating Officers, CIOs/CTOs.",
    architectureInputs: [
      "Financial Operations Domain",
      "Revenue Systems Domain",
      "Customer Success Domain",
      "Global Operations Domain",
      "Data & Analytics Infrastructure",
      "Institutional Governance & Risk"
    ],
    problemsSolved: [
      "Operating model entropy when scaling across multiple regional units.",
      "Inconsistent data contracts between finance, revenue, and operations.",
      "Lack of an overarching enterprise operating model architecture."
    ],
    capabilities: [
      "Full-Stack Master Genome Synthesis & State Synchronization.",
      "Federated Multi-Domain Operating Model Orchestrator.",
      "Autonomous Cross-Functional Defect Elimination Loop."
    ],
    deliverables: [
      "Enterprise Synthesis Operating Model Blueprint Specification.",
      "Cross-Domain State Machine & Schema Federation Registry.",
      "Enterprise Operating Model Runbooks."
    ],
    whatYouReceive: [
      "Portfolio architecture blueprint in development (Not currently available for commercial checkout)."
    ],
    outcomes: [
      "Complete Coherence Across Enterprise Operating Models.",
      "Zero Data Schema Mismatch Between Departments.",
      "Autonomous Cross-Domain Synchronization."
    ],
    whoItIsFor: [
      "Enterprise CEOs and COOs standardizing operating models.",
      "Chief Information Officers aligning enterprise architectures.",
      "Private Equity Operating Partners modernizing portfolio company infrastructure."
    ],
    faqs: [
      {
        question: "Is SYNTHESIS-OS-01 currently purchasable?",
        answer: "No. SYNTHESIS-OS-01 is a Tier-3 Synthesis Organism currently in architectural development and is not available for commercial checkout."
      },
      {
        question: "What is the portfolio limit for Tier-3 organisms?",
        answer: "The Tier-3 portfolio is strictly capped at up to 6 synthesis organisms, with COMMAND-OS-01 and SYNTHESIS-OS-01 serving as the two initial development definitions."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "strategy-os-01",
    systemCode: "STRATEGY-OS-01",
    tier: 3,
    subTier: "3",
    wave: 3,
    title: "STRATEGY-OS-01 Enterprise Strategic Alignment Organism",
    subtitle: "Cross-System Strategic Priorities, Operating Choices & Execution Alignment Architecture",
    category: "Synthesis Organisms",
    price: null, // Non-purchasable / Controlled
    badge: "In Development",
    status: "TIER_3_DEVELOPMENT",
    availability: "NOT_PURCHASABLE",
    oneSentencePurpose: "A future cross-system architecture intended to translate enterprise objectives into coordinated strategic priorities, operating choices, initiatives, dependencies, and measurable execution structures.",
    operationalFriction: "Strategic drift and misalignment between board-level enterprise objectives and departmental execution roadmaps.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: 100% Alignment on Cross-Functional Strategic Dependencies.",
    description: "Future cross-system architecture engineered to translate high-level strategic mandates into synchronized operational initiatives across all business units.",
    executiveSummary: "STRATEGY-OS-01 is a Tier-3 synthesis organism in development. It translates board-level directives into deterministic operating choices, tracks multi-department initiative dependencies, and eliminates strategic misalignment.",
    targetBuyer: "Enterprise CEOs, Chief Strategy Officers, Executive Boards.",
    architectureInputs: [
      "Executive Mandates",
      "REV-OS-01 Strategy",
      "FIN-OS-01 Capital Allocations",
      "OPS-OS-02 Roadmaps",
      "GOV-OS-01 Decisions"
    ],
    problemsSolved: [
      "Strategic goals disconnected from day-to-day operational execution.",
      "Unmapped initiative dependencies causing multi-quarter delays in strategic pivots.",
      "Lack of a unified strategic alignment and execution state machine."
    ],
    capabilities: [
      "Strategic Objective Decomposition Engine.",
      "Cross-Department Initiative Dependency Mapper.",
      "Autonomous Strategic Velocity & Deviation Telemetry."
    ],
    deliverables: [
      "Enterprise Strategic Alignment Blueprint Specification.",
      "Strategic Dependency Schema Registry (YAML/JSON).",
      "Executive Strategic Roadmap Playbooks."
    ],
    whatYouReceive: [
      "Portfolio architecture blueprint in development (Not currently available for commercial checkout)."
    ],
    outcomes: [
      "100% Alignment on Cross-Functional Strategic Dependencies.",
      "Zero Unmapped Departmental Initiative Blockers.",
      "Real-Time Strategic Execution Telemetry."
    ],
    whoItIsFor: [
      "Enterprise CEOs coordinating multi-year strategic transformations.",
      "Chief Strategy Officers aligning departmental execution.",
      "Executive Boards monitoring initiative delivery."
    ],
    faqs: [
      {
        question: "Is STRATEGY-OS-01 currently purchasable?",
        answer: "No. STRATEGY-OS-01 is a Tier-3 Synthesis Organism currently in architectural development and is not available for commercial checkout."
      }
    ],
    checkoutUrl: null
  },
  {
    id: "intelligence-os-01",
    systemCode: "INTELLIGENCE-OS-01",
    tier: 3,
    subTier: "3",
    wave: 3,
    title: "INTELLIGENCE-OS-01 Enterprise Operating Intelligence Organism",
    subtitle: "Cross-System Operational Signals, Pattern Recognition & Decision-Support Synthesis Architecture",
    category: "Synthesis Organisms",
    price: null, // Non-purchasable / Controlled
    badge: "In Development",
    status: "TIER_3_DEVELOPMENT",
    availability: "NOT_PURCHASABLE",
    oneSentencePurpose: "A future cross-system architecture intended to synthesize distributed operational signals into enterprise-level intelligence, patterns, exceptions, and decision-support structures.",
    operationalFriction: "Data silos and disconnected telemetry streams preventing leadership from identifying cross-system operational risks and emergent patterns.",
    modeledTarget: "MODELED TARGET — NOT HISTORICAL PERFORMANCE: Real-Time Detection of Emergent Cross-Domain Operational Exceptions.",
    description: "Future cross-system architecture engineered to ingest distributed telemetry streams across all operating systems and synthesize actionable intelligence for leadership.",
    executiveSummary: "INTELLIGENCE-OS-01 is a Tier-3 synthesis organism in development. It correlates operational telemetry across revenue, finance, supply chain, and customer success, synthesizing complex patterns into real-time executive decision intelligence.",
    targetBuyer: "Enterprise CEOs, Chief Operating Officers, Chief Information Officers.",
    architectureInputs: [
      "REV-OS-01 Telemetry",
      "FIN-OS-01 Cash Telemetry",
      "CX-OS-01 Health Signals",
      "OPS-OS-02 Bottlenecks",
      "DATA-OS-01 Metrics",
      "GOV-OS-01 Audits"
    ],
    problemsSolved: [
      "Fragmented operational signals isolated in departmental tools.",
      "Late detection of compounding cross-system risks (e.g. churn driving inventory write-downs).",
      "Lack of an overarching executive operating intelligence engine."
    ],
    capabilities: [
      "Cross-Domain Telemetry Pattern Recognition Engine.",
      "Autonomous Operating Exception Correlator.",
      "Executive Decision-Support Synthesis Brain."
    ],
    deliverables: [
      "Enterprise Operating Intelligence Blueprint Specification.",
      "Telemetry Ingestion & Pattern Schema Specification.",
      "Operating Intelligence Simulation Playbooks."
    ],
    whatYouReceive: [
      "Portfolio architecture blueprint in development (Not currently available for commercial checkout)."
    ],
    outcomes: [
      "Real-Time Detection of Emergent Cross-Domain Operational Exceptions.",
      "Zero Uncorrelated Departmental Risk Telemetry.",
      "Sub-Minute Operating Intelligence Synthesis."
    ],
    whoItIsFor: [
      "Enterprise CEOs requiring continuous operating intelligence.",
      "COOs managing global multi-location operations.",
      "CIOs building autonomous enterprise telemetry layers."
    ],
    faqs: [
      {
        question: "Is INTELLIGENCE-OS-01 currently purchasable?",
        answer: "No. INTELLIGENCE-OS-01 is a Tier-3 Synthesis Organism currently in architectural development and is not available for commercial checkout."
      }
    ],
    checkoutUrl: null
  }
];

function attachCommerceUrls(products: Product[]): Product[] {
  return products.map((p) => {
    const mapping = getProductCommerceMapping(p.id);
    if (mapping && mapping.directCheckoutUrl && mapping.commerceAvailability !== 'NOT_PURCHASABLE') {
      return {
        ...p,
        checkoutUrl: mapping.directCheckoutUrl,
      };
    }
    return p;
  });
}

// Combined Tier 2 Collection (6 Tier 2A + 3 Tier 2B = 9 Systems)
export const TIER_2_PRODUCTS: Product[] = attachCommerceUrls([...TIER_2A_PRODUCTS, ...TIER_2B_PRODUCTS]);

// Authoritative Purchasable Commercial Systems: Exactly 17 Operating Systems (8 Tier 1 + 6 Tier 2A + 3 Tier 2B)
export const COMMERCIAL_PRODUCTS: Product[] = attachCommerceUrls([...TIER_1_PRODUCTS, ...TIER_2_PRODUCTS]);

// Total Defined Systems: 17 Commercial + 4 Tier-3 Development Organisms = 21 Systems
export const ALL_PRODUCTS: Product[] = [...COMMERCIAL_PRODUCTS, ...TIER_3_PRODUCTS];

// Single Source of Truth Product Counts
export const COMMERCIAL_PRODUCTS_COUNT: number = COMMERCIAL_PRODUCTS.length; // 17
export const TOTAL_PORTFOLIO_COUNT: number = ALL_PRODUCTS.length; // 21

// Backwards compatibility aliases
export const WAVE_1_PRODUCTS: Product[] = attachCommerceUrls(TIER_2A_PRODUCTS);
export const WAVE_2_PRODUCTS: Product[] = attachCommerceUrls([...TIER_1_PRODUCTS, ...TIER_2B_PRODUCTS]);

/**
 * Find product by ID or system code
 */
export function getProductById(idOrCode: string): Product | undefined {
  const norm = idOrCode.toLowerCase().replace(/_/g, '-');
  return ALL_PRODUCTS.find(
    (p) => p.id.toLowerCase() === norm || p.systemCode.toLowerCase() === norm
  );
}
