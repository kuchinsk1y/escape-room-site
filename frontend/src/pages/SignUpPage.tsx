import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signUp, HttpError } from "../services/authApi"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const showMessage = (message: string, isError = true) => {
    if (isError) setError(message)
    setTimeout(() => setError(""), 2500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await signUp(email, password, name)
      navigate("/sign-in", { state: { message: "Registration successful! Sign in." } })
    } catch (err: any) {
      if (err instanceof HttpError) {
        if (err.status === 409) showMessage("User with this email already exists")
        else showMessage("Failed to register. Please try again")
      } else {
        showMessage("Failed to register. Please try again")
      }
    }
  }

  return (
    <div className="flex items-center justify-center text-white mx-3 pt-24">
      <form onSubmit={handleSubmit} className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full mb-4 p-2 rounded bg-[#1c1c1c] border border-gray-600 focus:outline-none focus:border-[#F28A0F]"/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mb-4 p-2 rounded bg-[#1c1c1c] border border-gray-600 focus:outline-none focus:border-[#F28A0F]"/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full mb-4 p-2 rounded bg-[#1c1c1c] border border-gray-600 focus:outline-none focus:border-[#F28A0F]"/>
        <button type="submit" className="w-full bg-[#F28A0F] text-white py-2 rounded hover:bg-[#d6760c] transition">Sign Up</button>
        {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}
        <p className="mt-6 text-sm text-center text-gray-300">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-[#F28A0F] hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  )
}
