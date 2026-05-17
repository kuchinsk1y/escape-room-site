"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized")
        return res.json()
      })
      .then(user => {
        if (!user || user.role !== "ADMIN") {
          router.push("/login")
        } else {
          setLoading(false)
        }
      })
      .catch(() => router.push("/login"))
  }, [router])

  if (loading) return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
    </div>
  )

  return <>{children}</>
}
