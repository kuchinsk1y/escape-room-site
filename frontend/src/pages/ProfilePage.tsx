import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { fetchCurrentUser } from "../services/authApi"
import { fetchUserOrders } from "../services/ordersApi"
import { Order } from "../types/order"
import { User } from "../types/user"
import Loader from "../components/Loader"

const ProfilePage = () => {
  const { data: user, isLoading: userLoading, isError: userError } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  })

  const { data: orders = [], isLoading: ordersLoading, isError: ordersError } = useQuery<Order[]>({
    queryKey: ["userOrders"],
    queryFn: fetchUserOrders,
    enabled: !!user,
  })

  if (userLoading || ordersLoading) return <Loader />
  if (userError || ordersError || !user) return (<div className="min-h-screen flex items-center justify-center text-red-500 text-lg">Please sign in to view your profile.</div>)

  const ordersWithImages = orders.filter(o => o.quest?.image)
  const randomQuestWithImage = ordersWithImages[Math.floor(Math.random() * ordersWithImages.length)]?.quest

  const lastPendingOrder = orders.filter(o => o.status === "pending").sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]

  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === b.status) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return a.status === "pending" ? -1 : 1
  })

  return (
    <div className="min-h-screen text-white px-4 py-12 relative">
      {randomQuestWithImage && (
        <div className="fixed inset-0 z-0">
          <img src={randomQuestWithImage.image} alt={randomQuestWithImage.title} className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
        </div>
      )}

      <div className="mx-auto relative z-10">
        <motion.h1 className="text-4xl font-extrabold mb-8 text-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>My Profile</motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div className="bg-[#1c1c1c] rounded-2xl p-4 shadow-md flex flex-col items-center lg:items-start" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold">{user.name ? user.name[0].toUpperCase() : "U"}</div>
            <div className="mt-4 text-center lg:text-left">
              <p className="text-2xl font-bold">{user.name || "User"}</p>
              <p className="text-gray-400">{user.email}</p>
            </div>

            {lastPendingOrder && (
              <motion.div className="mt-6 p-4 rounded-xl bg-[#2a2a2a] w-full shadow-lg border border-[#F28A0F]" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                <p className="font-semibold text-[#F28A0F]">Pending Order</p>
                <p className="mt-1">{lastPendingOrder.quest.title}</p>
                <p className="text-sm text-gray-400">Date: {new Date(lastPendingOrder.createdAt).toLocaleDateString()}</p>
                <button className="mt-3 w-full px-4 py-2 bg-[#F28A0F] rounded-lg hover:bg-[#d9780d] font-semibold">Pay Now</button>
              </motion.div>
            )}
          </motion.div>

          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <div className="space-y-3">
              {sortedOrders.length > 0 ? (
                sortedOrders.map((order, i) => (
                  <motion.div key={order.id} className={`flex justify-between items-center rounded-xl px-4 py-3 cursor-pointer ${order.status === "paid" ? "bg-green-900 border border-green-600" : "bg-[#222] border border-[#F28A0F]"}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(255,165,0,0.3)" }}>
                    <div>
                      <p className="font-semibold">{order.quest.title}</p>
                      <p className="text-sm text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="text-sm font-semibold">{order.participants} participants</p>
                      <p className={`font-bold ${order.status === "paid" ? "text-green-400" : "text-[#F28A0F]"}`}>{order.status}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="border border-dashed border-gray-600 rounded-2xl text-center py-10 mt-4 flex flex-col items-center justify-center gap-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-16 h-16 flex items-center justify-center rounded-full bg-[#2a2a2a]">
                    <span className="text-3xl text-[#F28A0F]">🧭</span>
                  </motion.div>
                  <p className="text-gray-400 text-lg font-medium">You haven’t booked any quests yet.</p>
                  <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-[#F28A0F] font-semibold hover:underline">Explore quests →</motion.a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage


/*

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { fetchCurrentUser } from "../services/authApi"
import { fetchUserOrders } from "../services/ordersApi"
import { Order } from "../types/order"
import { User } from "../types/user"
import Loader from "../components/Loader"

const ProfilePage = () => {
  const { data: user, isLoading: userLoading, isError: userError } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  })

  const { data: orders = [], isLoading: ordersLoading, isError: ordersError } = useQuery<Order[]>({
    queryKey: ["userOrders"],
    queryFn: fetchUserOrders,
    enabled: !!user,
  })

  if (userLoading || ordersLoading) return <Loader />
  if (userError || ordersError || !user) return (<div className="min-h-screen flex items-center justify-center text-red-500 text-lg">Please sign in to view your profile.</div>)

  const lastPendingOrder = orders.filter(o => o.status === "pending").sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]

  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === b.status) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return a.status === "pending" ? -1 : 1
  })

  return (
    <div className="min-h-screen text-white px-4 py-12">
      <div className="mx-auto">
        <motion.h1 className="text-4xl font-extrabold mb-8 text-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>My Profile</motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div className="bg-[#1c1c1c] rounded-2xl p-6 shadow-md flex flex-col items-center lg:items-start" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold">{user.name ? user.name[0].toUpperCase() : "U"}</div>
            <div className="mt-4 text-center lg:text-left">
              <p className="text-2xl font-bold">{user.name || "User"}</p>
              <p className="text-gray-400">{user.email}</p>
            </div>
            {lastPendingOrder && (
              <motion.div className="mt-6 p-4 rounded-xl bg-[#2a2a2a] w-full shadow-lg border border-[#F28A0F]" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                <p className="font-semibold text-[#F28A0F]">Pending Order</p>
                <p className="mt-1">{lastPendingOrder.quest.title}</p>
                <p className="text-sm text-gray-400">Date: {new Date(lastPendingOrder.createdAt).toLocaleDateString()}</p>
                <button className="mt-3 w-full px-4 py-2 bg-[#F28A0F] rounded-lg hover:bg-[#d9780d] font-semibold">Pay Now</button>
              </motion.div>
            )}
          </motion.div>
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <div className="space-y-3">
              {sortedOrders.length > 0 ? (
                sortedOrders.map((order, i) => (
                  <motion.div key={order.id} className={`flex justify-between items-center rounded-xl px-4 py-3 cursor-pointer ${order.status === "paid" ? "bg-green-900 border border-green-600" : "bg-[#222] border border-[#F28A0F]"}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(255,165,0,0.3)" }}>
                    <div>
                      <p className="font-semibold">{order.quest.title}</p>
                      <p className="text-sm text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="text-sm font-semibold">{order.participants} participants</p>
                      <p className={`font-bold ${order.status === "paid" ? "text-green-400" : "text-[#F28A0F]"}`}>{order.status}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="border border-dashed border-gray-600 rounded-2xl text-center py-10 mt-4 flex flex-col items-center justify-center gap-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-16 h-16 flex items-center justify-center rounded-full bg-[#2a2a2a]">
                    <span className="text-3xl text-[#F28A0F]">🧭</span>
                  </motion.div>
                  <p className="text-gray-400 text-lg font-medium">You haven’t booked any quests yet.</p>
                  <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-[#F28A0F] font-semibold hover:underline">Explore quests →</motion.a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage










import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { fetchCurrentUser } from "../services/authApi"
import { fetchUserOrders } from "../services/ordersApi"
import { Order } from "../types/order"
import { User } from "../types/user"
import Loader from "../components/Loader"

const ProfilePage = () => {
  const {data: user, isLoading: userLoading, isError: userError} = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  })

  const {data: orders = [], isLoading: ordersLoading, isError: ordersError} = useQuery<Order[]>({
    queryKey: ["userOrders"],
    queryFn: fetchUserOrders,
    enabled: !!user,
  })

  if (userLoading || ordersLoading) return <Loader />
  if (userError || ordersError || !user) return (<div className="min-h-screen flex items-center justify-center text-red-500 text-lg">Please sign in to view your profile.</div>)

  return (
    <div className="min-h-screen text-white px-4 py-12">
      <div className="mx-auto">
        <motion.h1 className="text-4xl font-extrabold mb-8 text-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>My Profile</motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div className="bg-[#1c1c1c] rounded-2xl p-6 shadow-md flex flex-col items-center lg:items-start" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold">{user.name ? user.name[0].toUpperCase() : "U"}</div>
            <div className="mt-4 text-center lg:text-left">
              <p className="text-2xl font-bold">{user.name}</p>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <div className="bg-[#1c1c1c] rounded-2xl p-4 space-y-3 shadow-md">
              {orders.length > 0 ? (
                orders.map((order, i) => (
                  <motion.div key={order.id} className="flex justify-between items-center bg-[#222] rounded-xl px-4 py-3 cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                    <div>
                      <p className="font-semibold">{order.quest.title}</p>
                      <p className="text-sm text-gray-400">Date:{" "} {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Unknown"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#F28A0F] text-sm font-semibold">{order.participants} participants</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="border border-dashed border-gray-600 rounded-2xl text-center py-10 mt-4 flex flex-col items-center justify-center gap-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-16 h-16 flex items-center justify-center rounded-full bg-[#2a2a2a]">
                    <span className="text-3xl text-[#F28A0F]">🧭</span>
                  </motion.div>
                  <p className="text-gray-400 text-lg font-medium">You haven’t booked any quests yet.</p>
                  <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-[#F28A0F] font-semibold hover:underline">
                    Explore quests →
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage


*/