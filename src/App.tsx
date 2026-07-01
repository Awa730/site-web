import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Preloader    from './components/Preloader'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Services     from './components/Services'
import Realisations from './components/Realisations'
import Apropos      from './components/Apropos'
import Boutique     from './components/Boutique'
import Gallery      from './components/Gallery'
import Blog         from './components/Blog'
import Temoignages  from './components/Temoignages'
import Contact      from './components/Contact'
import Footer       from './components/Footer'
import AdminLogin   from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { useViewTracking } from './hooks/useViewTracking'
import './index.css'

function SitePage() {
  useViewTracking()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    const attach = () => document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    attach()
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { obs.disconnect(); mo.disconnect() }
  }, [])

  useEffect(() => {
    const btt = document.getElementById('btt')
    const onScroll = () => {
      if (btt) btt.classList.toggle('show', window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id="preloader-wrap"
           style={{ position:'fixed', inset:0, zIndex:9999,
                    opacity: loaded ? 0 : 1, pointerEvents: loaded ? 'none' : 'auto',
                    transition:'opacity .6s ease' }}>
        <Preloader />
      </div>

      <Navbar />
      <main>
        <section id="accueil">
          <Hero />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="realisations">
          <Realisations />
        </section>
        
        <section id="apropos">
          <Apropos />
        </section>
        
        <section id="boutique">
          <Boutique />
        </section>
        
        <Gallery />
        
        <section id="blog">
          <Blog />
        </section>
        
        <Temoignages />
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />

      <a href="https://wa.me/221774974429" className="wa-float" title="WhatsApp" target="_blank" rel="noreferrer">
        <i className="fa-brands fa-whatsapp" />
      </a>

      <button id="btt" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} title="Retour en haut">
        <i className="fa-solid fa-arrow-up" />
      </button>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SitePage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
