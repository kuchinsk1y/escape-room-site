"use client"

import "./globals.css"
import { useState } from "react"
import { usePathname } from "next/navigation"
import ProtectedRoute from "../components/ProtectedRoute"
import Sidebar, { MobileOverlay } from "../components/Sidebar"
import Header from "../components/Header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (isLoginPage) {
    return (
      <html lang="ru" data-scroll-behavior="smooth">
        <body className="flex items-start justify-center min-h-screen bg-[#111a22] text-white">{children}</body>
      </html>
    )
  }

  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body className="bg-[#111a22] text-white flex min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <MobileOverlay isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6">
            <ProtectedRoute>{children}</ProtectedRoute>
          </main>
        </div>
      </body>
    </html>
  )
}
