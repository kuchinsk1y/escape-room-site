import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import IconLogo from "../assets/logo-group.png"
import { Menu, X, User } from "lucide-react"
import { logout } from "../services/authApi"
import { useAuth } from "../services/AuthContext"

type NavLink = {
  path: string
  label: string
}

const navLinks: NavLink[] = [
  { path: "/", label: "QUESTS" },
  { path: "/novice", label: "NOVICE" },
  { path: "/reviews", label: "REVIEWS" },
  { path: "/promotions", label: "PROMOTIONS" },
  { path: "/contacts", label: "CONTACTS" },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      setIsAuthenticated(false)
      setUserMenuOpen(false)
      navigate("/sign-in")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header className="bg-transparent text-white p-4 relative z-50">
      <div className="flex justify-between items-center max-w-[1800px] mx-auto">
        <Link to="/" aria-label="Home page">
          <img src={IconLogo} alt="Escape Room logo" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex space-x-6">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} className={`hover:underline transition ${location.pathname === path ? "text-[#F28A0F]" : ""}`}>{label}</Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center relative">
          <a href="tel:48787368874" className="hover:underline whitespace-nowrap">48 (787) 368-87-74</a>
          {!isAuthenticated ? (
            <Link to="/sign-in" className="ml-4 bg-[#F28A0F] px-4 py-2 rounded-lg text-white hover:bg-[#d6760c] transition">Login</Link>
          ) : (
            <div className="ml-4 relative">
              <button onClick={() => setUserMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-700 transition" aria-label="User menu">
                <User size={24} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#1c1c1c] border border-gray-700 rounded shadow-lg flex flex-col">
                  <Link to="/profile" className="px-4 py-2 text-left hover:bg-gray-700 transition" onClick={() => setUserMenuOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-gray-700 transition">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="lg:hidden focus:outline-none" onClick={() => setIsOpen(true)} aria-label="Menu">
          <Menu size={28} />
        </button>
      </div>

      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpen(false)}/>
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#1c1c1c] shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} aria-label="Close menu"><X size={28} /></button>
        </div>
        <nav className="flex flex-col mt-4 space-y-4 px-6">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} className={`hover:underline ${location.pathname === path ? "text-[#F28A0F]" : ""}`} onClick={() => setIsOpen(false)}>{label}</Link>
          ))}
          <a href="tel:48787368874" className="hover:underline mt-6">48 (787) 368-87-74</a>
          {!isAuthenticated ? (
            <Link to="/sign-in" className="mt-4 bg-[#F28A0F] px-4 py-2 rounded-lg text-center text-white hover:bg-[#d6760c] transition" onClick={() => setIsOpen(false)}>Войти</Link>
          ) : (
            <>
              <Link to="/profile" className="mt-4 bg-[#F28A0F] px-4 py-2 rounded-lg text-center text-white hover:bg-[#d6760c] transition" onClick={() => setIsOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="mt-2 bg-[#F28A0F] px-4 py-2 rounded-lg text-center text-white hover:bg-[#d6760c] transition">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
