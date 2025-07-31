import React, { FC } from "react"
import IconSkype from "../assets/skype.png"
import IconVk from "../assets/vk-default.png"

const socialLinks: { href: string; icon: string; alt: string }[] = [
  { href: "https://teams.live.com/free", icon: IconSkype, alt: "Skype" },
  { href: "https://vk.com", icon: IconVk, alt: "VK" },
]

const Footer: FC = () => {
  return (
    <footer className="fixed bottom-5 left-8 flex gap-1 z-40">
      {socialLinks.map(({ href, icon, alt }) => (
        <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Перейти на страницу ${alt}`} className="hover:opacity-80 transition">
          <img src={icon} alt={alt} className="" />
        </a>
      ))}
    </footer>
  )
}

export default Footer
