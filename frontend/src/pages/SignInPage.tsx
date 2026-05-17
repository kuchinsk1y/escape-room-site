import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { signIn, HttpError } from "../services/authApi"
import { useAuth } from "../services/AuthContext"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { setIsAuthenticated } = useAuth()

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      const timer = setTimeout(() => setSuccessMessage(""), 2500)
      return () => clearTimeout(timer)
    }
  }, [location.state?.message])

  const showMessage = (message: string, isError = true) => {
    if (isError) setError(message)
    else setSuccessMessage(message)
    setTimeout(() => {
      if (isError) setError("")
      else setSuccessMessage("")
    }, 2500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    try {
      await signIn(email, password)
      setIsAuthenticated(true)
      navigate("/")
    } catch (err: any) {
      if (err instanceof HttpError) {
        if (err.status === 404) showMessage("User with this email not found")
        else if (err.status === 401) showMessage("Invalid password")
        else showMessage("Something went wrong. Please try again")
      } else {
        showMessage("Something went wrong. Please try again")
      }
    }
  }

  return (
    <div className="flex items-center justify-center text-white mx-3 pt-24">
      <form onSubmit={handleSubmit} className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mb-4 p-2 rounded bg-[#1c1c1c] border border-gray-600 focus:outline-none focus:border-[#F28A0F]"/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full mb-4 p-2 rounded bg-[#1c1c1c] border border-gray-600 focus:outline-none focus:border-[#F28A0F]"/>
        <button type="submit" className="w-full bg-[#F28A0F] text-white py-2 rounded hover:bg-[#d6760c] transition">Log In</button>
        {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}
        {successMessage && <p className="mt-3 text-sm text-green-500 text-center">{successMessage}</p>}
        <p className="mt-6 text-sm text-center text-gray-300">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-[#F28A0F] hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}
