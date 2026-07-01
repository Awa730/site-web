import { useState, useEffect, useRef, useCallback } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { getCommandes, getViews, resetViews } from '../lib/storage'
import { formatNumber, formatDate } from '../hooks/useViewTracking'
import type { Commande } from '../lib/storage'
import '../styles/AdminDashboard.css'

const SECTION_LABELS: Record<string, string> = {
  accueil: 'Accueil',
  services: 'Services',
  realisations: 'Realisations',
  apropos: 'A Propos',
  boutique: 'Boutique',
  gallery: 'Galerie',
  blog: 'Blog & Videos',
  temoignages: 'Temoignages',
  contact: 'Contact',
}

type Tab = 'dashboard' | 'commandes'

export default function AdminDashboard() {
  const { isAuth, logout } = useAdminAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [views, setViews] = useState<Record<string, number>>({})
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [newCount, setNewCount] = useState(0)

  const prevCountRef = useRef(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isAuth) {
      navigate('/admin-login')
    }
  }, [isAuth, navigate])

  const playNotification = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 800
      gain.gain.value = 0.1
      osc.start()
      setTimeout(() => osc.stop(), 150)
    } catch {
      // ignore notification errors
    }
  }, [])

  const loadData = useCallback(() => {
    const data = getCommandes()
    const count = data.length

    if (prevCountRef.current > 0 && count > prevCountRef.current) {
      setNewCount(prev => prev + (count - prevCountRef.current))
      playNotification()
    }
    prevCountRef.current = count

    setCommandes(data)
    setViews(getViews())
    setLastUpdate(new Date())
  }, [playNotification])

  useEffect(() => {
    if (!isAuth) return
    console.log('[AdminDashboard] Montage - commandes initiales:', getCommandes())
    loadData()
    intervalRef.current = window.setInterval(() => {
      loadData()
      console.log('[AdminDashboard] Polling - count:', getCommandes().length)
    }, 3000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAuth, loadData])

  const totalViews = Object.values(views).reduce((a, b) => a + b, 0)

  const handleResetViews = () => {
    resetViews()
    setViews({})
    setLastUpdate(new Date())
  }

  const handleLogout = () => {
    logout()
    navigate('/admin-login')
  }

  if (!isAuth) return <Navigate to="/admin-login" replace />

  const recentCommandes = commandes.slice(0, 5)

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">M</div>
          <div className="sidebar-logo-text">
            <div className="sidebar-logo-name">MAIMOUNA</div>
            <div className="sidebar-logo-sub">ADMIN</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-link${tab === 'dashboard' ? ' active' : ''}`}
            onClick={() => setTab('dashboard')}
          >
            <i className="fa-solid fa-chart-line" />
            <span>Tableau de bord</span>
          </button>
          <button
            className={`sidebar-link${tab === 'commandes' ? ' active' : ''}`}
            onClick={() => setTab('commandes')}
          >
            <i className="fa-solid fa-envelope" />
            <span>Commandes</span>
            {commandes.length > 0 && (
              <span className="sidebar-badge" style={{ animation: commandes.length > 0 ? 'pulse 2s infinite' : 'none' }}>
                {commandes.length}
              </span>
            )}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket" />
            <span>Deconnexion</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <h1 className="admin-header-title">
              {tab === 'dashboard' ? 'Tableau de bord' : 'Commandes recues'}
            </h1>
            {newCount > 0 && (
              <span className="new-badge">
                +{newCount} nouvelle{newCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="admin-header-right">
            <span className="live-indicator">
              <span className="live-dot" />
              En direct
            </span>
            <button className="reset-views-btn" onClick={handleResetViews} title="Reinitialiser les vues">
              <i className="fa-solid fa-rotate-right" />
              <span>Reinitialiser vues</span>
            </button>
            <span className="admin-date">
              {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </header>

        {tab === 'dashboard' && (
          <div className="admin-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-eye" />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{formatNumber(totalViews)}</span>
                  <span className="stat-label">Vues totales</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-envelope" />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{commandes.length}</span>
                  <span className="stat-label">Messages recus</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-bag-shopping" />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{commandes.filter(c => c.type && c.type !== '').length}</span>
                  <span className="stat-label">Commandes</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fa-solid fa-clock" />
                </div>
                <div className="stat-info">
                  <span className="stat-value">
                    {commandes.length > 0 ? formatDate(commandes[0].date) : '--'}
                  </span>
                  <span className="stat-label">Derniere activite</span>
                </div>
              </div>
            </div>

            <div className="admin-sections">
              <div className="admin-card">
                <div className="admin-card-title-row">
                  <h2 className="admin-card-title">
                    <i className="fa-solid fa-chart-bar" />
                    Vues par section
                  </h2>
                  <button className="reset-views-btn small" onClick={handleResetViews} title="Reinitialiser les vues">
                    <i className="fa-solid fa-rotate-right" />
                    Reinitialiser
                  </button>
                </div>
                <div className="views-bars">
                  {Object.entries(SECTION_LABELS)
                    .filter(([id]) => views[id] > 0)
                    .sort((a, b) => (views[b[0]] || 0) - (views[a[0]] || 0))
                    .map(([id, label]) => {
                      const count = views[id] || 0
                      const max = Math.max(...Object.values(views), 1)
                      const pct = (count / max) * 100
                      return (
                        <div className="view-bar-row" key={id}>
                          <span className="view-bar-label">{label}</span>
                          <div className="view-bar-track">
                            <div className="view-bar-fill" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="view-bar-count">{formatNumber(count)}</span>
                        </div>
                      )
                    })}
                  {Object.keys(views).length === 0 && (
                    <p className="admin-empty">Aucune vue enregistree pour le moment.</p>
                  )}
                </div>
              </div>

              <div className="admin-card">
                <h2 className="admin-card-title">
                  <i className="fa-solid fa-clock-rotate-left" />
                  Derniers messages
                </h2>
                <div className="recent-list">
                  {recentCommandes.map(c => (
                    <div className="recent-item" key={c.id}>
                      <div className="recent-item-header">
                        <span className="recent-name">{c.prenom} {c.nom}</span>
                        <span className="recent-date">{formatDate(c.date)}</span>
                      </div>
                      <span className="recent-type">{c.type || 'Sans type'}</span>
                      <p className="recent-message">{c.message}</p>
                    </div>
                  ))}
                  {commandes.length === 0 && (
                    <p className="admin-empty">Aucun message pour le moment.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'commandes' && (
          <div className="admin-content">
            <div className="admin-card">
              <h2 className="admin-card-title">
                <i className="fa-solid fa-list" />
                Toutes les commandes et messages
              </h2>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Client</th>
                      <th>Contact</th>
                      <th>Type</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commandes.map(c => (
                      <tr key={c.id}>
                        <td className="td-date">{formatDate(c.date)}</td>
                        <td className="td-name">
                          <div className="client-name">{c.prenom}</div>
                          <div className="client-name-sub">{c.nom}</div>
                        </td>
                        <td>{c.contact}</td>
                        <td>
                          <span className="td-type">{c.type || '--'}</span>
                        </td>
                        <td className="td-msg">{c.message}</td>
                      </tr>
                    ))}
                    {commandes.length === 0 && (
                      <tr>
                        <td colSpan={5}>
                          <div className="admin-empty">Aucune commande enregistree.</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
