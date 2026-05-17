import { useQuery } from "@tanstack/react-query"
import { fetchQuests } from "../services/questApi"
import { Quest } from "../types/quest"
import { motion } from "framer-motion"
import { useState } from "react"
import BookingModal from "../components/BookingModal"
import AuthModal from "../components/AuthModal"
import { useAuth } from "../services/AuthContext"
import { useNavigate } from "react-router-dom"

const NovicePage = () => {
  const { data: quests = [], isLoading, isError } = useQuery<Quest[]>({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isLoading) return <div className="text-white text-center py-20">Loading...</div>
  if (isError) return <div className="text-red-500 text-center py-20">Error loading quests</div>

  const noviceQuests = quests.slice(0, 6)
  const genres = Array.from(new Set(quests.map(q => q.theme))).slice(0, 6)

  const handleBooking = (quest: Quest) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }
    setSelectedQuest(quest)
    setModalOpen(true)
  }

  return (
    <div className="text-white px-4 sm:px-6 lg:px-8 py-10 mx-auto">
      <motion.div className="flex flex-col items-center text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl font-extrabold mb-4">Discover the World of Quests!</h1>
        <p className="text-gray-300 max-w-xl mb-6">
          Escape rooms are interactive games where you and your team are locked in a themed room full of puzzles 
          and riddles that you must solve within a limited time to escape.
        </p>
        <button onClick={() => navigate("/")} className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition">Get Started</button>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <motion.div className="bg-[#2a2a2a] p-6 rounded-xl flex flex-col items-center text-center" whileHover={{ scale: 1.03 }}>
          <span className="material-symbols-outlined text-yellow-500 text-4xl mb-3">groups</span>
          <h2 className="font-bold mb-2">Fun Time Together</h2>
          <p className="text-gray-400 text-sm">Spend time with friends in an immersive and mysterious atmosphere.</p>
        </motion.div>
        <motion.div className="bg-[#2a2a2a] p-6 rounded-xl flex flex-col items-center text-center" whileHover={{ scale: 1.03 }}>
          <span className="material-symbols-outlined text-yellow-500 text-4xl mb-3">psychology</span>
          <h2 className="font-bold mb-2">Logic & Problem Solving</h2>
          <p className="text-gray-400 text-sm">Solve tricky puzzles and train your brain while working in a team.</p>
        </motion.div>
        <motion.div className="bg-[#2a2a2a] p-6 rounded-xl flex flex-col items-center text-center" whileHover={{ scale: 1.03 }}>
          <span className="material-symbols-outlined text-yellow-500 text-4xl mb-3">celebration</span>
          <h2 className="font-bold mb-2">Unforgettable Experience</h2>
          <p className="text-gray-400 text-sm">Get a thrill and memories that will last forever.</p>
        </motion.div>
      </motion.div>

      <motion.div className="mb-12">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Beginner Quests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noviceQuests.map((quest, i) => (
            <motion.div key={quest.id} className="bg-[#2a2a2a] rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ scale: 1.03 }} onClick={() => handleBooking(quest)}>
              <div className="h-48 overflow-hidden">
                <img src={quest.image} alt={quest.title} className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"/>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{quest.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{quest.duration} min | {quest.minPlayers}-{quest.maxPlayers} players</p>
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold text-sm">{quest.price} PLN</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="mb-12">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Find Your Genre</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((theme, i) => {
            const questForImage = quests.find(q => q.theme === theme);
            return (
              <motion.div onClick={() => navigate("/")} key={i} className="cursor-pointer bg-cover bg-center rounded-xl aspect-video flex items-end p-4 hover:scale-105 transition-transform duration-300" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0)), url(${questForImage?.image})` }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <p className="text-white font-bold text-xl">{theme}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div className="flex flex-col items-center text-center py-12">
        <h2 className="text-3xl font-extrabold mb-4">Ready for Your First Adventure?</h2>
        <p className="text-gray-400 max-w-lg mb-6">Pick a quest you like, gather your team, and book it now!</p>
        <button onClick={() => {if (!isAuthenticated) setAuthModalOpen(true);}} className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition">
          Book a Quest
        </button>
      </motion.div>

      {modalOpen && selectedQuest && (<BookingModal questId={selectedQuest.id} minPlayers={selectedQuest.minPlayers} maxPlayers={selectedQuest.maxPlayers} onClose={() => setModalOpen(false)}/>)}
      {authModalOpen && (<AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />)}
    </div>
  )
}

export default NovicePage
