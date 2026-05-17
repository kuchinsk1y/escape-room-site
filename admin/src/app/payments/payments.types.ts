export type PaymentStatus = "paid" | "pending" | "failed";

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  currency: string;
  provider: string;
  status: PaymentStatus;
  createdAt: string;
  questTitle: string;
  userName: string;
  userEmail: string;
}
