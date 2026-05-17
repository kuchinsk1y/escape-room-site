import { Order } from "../types/order"
const API_URL = "http://localhost:8080"

export async function fetchUserOrders(): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders/my`, {
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to load orders")
  return res.json()
}
