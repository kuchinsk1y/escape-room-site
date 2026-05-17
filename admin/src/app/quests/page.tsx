"use client"

import { useEffect, useState } from "react"
import { Quest } from "./types"
import { motion } from "framer-motion"
import Image from "next/image"
import { Edit, ToggleLeft, ToggleRight } from "lucide-react"

export default function QuestsPage() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuests() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quests`)
        if (!res.ok) throw new Error("Ошибка при получении квестов")
        const data: Quest[] = await res.json()
        setQuests(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuests()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="mx-auto w-full flex flex-col gap-6 py-6 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white"
      >
        Quests
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest, idx) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-[#111a22] border border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="relative w-full h-48">
              <Image
                src={quest.image}
                alt={quest.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
              <h2 className="text-lg font-bold text-white">{quest.title}</h2>
              <p className="text-gray-400 text-sm line-clamp-3">{quest.description}</p>

              <div className="flex justify-between items-center mt-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    quest.is_active ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                  }`}
                >
                  {quest.is_active ? "Active" : "Inactive"}
                </span>
                <span className="text-white font-semibold">{quest.price} PLN</span>
              </div>

              <div className="mt-2 flex justify-between text-gray-400 text-sm">
                <span>Players: {quest.minPlayers}-{quest.maxPlayers}</span>
                <span>Difficulty: {quest.difficulty}</span>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                  title="Edit quest"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 text-sm rounded transition ${
                    quest.is_active
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                  title={quest.is_active ? "Deactivate quest" : "Activate quest"}
                >
                  {quest.is_active ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
                  {quest.is_active ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
