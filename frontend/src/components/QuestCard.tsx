import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../services/AuthContext"
import AuthModal from "./AuthModal"
import { Quest } from "../types/quest"
import DifficultyIcon from "../assets/puzzle.png"
import PersonIcon from "../assets/person.png"
import { motion } from "framer-motion"

type Props = {
  quest: Quest
}

const QuestCard = ({ quest }: Props) => {
  const { isAuthenticated } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setModalOpen(true)
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" as const } },
  }

  return (
    <>
      <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit" whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative rounded-sm overflow-hidden shadow-lg w-full aspect-[344/232] group">
        <Link to={`/detailed-quest/${quest.id}`} onClick={handleClick} className="block w-full h-full">
          <img src={quest.image} alt={quest.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
          <div className="absolute bottom-0 left-0 w-full h-20" style={{background:"linear-gradient(0.36deg, rgba(28, 27, 27, 0.9) 5.23%, rgba(46, 46, 46, 0) 98.38%)"}}/>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h2 className="text-2xl font-bold">{quest.title}</h2>
            <div className="flex items-center gap-4 text-sm mt-2">
              <div className="flex items-center gap-2">
                <img src={PersonIcon} alt="Players" className="w-4 h-4 object-contain" />
                <span>{quest.minPlayers} - {quest.maxPlayers} peo.</span>
              </div>
              <div className="w-px h-4 bg-white opacity-70"></div>
              <div className="flex items-center gap-2">
                <img src={DifficultyIcon} alt="Difficulty" className="w-4 h-4 object-contain" />
                <span>{quest.difficulty}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default QuestCard



/* 

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../services/AuthContext"
import AuthModal from "./AuthModal"
import { Quest } from "../types/quest"
import DifficultyIcon from "../assets/puzzle.png"
import PersonIcon from "../assets/person.png"

type Props = {
  quest: Quest
}

const QuestCard = ({ quest }: Props) => {
  const { isAuthenticated } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setModalOpen(true)
    }
  }

  return (
    <>
      <Link to={`/detailed-quest/${quest.id}`} onClick={handleClick} className="relative rounded-sm overflow-hidden shadow-lg w-full aspect-[344/232] group block">
        <img src={quest.image} alt={quest.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
        <div className="absolute bottom-0 left-0 w-full h-20" style={{background:"linear-gradient(0.36deg, rgba(28, 27, 27, 0.9) 5.23%, rgba(46, 46, 46, 0) 98.38%)"}}/>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h2 className="text-2xl font-bold">{quest.title}</h2>
          <div className="flex items-center gap-4 text-sm mt-2">
            <div className="flex items-center gap-2">
              <img src={PersonIcon} alt="Players" className="w-4 h-4 object-contain" />
              <span>{quest.minPlayers} - {quest.maxPlayers} peo.</span>
            </div>
            <div className="w-px h-4 bg-white opacity-70"></div>
            <div className="flex items-center gap-2">
              <img src={DifficultyIcon} alt="Difficulty" className="w-4 h-4 object-contain" />
              <span>{quest.difficulty}</span>
            </div>
          </div>
        </div>
      </Link>
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default QuestCard


*/