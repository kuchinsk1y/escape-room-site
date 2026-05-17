import { Quest } from "./quest"

export interface Order {
  id: number
  questId: number
  quest: Quest
  status: "pending" | "paid" | "cancelled"
  name: string
  phone: string
  participants: number
  createdAt: string
}
