import { p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p27,p28,p29,p30 } from '../assets/photos'
import '../styles/Gallery.css'

const PHOTOS = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p27,p28,p29,p30]

export default function Gallery() {
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
               {PHOTOS.map((src, i) => (
                 <div className="insta-item" key={i}>
                   <img src={src} alt="Galerie" loading="lazy" />
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
