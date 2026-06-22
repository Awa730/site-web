import '../styles/Services.css'

const SVCS = [
  { 
    n: '01', 
    ic: '👕', 
    title: 'Mode & Prêt-à-porter Casual', 
    desc: 'Une large sélection de T-shirts tendances, polos Lacoste élégants et casquettes stylées pour un look quotidien soigné et de qualité supérieure.', 
    cta: 'Commander' 
  },
  { 
    n: '02', 
    ic: '⚽', 
    title: 'Sportswear, Maillots & Blousons', 
    desc: 'Équipez vos clubs et entreprises avec nos maillots de football, ensembles de sport et blousons personnalisés. Confort et performance garantis.', 
    cta: 'Commander' 
  },
  { 
    n: '03', 
    ic: '🖨️', 
    title: 'Impression Numérique & DTF', 
    desc: 'Marquage textile de pointe avec le tirage DTF pour des visuels éclatants, ultra-détaillés et une durabilité exceptionnelle sur tous vos vêtements.', 
    cta: 'Devis gratuit' 
  },
  { 
    n: '04', 
    ic: '🖼️', 
    title: 'Habillement Pro & Déco Murale', 
    desc: 'Conception de blouses (médicales, ouvrières), de tenues écolières sur-mesure, ainsi que la création de magnifiques tableaux muraux personnalisés.', 
    cta: 'Commander' 
  },
  { 
    n: '05', 
    ic: '📇', 
    title: 'Papeterie & Services Bureautiques', 
    desc: 'Création de cartes de visite percutantes, cartes de membres exclusives et un espace rapide pour toutes vos photocopies et impressions du quotidien.', 
    cta: 'Découvrir' 
  },
  { 
    n: '06', 
    ic: '📢', 
    title: 'Communication Grand Format', 
    desc: 'Boostez votre visibilité avec nos impressions publicitaires professionnelles sur bâches et vinyles, adaptées à tous vos événements et enseignes.', 
    cta: 'Nous contacter' 
  },
]
export default function Services() {
  return (
    <section id="services" className="section-wrap" >
      <div className="reveal">
        <div className="s-tag"><span>Ce que nous faisons</span></div>
        <h2 className="s-title">Nos <em>Services</em></h2>
        <p className="s-desc">Du sur-mesure traditionnel au sportswear contemporain, nous habillons votre identité avec passion.</p>
      </div>
      <div className="svcs-grid">
        {SVCS.map((s, i) => (
          <div className={`svc reveal${i%3>0?' d'+((i%3)) : ''}`} key={s.n}>
            <div className="svc-n">{s.n}</div>
            <div className="svc-ic">{s.ic}</div>
            <h3 className="svc-title">{s.title}</h3>
            <p className="svc-desc">{s.desc}</p>
            <a href="#contact" className="svc-link">{s.cta}</a>
          </div>
        ))}
      </div>
    </section>
  )
}
