import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentFactoryService } from './payment-factory.service';
import Stripe from 'stripe';
import { PaymentStatus } from './providers/payment-provider.interface';
import { OrderStatus } from './providers/payment-provider.interface';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly factory: PaymentFactoryService,
  ) {}

  async createPayment(orderId: number, provider: string = 'stripe') {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { quest: true },
    });
    if (!order) throw new Error('Order not found');
    if (order.status !== 'pending')
      throw new Error(`Order with status "${order.status}" cannot be paid`);

    const amount = order.quest.price;
    const currency = process.env.STRIPE_CURRENCY || 'pln';
    const paymentProvider = this.factory.getProvider(provider);

    const { clientSecret, transactionId } =
      await paymentProvider.createPaymentIntent(orderId, amount, currency);

    await this.prisma.payment.create({
      data: {
        orderId,
        amount,
        currency,
        provider,
        transactionId,
        status: PaymentStatus.pending,
      },
    });

    return { clientSecret };
  }

  async handleWebhook(event: Stripe.Event) {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.updatePaymentStatus(paymentIntent.id, PaymentStatus.paid);
        break;
      case 'payment_intent.payment_failed':
        await this.updatePaymentStatus(paymentIntent.id, PaymentStatus.failed);
        break;
      default:
        this.logger.warn(`Unhandled Stripe event type: ${event.type}`);
        break;
    }
  }

  private async updatePaymentStatus(
    transactionId: string,
    status: PaymentStatus,
  ) {
    const payment = await this.prisma.payment.update({
      where: { transactionId },
      data: { status },
      include: { order: true },
    });

    if (status === PaymentStatus.paid) {
      await this.prisma.order.update({
        where: { id: payment.orderId },
        data: { status: OrderStatus.confirmed },
      });
    }

    this.logger.log(`Payment ${transactionId} updated to ${status}`);
  }

  async findAllPayments(limit: number, page: number) {
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          order: {
            include: {
              quest: true,
              user: true,
            },
          },
        },
      }),
      this.prisma.payment.count(),
    ]);

    return {
      total,
      page,
      limit,
      data: payments.map((p) => ({
        id: p.id,
        amount: p.amount,
        currency: p.currency,
        provider: p.provider,
        status: p.status,
        createdAt: p.createdAt,
        orderId: p.order.id,
        questTitle: p.order.quest.title,
        userName: p.order.user.name,
        userEmail: p.order.user.email,
      })),
    };
  }
}
