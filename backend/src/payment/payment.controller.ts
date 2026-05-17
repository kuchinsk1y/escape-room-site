import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  Logger,
  Get,
  Query,
} from '@nestjs/common';
import type { Request } from 'express';
import { PaymentService } from './payment.service';
import Stripe from 'stripe';

@Controller('payments')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async create(@Body() body: { orderId: number }) {
    return this.paymentService.createPayment(body.orderId);
  }

  @Post('webhook')
  async webhook(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    const stripeKey = process.env.STRIPE_SECRET_KEY!;
    const stripe = new Stripe(stripeKey, { apiVersion: '2025-09-30.clover' });
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event: Stripe.Event;

    try {
      // req.body уже raw, если bodyParser.raw использован
      const rawBody = Buffer.isBuffer(req.body)
        ? req.body
        : Buffer.from(JSON.stringify(req.body));
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return { received: false };
    }

    await this.paymentService.handleWebhook(event);
    return { received: true };
  }

  @Get()
  async getAllPayments(
    @Query('limit') limit = '50',
    @Query('page') page = '1',
  ) {
    return this.paymentService.findAllPayments(+limit, +page);
  }
}
