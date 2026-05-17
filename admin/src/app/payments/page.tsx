"use client"

import { useEffect, useState } from "react"
import PaymentsTable from "./PaymentsTable"
import type { Payment } from "./payments.types"

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`)
        if (!res.ok) throw new Error("Ошибка при получении платежей")
        const json = await res.json()
        setPayments(json.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="p-6">
      <PaymentsTable data={payments} />
    </div>
  )
}
