import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentFactoryService } from './payment-factory.service';
import { StripePaymentService } from './providers/stripe-payment.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [
    PrismaService,
    PaymentService,
    PaymentFactoryService,
    StripePaymentService,
  ],
})
export class PaymentModule {}
