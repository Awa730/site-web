export type Commande = {
  id: string
  prenom: string
  nom: string
  contact: string
  type: string
  message: string
  date: string
}

type Views = Record<string, number>

const MESSAGES_KEY = 'maimouna_commandes'
const VIEWS_KEY = 'maimouna_views'
const AUTH_KEY = 'maimouna_admin_auth'
const VIDEOS_KEY = 'maimouna_videos'
const PHOTOS_KEY = 'maimouna_photos'

export function getCommandes(): Commande[] {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    // ignore parse errors
  }
  return []
}

export function addCommande(data: Omit<Commande, 'id' | 'date'>): Commande {
  const commandes = getCommandes()
  const id = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  const nouvelle: Commande = {
    ...data,
    id,
    date: new Date().toISOString(),
  }
  commandes.unshift(nouvelle)
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(commandes))
  return nouvelle
}

export function getViews(): Views {
  try {
    const raw = localStorage.getItem(VIEWS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function incrementView(sectionId: string): Views {
  const views = getViews()
  views[sectionId] = (views[sectionId] || 0) + 1
  localStorage.setItem(VIEWS_KEY, JSON.stringify(views))
  return views
}

export function resetViews(): void {
  localStorage.removeItem(VIEWS_KEY)
}

export function resetCommandes(): void {
  localStorage.removeItem(MESSAGES_KEY)
}

export type VideoItem = {
  id: string
  src: string
  title: string
}

export type PhotoItem = {
  id: string
  src: string
  alt: string
}

export function getVideos(): VideoItem[] {
  try {
    const raw = localStorage.getItem(VIDEOS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore parse errors
  }
  return [
    { id: "v1",  src: "/Videos/v1.mp4",  title: "Tableau Mural Personnalisé" },
    { id: "v2",  src: "/Videos/v2.mp4",  title: "Atelier de Confection" },
    { id: "v3",  src: "/Videos/v3.mp4",  title: "La Place Maimouna Company" },
    { id: "v4",  src: "/Videos/v4.mp4",  title: "Mini-Tableaux Personnalisés" },
    { id: "v5",  src: "/Videos/v5.mp4",  title: "Mini-Tableaux Murals" },
    { id: "v6",  src: "/Videos/v6.mp4",  title: "Confection de Maillots" },
    { id: "v7",  src: "/Videos/v7.mp4",  title: "Commande de Maillots" },
    { id: "v8",  src: "/Videos/v8.mp4",  title: "Tableau Mural religieux" },
    { id: "v9",  src: "/Videos/v9.mp4",  title: "Carte de Visite" },
    { id: "v10", src: "/Videos/v10.mp4", title: "Confection de Blousons" },
    { id: "v11", src: "/Videos/v11.mp4", title: "Flocage de T-shirts et Casquettes personnalisés" },
    { id: "v12", src: "/Videos/v12.mp4", title: "Commande de T-shirts et Casquettes" },
    { id: "v13", src: "/Videos/v13.mp4", title: "Flocage de Maillots" },
    { id: "v14", src: "/Videos/v14.mp4", title: "Commande de Blousons" },
    { id: "v15", src: "/Videos/v15.mp4", title: "Creation D'Affiche" },
    { id: "c1", src: "/Videos/c1.mp4", title: "Decoration Interieure" },
    { id: "c3", src: "/Videos/c3.mp4", title: "Decoration Maison " },
  ]
}

export function setVideos(videos: VideoItem[]): void {
  localStorage.setItem(VIDEOS_KEY, JSON.stringify(videos))
}

export function getPhotos(): PhotoItem[] {
  try {
    const raw = localStorage.getItem(PHOTOS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore parse errors
  }
  return []
}

export function setPhotos(photos: PhotoItem[]): void {
  localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos))
}

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(AUTH_KEY) === 'true'
  } catch {
    return false
  }
}

export function setAdminAuth(authenticated: boolean): void {
  sessionStorage.setItem(AUTH_KEY, authenticated ? 'true' : 'false')
}

export function clearAdminAuth(): void {
  sessionStorage.removeItem(AUTH_KEY)
}
