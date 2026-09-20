import { createFileRoute } from "@tanstack/react-router";
import { FlightCard } from "@/components/FlightCard";
import { flightImages, media } from "@/lib/media";
import { flights, includes, safety } from "@/lib/tnn";

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

const recommendations = [
  {
    title: "Antes del vuelo",
    icon: "fa-regular fa-calendar-check",
    items: ["Descansa bien y confirma tu hora de llegada.", "Lleva chamarra, pantalón largo y calzado cerrado.", "Evita alcohol la noche anterior e informa cualquier condición médica."],
  },
  {
    title: "Durante el vuelo",
    icon: "fa-solid fa-cloud-sun",
    items: ["Sigue siempre las indicaciones del piloto.", "Mantén cámaras y teléfonos sujetos con correa.", "Disfruta el paisaje sin sacar brazos u objetos de la canastilla."],
  },
  {
    title: "Después del vuelo",
    icon: "fa-solid fa-champagne-glasses",
    items: ["Espera la señal del equipo antes de salir de la canastilla.", "Disfruta el brindis, certificado y desayuno incluidos.", "Comparte tus fotos y conserva los datos de tu experiencia."],
  },
];

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
          <div className="text-center mt-5"><a className="btn btn-tnn btn-lg" href="/checkout"><i className="fa-solid fa-lock me-2" />Comprar vuelo</a></div>
        </div>
      </section>

      <section className="tnn-section">
        <div className="container tnn-app">
          <h2 className="display-6 text-center mb-5" data-aos="fade-up">
            Tu experiencia, paso a paso
          </h2>
          <div className="row g-4">
            {recommendations.map((stage, i) => <div className="col-12 col-md-4" key={stage.title} data-aos="fade-up" data-aos-delay={i * 100}>
              <article className="tnn-tile tnn-recommendation h-100">
                <span className="tnn-recommendation__number">0{i + 1}</span>
                <span className="tnn-ico mb-3"><i className={stage.icon} /></span>
                <h3 className="h5">{stage.title}</h3>
                <ul className="list-unstyled mb-0">{stage.items.map((item) => <li key={item}><i className="fa-solid fa-check" /><span>{item}</span></li>)}</ul>
              </article>
            </div>)}
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
