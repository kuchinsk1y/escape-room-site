import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentProvider } from './payment-provider.interface';

@Injectable()
export class StripePaymentService implements PaymentProvider {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-09-30.clover',
    });
  }

  async createPaymentIntent(orderId: number, amount: number, currency: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { orderId: String(orderId) },
    });

    return {
      clientSecret: paymentIntent.client_secret!,
      transactionId: paymentIntent.id,
    };
  }

  async handleWebhook(event: any): Promise<void> {}
}
