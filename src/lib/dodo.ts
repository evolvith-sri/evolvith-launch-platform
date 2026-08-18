import crypto from 'crypto';
import { getProductCommerceMapping, ProductCommerceMapping } from './commerce';

/**
 * Server-Side Dodo Payments Client & Security Infrastructure
 *
 * All credentials are strictly read from server environment variables.
 * Never import or execute this module in client-side components.
 */

// Simple in-memory processed webhook event store for idempotency (in production, backed by persistent DB)
const PROCESSED_WEBHOOK_EVENTS = new Set<string>();

export interface DodoCheckoutRequest {
  productId: string;
  customerEmail: string;
  customerName?: string;
  returnUrl?: string;
}

export interface DodoCheckoutResponse {
  success: boolean;
  checkoutUrl?: string;
  sessionId?: string;
  error?: string;
  mapping?: ProductCommerceMapping;
}

export interface DodoWebhookPayload {
  event_id: string;
  type: 'payment.succeeded' | 'payment.failed' | 'checkout.session.completed' | string;
  timestamp: string;
  data: {
    payment_id?: string;
    product_id?: string;
    product_code?: string;
    amount?: number;
    currency?: string;
    customer_email?: string;
    customer_name?: string;
    metadata?: Record<string, string>;
  };
}

export interface WebhookProcessingResult {
  success: boolean;
  status:
    | 'PROCESSED'
    | 'DUPLICATE_IGNORED'
    | 'INVALID_SIGNATURE'
    | 'UNSUPPORTED_EVENT'
    | 'TEST_EVENT_PROCESSED'
    | 'UNMAPPED_PRODUCT_QUARANTINED'
    | 'TIER_3_PURCHASE_BLOCKED'
    | 'ERROR';
  eventId?: string;
  message: string;
  fulfillmentGenerated?: boolean;
  systemCode?: string;
  distributionPackage?: string;
}

/**
 * Creates a server-side Dodo Payments checkout session.
 */
export async function createDodoCheckoutSession(
  req: DodoCheckoutRequest
): Promise<DodoCheckoutResponse> {
  const mapping = getProductCommerceMapping(req.productId);
  if (!mapping) {
    return {
      success: false,
      error: `Invalid or unmapped product identifier: ${req.productId}`,
    };
  }

  if (mapping.governedPrice === null || mapping.commerceAvailability === 'NOT_PURCHASABLE') {
    return {
      success: false,
      error: `Product ${mapping.systemCode} is in architectural development and not available for purchase.`,
      mapping,
    };
  }

  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const successUrl = `${appUrl}/checkout/success?product=${mapping.productId}&tier=${mapping.tier}`;
  const cancelUrl = `${appUrl}/checkout/cancel?product=${mapping.productId}`;

  // If live Dodo API key is provisioned, execute HTTP session request to Dodo Payments
  if (apiKey && apiKey.trim().length > 0) {
    try {
      const baseUrl =
        environment === 'live_mode'
          ? 'https://api.dodopayments.com/v1'
          : 'https://test.dodopayments.com/v1';

      const payload = {
        product_id: mapping.dodoProductId || mapping.systemCode,
        amount: mapping.governedPrice * 100, // in cents
        currency: mapping.currency,
        customer_email: req.customerEmail,
        customer_name: req.customerName,
        return_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          evolvith_system_code: mapping.systemCode,
          tier: String(mapping.tier),
          license_type: mapping.licenseType,
        },
      };

      const response = await fetch(`${baseUrl}/checkouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `Dodo Payments API error (${response.status}): ${errorText}`,
          mapping,
        };
      }

      const data = await response.json();
      return {
        success: true,
        checkoutUrl: data.checkout_url || data.url,
        sessionId: data.session_id || data.id,
        mapping,
      };
    } catch (err) {
      return {
        success: false,
        error: `Failed to initiate Dodo checkout session: ${err instanceof Error ? err.message : String(err)}`,
        mapping,
      };
    }
  }

  // When API key is not yet set in environment (controlled staging mode), return structured mock verification session
  return {
    success: true,
    sessionId: `test_session_${mapping.systemCode.toLowerCase()}_${Date.now()}`,
    checkoutUrl: `${successUrl}&test_mode=true`,
    mapping,
  };
}

/**
 * Cryptographically verifies incoming Dodo Payments Webhook signatures.
 * Supports Standard Webhooks / Svix specifications (v1,<base64/hex>) and HMAC-SHA256.
 */
export function verifyDodoWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  timestampHeader?: string | null,
  webhookIdHeader?: string | null
): boolean {
  const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;

  // In production, signature header and webhook secret are strictly required
  if (!webhookSecret || !signatureHeader) {
    return false;
  }

  try {
    const signatures = signatureHeader.split(' ');
    
    // Candidate secrets: raw string buffer or base64 decoded if prefixed with whsec_
    const secretCandidates: Buffer[] = [];
    if (webhookSecret.startsWith('whsec_')) {
      try {
        secretCandidates.push(Buffer.from(webhookSecret.replace('whsec_', ''), 'base64'));
      } catch {
        // ignore base64 decode errors
      }
    }
    secretCandidates.push(Buffer.from(webhookSecret, 'utf8'));

    for (const sigItem of signatures) {
      const sigValue = sigItem.startsWith('v1,') ? sigItem.slice(3) : sigItem;

      for (const secretBuf of secretCandidates) {
        // Strategy 1: Standard Webhooks format (webhookId.timestamp.rawBody)
        if (webhookIdHeader && timestampHeader) {
          const toSign = `${webhookIdHeader}.${timestampHeader}.${rawBody}`;
          const b64 = crypto.createHmac('sha256', secretBuf).update(toSign, 'utf8').digest('base64');
          const hex = crypto.createHmac('sha256', secretBuf).update(toSign, 'utf8').digest('hex');
          if (safeConstantTimeEqual(sigValue, b64) || safeConstantTimeEqual(sigValue, hex)) {
            return true;
          }
        }

        // Strategy 2: Timestamped payload (timestamp.rawBody)
        if (timestampHeader) {
          const toSign = `${timestampHeader}.${rawBody}`;
          const b64 = crypto.createHmac('sha256', secretBuf).update(toSign, 'utf8').digest('base64');
          const hex = crypto.createHmac('sha256', secretBuf).update(toSign, 'utf8').digest('hex');
          if (safeConstantTimeEqual(sigValue, b64) || safeConstantTimeEqual(sigValue, hex)) {
            return true;
          }
        }

        // Strategy 3: Direct raw body
        const b64Direct = crypto.createHmac('sha256', secretBuf).update(rawBody, 'utf8').digest('base64');
        const hexDirect = crypto.createHmac('sha256', secretBuf).update(rawBody, 'utf8').digest('hex');
        if (safeConstantTimeEqual(sigValue, hexDirect) || safeConstantTimeEqual(sigValue, b64Direct)) {
          return true;
        }
      }
    }

    return false;
  } catch {
    return false;
  }
}

function safeConstantTimeEqual(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Idempotent processor for Dodo Payments Webhook Events.
 */
export function processDodoWebhookEvent(
  payload: DodoWebhookPayload
): WebhookProcessingResult {
  if (!payload || !payload.event_id) {
    return {
      success: false,
      status: 'ERROR',
      message: 'Invalid webhook payload: Missing event_id',
    };
  }

  // Idempotency check: Ignore duplicate events
  if (PROCESSED_WEBHOOK_EVENTS.has(payload.event_id)) {
    return {
      success: true,
      status: 'DUPLICATE_IGNORED',
      eventId: payload.event_id,
      message: `Event ${payload.event_id} already processed. Duplicate ignored.`,
    };
  }

  // Process event by type
  switch (payload.type) {
    case 'payment.succeeded':
    case 'checkout.session.completed': {
      // Mark as processed
      PROCESSED_WEBHOOK_EVENTS.add(payload.event_id);

      // Extract system/product identifier from various standard Dodo payload locations
      const rawIdentifier =
        payload.data.metadata?.evolvith_system_code ||
        payload.data.metadata?.product_id ||
        payload.data.metadata?.system_code ||
        payload.data.product_code ||
        payload.data.product_id;

      // Look up in authoritative register
      const mapping = rawIdentifier ? getProductCommerceMapping(String(rawIdentifier)) : null;

      // Check if this is a synthetic test event lacking product metadata
      const isSyntheticTest =
        !rawIdentifier ||
        rawIdentifier === 'UNKNOWN_SYSTEM' ||
        payload.event_id.startsWith('test_') ||
        payload.event_id.startsWith('evt_test');

      if (isSyntheticTest) {
        return {
          success: true,
          status: 'TEST_EVENT_PROCESSED',
          eventId: payload.event_id,
          message: 'Dodo synthetic test event received and verified. Processed safely without creating customer entitlement.',
          fulfillmentGenerated: false,
        };
      }

      if (!mapping) {
        return {
          success: true,
          status: 'UNMAPPED_PRODUCT_QUARANTINED',
          eventId: payload.event_id,
          message: `Unrecognized product identifier "${rawIdentifier}". Quarantined safely without creating customer entitlement.`,
          fulfillmentGenerated: false,
        };
      }

      // Safety check: Tier 3 organisms are strictly non-purchasable
      if (mapping.tier === 3 || mapping.commerceAvailability === 'NOT_PURCHASABLE') {
        return {
          success: true,
          status: 'TIER_3_PURCHASE_BLOCKED',
          eventId: payload.event_id,
          message: `Attempted fulfillment for Tier-3 organism ${mapping.systemCode} blocked. Non-purchasable architecture.`,
          fulfillmentGenerated: false,
        };
      }

      // Valid commercial product purchase (Tier 1, 2A, 2B)
      return {
        success: true,
        status: 'PROCESSED',
        eventId: payload.event_id,
        message: `Payment confirmed for ${mapping.systemCode}. Fulfillment entitlement created for ${mapping.distributionPackage || mapping.systemCode}.`,
        fulfillmentGenerated: true,
        systemCode: mapping.systemCode,
        distributionPackage: mapping.distributionPackage,
      };
    }

    case 'payment.failed': {
      PROCESSED_WEBHOOK_EVENTS.add(payload.event_id);
      return {
        success: true,
        status: 'PROCESSED',
        eventId: payload.event_id,
        message: `Payment failed notification logged for event ${payload.event_id}.`,
        fulfillmentGenerated: false,
      };
    }

    default:
      return {
        success: true,
        status: 'UNSUPPORTED_EVENT',
        eventId: payload.event_id,
        message: `Event type ${payload.type} received and recorded without action.`,
      };
  }
}
