import '../styles/Temoignages.css'
const TEMOS = [
  { av:'F', name:'Awa Fall', role:'Cliente', text:"« Le tableau Mural que j'avais commandé est magnifique, tout le monde en parle. Merci Beaucoup!»"},
  { av:'M', name:'Moussa Sarr', role:'Président — AS Guédiawaye', text:"« Nos maillots sont arrivés dans les délais avec une qualité irréprochable. Tout le club est fier de les porter. Merci infiniment à toute l'équipe ! »" },
  { av:'A', name:'Aminata Ndiaye', role:'DRH — Entreprise Dakaroise', text:'« Les uniformes pour nos 50 employés sont magnifiques. Le rapport qualité-prix est imbattable et le service très professionnel du début à la fin. »' },
]
export default function Temoignages() {
  return (
    <section id="temoignages" className="section-wrap">
      <div className="reveal" style={{textAlign:'center'}}>
        <div className="s-tag" style={{justifyContent:'center'}}><span>Ce qu'ils disent</span></div>
        <h2 className="s-title" style={{textAlign:'center'}}>Nos <span style={{color:'var(--gold-xl)'}}>Clients</span> Parlent</h2>
      </div>
      <div className="temo-grid">
        {TEMOS.map((t,i) => (
          <div className={`tc reveal${i>0?' d'+i:''}`} key={i}>
            <div className="stars">★★★★★</div>
            <p className="tc-text">{t.text}</p>
            <div className="tc-author">
              <div className="tc-av">{t.av}</div>
              <div><div className="tc-name">{t.name}</div><div className="tc-role">{t.role}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
