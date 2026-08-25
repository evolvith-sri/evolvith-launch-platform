/**
 * Evolvith Enterprise Operating System (EEOS)
 * Centralized Commerce Architecture & Product Mapping Rail
 *
 * Commercial Operating Architecture & Portfolio Mapping
 */

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

export const DODO_STOREFRONT_URL =
  process.env.NEXT_PUBLIC_DODO_STORE_URL ||
  'https://store.dodopayments.com/evolvith';

export const COMMERCE_CONFIG: CommerceConfig = {
  status: 'LIVE', // Governed State: LIVE under Governance Order PR-0002O
  providerName: 'Dodo Payments',
  preLaunchMessage: 'Purchase availability is being activated.',
  preLaunchCtaText: 'Checkout Activation in Progress',
  liveCtaText: 'Purchase Commercial License',
};

export type CommerceAvailability =
  | 'READY_FOR_COMMERCE'
  | 'PENDING_DODO_ID'
  | 'PRE_LAUNCH'
  | 'NOT_PURCHASABLE';

export interface ProductCommerceMapping {
  systemCode: string;
  productId: string;
  title: string;
  tier: 1 | 2 | 3;
  subTier: '1' | '2A' | '2B' | '3';
  governedPrice: number | null;
  currency: string;
  licenseType: string;
  dodoProductId: string | null;
  directCheckoutUrl?: string | null;
  commerceAvailability: CommerceAvailability;
  fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE' | 'ARCHITECTURE_BLUEPRINT_ONLY';
  distributionPackage?: string;
}

/**
 * Centralized Product-to-Commerce Mapping Table
 * Authoritative Commercial Portfolio: Exactly 17 Operating Systems
 * - 8 Tier-1 Focused Systems ($49 AUDIT-OS-01 + 7 @ $99)
 * - 6 Tier-2A Enterprise Systems ($149–$349)
 * - 3 Tier-2B Strategic Entry Systems ($99 Launch Edition)
 * - 4 Tier-3 Synthesis Organisms in Development (Strictly non-purchasable, no Dodo IDs)
 * Total Portfolio Architecture: 21 Systems (17 Commercial + 4 Tier-3 Development Organisms)
 */
export const PRODUCT_COMMERCE_MAPPINGS: Record<string, ProductCommerceMapping> = {
  // --- TIER 1: Wave 1 Acquisition Operating Systems ($49) & Focused Systems ---
  'audit-os-01': {
    systemCode: 'AUDIT-OS-01',
    productId: 'audit-os-01',
    title: 'AUDIT-OS-01 Visual API Contract & Webhook QA Workstation',
    tier: 1,
    subTier: '1',
    governedPrice: 49,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlvVT3FguXygOXRQOV2j',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'AUDIT-OS-01_v1.0.0.zip',
  },
  'pipe-os-01': {
    systemCode: 'PIPE-OS-01',
    productId: 'pipe-os-01',
    title: 'PIPE-OS-01 Local B2B Lead Waterfall & Prospect Enrichment Engine',
    tier: 1,
    subTier: '1',
    governedPrice: 49,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZkFcEYcASUDY2HJ2',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'PIPE-OS-01_v1.0.0.zip',
  },
  'seo-audit-os-01': {
    systemCode: 'SEO-AUDIT-OS-01',
    productId: 'seo-audit-os-01',
    title: 'SEO-AUDIT-OS-01 Programmatic Technical SEO & Broken Link Crawler',
    tier: 1,
    subTier: '1',
    governedPrice: 49,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0Nm9SmnVyNIQfIhQUuLv1',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'SEO-AUDIT-OS-01_v1.0.0.zip',
  },
  'onboard-os-01': {
    systemCode: 'ONBOARD-OS-01',
    productId: 'onboard-os-01',
    title: 'ONBOARD-OS-01 Client Intake & Digital Asset Handover Workstation',
    tier: 1,
    subTier: '1',
    governedPrice: 49,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZmsnMYRaTeYZamdy',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'ONBOARD-OS-01_v1.0.0.zip',
  },
  'prompt-qa-os-01': {
    systemCode: 'PROMPT-QA-OS-01',
    productId: 'prompt-qa-os-01',
    title: 'PROMPT-QA-OS-01 LLM Prompt Regression Testing & Cost Workbench',
    tier: 1,
    subTier: '1',
    governedPrice: 49,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0Nm9SmvJTGPsnT6na0QxR',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'PROMPT-QA-OS-01_v1.0.0.zip',
  },
  'doc-portal-os-01': {
    systemCode: 'DOC-PORTAL-OS-01',
    productId: 'doc-portal-os-01',
    title: 'DOC-PORTAL-OS-01 OpenAPI -> Interactive Developer Portal Generator',
    tier: 1,
    subTier: '1',
    governedPrice: 49,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0Nm9Sn9oSyVzNwjg47pYg',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'DOC-PORTAL-OS-01_v1.0.0.zip',
  },
  'forecast-os-01': {
    systemCode: 'FORECAST-OS-01',
    productId: 'forecast-os-01',
    title: 'FORECAST-OS-01 Revenue & Sales Forecasting OS',
    tier: 1,
    subTier: '1',
    governedPrice: 99,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQRW10E7zb3F6EWoLp',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'FORECAST-OS-01_v1.0.0.zip',
  },
  'close-os-01': {
    systemCode: 'CLOSE-OS-01',
    productId: 'close-os-01',
    title: 'CLOSE-OS-01 Month-End Financial Close OS',
    tier: 1,
    subTier: '1',
    governedPrice: 99,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZR9kr0HcdppWhMdG',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'CLOSE-OS-01_v1.0.0.zip',
  },
  'retention-os-01': {
    systemCode: 'RETENTION-OS-01',
    productId: 'retention-os-01',
    title: 'RETENTION-OS-01 Customer Retention & Churn Alert OS',
    tier: 1,
    subTier: '1',
    governedPrice: 99,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZSTNbLzTYv1DrbRm',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'RETENTION-OS-01_v1.0.0.zip',
  },
  'inventory-os-01': {
    systemCode: 'INVENTORY-OS-01',
    productId: 'inventory-os-01',
    title: 'INVENTORY-OS-01 Inventory Control & Stockout Defense OS',
    tier: 1,
    subTier: '1',
    governedPrice: 99,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZTfNqLM3khfxMnOo',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'INVENTORY-OS-01_v1.0.0.zip',
  },
  'workflow-os-01': {
    systemCode: 'WORKFLOW-OS-01',
    productId: 'workflow-os-01',
    title: 'WORKFLOW-OS-01 Cross-Functional Task Execution OS',
    tier: 1,
    subTier: '1',
    governedPrice: 99,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZVst9tmANWzHpM2v',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'WORKFLOW-OS-01_v1.0.0.zip',
  },

  // --- TIER 2A: Enterprise Systems (5 Systems — $149–$349) ---
  'rev-os-01': {
    systemCode: 'REV-OS-01',
    productId: 'rev-os-01',
    title: 'REV-OS-01 Autonomous Revenue Operations OS',
    tier: 2,
    subTier: '2A',
    governedPrice: 249,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZb1hdgcxA40cSEKo',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'REV-OS-01_v1.0.0.zip',
  },
  'fin-os-01': {
    systemCode: 'FIN-OS-01',
    productId: 'fin-os-01',
    title: 'FIN-OS-01 Enterprise Financial Intelligence OS',
    tier: 2,
    subTier: '2A',
    governedPrice: 349,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZcIFpZVsTfdRvFzW',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'FIN-OS-01_v1.0.0.zip',
  },
  'cx-os-01': {
    systemCode: 'CX-OS-01',
    productId: 'cx-os-01',
    title: 'CX-OS-01 Autonomous Customer Success OS',
    tier: 2,
    subTier: '2A',
    governedPrice: 199,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZeAd8SjrFqUBtXUb',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'CX-OS-01_v1.0.0.zip',
  },
  'ops-os-02': {
    systemCode: 'OPS-OS-02',
    productId: 'ops-os-02',
    title: 'OPS-OS-02 Global Supply Chain & Operations OS',
    tier: 2,
    subTier: '2A',
    governedPrice: 299,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZg6joNQmuk8IjtqX',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'OPS-OS-02_v1.0.0.zip',
  },
  'data-os-01': {
    systemCode: 'DATA-OS-01',
    productId: 'data-os-01',
    title: 'DATA-OS-01 Enterprise Data & Analytics OS',
    tier: 2,
    subTier: '2A',
    governedPrice: 179,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZhTMtmvKk16Tck2X',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'DATA-OS-01_v1.0.0.zip',
  },

  // --- TIER 2B: Strategic Entry Systems ($99 Launch Edition) ---
  'cash-os-01': {
    systemCode: 'CASH-OS-01',
    productId: 'cash-os-01',
    title: 'CASH-OS-01 Cash Collection & Receivables OS',
    tier: 2,
    subTier: '2B',
    governedPrice: 99,
    currency: 'USD',
    licenseType: 'One-Time Perpetual Commercial License',
    dodoProductId: 'pdt_0NlfQZlUdr2Oy8cgxYodt',
    commerceAvailability: 'READY_FOR_COMMERCE',
    fulfillmentType: 'DIGITAL_RUNTIME_PACKAGE',
    distributionPackage: 'CASH-OS-01_v1.0.0.zip',
  },

  // --- TIER 3: Synthesis Organisms (4 Systems in Development — Non-Purchasable) ---
  'command-os-01': {
    systemCode: 'COMMAND-OS-01',
    productId: 'command-os-01',
    title: 'COMMAND-OS-01 Enterprise Command & Decision Organism',
    tier: 3,
    subTier: '3',
    governedPrice: null, // Non-purchasable / Controlled
    currency: 'USD',
    licenseType: 'Architecture Blueprint in Development',
    dodoProductId: null,
    commerceAvailability: 'NOT_PURCHASABLE',
    fulfillmentType: 'ARCHITECTURE_BLUEPRINT_ONLY',
  },
  'synthesis-os-01': {
    systemCode: 'SYNTHESIS-OS-01',
    productId: 'synthesis-os-01',
    title: 'SYNTHESIS-OS-01 Enterprise Operating Synthesis Organism',
    tier: 3,
    subTier: '3',
    governedPrice: null, // Non-purchasable / Controlled
    currency: 'USD',
    licenseType: 'Architecture Blueprint in Development',
    dodoProductId: null,
    commerceAvailability: 'NOT_PURCHASABLE',
    fulfillmentType: 'ARCHITECTURE_BLUEPRINT_ONLY',
  },
  'strategy-os-01': {
    systemCode: 'STRATEGY-OS-01',
    productId: 'strategy-os-01',
    title: 'STRATEGY-OS-01 Enterprise Strategic Alignment Organism',
    tier: 3,
    subTier: '3',
    governedPrice: null, // Non-purchasable / Controlled
    currency: 'USD',
    licenseType: 'Architecture Blueprint in Development',
    dodoProductId: null,
    commerceAvailability: 'NOT_PURCHASABLE',
    fulfillmentType: 'ARCHITECTURE_BLUEPRINT_ONLY',
  },
  'intelligence-os-01': {
    systemCode: 'INTELLIGENCE-OS-01',
    productId: 'intelligence-os-01',
    title: 'INTELLIGENCE-OS-01 Enterprise Operating Intelligence Organism',
    tier: 3,
    subTier: '3',
    governedPrice: null, // Non-purchasable / Controlled
    currency: 'USD',
    licenseType: 'Architecture Blueprint in Development',
    dodoProductId: null,
    commerceAvailability: 'NOT_PURCHASABLE',
    fulfillmentType: 'ARCHITECTURE_BLUEPRINT_ONLY',
  },
};

/**
 * Helper to get verified commerce mapping for a product code or ID
 */
export function getProductCommerceMapping(productIdOrCode: string): ProductCommerceMapping | null {
  const normalizedKey = productIdOrCode.toLowerCase().replace(/_/g, '-');
  const mapping = PRODUCT_COMMERCE_MAPPINGS[normalizedKey];
  if (!mapping) return null;
  
  if (mapping.dodoProductId && !mapping.directCheckoutUrl) {
    return {
      ...mapping,
      directCheckoutUrl: `https://checkout.dodopayments.com/buy/${mapping.dodoProductId}`,
    };
  }
  return mapping;
}

/**
 * Returns direct Dodo buy link for a product ID or system code.
 */
export function getDodoDirectCheckoutUrl(productIdOrCode: string): string | null {
  const mapping = getProductCommerceMapping(productIdOrCode);
  if (!mapping || !mapping.dodoProductId || mapping.commerceAvailability === 'NOT_PURCHASABLE') {
    return null;
  }
  return `https://checkout.dodopayments.com/buy/${mapping.dodoProductId}`;
}

/**
 * Returns the official Evolvith Dodo storefront URL.
 */
export function getDodoStorefrontUrl(): string {
  return DODO_STOREFRONT_URL;
}
