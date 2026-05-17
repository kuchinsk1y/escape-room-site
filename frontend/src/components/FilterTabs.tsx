import { Tab, FilterTabsProps } from "../types/filterTabs"
import { motion } from "framer-motion"

import IconAll from "../assets/all.png"
import IconMap from "../assets/map.png"
import IconHorror from "../assets/horror.png"
import IconMystery from "../assets/mystery.png"
import IconDetective from "../assets/detective.png"
import IconSciFi from "../assets/sciFi.png"

const FILTER_TABS: Tab[] = [
  { id: "all", label: "All quests", icon: IconAll },
  { id: "adventure", label: "Adventure", icon: IconMap },
  { id: "horror", label: "Horror", icon: IconHorror },
  { id: "mystery", label: "Mystery", icon: IconMystery },
  { id: "detective", label: "Detective", icon: IconDetective },
  { id: "sci-fi", label: "Sci-fi", icon: IconSciFi },
]

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <>
      <div className="hidden md:flex w-full text-white divide-x divide-gray-600 pb-8 relative">
        {FILTER_TABS.map((tab, index) => (
          <button key={tab.id} onClick={() => onFilterChange(tab.id)} className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 relative transition ${activeFilter === tab.id ? "text-white" : "text-gray-400 hover:text-white"} ${index === 0 ? "" : "border-l border-gray-600"}`}>
            <img src={tab.icon} alt={tab.label} className="w-5 h-5 object-contain" />
            <span className="relative text-sm font-bold">{tab.label}</span>

            {activeFilter === tab.id && (
              <motion.span layoutId="active-tab-indicator" className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F28A0F]" transition={{ type: "spring", stiffness: 500, damping: 30 }}/>
            )}
          </button>
        ))}
      </div>

      <div className="md:hidden pb-8">
        <label htmlFor="filter-select" className="sr-only">Select the theme of the quests</label>
        <select id="filter-select" value={activeFilter} onChange={(e) => onFilterChange(e.target.value)} className="bg-[#1c1c1c] text-white py-2 px-3 rounded border border-gray-600 focus:outline-none w-auto">
          {FILTER_TABS.map((tab) => (<option key={tab.id} value={tab.id}>{tab.label}</option>))}
        </select>
      </div>
    </>
  )
}



/* 

import { Tab, FilterTabsProps } from "../types/filterTabs"

import IconAll from "../assets/all.png"
import IconMap from "../assets/map.png"
import IconHorror from "../assets/horror.png"
import IconMystery from "../assets/mystery.png"
import IconDetective from "../assets/detective.png"
import IconSciFi from "../assets/sciFi.png"

const FILTER_TABS: Tab[] = [
  { id: "all", label: "All quests", icon: IconAll },
  { id: "adventure", label: "Adventure", icon: IconMap },
  { id: "horror", label: "Horror", icon: IconHorror },
  { id: "mystery", label: "Mystery", icon: IconMystery },
  { id: "detective", label: "Detective", icon: IconDetective },
  { id: "sci-fi", label: "Sci-fi", icon: IconSciFi },
]

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <>
      <div className="hidden md:flex w-full text-white divide-x divide-gray-600 pb-8">
        {FILTER_TABS.map((tab, index) => (
          <button key={tab.id} onClick={() => onFilterChange(tab.id)} className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 relative transition ${activeFilter === tab.id ? "text-white" : "text-gray-400 hover:text-white"} ${index === 0 ? "" : "border-l border-gray-600"}`}>
            <img src={tab.icon} alt={tab.label} className="w-5 h-5 object-contain" />
            <span className="relative text-sm font-bold">
              {tab.label}
              {activeFilter === tab.id && (<span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F28A0F]" />)}
            </span>
          </button>
        ))}
      </div>

      <div className="md:hidden pb-8">
        <label htmlFor="filter-select" className="sr-only">Select the theme of the quests</label>
        <select id="filter-select" value={activeFilter} onChange={(e) => onFilterChange(e.target.value)} className="bg-[#1c1c1c] text-white py-2 px-3 rounded border border-gray-600 focus:outline-none w-auto">
          {FILTER_TABS.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}



*/