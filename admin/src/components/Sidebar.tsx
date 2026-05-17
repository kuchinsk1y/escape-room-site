"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/orders", label: "Orders", icon: "shopping_cart" },
  { href: "/quests", label: "Quests", icon: "explore" },
  { href: "/users", label: "Users", icon: "group" },
  { href: "/payments", label: "Payments", icon: "payments" },
  { href: "/settings", label: "Settings", icon: "settings" },
]

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`, { method: "POST", credentials: "include" })
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/sign-out`, { method: "POST", credentials: "include" })
    window.location.href = "/login"
  }

  return (
    <aside className={`fixed top-0 left-0 z-30 h-screen w-64 bg-[#111a22] border-r border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:shadow-none`}>
      <div className="flex-1 flex flex-col overflow-y-auto p-4">
        <div className="flex items-center gap-3 px-2 mb-8">
          <span className="material-symbols-outlined text-[#1173d4] text-3xl">hub</span>
          <h1 className="text-xl font-bold">Escape Room</h1>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ href, label, icon }) => (
            <Link key={href} href={href} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${pathname === href ? "bg-[#1173d4] text-white shadow-md" : "hover:bg-[#233648] text-gray-300"}`}>
              <span className="material-symbols-outlined">{icon}</span>
              <p className="text-sm font-medium">{label}</p>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 flex-none border-t border-gray-800 bg-[#111a22]">
        <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 h-10 px-4 rounded-lg bg-red-500/10 text-red-400 text-sm font-bold hover:bg-red-500/20 hover:text-red-300 transition-all duration-200">
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </aside>
  )
}

export function MobileOverlay({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}/>
  )
}
