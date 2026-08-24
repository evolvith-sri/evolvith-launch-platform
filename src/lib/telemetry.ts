/**
 * Lightweight, Privacy-First Commercial Intent Telemetry
 * 
 * Tracks aggregate customer intent (product views, store clicks, checkout initiations)
 * with zero cookies, zero PII, zero third-party trackers, and fail-safe execution.
 */

export type CommercialEventType =
  | 'VIEW_STORE'
  | 'VIEW_PRODUCT_BLUEPRINT'
  | 'CLICK_INSTANT_BUY'
  | 'CLICK_DODO_DIRECT'
  | 'INITIATE_CHECKOUT'
  | 'VIEW_DOCS'
  | 'VIEW_WORKSTATION';

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
    const payload = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      referrer: document.referrer ? new URL(document.referrer, window.location.href).pathname : 'direct',
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
