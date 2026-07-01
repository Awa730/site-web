import '../styles/Footer.css'
import logo from "../assets/photos/logo.jpeg"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="ft-top">
        <div>
          <img src={logo} alt="Logo" className="ft-logo-img" />
          <div className="ft-brand">MAIMOUNA COMPANY</div>
          <p className="ft-desc">Chaque visuel que nous créons, chaque impression que nous réalisons, porte l'empreinte de notre précision et de notre créativité..</p>
        </div>
        {[
          { title:'Navigation', links:[['#accueil','Accueil'],['#services','Services'],['#realisations','Réalisations'],['#boutique','Boutique'],['#blog','Blog & Vidéos'],['#apropos','À Propos'],['#contact','Contact']] },
          { title:'Services',   links:[['#services','Confection sur mesure'],['#services','Sportswear & Maillots'],['#services','Tenues pro'],['#services','Infographie'],['#services','Commandes en gros'],['#services','Blousons'],['#services','Décoration Interieure']] },
          { title:'Contact',    links:[['#','Dakar, Poste Thiaroye'],['tel:+221774974429','+221 77 497 44 29'],['mailto:contact@maimounacompany.sn','contact@maimounacompany.sn'],['#','TikTok'],['#','Whatsapp']] },
        ].map(col => (
          <div key={col.title}>
            <div className="ft-col-title">{col.title}</div>
            <ul className="ft-links">
              {col.links.map(([href, label]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="ft-bottom">
        <p className="ft-copy">© {year} <span>MAIMOUNA COMPANY</span>. Tous droits réservés. Fait avec ♥ à Dakar.</p>
        <div className="ft-legal">
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
          <a href="#">CGV</a>
          <a href="/admin-login" className="ft-admin-link">Administration</a>
        </div>
      </div>
    </footer>
  )
}
