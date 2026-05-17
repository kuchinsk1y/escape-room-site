"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Login failed")
      }

      router.push("/dashboard")
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError("Login failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-display">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md p-6 bg-[#111a22] rounded-xl shadow-lg border border-[#324d67]">
        <h2 className="text-2xl font-black text-center text-white">Login</h2>
        <label className="flex flex-col gap-2">
          <span className="text-white text-base font-medium">Email or Username</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email or username" required className="w-full p-3 rounded-lg bg-[#192633] border border-[#324d67] text-white placeholder-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/50 focus:border-[#007BFF]"/>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-white text-base font-medium">Password</span>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="w-full p-3 pr-10 rounded-lg bg-[#192633] border border-[#324d67] text-white placeholder-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/50 focus:border-[#007BFF]"/>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center justify-center text-[#92adc9] hover:text-white">
              <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
        </label>

        <button type="submit" className="w-full py-3 bg-[#007BFF] rounded-lg text-white font-bold hover:bg-[#0063d4] transition-colors">Log In</button>

        {error && (<p className="text-red-500 text-center text-sm mt-1">{error}</p>)}
      </form>
    </div>
  )
}
