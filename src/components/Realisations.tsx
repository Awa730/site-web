import { useState } from 'react'
import { p2,p3,p4,p5,p6,p7,p16,p17,p18,p41,p42,p43,p44,p45,p46,p48 } from '../assets/photos'
import '../styles/Realisations.css'

const ITEMS = [
  { 
  cat: 'sport', 
  catL: 'Sport & Événements', 
  name: 'Confection de Maillots FC Paris', 
  sub: 'Flocage & Sublimation Personnalisée', 
  img: p2 
},
{ 
  cat: 'sport', 
  catL: 'Sport & Événements', 
  name: 'Confection de Maillots Team G2012', 
  sub: 'Flocage & Sublimation Rouge et Blanc', 
  img: p3 
},
{ 
  cat: 'sport', 
  catL: 'Sport & Événements', 
  name: 'Maillot Officiel FC Erindiang', 
  sub: 'Sublimation Premium & Logo Maimouna Company', 
  img: p4
},
{ 
  cat: 'sport', 
  catL: 'Sport & Événements', 
  name: 'Équipement Complet Team G2012', 
  sub: 'Maillot & Short Personnalisés en Action', 
  img: p5
},
{ 
  cat: 'sport', 
  catL: 'Sport & Événements', 
  name: 'Maillot Personnalisé SBR Bleu', 
  sub: 'Design Sublimé & Flocage Numéro 26', 
  img: p6
},
{ 
  cat: 'sport', 
  catL: 'Sport & Événements', 
  name: 'Pack Équipement FC Erindiang', 
  sub: 'Maillots & Short — Collection Club Complète', 
  img: p7 
},
{ 
  cat: 'tshirt', 
  catL: 'T-shirts & Casquettes', 
  name: 'T-shirt Sublimation Sentel Mbayar Bi', 
  sub: 'Impression Photo All-Over Premium', 
  img: p16
},
{ 
  cat: 'blouson', // Ou une catégorie 'workwear' / 'professionnel' si tu en as une
  catL: 'Blousons & Équipements', 
  name: 'Gilet de Sécurité Personnalisé DFB', 
  sub: 'Marquage Professionnel Haute Visibilité', 
  img: p17
},
{ 
  cat: 'blouson', 
  catL: 'Blousons & Équipements', 
  name: 'Gilet de Sécurité Diop et Frères (Dos)', 
  sub: 'Impression Publicitaire Grand Format Dos', 
  img: p18
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Pack Club Complet (Modèle Vert & Blanc)', 
  sub: 'Confection sur-mesure : Maillots, débardeurs, shorts et vestes de survêtement', 
  img: p41
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Pack Club Complet (Modèle Bleu, Blanc & Rouge)', 
  sub: 'Confection sur-mesure : Veste zippée, pantalon, t-shirt et débardeur avec marquage logos', 
  img: p42
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Pack Club Complet (Modèle Noir & Blanc)', 
  sub: 'Confection sur-mesure : Veste de survêtement, t-shirts, débardeur et bas assortis', 
  img: p43
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Pack Club Complet (Modèle Marine, Gris & Rouge)', 
  sub: 'Confection sur-mesure : Survêtement complet, t-shirt, débardeur et short assortis', 
  img: p44
},
{ 
    cat: 'sport', 
    catL: 'Sportswear & Équipements', 
    name: 'Maillots de Supporters (Modèle ASC KANDAALU)', 
    sub: 'Personnalisation de maillots pour associations, événements et comités de supporters', 
    img: p45
  },
{ 
    cat: 'sport', 
    catL: 'Sportswear & Équipements', 
    name: 'Pack Équipementier Complet (Modèle ESPOIR FC Bleu)', 
    sub: 'Ensemble premium complet : Maillot dos floqué, débardeur, short et chaussettes assorties', 
    img: p46
  },
{ 
    cat: 'sport', 
    catL: 'Sportswear & Équipements', 
    name: 'Pack Entraînement Club (Modèle FC SCIENCE Vert)', 
    sub: 'Ensemble assorti comprenant le maillot officiel, le débardeur réversible et le short logoté', 
    img: p48
  }
]

const FILTERS = [
  { key:'all', label:'Tout' },
  { key:'textile', label:'Textile' },
  { key:'sport', label:'Sportswear' },
  { key:'cerem', label:'Cérémonie' },
]

export default function Realisations() {
  const [active, setActive] = useState('all')
  return (
    <section id="realisations" className="section-wrap real-bg">
      <div className="real-header reveal">
        <div>
          <div className="s-tag"><span>Notre Portfolio</span></div>
          <h2 className="s-title">Nos <em>Réalisations</em></h2>
          <p className="s-desc" style={{color:'rgba(255,255,255,.55)'}}>Plus de 1200 créations livrées avec fierté depuis Dakar.</p>
        </div>
        <div className="filters">
          {FILTERS.map(f => (
            <button key={f.key} className={`fbtn${active===f.key?' active':''}`} onClick={() => setActive(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="real-grid">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="ri"
            style={{ opacity: active==='all'||active===item.cat ? 1 : 0.1,
                     pointerEvents: active==='all'||active===item.cat ? 'auto' : 'none',
                     transition: 'opacity .4s ease' }}
          >
            <img src={item.img} alt={item.name} loading="lazy" />
            <div className="ri-ov">
              <div className="ri-cat">{item.catL}</div>
              <div className="ri-name">{item.name}</div>
              <div className="ri-sub">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
