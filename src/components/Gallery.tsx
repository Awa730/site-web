import { useMemo } from 'react'
import { getPhotos } from '../lib/storage'
import {
  p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p27,p28,p29,p30
} from '../assets/photos'
import '../styles/Gallery.css'

const DEFAULT_PHOTOS = [
  { src: p1, alt: 'Galerie 1' },
  { src: p2, alt: 'Galerie 2' },
  { src: p3, alt: 'Galerie 3' },
  { src: p4, alt: 'Galerie 4' },
  { src: p5, alt: 'Galerie 5' },
  { src: p6, alt: 'Galerie 6' },
  { src: p7, alt: 'Galerie 7' },
  { src: p8, alt: 'Galerie 8' },
  { src: p9, alt: 'Galerie 9' },
  { src: p10, alt: 'Galerie 10' },
  { src: p11, alt: 'Galerie 11' },
  { src: p12, alt: 'Galerie 12' },
  { src: p13, alt: 'Galerie 13' },
  { src: p14, alt: 'Galerie 14' },
  { src: p15, alt: 'Galerie 15' },
  { src: p16, alt: 'Galerie 16' },
  { src: p17, alt: 'Galerie 17' },
  { src: p18, alt: 'Galerie 18' },
  { src: p19, alt: 'Galerie 19' },
  { src: p20, alt: 'Galerie 20' },
  { src: p21, alt: 'Galerie 21' },
  { src: p27, alt: 'Galerie 27' },
  { src: p28, alt: 'Galerie 28' },
  { src: p29, alt: 'Galerie 29' },
  { src: p30, alt: 'Galerie 30' },
]

export default function Gallery() {
  const photos = useMemo(() => {
    const custom = getPhotos()
    return custom.length > 0 ? custom : DEFAULT_PHOTOS
  }, [])

  return (
    <div id="insta" className="insta-wrap">
      <div className="insta-inner">
        <div>
          <div className="s-tag insta-tag"><span>Suivez-nous</span></div>
          <h2 className="s-title insta-title">Notre <em>Galerie</em></h2>
        </div>
        <a href="#" className="insta-follow">
          <i className="fa-brands fa-instagram" /> @maimounacompany
        </a>
      </div>
       <div className="insta-track-wrap">
          <div className="insta-track">
            {[...Array(2)].map((_, setIndex) => (
              <div className="insta-set" key={setIndex}>
                {photos.map((src, i) => (
                  <div className="insta-item" key={i}>
                    <img src={src.src} alt={src.alt} loading="lazy" />
                    <div className="insta-ov"><i className="fa-brands fa-whatsapp" /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
