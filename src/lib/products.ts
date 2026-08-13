export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  badge: string;
  description: string;
  executiveSummary: string;
  problemsSolved: string[];
  capabilities: string[];
  deliverables: string[];
  outcomes: string[];
  whoItIsFor: string[];
  faqs: { question: string; answer: string }[];
  checkoutUrl: string;
}

export const WAVE_1_PRODUCTS: Product[] = [
  {
    id: "rev-os-01",
    title: "REV-OS-01 Autonomous Revenue Operations OS",
    subtitle: "End-to-End Autonomous Pipeline & Revenue Forecasting System",
    category: "Revenue Systems",
    price: 249,
    badge: "Flagship OS",
    description: "Transforms pipeline tracking into an autonomous, self-optimizing revenue engine.",
    executiveSummary: "REV-OS-01 is a pre-built commercial operating system that replaces manual CRM entry, fragmented sales tools, and static spreadsheets with an autonomous revenue engine. Built on Evolvith's Master Genome Architecture, REV-OS-01 coordinates pipeline hygiene, deal scoring, churn prediction, and automated executive reporting.",
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
    checkoutUrl: "https://evolvith.lemonsqueezy.com/checkout/buy/rev-os-01"
  },
  {
    id: "fin-os-01",
    title: "FIN-OS-01 Enterprise Financial Intelligence OS",
    subtitle: "Automated Multi-Entity Cash Flow, Margin & Capital Allocation System",
    category: "Financial Operations",
    price: 349,
    badge: "Enterprise OS",
    description: "Real-time capital allocation, unit economics governance, and audit intelligence.",
    executiveSummary: "FIN-OS-01 establishes permanent financial governance across enterprise entities. It consolidates multi-currency cash flows, unit economics, gross margin telemetry, and capital allocation budgets under a single operational brain.",
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
      "Board-Ready Financial Telemetry Dashboards."
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
      }
    ],
    checkoutUrl: "https://evolvith.lemonsqueezy.com/checkout/buy/fin-os-01"
  },
  {
    id: "cx-os-01",
    title: "CX-OS-01 Autonomous Customer Success OS",
    subtitle: "Predictive Health Scoring, Onboarding & Churn Mitigation Engine",
    category: "Customer Success",
    price: 199,
    badge: "Commercial OS",
    description: "Predictive churn mitigation and automated customer onboarding journeys.",
    executiveSummary: "CX-OS-01 elevates customer retention into a scalable science. By monitoring product telemetry, support ticket velocity, and executive engagement, CX-OS-01 identifies churn signals weeks before renewal dates.",
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
      "Executive Churn Mitigation Telemetry Dashboard."
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
    checkoutUrl: "https://evolvith.lemonsqueezy.com/checkout/buy/cx-os-01"
  },
  {
    id: "ops-os-02",
    title: "OPS-OS-02 Global Supply Chain & Operations OS",
    subtitle: "Real-Time Operational Bottleneck Elimination & Inventory Intelligence",
    category: "Operations Systems",
    price: 299,
    badge: "Enterprise OS",
    description: "Eliminates operational bottlenecks and enforces standardized SOP workflows.",
    executiveSummary: "OPS-OS-02 governs complex enterprise operations and supply chains. It identifies operational friction, tracks vendor SLA compliance, and enforces standardized SOP execution across global teams.",
    problemsSolved: [
      "Operational bottlenecks causing delivery delays and cost overruns.",
      "Inconsistent execution of standard operating procedures across locations."
    ],
    capabilities: [
      "Operational Bottleneck Detection Engine.",
      "Global Vendor SLA & Quality Audit Pipeline.",
      "Real-Time SOP Compliance & Task Escalation System."
    ],
    deliverables: [
      "OPS-OS-02 Master Operations Architecture.",
      "Standardized Execution Playbooks & RACI Templates.",
      "Live Operational Bottleneck Telemetry Dashboard."
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
    checkoutUrl: "https://evolvith.lemonsqueezy.com/checkout/buy/ops-os-02"
  },
  {
    id: "data-os-01",
    title: "DATA-OS-01 Enterprise Data & Analytics OS",
    subtitle: "Unified Knowledge Graph, Vector Telemetry & Metrics Layer",
    category: "Data Systems",
    price: 179,
    badge: "Core OS",
    description: "Single source of truth data infrastructure with automated metrics layer.",
    executiveSummary: "DATA-OS-01 unifies fragmented enterprise data into a semantic metric graph. It eliminates conflicting KPI definitions between departments and provides clean data infrastructure for AI agent execution.",
    problemsSolved: [
      "Conflicting metrics between marketing, sales, and finance reports.",
      "Expensive, slow custom data warehouse pipelines."
    ],
    capabilities: [
      "Unified Semantic Metrics Layer & Schema Registry.",
      "Vector Telemetry Data Pipeline for AI Agent RAG.",
      "Automated Data Quality & Lineage Audit System."
    ],
    deliverables: [
      "DATA-OS-01 Core Data Operating Architecture.",
      "Enterprise Metric Definitions Specification.",
      "Data Quality Audit Telemetry Engine."
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
    checkoutUrl: "https://evolvith.lemonsqueezy.com/checkout/buy/data-os-01"
  },
  {
    id: "gov-os-01",
    title: "GOV-OS-01 Enterprise Governance & Risk OS",
    subtitle: "Institutional Policy Enforcement, Compliance & Defect Elimination",
    category: "Governance Systems",
    price: 149,
    badge: "Core OS",
    description: "Codifies policies into automated software enforcement rules.",
    executiveSummary: "GOV-OS-01 converts static paper policies into active software governance. It enforces compliance gates, manages institutional decision logs, and eliminates recurring defects across all business units.",
    problemsSolved: [
      "Paper policies ignored by employees and contractors.",
      "Lack of institutional record for executive decisions."
    ],
    capabilities: [
      "Executive Decision Registry (EDR) Master Logging Engine.",
      "Quality Gate & Policy Enforcement Pipeline.",
      "Defect Elimination Protocol (DEP) Workflow Engine."
    ],
    deliverables: [
      "GOV-OS-01 Master Governance System.",
      "Enterprise Policy Enforcement Code Modules.",
      "Executive Decision & Risk Telemetry Dashboard."
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
    checkoutUrl: "https://evolvith.lemonsqueezy.com/checkout/buy/gov-os-01"
  }
];
