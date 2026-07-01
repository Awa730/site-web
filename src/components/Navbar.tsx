import { useState, useEffect } from 'react'
import '../styles/Navbar.css'
import logo from "../assets/photos/logo.jpeg"
import { useNavigate, useLocation } from 'react-router-dom'

const publicLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#services', label: 'Services' },
  { href: '#realisations', label: 'Realisations' },
  { href: '#boutique', label: 'Boutique' },
  { href: '#blog', label: 'Blog & Videos' },
  { href: '#apropos', label: 'A Propos' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

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

    if (isAdmin) {
      navigate('/')
      setTimeout(() => {
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      return
    }

    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      console.warn(`La section avec l'id "${href}" n'a pas ete trouvee dans la page.`)
    }
  }

  const handleAdminClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    close()
    navigate(href)
  }

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#accueil" className="nav-logo" onClick={e => handleAnchor(e, '#accueil')}>
          <img src={logo} alt="Logo Maimouna Company" />
          <div className="logo-txt">
            <div className="logo-name">MAIMOUNA COMPANY</div>
            <div className="logo-sub">Confection, Impression, Infographie, Decoration</div>
          </div>
        </a>

        <ul className="nav-links">
          {(isAdmin ? [] : publicLinks).map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => handleAnchor(e, l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {isAdmin ? (
            <a href="/admin" className="btn-nav" onClick={e => handleAdminClick(e, '/admin')}>
              Administration
            </a>
          ) : (
            <>
              <a href="#contact" className="btn-nav" onClick={e => handleAnchor(e, '#contact')}>
                Commander
              </a>
              <a href="/admin-login" className="admin-nav-link" title="Administration">
                <i className="fa-solid fa-user-shield" />
              </a>
            </>
          )}

          <button className="hamburger" onClick={toggle} aria-label="Menu">
            <span style={menuOpen ? {transform:'rotate(45deg) translate(5px,5px)'} : {}} />
            <span style={menuOpen ? {opacity:0} : {}} />
            <span style={menuOpen ? {transform:'rotate(-45deg) translate(5px,-5px)'} : {}} />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="close-menu" onClick={close}>
          <i className="fa-solid fa-xmark" />
        </button>
        {(isAdmin ? [] : publicLinks).map(l => (
          <a key={l.href} href={l.href} onClick={e => handleAnchor(e, l.href)}>
            {l.label}
          </a>
        ))}
        {isAdmin ? (
          <a href="/admin" className="mobile-cta" onClick={e => handleAdminClick(e, '/admin')}>
            Administration
          </a>
        ) : (
          <>
            <a href="#contact" className="mobile-cta" onClick={e => handleAnchor(e, '#contact')}>
              Commander
            </a>
            <a href="/admin-login" className="mobile-cta" onClick={e => handleAdminClick(e, '/admin-login')}>
              Administration
            </a>
          </>
        )}
      </div>
    </>
  )
}
