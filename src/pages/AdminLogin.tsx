import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import '../styles/AdminLogin.css'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      navigate('/admin')
    } else {
      setError(true)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">M</div>
        <h1 className="login-title">Administration</h1>
        <p className="login-subtitle">Acces reserve</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              placeholder="Entrez le mot de passe"
              autoFocus
            />
          </div>
          {error && <p className="login-error">Mot de passe incorrect</p>}
          <button type="submit" className="login-btn">
            Se connecter
          </button>
        </form>
        <a href="/" className="login-back">Retour au site</a>
      </div>
    </div>
  )
}
