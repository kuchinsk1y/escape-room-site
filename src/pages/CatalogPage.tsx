import React, { useState } from "react"
import { quests } from "../data/quest"
import QuestCard from "../components/QuestCard"
import FilterTabs from "../components/FilterTabs"

const CatalogPage = () => {
  const [theme, setTheme] = useState("all")
  const filtered = theme === "all" ? quests : quests.filter(q => q.theme === theme)

  return (
    <div className="pt-10 px-3">
      <div className="text-[#F2890F] font-medium text-sm">квесты в Санкт-Петербурге</div>
      <div className="text-white text-[64px] font-extrabold mb-6">Выберите тематику</div>
      <FilterTabs activeFilter={theme} onFilterChange={setTheme} />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {filtered.map(q => <QuestCard key={q.id} quest={q} />)}
      </div>
    </div>
  )
}

export default CatalogPage
