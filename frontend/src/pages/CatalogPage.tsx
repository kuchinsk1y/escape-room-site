import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchQuests } from "../services/questApi"
import QuestCard from "../components/QuestCard"
import FilterTabs from "../components/FilterTabs"
import { Quest } from "../types/quest"
import Loader from "../components/Loader"
import { motion, AnimatePresence } from "framer-motion"

const CatalogPage = () => {
  const [theme, setTheme] = useState("all")
  
  const { data: quests = [], isLoading, isError } = useQuery<Quest[]>({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  })

  if (isLoading) return <Loader />
  if (isError) return <div className="text-red-500">Error loading data</div>

  const filtered = theme === "all" ? quests : quests.filter((q) => q.theme === theme)

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" as const } },
  }

  return (
    <div className="pt-10 px-3">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
        <div className="text-[#F28A0F] font-medium text-sm sm:text-base md:text-lg">Quests in Warsaw</div>
        <div className="text-white font-extrabold mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight drop-shadow-lg">Select the theme</div>
      </motion.div>
      <FilterTabs activeFilter={theme} onFilterChange={setTheme} />
      <motion.div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" variants={containerVariants} initial="hidden" animate="show">
        <AnimatePresence mode="popLayout">
          {filtered.map((q) => (
            <motion.div key={q.id} variants={cardVariants} layout>
              <QuestCard quest={q} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default CatalogPage
