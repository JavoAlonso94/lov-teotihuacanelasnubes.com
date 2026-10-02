import { createFileRoute, Link } from "@tanstack/react-router";
import { FlightCard } from "@/components/FlightCard";
import { flightImages, media } from "@/lib/media";
import { extras, flights, includes, safety, tnnSwal } from "@/lib/tnn";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Teotihuacán en las nubes | Vuelos en globo al amanecer" },
      {
        name: "description",
        content:
          "Vuela en globo aerostático sobre Teotihuacán. Vuelos compartidos desde $2,400 MXN, privados, familiares y celebraciones. Pilotos certificados AFAC.",
      },
      { property: "og:title", content: "Teotihuacán en las nubes | Vuelos en globo" },
      {
        property: "og:description",
        content: "Descubre la magia de volar en globo sobre la Ciudad de los Dioses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <>
      {/* HERO */}
      <header className="tnn-hero">
        <video autoPlay muted loop playsInline poster="/images/hero-poster.webp" preload="auto">
          <source src={media.heroVideo} type="video/mp4" />
        </video>
        <div className="container tnn-app tnn-hero-inner text-center d-flex flex-column align-items-center">
          <img
            src={media.logo}
            alt="Teotihuacán en las nubes"
            className="tnn-hero-logo tnn-balloon-float mb-3"
          />
          <p className="tnn-eyebrow text-white-50">Teotihuacán en las nubes.</p>
          <h1 className="animate__animated animate__fadeInUp">
            Una vista increíble de <span className="tnn-grad-text">Teotihuacán</span>
          </h1>
          <p className="h5 fw-normal mt-3 animate__animated animate__fadeInUp animate__delay-1s">
            “Ciudad de los Dioses”
          </p>
          <p
            className="lead mt-3 animate__animated animate__fadeInUp animate__delay-1s"
            style={{ maxWidth: 620 }}
          >
            Descubre la magia de volar en globo aerostático sobre una de las ciudades precolombinas
            más importantes del mundo y maravíllate del panorama desde las nubes.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <Link className="btn btn-tnn btn-lg" to="/checkout">
              <i className="fa-solid fa-lock me-2" />Comprar mi vuelo
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/vuelos">
              Ver paquetes
              <i className="fa-solid fa-arrow-right ms-2" />
            </Link>
          </div>
        </div>
        <span className="tnn-scroll-cue">
          <i className="fa-solid fa-chevron-down fs-4" />
        </span>
      </header>

      <div className="tnn-marquee">
        <span>
          ✦ Amaneceres inolvidables ✦ Pilotos certificados AFAC ✦ Desayuno buffet ✦ Brindis con vino
          espumoso ✦ Seguro de viajero ✦ Certificado de vuelo ✦
        </span>
      </div>

      {/* INTRO */}
      <section className="tnn-section">
        <div className="container tnn-app">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6" data-aos="fade-right">
              <figure className="tnn-gallery m-0">
                <img src={media.crew} alt="Globo inflándose al amanecer en Teotihuacán" loading="lazy" />
              </figure>
            </div>
            <div className="col-12 col-lg-6" data-aos="fade-left">
              <p className="tnn-eyebrow">Conócenos</p>
              <h2 className="display-6">Tu seguridad y la calidad de nuestro servicio</h2>
              <p className="tnn-muted mt-3">
                En Teotihuacán en las nubes trabajamos todos los días para ofrecerte no solo un
                vuelo en globo, sino una experiencia completamente divertida y segura.
              </p>
              <div className="row g-3 mt-2">
                {safety.map((s, i) => (
                  <div className="col-12 col-sm-4" key={s.title} data-aos="zoom-in" data-aos-delay={i * 120}>
                    <div className="tnn-tile text-center">
                      <div className="tnn-ico mx-auto mb-3">
                        <i className={s.icon} />
                      </div>
                      <h3 className="h6">{s.title}</h3>
                      <p className="small tnn-muted mb-0">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAQUETES */}
      <section className="tnn-section" style={{ background: "var(--tnn-surface-2)" }}>
        <div className="container tnn-app">
          <div className="text-center mb-5" data-aos="fade-up">
            <p className="tnn-eyebrow">Nuestros vuelos</p>
            <h2 className="display-6">¿Estás listo para un espectáculo al amanecer?</h2>
            <p className="tnn-muted">
              Conquista el cielo y déjate llevar sin preocupaciones. Diseñamos tu experiencia a la
              medida.
            </p>
          </div>
          <div className="row g-4">
            {flights.slice(0, 3).map((f, i) => {
              const image = flightImages[f.id];
              if (!image) return null;
              return <FlightCard key={f.id} flight={f} image={image} delay={i * 120} />;
            })}
          </div>
          <div className="text-center mt-5" data-aos="fade-up">
            <Link className="btn btn-outline-tnn btn-lg" to="/vuelos">
              Ver los 6 paquetes
            </Link>
          </div>
        </div>
      </section>

      {/* INCLUYE */}
      <section className="tnn-section">
        <div className="container tnn-app">
          <div className="text-center mb-4" data-aos="fade-up">
            <p className="tnn-eyebrow">Siempre incluido</p>
            <h2 className="display-6">Todos nuestros vuelos incluyen</h2>
          </div>
          <div className="row g-3">
            {includes.map((it, i) => (
              <div className="col-12 col-sm-6 col-lg-4" key={it.text} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="tnn-tile d-flex align-items-center gap-3">
                  <span className="tnn-ico sun">
                    <i className={it.icon} />
                  </span>
                  <span className="fw-bold">{it.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRAS */}
      <section className="tnn-section" style={{ background: "var(--tnn-surface-2)" }}>
        <div className="container tnn-app">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-5" data-aos="fade-right">
              <p className="tnn-eyebrow">Complementos</p>
              <h2 className="display-6">¡Llena tu vida de recuerdos memorables!</h2>
              <p className="tnn-muted">
                Revive la experiencia desde tu hogar incluyendo nuestros servicios de fotografía y
                video. Todos los paquetes se entregan en digital.
              </p>
              <button
                className="btn btn-sky"
                onClick={() =>
                  tnnSwal.fire({
                    title: "Arma tu experiencia",
                    html: extras
                      .map((e) => `<div class="d-flex justify-content-between border-bottom py-2"><span>${e.name}</span><b>${e.price}</b></div>`)
                      .join(""),
                    confirmButtonText: "Entendido",
                  })
                }
              >
                Ver precios de extras
              </button>
            </div>
            <div className="col-12 col-lg-7">
              <div className="row g-3">
                {extras.map((e, i) => (
                  <div className="col-12 col-md-6" key={e.name} data-aos="zoom-in" data-aos-delay={i * 90}>
                    <div className="tnn-tile d-flex align-items-start gap-3 h-100">
                      <span className="tnn-ico">
                        <i className={e.icon} />
                      </span>
                      <div>
                        <div className="fw-bold small">{e.name}</div>
                        <div className="tnn-price fs-6">{e.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVA / PAGOS */}
      <section className="tnn-section">
        <div className="container tnn-app">
          <div className="tnn-glass p-4 p-lg-5 text-center" data-aos="zoom-in">
            <span className="tnn-ico sun mx-auto mb-3">
              <i className="fa-regular fa-calendar-check" />
            </span>
            <h2 className="display-6">Compra tu experiencia en línea</h2>
            <p className="tnn-muted mx-auto" style={{ maxWidth: 720 }}>
              Elige tu paquete, fecha y número de pasajeros. Paga el <b>100% del total</b> mediante
              el formulario seguro de Clip y recibe seguimiento para confirmar tu horario.
            </p>
            <Link className="btn btn-tnn btn-lg" to="/checkout"><i className="fa-solid fa-basket-shopping me-2" />Ir a comprar</Link>
            <div className="d-flex flex-wrap justify-content-center gap-4 mt-4 fs-2 tnn-muted">
              <i className="fa-brands fa-cc-visa" />
              <i className="fa-brands fa-cc-mastercard" />
              <i className="fa-brands fa-cc-amex" />
              <i className="fa-solid fa-shield-halved" title="Pago protegido" />
            </div>
            <p className="small tnn-muted mt-3 mb-0">
              Pago cifrado y procesado de forma segura por Clip
            </p>
          </div>
        </div>
      </section>

      {/* CTA CONTACTO */}
      <section className="tnn-section" style={{ background: "var(--tnn-surface-2)" }}>
        <div className="container tnn-app text-center" data-aos="fade-up">
          <p className="tnn-eyebrow">Ponte en contacto</p>
          <h2 className="display-6">Resolvemos todas tus dudas</h2>
          <p className="tnn-muted mx-auto" style={{ maxWidth: 640 }}>
            Nuestros asesores te ayudarán a elegir la mejor opción para que tu experiencia
            <b> en las nubes</b> sea inolvidable.
          </p>
          <Link className="btn btn-sky btn-lg" to="/contacto">
            Escríbenos
          </Link>
        </div>
      </section>
    </>
  );
}
