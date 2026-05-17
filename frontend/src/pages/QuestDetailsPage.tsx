import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchQuests } from "../services/questApi"
import { Quest } from "../types/quest"
import BookingModal from "../components/BookingModal"
import { useAuth } from "../services/AuthContext"
import { motion } from "framer-motion"

const QuestDetailsPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { id } = useParams<{ id: string }>()
  const { data: quests = [], isLoading, isError } = useQuery<Quest[]>({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  })
  const { isAuthenticated } = useAuth()

  if (isLoading) return <div className="text-white text-center py-20">Loading...</div>
  if (isError) return <div className="text-red-500 text-center py-20">Error loading data</div>

  const questId = Number(id)
  const quest = quests.find(q => q.id === questId)
  if (!quest) return <div className="text-white p-4">Quest not found</div>

  return (
    <div className="relative min-h-screen text-white">
      <div className="fixed inset-0 z-0">
        <img src={quest.image} alt={quest.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      </div>

      <div className="relative z-10 mx-auto pt-20 px-3 pb-10 flex flex-col lg:flex-row gap-8">
        <motion.div className="lg:w-1/2 flex flex-col justify-between" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div>
            <motion.h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              {quest.title}
            </motion.h1>

            <motion.div className="flex flex-wrap items-center gap-4 text-sm text-gray-200 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <span className="bg-gray-800/70 px-3 py-1 rounded-full">{quest.duration} min</span>
              <span className="bg-gray-800/70 px-3 py-1 rounded-full">{quest.minPlayers} - {quest.maxPlayers} players</span>
              <span className="bg-gray-800/70 px-3 py-1 rounded-full capitalize">{quest.difficulty}</span>
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">{quest.price} PLN</span>
            </motion.div>

            <motion.p className="text-gray-200 text-lg leading-relaxed mb-6 drop-shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
              {quest.description}
            </motion.p>
          </div>

          <motion.button className="w-full sm:w-[220px] bg-yellow-500 text-black py-3 rounded-full font-bold hover:bg-yellow-600 transition shadow-lg" onClick={() => setModalOpen(true)} disabled={!isAuthenticated} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            Book Now
          </motion.button>
        </motion.div>
      </div>
      {modalOpen && (<BookingModal questId={questId} minPlayers={quest.minPlayers} maxPlayers={quest.maxPlayers} onClose={() => setModalOpen(false)}/>)}
    </div>
  )
}

export default QuestDetailsPage


/* 

import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchQuests } from "../services/questApi"
import { Quest } from "../types/quest"
import BookingModal from "../components/BookingModal"
import { useAuth } from "../services/AuthContext"
import { motion } from "framer-motion"

const QuestDetailsPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { id } = useParams<{ id: string }>()
  const { data: quests = [], isLoading, isError } = useQuery<Quest[]>({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  })
  const { isAuthenticated } = useAuth()

  if (isLoading) return <div className="text-white text-center py-20">Loading...</div>
  if (isError) return <div className="text-red-500 text-center py-20">Error loading data</div>

  const questId = Number(id)
  const quest = quests.find(q => q.id === questId)
  if (!quest) return <div className="text-white p-4">Quest not found</div>

  return (
    <div className="relative min-h-screen text-white">
      <div className="fixed inset-0 z-0">
        <img src={quest.image} alt={quest.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      </div>

      <div className="relative z-10 mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-10 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2" />

        <motion.div className="lg:w-1/2 flex flex-col justify-between" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div>
            <motion.h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              {quest.title}
            </motion.h1>

            <motion.div className="flex flex-wrap items-center gap-4 text-sm text-gray-200 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <span className="bg-gray-800/70 px-3 py-1 rounded-full">{quest.duration} min</span>
              <span className="bg-gray-800/70 px-3 py-1 rounded-full">{quest.minPlayers} - {quest.maxPlayers} players</span>
              <span className="bg-gray-800/70 px-3 py-1 rounded-full capitalize">{quest.difficulty}</span>
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">{quest.price} PLN</span>
            </motion.div>

            <motion.p className="text-gray-200 text-lg leading-relaxed mb-6 drop-shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
              {quest.description}
            </motion.p>
          </div>

          <motion.button className="w-full sm:w-[220px] bg-yellow-500 text-black py-3 rounded-full font-bold hover:bg-yellow-600 transition shadow-lg" onClick={() => setModalOpen(true)} disabled={!isAuthenticated} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            Book Now
          </motion.button>
        </motion.div>
      </div>

      {modalOpen && (
        <BookingModal questId={questId} minPlayers={quest.minPlayers} maxPlayers={quest.maxPlayers} onClose={() => setModalOpen(false)}/>
      )}
    </div>
  )
}

export default QuestDetailsPage


*/