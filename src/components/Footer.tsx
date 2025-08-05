import React from "react"
import IconSkype from "../assets/skype.png"
import IconVk from "../assets/vk-default.png"

type SocialLink = {
  href: string
  icon: string
  alt: string
}

const socialLinks: SocialLink[] = [
  { href: "https://teams.live.com/free", icon: IconSkype, alt: "Skype" },
  { href: "https://vk.com", icon: IconVk, alt: "VK" },
]

const Footer = () => (
  <footer className="fixed bottom-5 left-8 flex gap-1 z-40">
    {socialLinks.map(({ href, icon, alt }) => (
      <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Перейти на страницу ${alt}`} className="hover:opacity-80 transition">
        <img src={icon} alt="" />
      </a>
    ))}
  </footer>
)

export default Footer
