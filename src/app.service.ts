import { Injectable, Logger } from '@nestjs/common';
import { WebhookRecord } from './webhook.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private webhooks: WebhookRecord[] = [];

  saveWebhook(headers: Record<string, string | string[]>, body: any): WebhookRecord {
    const webhook: WebhookRecord = {
      id: randomUUID(),
      timestamp: new Date(),
      headers,
      body,
    };

    this.webhooks.push(webhook);

    // Log formatado no console
    this.logger.log('=== Novo Webhook Recebido ===');
    this.logger.log(`ID: ${webhook.id}`);
    this.logger.log(`Timestamp: ${webhook.timestamp.toISOString()}`);
    this.logger.log(`Headers: ${JSON.stringify(webhook.headers, null, 2)}`);
    this.logger.log(`Body: ${JSON.stringify(webhook.body, null, 2)}`);
    this.logger.log('============================');

    return webhook;
  }

  getAllWebhooks(): WebhookRecord[] {
    return this.webhooks;
  }

  getWebhooksCount(): number {
    return this.webhooks.length;
  }
}
