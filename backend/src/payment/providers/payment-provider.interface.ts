export interface PaymentProvider {
  createPaymentIntent(
    orderId: number,
    amount: number,
    currency: string,
  ): Promise<{ clientSecret: string; transactionId: string }>;

  handleWebhook(event: any): Promise<void>;
}

export const PaymentStatus = {
  pending: 'pending' as const,
  paid: 'paid' as const,
  failed: 'failed' as const,
  refunded: 'refunded' as const,
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const OrderStatus = {
  pending: 'pending' as const,
  confirmed: 'confirmed' as const,
  cancelled: 'cancelled' as const,
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];