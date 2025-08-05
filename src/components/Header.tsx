import React from "react"
import { Link } from "react-router-dom"
import IconLogo from "../assets/logo-group.png"

type NavLink = {
  path: string
  label: string
  isActive?: boolean
}

const navLinks: NavLink[] = [
  { path: "/", label: "КВЕСТЫ" },
  { path: "/contacts", label: "НОВИЧКАМ" },
  { path: "/reviews", label: "ОТЗЫВЫ" },
  { path: "/promotions", label: "АКЦИИ" },
  { path: "/contacts", label: "КОНТАКТЫ" },
]

const Header = () => {
  return (
    <header className="bg-[#1c1c1c] text-white p-4">
      <div className="flex justify-between items-center max-w-[1700px] mx-auto">
        <Link to="/" aria-label="Главная страница">
          <img src={IconLogo} alt="Логотип Escape Room" />
        </Link>
        <nav className="space-x-4">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} className={`hover:underline text-sm ${path === "/" ? "text-[#F28A0F]" : ""}`}>
              {label}
            </Link>
          ))}
        </nav>
        <a href="tel:88003335599" className="hover:underline text-sm whitespace-nowrap">8 (800) 333-55-99</a>
      </div>
    </header>
  )
}

export default Header
