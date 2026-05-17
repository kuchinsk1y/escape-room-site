"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, RefreshCcw, Eye, Repeat, Trash2 } from "lucide-react"
import type { Payment } from "./payments.types"

type PaymentStatus = "paid" | "pending" | "failed"
type SortOption = "date" | "amount"


interface PaymentsTableProps {
  data: Payment[]
}

export default function PaymentsTable({ data }: PaymentsTableProps) {
  const [filter, setFilter] = useState<PaymentStatus | "all">("all")
  const [sort, setSort] = useState<SortOption>("date")

  const filtered = data.filter((p) => (filter === "all" ? true : p.status === filter)).sort((a, b) => sort === "date" ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : b.amount - a.amount)

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return "bg-green-900/40 text-green-300";
      case "failed":
        return "bg-red-900/40 text-red-300";
      case "pending":
        return "bg-yellow-900/40 text-yellow-300";
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="rounded-xl border border-gray-700 bg-[#111a22] overflow-hidden shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 border-b border-gray-700 gap-2 sm:gap-0">
        <div className="flex gap-2 flex-wrap">
          {["all", "paid", "pending", "failed"].map((s) => (
            <button key={s} onClick={() => setFilter(s as PaymentStatus | "all")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${filter === s ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
              {s === "all" ? "All" : s === "paid" ? "Paid" : s === "pending" ? "Pending" : ""} {/* Ошибка */}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap">
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="px-3 py-1 rounded-md bg-[#1b2a38] text-white text-sm outline-none focus:ring-1 focus:ring-blue-500">
            <option value="date">By date</option>
            <option value="amount">By amount</option>
          </select>
          <span>
            Shown: <span className="text-white font-medium">{filtered.length}</span> of{" "}
            <span className="text-white font-medium">{data.length}</span>
          </span>
          <span>Latest update: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-[#1b2a38] text-gray-500">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Klient</th>
              <th className="px-6 py-3">Quest</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Provider</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <motion.tr key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="border-b border-gray-700 hover:bg-gray-800/40">
                <td className="px-6 py-3 text-white">{p.id}</td>
                <td className="px-6 py-3">{p.orderId}</td>
                <td className="px-6 py-3">
                  <div>
                    <p className="text-white font-medium">{p.userName}</p>
                    <p className="text-gray-500 text-xs">{p.userEmail}</p>
                  </div>
                </td>
                <td className="px-6 py-3">{p.questTitle}</td>
                <td className="px-6 py-3">{p.amount} {p.currency.toUpperCase()}</td>
                <td className="px-6 py-3">{p.provider}</td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}>
                    {p.status === "paid" ? (
                      <>
                        <CheckCircle size={14} /> Paid
                      </>
                    ) : p.status === "failed" ? (
                      <>
                        <XCircle size={14} /> Failed
                      </>
                    ) : (
                      <>
                        <RefreshCcw size={14} /> Pending
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-3">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button className="p-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition" title="Посмотреть">
                    <Eye size={16} />
                  </button>
                  <button className="p-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition" title="Повторить оплату">
                    <Repeat size={16} />
                  </button>
                  <button className="p-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition" title="Отменить">
                    <Trash2 size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-6">Нет данных</div>
      )}
    </motion.div>
  );
}
