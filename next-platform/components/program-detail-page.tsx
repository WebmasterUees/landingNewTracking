import { Program } from "@prisma/client";
import { BodyBackground } from "@/components/body-background";
import { LeadWidgetScript } from "@/components/lead-widget-script";

type ProgramDetailProps = {
  program: Program;
};

export function ProgramDetailPage({ program }: ProgramDetailProps) {
  const levelPath = program.level === "grado" ? "grado" : "postgrado";
  const nivelLabel = program.level === "grado" ? "Grado" : "Postgrado";

  return (
    <>
      <link rel="stylesheet" href="/css/style.css?v=20260417" />
      <BodyBackground className="bg-dynamic" imageUrl={program.backgroundImage} />

      <div>
        <header className="topbar">
          <div className="container nav">
            <a href="#inicio" className="brand">
              <span className="brand">
                <img src={`/${levelPath}/${program.slug}/images/logo-blanco.png`} width="150" alt="" />
              </span>
            </a>
            <nav className="nav-links" />
            <div className="nav-cta">
              <button className="hamburger-menu" id="hamburguerBtn" aria-label="Abrir menu">
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </header>

        <div className="menu-panel" id="menuPanel">
          <button className="menu-close" id="menuClose" aria-label="Cerrar menu">
            &times;
          </button>
          <nav className="menu-links">
            <center>
              <h2>¿Necesitas ayuda?</h2>
              <p className="menu-subtitle">Estamos aquí para asistirte</p>
            </center>
            <br />
            <a id="url-brochure" href={program.brochureUrl || "#"} target="_blank" className="menu-link">
              <span className="menu-icon">&#128196;</span>
              Descargar PDF
            </a>
            <a id="url-sitioweb" href={program.websiteUrl || "#"} target="_blank" className="menu-link">
              <span className="menu-icon">&#127760;</span>
              Ver en el sitio web
            </a>
            <div className="menu-divider" />
            <p className="menu-subtitle">Compartir</p>
            <script src="https://elfsightcdn.com/platform.js" async></script>
            <div className="elfsight-app-9144032f-147b-40b6-996b-184282f6f60f" data-elfsight-app-lazy />
          </nav>
        </div>

        <main>
          <section className="heroSSS" id="inicio">
            <div className="container hero-grid">
              <div className="hero-copySSS reveal">
                <br />
                <br />
                <br />
                <br />
                <span className="eyebrow">{program.modality || "Online"}</span>
                {program.resolution ? <small>{program.resolution}</small> : null}
                <h1>{program.headingTitle || program.name}</h1>
                {program.doubleDegree ? <h2>{program.doubleDegree}</h2> : null}
                <br />
                {program.titleLogoImage ? <img src={program.titleLogoImage} className="mobile-center" width="300" alt="" /> : null}
                <br />

                <div className="hero-iconlist">
                  <ul className="features-list">
                    <li>
                      <span className="feature-icon">
                        <img src={`/${levelPath}/${program.slug}/images/icon-titulo-universitario.png`} width="30" height="30" alt="" />
                      </span>
                      <div className="feature-content">
                          <span className="mini-label">Título a obtener</span>
                          <span className="mini-value">{program.degreeTitle || "Por definir"}</span>
                        </div>
                      </li>
                    {program.doubleDegree ? (
                      <li>
                        <span className="feature-icon">
                          <img src={`/${levelPath}/${program.slug}/images/icon-titulo-universitario.png`} width="30" height="30" alt="" />
                        </span>
                        <div className="feature-content">
                          <span className="mini-label">Doble Titulación</span>
                          <span className="mini-value">{program.doubleDegree}</span>
                        </div>
                      </li>
                    ) : null}
                    <li>
                      <span className="feature-icon">
                        <img src={`/${levelPath}/${program.slug}/images/icon-horario-de-clases-universidad-en-ecuador.png`} width="30" height="30" alt="" />
                      </span>
                      <div className="feature-content">
                          <span className="mini-label">Duración</span>
                          <span className="mini-value">{program.duration || "Por definir"}</span>
                        </div>
                      </li>
                  </ul>
                </div>
                <p className="lead hide-in-movile">{program.description}</p>
              </div>

              <aside id="formulario">
                <LeadWidgetScript
                  id="form-script"
                  src="https://webservices.devmaniacs.net/widgets/lead.js?v=20260514-4"
                  attributes={{
                    programa: program.name,
                    modalidad: program.modality || "Online",
                    nivel: nivelLabel,
                    platform: "LANDING"
                  }}
                />
              </aside>
            </div>
          </section>
        </main>

        <section className="thankyou-view" id="thankYouView" aria-live="polite">
          <div className="container thankyou-wrap">
            <h2>Gracias por registrarte</h2>
            <p>Recibimos tu solicitud correctamente. Mientras te contactamos, puedes revisar estos recursos:</p>
            <div id="thankYouMenuContent" className="thankyou-menu-content" />
          </div>
        </section>

        <div className="sticky-mobile-cta">
          <LeadWidgetScript
            id="form-script-mobile"
            src="https://webservices.devmaniacs.net/widgets/lead.js?v=20260514-4"
            attributes={{
              variant: "wa",
              programa: program.name,
              modalidad: program.modality || "Online",
              nivel: nivelLabel,
              platform: "LANDING",
              whatsapp: "593980068660"
            }}
          />
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
        <script src="/js/script.js?v=20260508-7"></script>
      </div>
    </>
  );
}
