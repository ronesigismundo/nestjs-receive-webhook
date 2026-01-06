export interface WebhookRecord {
  id: string;
  timestamp: Date;
  headers: Record<string, string | string[]>;
  body: any;
}
