"use client"

import { usePathname } from "next/navigation"

interface HeaderProps {
  toggleSidebar: () => void
}

const getPageTitle = (pathname: string) => {
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/orders": "Orders",
    "/quests": "Quests",
    "/users": "Users",
    "/settings": "Settings",
  }
  return titles[pathname] || "Admin Panel"
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <header className="flex items-center h-16 px-4 sm:px-6 md:px-8 border-b border-gray-800 bg-[#111a22] sticky top-0 z-20 shadow-md gap-4">
      <button onClick={toggleSidebar} className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#233648] transition-colors md:hidden" aria-label="Toggle Menu">
        <span className="material-symbols-outlined text-2xl">menu</span>
      </button>
      <h2 className="text-xl font-semibold flex-1 truncate">{title}</h2>
      <div className="w-10 h-10 rounded-full bg-[#1173d4] flex items-center justify-center text-sm font-bold text-white hover:bg-[#00aeff] cursor-pointer transition-colors">AD</div>
    </header>
  )
}
