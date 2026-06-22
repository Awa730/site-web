import photo from "../assets/photos/photo.jpeg"
import '../styles/Apropos.css'



const VALS = [
  { ic:'✦', t:'Authenticité' }, { ic:'◈', t:'Excellence' },
  { ic:'❋', t:'Innovation' },  { ic:'◉', t:'Proximité' },
]

export default function Apropos() {
  return (
    <section id="apropos" className="section-wrap">
      <div className="ap-grid">
        <div className="ap-imgs reveal">
          <img src={photo} alt="Atelier Maimouna Company" className="ap-main" />

          <div className="ap-badge"><div className="ap-n">6+</div><div className="ap-t">Ans d'Excellence</div></div>

        </div>
        <div className="reveal d1">
          <div className="s-tag"><span>Notre Histoire</span></div>
          <h2 className="s-title">L'Art du Marquage & de la Confection</h2>
<p className="ap-quote">« Chaque visuel que nous créons, chaque impression que nous réalisons, porte l'empreinte de notre précision et de notre créativité. »</p>
<p className="ap-body">Fondée à Dakar en 2023, MAIMOUNA COMPANY est née de la passion pour le design, la communication visuelle et le sportswear (vetements de sport). Nous allions expertise en infographie, technologies d'impression de pointe et confection moderne pour habiller et valoriser particuliers, sportifs, écoles et entreprises.</p>
<p className="ap-body">Notre atelier au cœur de Dakar réunit des équipements de dernière génération pour l'impression numérique, le tirage DTF et la confection, assurant une production rapide et une précision graphique irréprochable.</p>
<div className="vals">
         
            {VALS.map(v => (
              <div className="val" key={v.t}>
                <span className="vi">{v.ic}</span>
                <span className="vt">{v.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
