import React, { FC } from "react"
import { Link } from "react-router-dom"
import IconLogo from "../assets/logo-group.png"

const Header: FC = () => {
  return (
    <header className="bg-[#1c1c1c] text-white p-4">
      <div className="flex justify-between items-center max-w-[1700px] mx-auto">
        <Link to="/" className="text-xl font-bold">
          <img src={IconLogo} alt="logo" />
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline text-[#F28A0F] text-sm">КВЕСТЫ</Link>
          <Link to="/contacts" className="hover:underline text-sm">НОВИЧКАМ</Link>
          <Link to="/about" className="hover:underline text-sm">ОТЗЫВЫ</Link>
          <Link to="/about" className="hover:underline text-sm">АКЦИИ</Link>
          <Link to="/about" className="hover:underline text-sm">КОНТАКТЫ</Link>
        </nav>
        <Link to="/about" className="hover:underline text-sm">8 (800) 333-55-99</Link>
      </div>
    </header>
  )
}

export default Header

