import { useState } from 'react'
import '../styles/Contact.css'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="section-wrap">
      <div className="reveal">
        <div className="s-tag"><span>Parlons Ensemble</span></div>
        <h2 className="s-title">Nous <em>Contacter</em></h2>
        <p className="s-desc">Commande, devis ou simple question — notre équipe vous répond dans les 24h.</p>
      </div>
      <div className="ct-grid">
        <div className="reveal">
          {[
            { ic:'📍', lbl:'Adresse', val:'Atelier Maimouna Company\nDakar, Poste Thiaroye, Sips' },
            { ic:'📞', lbl:'Téléphone / WhatsApp', val:'+221 77 497 44 29/ 77 498 31 80' },
            { ic:'✉️', lbl:'Email', val:'niangmalick01@gmail.com' },
            { ic:'🕐', lbl:"Horaires d'Ouverture", val:'Lun — Sam : 09h00 → 21h00\n Dimanche sur rendez-vous' },
          ].map(item => (
            <div className="ct-item" key={item.lbl}>
              <div className="ct-ic">{item.ic}</div>
              <div>
                <div className="ct-lbl">{item.lbl}</div>
                <div className="ct-val">{item.val.split('\n').map((l,i) => <span key={i}>{l}{i<item.val.split('\n').length-1 && <br/>}</span>)}</div>
              </div>
            </div>
          ))}
          <div className="ct-socials">
            {[
              { icon:'fa-instagram', href:'#' },
              { icon:'fa-facebook-f', href:'#' },
              { icon:'fa-tiktok', href:'#' },
              { icon:'fa-whatsapp', href:'https://wa.me/221774974429' },
            ].map(s => (
              <a key={s.icon} href={s.href} className="csoc">
                <i className={`fa-brands ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>
        <div className="ct-form reveal d1">
          <div className="ct-form-title">Envoyez-nous <span>un message</span></div>
          <form onSubmit={handleSubmit}>
            <div className="frow">
              <div className="fg"><label>Prénom</label><input type="text" placeholder="Votre prénom" /></div>
              <div className="fg"><label>Nom</label><input type="text" placeholder="Votre nom" /></div>
            </div>
            <div className="fg"><label>Email ou téléphone</label><input type="text" placeholder="malick@gmail.com ou +221 77..." /></div>
            <div className="fg">
              <label>Type de commande</label>
              <select>
                <option value="" disabled>Sélectionnez un service</option>
                {['Confection sur mesure','Sportswear / Maillots','Tenues professionnelles','Inforgraphie','Blousons','Commande en gros','Tableau Mural','Décoration Intérieure','Autre'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="fg"><label>Message</label><textarea rows={4} placeholder="Décrivez votre projet, quantités, délais souhaités..." /></div>
            <button type="submit" className={`btn-submit${sent?' sent':''}`}>
              {sent ? <><i className="fa-solid fa-circle-check" /> Message envoyé !</> : <>Envoyer ma demande <i className="fa-solid fa-paper-plane" /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
