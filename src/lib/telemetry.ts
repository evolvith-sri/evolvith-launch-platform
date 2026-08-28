/**
 * Lightweight, Privacy-First Commercial Intent Telemetry
 * 
 * Tracks aggregate customer intent (product views, store clicks, checkout initiations)
 * with zero cookies, zero PII, zero third-party trackers, and fail-safe execution.
 */

export type CommercialEventType =
  | 'VISIT_HOMEPAGE'
  | 'VIEW_STORE'
  | 'VIEW_PRODUCT_PAGE'
  | 'VIEW_PRODUCT_BLUEPRINT'
  | 'LAUNCH_WORKSTATION'
  | 'CLICK_CHECKOUT_CTA'
  | 'CLICK_INSTANT_BUY'
  | 'CLICK_DODO_DIRECT'
  | 'INITIATE_CHECKOUT'
  | 'PAYMENT_COMPLETED'
  | 'DOWNLOAD_PACKAGE'
  | 'SUBMIT_FEEDBACK'
  | 'VIEW_DOCS'
  | 'VIEW_SUPPORT';

export interface TelemetryEvent {
  eventType: CommercialEventType;
  productId?: string;
  systemCode?: string;
  source?: string;
  timestamp?: number;
}

export function logCommercialIntent(event: TelemetryEvent): void {
  if (typeof window === 'undefined') return;

  try {
    let detectedSource = event.source;
    if (!detectedSource && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('ref') === 'producthunt' || urlParams.get('utm_source') === 'producthunt') {
        detectedSource = 'PRODUCTHUNT';
      } else if (document.referrer && document.referrer.includes('producthunt.com')) {
        detectedSource = 'PRODUCTHUNT';
      }
    }

    const payload = {
      ...event,
      source: detectedSource || event.source,
      timestamp: event.timestamp || Date.now(),
      referrer: document.referrer ? new URL(document.referrer, window.location.href).hostname : 'direct',
      path: window.location.pathname,
    };

    // Use sendBeacon if available, otherwise fetch with keepalive
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
    // Fail silently to never disrupt customer UI
  }
}
