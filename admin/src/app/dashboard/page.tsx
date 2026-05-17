"use client"

import { motion } from "framer-motion"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts"

export default function DashboardPage() {
  // Статистика
  const stats = [
    { label: "Active orders", value: 125, change: "+5%", color: "green" },
    { label: "New users (7 days)", value: 34, change: "+12%", color: "green" },
    { label: "Quests today", value: 8, change: "-2%", color: "red" },
  ]

  // Последние заказы
  const orders = [
    { id: "#12543", client: "Ivan Petrov", quest: "Escape from prison", date: "2023-10-27", status: "Confirmed", color: "green" },
    { id: "#12542", client: "Anna Sidorova", quest: "Treasures of the Pharaoh", date: "2023-10-27", status: "Pending", color: "yellow" },
    { id: "#12541", client: "Maxim Kozlov", quest: "The Mystery of the Abandoned House", date: "2023-10-26", status: "Confirmed", color: "green" },
    { id: "#12540", client: "Elena Ivanova", quest: "Prison Break", date: "2023-10-26", status: "Cancelled", color: "red" },
  ]

  // Данные для LineChart
  const orderStats = [
    { day: "Mon", orders: 20 },
    { day: "Tue", orders: 40 },
    { day: "Wed", orders: 30 },
    { day: "Thu", orders: 50 },
    { day: "Fri", orders: 60 },
    { day: "Sat", orders: 45 },
    { day: "Sun", orders: 70 },
  ]

  // Данные для PieChart
  const pieData = [
    { name: "Escape from prison", value: 70, color: "#f97316" },
    { name: "Treasures of the Pharaoh", value: 15, color: "#8b5cf6" },
    { name: "The Mystery of the Abandoned House", value: 5, color: "#22c55e" },
    { name: "Others", value: 10, color: "#9ca3af" },
  ]

  return (
    <div className="mx-auto w-full flex flex-col gap-8 py-6 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-black text-white"
      >
        Dashboard
      </motion.h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex flex-col gap-2 rounded-xl p-6 bg-[#111a22] border border-gray-700`}
          >
            <p className="text-gray-400 text-base">{stat.label}</p>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
            <p className={`${stat.color === "green" ? "text-green-500" : "text-red-500"} text-sm font-medium`}>
              {stat.change} for the week
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-700 p-6 bg-[#111a22]"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-white text-lg font-semibold">Order statistics</p>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <span>For 7 days</span>
            </div>
          </div>
          <div className="h-72" style={{ minHeight: 200 }}>
            <ResponsiveContainer width="100%" height={288} minWidth={0} minHeight={0}>
              <LineChart data={orderStats}>
                <CartesianGrid stroke="#324d67" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#92adc9" />
                <YAxis stroke="#92adc9" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#1173d4" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-4 rounded-xl border border-gray-700 p-6 bg-[#111a22]"
        >
          <p className="text-white text-lg font-semibold">Popularity of quests</p>
          <div className="flex justify-center items-center" style={{ minHeight: 200 }}>
            <ResponsiveContainer width={200} height={200} minWidth={0} minHeight={0}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80} fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {pieData.map((slice, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }}></span>
                  <span className="text-gray-300">{slice.name}</span>
                </div>
                <span className="font-semibold text-white">{slice.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-700 bg-[#111a22]">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-500 uppercase bg-[#1b2a38]">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Quest</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:bg-gray-800 border-b border-gray-700"
                >
                  <td className="px-6 py-4 text-white">{order.id}</td>
                  <td className="px-6 py-4">{order.client}</td>
                  <td className="px-6 py-4">{order.quest}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.color === "green"
                          ? "bg-green-900 text-green-300"
                          : order.color === "yellow"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="text-[#1173d4] hover:underline">Details</a>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
