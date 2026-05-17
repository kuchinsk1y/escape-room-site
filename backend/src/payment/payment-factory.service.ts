import { Injectable } from '@nestjs/common';
import { StripePaymentService } from './providers/stripe-payment.service';
import { PaymentProvider } from './providers/payment-provider.interface';

@Injectable()
export class PaymentFactoryService {
  constructor(private readonly stripeProvider: StripePaymentService) {}

  getProvider(provider: string): PaymentProvider {
    switch (provider) {
      case 'stripe':
        return this.stripeProvider;
      default:
        throw new Error(`Unknown payment provider: ${provider}`);
    }
  }
}
