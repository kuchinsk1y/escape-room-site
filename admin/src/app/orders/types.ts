export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
}

export type Quest = {
  id: number;
  title?: string;
}

export type Order = {
  id: number | string;
  userId: number;
  questId: number;
  name: string;
  phone: string;
  participants: number;
  createdAt: string;
  status: "confirmed" | "pending" | "cancelled";
  user: User;
  quest: Quest;
}
