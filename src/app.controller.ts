import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { WebhookRecord } from './webhook.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('webhook')
  receiveWebhook(
    @Headers() headers: Record<string, string | string[]>,
    @Body() body: any,
  ): { message: string; webhook: WebhookRecord } {
    const webhook = this.appService.saveWebhook(headers, body);

    return {
      message: 'Webhook recebido com sucesso',
      webhook,
    };
  }

  @Get('webhooks')
  getAllWebhooks(): {
    total: number;
    webhooks: WebhookRecord[];
  } {
    const webhooks = this.appService.getAllWebhooks();

    return {
      total: this.appService.getWebhooksCount(),
      webhooks,
    };
  }
}
