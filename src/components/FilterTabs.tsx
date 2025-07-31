import React from "react"
import { Tab, FilterTabsProps } from "../types/filterTabs"

import IconAll from "../assets/all.png"
import IconMap from "../assets/map.png"
import IconHorror from "../assets/horror.png"
import IconMystery from "../assets/mystery.png"
import IconDetective from "../assets/detective.png"
import IconSciFi from "../assets/sciFi.png"

const FILTER_TABS: Tab[] = [
  { id: "all", label: "Все квесты", icon: IconAll },
  { id: "adventure", label: "Приключения", icon: IconMap },
  { id: "horror", label: "Ужасы", icon: IconHorror },
  { id: "mystery", label: "Мистика", icon: IconMystery },
  { id: "detective", label: "Детектив", icon: IconDetective },
  { id: "sci-fi", label: "Sci-fi", icon: IconSciFi },
]

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex w-full text-white divide-x divide-gray-600 pb-8">
      {FILTER_TABS.map((tab) => (
        <button type="button" key={tab.id} onClick={() => onFilterChange(tab.id)} className={`flex  items-center justify-center gap-4 px-16 py-4 relative transition ${activeFilter === tab.id ? "text-white" : "text-gray-400 hover:text-white"}`}>
          <img src={tab.icon} alt={tab.label} className="" />
          <span className="relative text-sm font-bold">
            {tab.label}
            {activeFilter === tab.id && (<span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F28A0F]" />)}
          </span>
        </button>
      ))}
    </div>
  )
}
