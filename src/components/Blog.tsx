import "../styles/Blog.css";

const VIDEOS = [
  { id: "v1",  src: "/Videos/v1.mp4",  title: "Tableau Mural Personnalisé" },
  { id: "v2",  src: "/Videos/v2.mp4",  title: "Atelier de Confection" },
  { id: "v3",  src: "/Videos/v3.mp4",  title: "La Place Maimouna Company" },
  { id: "v4",  src: "/Videos/v4.mp4",  title: "Mini-Tableaux Personnalisés" },
  { id: "v5",  src: "/Videos/v5.mp4",  title: "Mini-Tableaux Murals" },
  { id: "v6",  src: "/Videos/v6.mp4",  title: "Confection de Maillots" },
  { id: "v7",  src: "/Videos/v7.mp4",  title: "Commande de Maillots" },
  { id: "v8",  src: "/Videos/v8.mp4",  title: "Tableau Mural religieux" },
  { id: "v9",  src: "/Videos/v9.mp4",  title: "Carte de Visite" },
  { id: "v10", src: "/Videos/v10.mp4", title: "Confection de Blousons" },
  { id: "v11", src: "/Videos/v11.mp4", title: "Flocage de T-shirts et Casquettes personnalisés" },
  { id: "v12", src: "/Videos/v12.mp4", title: "Commande de T-shirts et Casquettes" },
  { id: "v13", src: "/Videos/v13.mp4", title: "Flocage de Maillots" },
  { id: "v14", src: "/Videos/v14.mp4", title: "Commande de Blousons" },
  { id: "v15", src: "/Videos/v15.mp4", title: "Creation D'Affiche" },
  { id: "c1", src: "/Videos/c1.mp4", title: "Decoration Interieure" },
  { id: "c3", src: "/Videos/c3.mp4", title: "Decoration Maison " },
];

function BlogVideos() {
  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="section-title" spellCheck={false}>
          Blog & <span className="red">Vidéos</span>
        </h2>
        <div className="divider" />

        <div className="video-grid">
          {VIDEOS.map((v) => (
            <div key={v.id} className="video-card">
              <video
                controls
                muted          // Coupe le son par défaut pour éviter les blocages navigateurs
                playsInline    // Empêche le plein écran automatique forcé sur iPhone
                preload="metadata"
                className="video-card__video"
              >
                <source src={v.src} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
              <h4 className="video-card__title" spellCheck={false}>
                {v.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogVideos;