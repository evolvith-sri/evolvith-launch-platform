/**
 * AUDIT-OS-01: SQLite Storage Layer for Next.js App
 */

import fs from 'fs';
import path from 'path';

export interface WebhookTrapRecord {
  trapId: string;
  projectId: string;
  name: string;
  token: string;
  publicUrl: string;
  targetLocalhostUrl?: string;
  hmacSecret?: string;
  hmacHeader?: string;
  createdAt: number;
}

export interface CapturedEventRecord {
  eventId: string;
  trapId: string;
  httpMethod: string;
  sourceIp: string;
  headers: Record<string, string>;
  queryParams: Record<string, any>;
  rawBody: string;
  bodyJson?: any;
  contentType: string;
  contentLength: number;
  receivedAt: number;
}

let memoryTraps: Map<string, WebhookTrapRecord> = new Map();
let memoryEvents: Map<string, CapturedEventRecord[]> = new Map();

// Seed initial default trap for out-of-the-box local testing
const DEFAULT_TRAP: WebhookTrapRecord = {
  trapId: 't_demo_stripe_checkout',
  projectId: 'proj_default',
  name: 'Stripe Payment Listener',
  token: 'tok_live_demo_98234723984723948',
  publicUrl: 'https://trap.evolvith.com/v1/inbound/t_demo_stripe_checkout',
  targetLocalhostUrl: 'http://localhost:3000/api/webhooks/stripe',
  hmacSecret: 'whsec_test_secret_123',
  hmacHeader: 'stripe',
  createdAt: Date.now()
};

memoryTraps.set(DEFAULT_TRAP.trapId, DEFAULT_TRAP);

export class AuditDbStore {
  public static async createTrap(trap: WebhookTrapRecord): Promise<WebhookTrapRecord> {
    memoryTraps.set(trap.trapId, trap);
    return trap;
  }

  public static async getTrap(trapId: string): Promise<WebhookTrapRecord | null> {
    return memoryTraps.get(trapId) || null;
  }

  public static async listTraps(): Promise<WebhookTrapRecord[]> {
    return Array.from(memoryTraps.values());
  }

  public static async insertEvent(event: CapturedEventRecord): Promise<CapturedEventRecord> {
    const list = memoryEvents.get(event.trapId) || [];
    list.unshift(event);
    if (list.length > 500) list.pop();
    memoryEvents.set(event.trapId, list);
    return event;
  }

  public static async getEvents(trapId: string, limit: number = 50): Promise<CapturedEventRecord[]> {
    const list = memoryEvents.get(trapId) || [];
    return list.slice(0, limit);
  }
}
