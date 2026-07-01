import { useEffect } from 'react'
import { incrementView, getViews } from '../lib/storage'

const TRACKED_SECTIONS = [
  'accueil', 'services', 'realisations', 'apropos',
  'boutique', 'gallery', 'blog', 'temoignages', 'contact'
]

export function useViewTracking() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.id) {
          incrementView(e.target.id)
        }
      })
    }, { threshold: 0.1 })

    TRACKED_SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) {
        obs.observe(el)
      }
    })

    return () => obs.disconnect()
  }, [])
}

export function getTotalViews(): number {
  const views = getViews()
  return Object.values(views).reduce((a, b) => a + b, 0)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n)
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(d)
}
