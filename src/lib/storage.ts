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

export function getCommandes(): Commande[] {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
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
  console.log('[Storage] Commande sauvegardee:', nouvelle, '| Total:', commandes.length)
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
