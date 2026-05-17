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
  <div className="fixed bottom-0 left-0 w-full pointer-events-none">
    <div className="w-full h-24" style={{background: "linear-gradient(180deg, rgba(19, 18, 18, 0) 0%, #131212 100%)",}} />
    <footer className="absolute bottom-5 left-8 flex gap-2 z-50 pointer-events-auto">
      {socialLinks.map(({ href, icon, alt }) => (
        <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Go to page ${alt}`} className="hover:opacity-80 transition">
          <img src={icon} alt={alt} className="object-contain" />
        </a>
      ))}
    </footer>
  </div>
)

export default Footer
