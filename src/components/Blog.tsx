import { useMemo } from 'react'
import { getVideos } from '../lib/storage'
import '../styles/Blog.css'

function BlogVideos() {
  const videos = useMemo(() => getVideos(), [])

  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="section-title" spellCheck={false}>
          Blog & <span className="red">Videos</span>
        </h2>
        <div className="divider" />

        <div className="video-grid">
          {videos.map((v) => (
            <div key={v.id} className="video-card">
              <video
                controls
                muted
                playsInline
                preload="metadata"
                className="video-card__video"
              >
                <source src={v.src} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de videos.
              </video>
              <h4 className="video-card__title" spellCheck={false}>
                {v.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogVideos
