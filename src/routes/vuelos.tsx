import { createFileRoute } from "@tanstack/react-router";
import { FlightCard } from "@/components/FlightCard";
import { flightImages, media } from "@/lib/media";
import { flights, includes, safety, waLink } from "@/lib/tnn";

export const Route = createFileRoute("/vuelos")({
  component: Vuelos,
  head: () => ({
    meta: [
      { title: "Nuestros vuelos en globo | Teotihuacán en las nubes" },
      {
        name: "description",
        content:
          "Conoce nuestros paquetes: vuelo compartido, todo incluido, privado, familiar, pedida de mano y celebración en Teotihuacán.",
      },
      { property: "og:title", content: "Paquetes de vuelo en globo en Teotihuacán" },
      {
        property: "og:description",
        content: "Elige la mejor opción para ti: 6 paquetes de vuelo en globo aerostático.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const yes = [
  "Chamarra o sudadera ligera.",
  "Pantalón largo o jeans.",
  "Calzado cómodo (botas o tenis).",
  "Gafas para sol y gorra.",
  "Cámara con correa.",
  "Protector solar.",
];
const no = ["Falda o vestido.", "Bufanda.", "Sandalias."];

function Vuelos() {
  return (
    <>
      <section className="tnn-section pb-0">
        <div className="container tnn-app text-center" data-aos="fade-up">
          <p className="tnn-eyebrow">Nuestros vuelos</p>
          <h1 className="display-5">Conoce nuestros paquetes</h1>
          <p className="tnn-muted">Elige la mejor opción para ti.</p>
        </div>
      </section>

      <section className="tnn-section">
        <div className="container tnn-app">
          <div className="row g-4">
            {flights.map((f, i) => {
              const image = flightImages[f.id];
              if (!image) return null;
              return <FlightCard key={f.id} flight={f} image={image} delay={(i % 3) * 120} />;
            })}
          </div>
          <p className="text-center tnn-muted mt-4 mb-0">
            <i className="fa-solid fa-child me-2" />
            Niños menores de 8 años pagan $2,100.00 MXN
          </p>
        </div>
      </section>

      <section className="tnn-section" style={{ background: "var(--tnn-surface-2)" }}>
        <div className="container tnn-app">
          <h2 className="display-6 text-center mb-5" data-aos="fade-up">
            Todos nuestros vuelos incluyen
          </h2>
          <div className="row g-3">
            {includes.map((it, i) => (
              <div className="col-12 col-sm-6 col-lg-4" key={it.text} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="tnn-tile d-flex align-items-center gap-3">
                  <span className="tnn-ico">
                    <i className={it.icon} />
                  </span>
                  <span className="fw-bold">{it.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <a
              className="btn btn-tnn btn-lg"
              href={waLink("Hola, quiero reservar ahora un vuelo en globo.")}
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-whatsapp me-2" />
              Reserva ahora
            </a>
          </div>
        </div>
      </section>

      <section className="tnn-section">
        <div className="container tnn-app">
          <h2 className="display-6 text-center mb-5" data-aos="fade-up">
            Recomendaciones para el día de tu vuelo
          </h2>
          <div className="row g-4">
            <div className="col-12 col-lg-6" data-aos="fade-right">
              <div className="tnn-tile h-100">
                <h3 className="h5 mb-3">
                  <i className="fa-solid fa-circle-check me-2 text-success" />
                  Te recomendamos usar
                </h3>
                <ul className="list-unstyled mb-0">
                  {yes.map((t) => (
                    <li key={t} className="d-flex gap-2 py-2 border-bottom" style={{ borderColor: "var(--tnn-line)" }}>
                      <i className="fa-solid fa-check text-success mt-1" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-6" data-aos="fade-left">
              <div className="tnn-tile h-100">
                <h3 className="h5 mb-3">
                  <i className="fa-solid fa-circle-xmark me-2 text-danger" />
                  Por tu seguridad no asistas con
                </h3>
                <ul className="list-unstyled mb-0">
                  {no.map((t) => (
                    <li key={t} className="d-flex gap-2 py-2 border-bottom" style={{ borderColor: "var(--tnn-line)" }}>
                      <i className="fa-solid fa-xmark text-danger mt-1" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <img
                  src={media.pano}
                  alt="Globos sobre el valle de Teotihuacán"
                  className="w-100 mt-4 rounded-4"
                  style={{ objectFit: "cover", height: 180 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tnn-section" style={{ background: "var(--tnn-surface-2)" }}>
        <div className="container tnn-app">
          <h2 className="display-6 text-center mb-5" data-aos="fade-up">
            Disfruta de una experiencia <span className="tnn-grad-text">completamente segura</span>
          </h2>
          <div className="row g-4">
            {safety.map((s, i) => (
              <div className="col-12 col-md-4" key={s.title} data-aos="zoom-in" data-aos-delay={i * 120}>
                <div className="tnn-tile text-center h-100">
                  <div className="tnn-ico mx-auto mb-3">
                    <i className={s.icon} />
                  </div>
                  <h3 className="h6 text-uppercase">{s.title}</h3>
                  <p className="small tnn-muted mb-0">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
