/**
 * Lightweight, Privacy-First Commercial Intent & Conversion Telemetry (MWO-11)
 * 
 * Tracks customer acquisition, product interest, workstation launches, and purchase conversion
 * across Evolvith.com with zero cookies, zero PII, zero third-party trackers, and fail-safe execution.
 * 
 * Guarantees:
 * 1. Zero personal information (PII) collected or stored.
 * 2. Zero payment secrets, credentials, or card details captured.
 * 3. Client-side deduplication & session throttling.
 * 4. Production vs Development environment separation.
 * 5. Independent funnel evaluation for PIPE-OS-01 and Wave 1 systems.
 */

export type CommercialEventType =
  | 'VISIT_LANDING_PAGE'
  | 'VISIT_HOMEPAGE'
  | 'VIEW_CATALOG'
  | 'VIEW_STORE'
  | 'VIEW_PRODUCT_PAGE'
  | 'VIEW_PRODUCT_BLUEPRINT'
  | 'VIEW_WORKSTATIONS_DIRECTORY'
  | 'LAUNCH_WORKSTATION'
  | 'INTERACT_WORKSTATION'
  | 'CLICK_STORE_CTA'
  | 'CLICK_CHECKOUT_CTA'
  | 'CLICK_INSTANT_BUY'
  | 'CLICK_DODO_DIRECT'
  | 'INITIATE_CHECKOUT'
  | 'PAYMENT_COMPLETED'
  | 'CHECKOUT_SUCCESS'
  | 'REDEEM_INITIATED'
  | 'REDEEM_SUCCESS'
  | 'VIEW_DOCS'
  | 'VIEW_SUPPORT'
  | 'SUBMIT_SUPPORT_REQUEST'
  | 'DOWNLOAD_PACKAGE'
  | 'SUBMIT_FEEDBACK';

export interface TelemetryEvent {
  eventType: CommercialEventType;
  productId?: string;
  systemCode?: string;
  price?: number;
  tier?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  path?: string;
  timestamp?: number;
  environment?: 'production' | 'development' | 'test';
  dedupKey?: string;
}

// Session deduplication cache (in-memory per page session)
const RECENT_EVENTS = new Set<string>();

/**
 * Detect acquisition / referral source from URL params, document referrer, or headers
 */
export function detectAcquisitionSource(): { source: string; medium?: string; campaign?: string } {
  if (typeof window === 'undefined') {
    return { source: 'DIRECT' };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium') || undefined;
    const utmCampaign = urlParams.get('utm_campaign') || undefined;
    const ref = urlParams.get('ref');

    // 1. Explicit UTM / Ref Parameter Priority
    if (utmSource || ref) {
      const src = (utmSource || ref || '').toLowerCase();
      if (src.includes('producthunt') || src === 'ph') {
        return { source: 'PRODUCTHUNT', medium: utmMedium || 'referral', campaign: utmCampaign };
      }
      if (src.includes('appsumo')) {
        return { source: 'APPSUMO', medium: utmMedium || 'marketplace', campaign: utmCampaign };
      }
      if (src.includes('twitter') || src === 'x') {
        return { source: 'TWITTER', medium: utmMedium || 'social', campaign: utmCampaign };
      }
      if (src.includes('linkedin')) {
        return { source: 'LINKEDIN', medium: utmMedium || 'social', campaign: utmCampaign };
      }
      if (src.includes('hn') || src.includes('hackernews')) {
        return { source: 'HACKERNEWS', medium: utmMedium || 'community', campaign: utmCampaign };
      }
      return { source: (utmSource || ref || 'UNKNOWN').toUpperCase(), medium: utmMedium, campaign: utmCampaign };
    }

    // 2. HTTP Referrer Analysis
    if (document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        const host = refUrl.hostname.toLowerCase();

        if (host.includes('producthunt.com')) return { source: 'PRODUCTHUNT', medium: 'referral' };
        if (host.includes('appsumo.com')) return { source: 'APPSUMO', medium: 'marketplace' };
        if (host.includes('twitter.com') || host.includes('t.co') || host.includes('x.com')) return { source: 'TWITTER', medium: 'social' };
        if (host.includes('linkedin.com')) return { source: 'LINKEDIN', medium: 'social' };
        if (host.includes('news.ycombinator.com')) return { source: 'HACKERNEWS', medium: 'community' };
        if (host.includes('google.')) return { source: 'ORGANIC_SEARCH', medium: 'organic' };
        if (host.includes('bing.') || host.includes('duckduckgo.')) return { source: 'ORGANIC_SEARCH', medium: 'organic' };
        if (host.includes('github.com')) return { source: 'GITHUB', medium: 'referral' };
        if (host.includes('evolvith.com') || host.includes('localhost')) return { source: 'INTERNAL', medium: 'internal' };

        return { source: host.toUpperCase(), medium: 'referral' };
      } catch {
        // invalid referrer URL
      }
    }
  } catch {
    // browser sandbox guard
  }

  return { source: 'DIRECT', medium: 'direct' };
}

/**
 * Log commercial intent telemetry event securely and reliably.
 */
export function logCommercialIntent(event: TelemetryEvent): void {
  if (typeof window === 'undefined') return;

  try {
    const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
    const normProductId = event.productId ? event.productId.toLowerCase().replace(/_/g, '-') : undefined;
    const acquisition = detectAcquisitionSource();
    const source = event.source || acquisition.source;
    const medium = event.medium || acquisition.medium;
    const campaign = event.campaign || acquisition.campaign;
    const path = event.path || window.location.pathname;
    const timestamp = event.timestamp || Date.now();

    // Client-side event deduplication (prevents rapid double-clicks from corrupting funnel steps)
    const dedupKey = event.dedupKey || `${event.eventType}:${normProductId || 'all'}:${Math.floor(timestamp / 3000)}`;
    if (RECENT_EVENTS.has(dedupKey)) {
      return;
    }
    RECENT_EVENTS.add(dedupKey);
    // Keep deduplication cache bounded to 100 entries
    if (RECENT_EVENTS.size > 100) {
      const firstEntry = RECENT_EVENTS.values().next().value;
      if (firstEntry) RECENT_EVENTS.delete(firstEntry);
    }

    const payload: TelemetryEvent = {
      eventType: event.eventType,
      productId: normProductId,
      systemCode: event.systemCode,
      price: event.price,
      tier: event.tier,
      source,
      medium,
      campaign,
      path,
      timestamp,
      environment,
      dedupKey,
    };

    // Use sendBeacon for guaranteed delivery on unload, with fetch keepalive fallback
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/telemetry', blob);
    } else {
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Fail silently to never impact user experience
  }
}
