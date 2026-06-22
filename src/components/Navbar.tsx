import { useState, useEffect } from 'react'
import '../styles/Navbar.css'
import logo from "../assets/photos/logo.jpeg"

const links = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#services', label: 'Services' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#boutique', label: 'Boutique' },
  { href: '#blog', label: 'Blog & Videos' }, 
  { href: '#apropos', label: 'À Propos' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => { 
    setMenuOpen(false)
    document.body.style.overflow = '' 
  }

  const toggle = () => {
    setMenuOpen(o => {
      document.body.style.overflow = !o ? 'hidden' : ''
      return !o
    })
  }

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    close()
    
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      console.warn(`La section avec l'id "${href}" n'a pas été trouvée dans la page.`)
    }
  }

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#accueil" className="nav-logo" onClick={e => handleAnchor(e, '#accueil')}>
          <img src={logo} alt="Logo Maimouna Company" />
          <div className="logo-txt">
            <div className="logo-name">MAIMOUNA COMPANY</div>
            <div className="logo-sub">Confection, Impression, Infographie, Décoration</div>
          </div>
        </a>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => handleAnchor(e, l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-nav" onClick={e => handleAnchor(e, '#contact')}>
          Commander
        </a>

        <button className="hamburger" onClick={toggle} aria-label="Menu">
          <span style={menuOpen ? {transform:'rotate(45deg) translate(5px,5px)'} : {}} />
          <span style={menuOpen ? {opacity:0} : {}} />
          <span style={menuOpen ? {transform:'rotate(-45deg) translate(5px,-5px)'} : {}} />
        </button>
      </nav>

      {/* Menu mobile */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="close-menu" onClick={close}>
          <i className="fa-solid fa-xmark" />
        </button>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={e => handleAnchor(e, l.href)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="mobile-cta" onClick={e => handleAnchor(e, '#contact')}>
          Commander ✦
        </a>
      </div>
    </>
  )
}