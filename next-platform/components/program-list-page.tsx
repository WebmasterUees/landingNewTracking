import { ProgramLevel } from "@prisma/client";
import { getProgramsByLevel } from "@/lib/programs";
import { LeadWidgetScript } from "@/components/lead-widget-script";

export async function ProgramListPage({ level }: { level: ProgramLevel }) {
  const programs = await getProgramsByLevel(level);

  if (level === ProgramLevel.grado) {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/grado/css/style.css" />

        <header className="topbar">
          <div className="container nav-wrap">
            <a className="brand" href="#inicio" aria-label="UEES Online">
              <img src="/grado/images/logo-blanco.png" alt="UEES Online" />
            </a>
            <a className="ghost-link" href="#programas">
              Ver programas
            </a>
          </div>
        </header>

        <main id="inicio">
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-copy reveal">
                <p className="eyebrow">Grado Online</p>
                <h1>Una carrera para mover tu historia.</h1>
                <p className="lead">
                  Explora las carreras de grado disponibles y recibe asesoría personalizada para elegir el programa que
                  mejor se alinea con tus metas.
                </p>
                <a className="cta" href="#programas">
                  Quiero información
                </a>
              </div>

              <aside className="form-shell reveal" id="formulario">
                <LeadWidgetScript
                  id="form-script"
                  src="https://webservices.devmaniacs.net/widgets/lead-stepper-general-grado.js?v=20260514-5"
                  attributes={{
                    modalidad: "Online",
                    nivel: "Grado",
                    platform: "LANDING",
                    "programs-csv-url": "/programas-CSV/programas-grado.csv"
                  }}
                />
              </aside>
            </div>
          </section>

          <section className="programas" id="programas">
            <div className="container">
              <div className="section-head reveal">
                  <p className="eyebrow">Oferta Académica</p>
                  <h2>Programas de grado</h2>
                </div>

              <div className="cards">
                {programs.map((program) => (
                  <article className="card reveal" key={program.id}>
                    <h3>{program.headingTitle || program.name}</h3>
                    <p>Conoce el plan de estudios y solicita información personalizada.</p>
                    <a href={`/grado/${program.slug}/`}>Más información</a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <section className="thankyou-view" id="thankYouView" aria-live="polite">
          <div className="container thankyou-wrap">
            <h2>¿Necesitas ayuda? Estamos aquí para asistirte</h2>
            <p>Gracias por registrarte. Un asesor se pondrá en contacto contigo pronto. Mientras tanto, revisa estas carreras de grado:</p>
            <div id="thankYouMenuContent" className="thankyou-menu-content">
              <div className="menu-links">
                {programs.map((program) => (
                  <a key={`thanks-${program.id}`} href={`/grado/${program.slug}/`}>
                    {program.headingTitle || program.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <script src="/grado/js/script.js"></script>
      </>
    );
  }

  if (level === ProgramLevel.postgrado) {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/postgrado/css/style.css" />

        <header className="topbar">
          <div className="container nav-wrap">
            <a className="brand" href="#inicio" aria-label="UEES Online">
              <img src="/postgrado/images/logo-blanco.png" alt="UEES Online" />
            </a>
            <a className="ghost-link" href="#programas">
              Ver programas
            </a>
          </div>
        </header>

        <main id="inicio">
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-copy reveal">
                <p className="eyebrow">Posgrado Online</p>
                <h1>Especializa tu perfil y lleva tu carrera mas lejos.</h1>
                <p className="lead">
                  Recibe asesoría personalizada sobre la oferta de posgrado y encuentra el programa que mejor se ajusta
                  a tus objetivos profesionales.
                </p>
                <a className="cta" href="#programas">
                  Quiero información
                </a>
              </div>

              <aside className="form-shell reveal" id="formulario">
                <LeadWidgetScript
                  id="form-script"
                  src="https://webservices.devmaniacs.net/widgets/lead-stepper-general-postgrado.js?v=20260507-1"
                  attributes={{
                    modalidad: "Online",
                    nivel: "Posgrado",
                    platform: "LANDING",
                    "programs-csv-url": "/programas-CSV/programas-postgrado.csv"
                  }}
                />
              </aside>
            </div>
          </section>

          <section className="programas" id="programas">
            <div className="container">
              <div className="section-head reveal">
                  <p className="eyebrow">Oferta Académica</p>
                  <h2>Programas de posgrado</h2>
                </div>

              <div className="cards">
                {programs.map((program) => (
                  <article className="card reveal" key={program.id}>
                    <h3>{program.headingTitle || program.name}</h3>
                    <p>Conoce el plan de estudios y solicita información personalizada.</p>
                    <a href={`/postgrado/${program.slug}/`}>Más información</a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <section className="thankyou-view" id="thankYouView" aria-live="polite">
          <div className="container thankyou-wrap">
            <h2>¿Necesitas ayuda? Estamos aquí para asistirte</h2>
            <p>Gracias por registrarte. Un asesor se pondrá en contacto contigo pronto.</p>
          </div>
        </section>

        <script src="/postgrado/js/script.js"></script>
      </>
    );
  }

  throw new Error(`Nivel no soportado: ${level}`);
}
