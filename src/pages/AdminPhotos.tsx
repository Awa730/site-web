import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { getPhotos, setPhotos, type PhotoItem } from '../lib/storage'
import '../styles/AdminMedia.css'

export default function AdminPhotos() {
  const { isAuth } = useAdminAuth()
  const navigate = useNavigate()
  const [photos, setPhotosState] = useState<PhotoItem[]>(() => isAuth ? getPhotos() : [])
  const [alt, setAlt] = useState('')
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
    if (!alt.trim() || !src.trim()) {
      setError('La description et la source sont requises.')
      return
    }
    const newPhoto: PhotoItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      alt: alt.trim(),
      src: src.trim(),
    }
    const updated = [newPhoto, ...photos]
    setPhotos(updated)
    setPhotosState(updated)
    setAlt('')
    setSrc('')
  }

  const handleDelete = (id: string) => {
    const updated = photos.filter(p => p.id !== id)
    setPhotos(updated)
    setPhotosState(updated)
  }

  if (!isAuth) return <Navigate to="/admin-login" replace />

  return (
    <div className="admin-media-page">
      <header className="admin-media-header">
        <div>
          <h1>Gestion des Photos</h1>
          <p>Ajoutez ou supprimez des photos de la galerie.</p>
        </div>
        <button className="btn-back" onClick={() => navigate('/admin')}>
          <i className="fa-solid fa-arrow-left" /> Retour
        </button>
      </header>

      <div className="admin-media-content">
        <div className="admin-card">
          <h2 className="admin-card-title">Ajouter une photo</h2>
          <form onSubmit={handleAdd} className="media-form">
            <div className="fg">
              <label>Description</label>
              <input
                type="text"
                value={alt}
                onChange={e => setAlt(e.target.value)}
                placeholder="Ex: Photo atelier confection"
              />
            </div>
            <div className="fg">
              <label>Source (URL ou base64)</label>
              <input
                type="text"
                value={src}
                onChange={e => setSrc(e.target.value)}
                placeholder="https://... ou data:image/jpeg;base64,..."
              />
            </div>
            {error && <p className="media-error">{error}</p>}
            <button type="submit" className="btn-gold">Ajouter la photo</button>
          </form>
        </div>

        <div className="admin-card">
          <h2 className="admin-card-title">Photos existantes ({photos.length})</h2>
          <div className="media-grid">
            {photos.map(p => (
              <div className="media-photo-item" key={p.id}>
                <img src={p.src} alt={p.alt} />
                <div className="media-photo-info">
                  <span className="media-title">{p.alt}</span>
                  <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                    <i className="fa-solid fa-trash" /> Supprimer
                  </button>
                </div>
              </div>
            ))}
            {photos.length === 0 && (
              <p className="admin-empty">Aucune photo pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
