import { 
 p10,p30,p50,p32,p52,p34,p35,p36,p37,p38,p39,p40
} from '../assets/photos'


import '../styles/Boutique.css'

const ITEMS = [
  { 
  cat: 'sport',   
  catL: 'Sportswear',  
  name: 'Maillots Officiels (ASC PETIT COLOBANE)', 
  sub: 'Sublimation premium et marquage de logos club haute fidélité', 
  img: p10
},
 { 
  cat: 'print', 
  catL: 'Marquage Textile', 
  name: 'T-shirt Hommage (Modèle Cheikh Ibra Fall)', 
  sub: 'Marquage graphique bi-couleur haute définition et lettrage personnalisé sur manches', 
  img: p30
},
  { 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Pack Club Complet (Modèle F.C.N Or & Blanc)', 
  sub: 'Ensemble assorti comprenant maillot officiel, débardeur d\'entraînement et short marqué', 
  img: p50
},
{ 
  cat: 'print', 
  catL: 'Marquage Textile', 
  name: 'T-shirt Personnalisé (Modèle NOREYNI)', 
  sub: 'Impression par sublimation haute définition avec graphismes complexes et portraits photo', 
  img: p32
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Équipement de Foot (Modèle TALENT D\'AFRIQUE)', 
  sub: 'Ensemble maillot bleu et short gris personnalisé avec sublimation et logo club', 
  img: p52
},
{ 
  cat: 'print', 
  catL: 'Marquage Textile', 
  name: 'T-shirt Hommage (Modèle Borom Touba)', 
  sub: 'Impression graphique premium avec lettrages et citations stylisés sur fond contrasté', 
  img: p34
},
{ 
  cat: 'print', 
  catL: 'Marquage Textile', 
  name: 'T-shirt Hommage (Modèle Serigne Fallou)', 
  sub: 'Sublimation intégrale grand format avec impression portrait haute définition et lettrages stylisés', 
  img: p35
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Pack Club Complet (Modèle Vert Fluo & Noir)', 
  sub: 'Ensemble assorti comprenant maillot officiel, débardeur d\'entraînement, short et manchons personnalisés', 
  img: p36
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Pack Club Complet (Modèle Bleu, Blanc & Gris)', 
  sub: 'Confection sur-mesure : Veste de survêtement, pantalon, t-shirts, débardeur et short assortis', 
  img: p37
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Maillots de Supporters (Modèle ASC KANDAALU - Portrait)', 
  sub: 'Personnalisation et marquage de maillots pour événements, associations et comités de supporters', 
  img: p38
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Ensemble Survêtement & Maillot (Modèle Bleu & Blanc)', 
  sub: 'Pack club incluant veste zippée, pantalon de jogging et t-shirt technique assorti', 
  img: p39
},
{ 
  cat: 'sport', 
  catL: 'Sportswear & Équipements', 
  name: 'Survêtement Officiel (Modèle PASTEF Vert & Blanc)', 
  sub: 'Confection premium de vestes zippées et pantalons assortis avec marquage logo politique / associatif', 
  img: p40
}
]

export default function Boutique() {
  return (
    <section id="boutique" className="section-wrap">
      <div className="reveal">
        <div className="s-tag"><span>Notre Catalogue</span></div>
        <h2 className="s-title">La <em>Boutique</em></h2>
        <p className="s-desc">Chaque pièce peut être personnalisée selon vos mesures, couleurs et occasions.</p>
      </div>

      <div className="prod-grid">
        {ITEMS.map((p, i) => (
          <div className={`prod reveal${i%4>0 ? ' d'+i%4 : ''}`} key={i}>
            <div className="prod-img">
              <img src={p.img} alt={p.name} loading="lazy" />
              {p.badge && <div className="prod-badge">{p.badge}</div>}
              <div className="prod-fav">♡</div>
            </div>
            <div className="prod-body">
              <div className="prod-cat">{p.catL}</div>
              <div className="prod-name">{p.name}</div>
              <div className="prod-sub">{p.sub}</div>
              <div className="prod-foot">
                <div className="prod-price">
                  <small>Prix</small> {p.price || 'Sur devis'}
                </div>
                <a href="#contact" className="prod-btn">Commander</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign:'center', marginTop:'44px' }}>
        <a href="#contact" className="btn-p">Demander un devis personnalisé →</a>
      </div>
    </section>
  )
}
