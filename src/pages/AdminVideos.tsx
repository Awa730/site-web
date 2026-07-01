import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { getVideos, setVideos, type VideoItem } from '../lib/storage'
import '../styles/AdminMedia.css'

export default function AdminVideos() {
  const { isAuth } = useAdminAuth()
  const navigate = useNavigate()
  const [videos, setVideosState] = useState<VideoItem[]>(() => isAuth ? getVideos() : [])
  const [title, setTitle] = useState('')
  const [src, setSrc] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuth) {
      navigate('/admin-login')
    }
  }, [isAuth, navigate])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!title.trim() || !src.trim()) {
      setError('Le titre et la source sont requis.')
      return
    }
    const newVideo: VideoItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: title.trim(),
      src: src.trim(),
    }
    const updated = [newVideo, ...videos]
    setVideos(updated)
    setVideosState(updated)
    setTitle('')
    setSrc('')
  }

  const handleDelete = (id: string) => {
    const updated = videos.filter(v => v.id !== id)
    setVideos(updated)
    setVideosState(updated)
  }

  if (!isAuth) return <Navigate to="/admin-login" replace />

  return (
    <div className="admin-media-page">
      <header className="admin-media-header">
        <div>
          <h1>Gestion des Videos</h1>
          <p>Ajoutez ou supprimez des videos du site.</p>
        </div>
        <button className="btn-back" onClick={() => navigate('/admin')}>
          <i className="fa-solid fa-arrow-left" /> Retour
        </button>
      </header>

      <div className="admin-media-content">
        <div className="admin-card">
          <h2 className="admin-card-title">Ajouter une video</h2>
          <form onSubmit={handleAdd} className="media-form">
            <div className="fg">
              <label>Titre</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Nouvelle video 2025"
              />
            </div>
            <div className="fg">
              <label>Source (URL ou /Videos/v16.mp4)</label>
              <input
                type="text"
                value={src}
                onChange={e => setSrc(e.target.value)}
                placeholder="/Videos/v16.mp4 ou https://..."
              />
            </div>
            {error && <p className="media-error">{error}</p>}
            <button type="submit" className="btn-gold">Ajouter la video</button>
          </form>
        </div>

        <div className="admin-card">
          <h2 className="admin-card-title">Videos existantes ({videos.length})</h2>
          <div className="media-list">
            {videos.map(v => (
              <div className="media-item" key={v.id}>
                <div className="media-info">
                  <span className="media-title">{v.title}</span>
                  <span className="media-src">{v.src}</span>
                </div>
                <button className="btn-delete" onClick={() => handleDelete(v.id)}>
                  <i className="fa-solid fa-trash" /> Supprimer
                </button>
              </div>
            ))}
            {videos.length === 0 && (
              <p className="admin-empty">Aucune video pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
