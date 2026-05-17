"use client"

import { useEffect, useState } from "react"
import { Order } from "./types"
import Link from "next/link"
import { motion } from "framer-motion"
import { format } from "date-fns"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          credentials: "include",
        })
        if (!res.ok) throw new Error("Ошибка при получении заказов")
        const data: Order[] = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="mx-auto w-full flex flex-col gap-6 py-6 px-4">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white"
        >
          Orders
        </motion.h1>

        <Link
          href="/orders/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Add an order
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#111a22]">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-500 uppercase bg-[#1b2a38]">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Quest</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-800 border-b border-gray-700"
              >
                <td className="px-6 py-4 text-white">{order.id}</td>
                <td className="px-6 py-4">{order.user.name}</td>
                <td className="px-6 py-4">{order.quest.title || order.questId}</td>
                <td className="px-6 py-4">{format(new Date(order.createdAt), "dd.MM.yyyy")}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === "confirmed"
                        ? "bg-green-900 text-green-300"
                        : order.status === "pending"
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {order.status === "confirmed"
                      ? "Confirmed"
                      : order.status === "pending"
                      ? "Pending"
                      : "Cancelled"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/orders/${order.id}/edit`}
                    className="text-green-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
