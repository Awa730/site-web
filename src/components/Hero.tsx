import { useState, useEffect, useRef } from 'react'
import '../styles/Hero.css'

// ⚠️ Importer les images correctement
import logo from "../assets/photos/logo.jpeg"
import affiche from "../assets/photos/Affiche1.jpeg"

const KPIS = [
  { id: 'k1', target: 500,  suffix: '+', lbl: 'Clients satisfaits' },
  { id: 'k2', target: 6,    suffix: '+', lbl: "Années d'expérience" },
  { id: 'k3', target: 1200, suffix: '+', lbl: 'Pièces créées' },
  { id: 'k4', target: 15,   suffix: '+', lbl: 'Collections sport' },
]

export default function Hero() {
  const [counts, setCounts] = useState(KPIS.map(() => 0))
  const kpiRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true
        KPIS.forEach((k, i) => {
          let n = 0
          const step = k.target / 60
          const t = setInterval(() => {
            n = Math.min(n + step, k.target)
            setCounts(prev => { 
              const next = [...prev]; 
              next[i] = Math.floor(n); 
              return next 
            })
            if (n >= k.target) clearInterval(t)
          }, 22)
        })
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    if (kpiRef.current) obs.observe(kpiRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="accueil" className="hero">
      <div className="hero-left">
        <div className="hero-eyebrow"><span>Dakar, Sénégal</span></div>
        <h1 className="hero-title">
          Maimouna<br/>
          <span className="italic">Company</span>
        </h1>
        <div className="hero-rule"><span>◆ ◆ ◆</span></div>
        <p className="hero-sub">
          Chez Maïmouna Company, nous donnons vie à vos idées et sublimons votre image, que vous soyez un particulier, un club sportif, une école ou une entreprise. Nous réunissons en un seul endroit le meilleur de la personnalisation et des services d'impression professionnels.
        </p>
        <div className="hero-ctas">
          <a href="#realisations" className="btn-p">Voir nos créations</a>
          <a href="#boutique" className="btn-s">Notre boutique</a>
        </div>
        <div className="hero-kpis" ref={kpiRef}>
          {KPIS.map((k, i) => (
            <div className="hero-kpi" key={k.id}>
              <div className="kpi-num">{counts[i]}{k.suffix}</div>
              <div className="kpi-lbl">{k.lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-right">
        {/* Utiliser les imports */}
        <img src={logo} alt="Collection Maimouna Company" className="hero-img" />
        <div className="hero-veil" />
        <div className="hero-card">
          <img src={affiche} alt="Affiche" />
          <div>
            <div className="hc-title">Maimouna Company</div>
            <div className="hc-sub">Confection, Impression, Infographie</div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Défiler</span>
          <div className="scroll-bar" />
        </div>
      </div>
    </section>
  )
}
