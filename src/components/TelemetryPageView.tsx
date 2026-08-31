'use client';

import { useEffect } from 'react';
import { logCommercialIntent, CommercialEventType } from '@/lib/telemetry';

interface TelemetryPageViewProps {
  eventType: CommercialEventType;
  productId?: string;
  systemCode?: string;
  price?: number;
  tier?: string;
}

export function TelemetryPageView({
  eventType,
  productId,
  systemCode,
  price,
  tier,
}: TelemetryPageViewProps) {
  useEffect(() => {
    logCommercialIntent({
      eventType,
      productId,
      systemCode,
      price,
      tier,
    });
  }, [eventType, productId, systemCode, price, tier]);

  return null;
}
