import { ctxLang, seo, useT } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { FlightCard } from "@/components/FlightCard";
import { flightImages, media } from "@/lib/media";
import { getFlights, includes, safety } from "@/lib/tnn";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/vuelos")({
  component: Vuelos,
  head: ({ match }) => seo(ctxLang(match), "/vuelos", {
    es: { title: "Paquetes de vuelo en globo en Teotihuacán | Precios en MXN", description: "Precios de vuelos en globo en Teotihuacán: compartido, todo incluido con transporte desde CDMX, privado, familiar, pedida de mano y celebración." },
    en: { title: "Teotihuacan Hot Air Balloon Packages & Prices (MXN)", description: "Teotihuacan balloon ride prices: shared, all-inclusive with transport from Mexico City, private, family, marriage proposal and celebration flights." },
  }),
});

const recommendations = [
  {
    title: "Antes del vuelo",
    titleEn: "Before the flight",
    itemsEn: ["Get a good night's rest and confirm your arrival time.", "Bring a jacket, long pants and closed-toe shoes.", "Avoid alcohol the night before and report any medical condition."],
    icon: "fa-regular fa-calendar-check",
    items: ["Descansa bien y confirma tu hora de llegada.", "Lleva chamarra, pantalón largo y calzado cerrado.", "Evita alcohol la noche anterior e informa cualquier condición médica."],
  },
  {
    title: "Durante el vuelo",
    titleEn: "During the flight",
    itemsEn: ["Always follow the pilot's instructions.", "Keep cameras and phones secured with a strap.", "Enjoy the view without sticking arms or objects out of the basket."],
    icon: "fa-solid fa-cloud-sun",
    items: ["Sigue siempre las indicaciones del piloto.", "Mantén cámaras y teléfonos sujetos con correa.", "Disfruta el paisaje sin sacar brazos u objetos de la canastilla."],
  },
  {
    title: "Después del vuelo",
    titleEn: "After the flight",
    itemsEn: ["Wait for the crew's signal before leaving the basket.", "Enjoy the included toast, certificate and breakfast.", "Share your photos and keep your experience details."],
    icon: "fa-solid fa-champagne-glasses",
    items: ["Espera la señal del equipo antes de salir de la canastilla.", "Disfruta el brindis, certificado y desayuno incluidos.", "Comparte tus fotos y conserva los datos de tu experiencia."],
  },
];

function Vuelos() {
  const t = useT();
  const flights = getFlights(useLang());
  return (
    <>
      <section className="tnn-section pb-0">
        <div className="container tnn-app text-center" data-aos="fade-up">
          <p className="tnn-eyebrow">{t("Nuestros vuelos", "Our flights")}</p>
          <h1 className="display-5">{t("Conoce nuestros paquetes", "Hot air balloon packages in Teotihuacan")}</h1>
          <p className="tnn-muted">{t("Elige la mejor opción para ti.", "Choose the best option for you.")}</p>
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
            {t("Niños menores de 8 años pagan $2,100.00 MXN", "Children under 8 pay $2,100.00 MXN")}
          </p>
        </div>
      </section>

      <section className="tnn-section" style={{ background: "var(--tnn-surface-2)" }}>
        <div className="container tnn-app">
          <h2 className="display-6 text-center mb-5" data-aos="fade-up">
            {t("Todos nuestros vuelos incluyen", "All our flights include")}
          </h2>
          <div className="row g-3">
            {includes.map((it, i) => (
              <div className="col-12 col-sm-6 col-lg-4" key={it.text} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="tnn-tile d-flex align-items-center gap-3">
                  <span className="tnn-ico">
                    <i className={it.icon} />
                  </span>
                  <span className="fw-bold">{t(it.text, it.en)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5"><a className="btn btn-tnn btn-lg" href="/checkout"><i className="fa-solid fa-lock me-2" />{t("Comprar vuelo", "Book your flight")}</a></div>
        </div>
      </section>

      <section className="tnn-section">
        <div className="container tnn-app">
          <h2 className="display-6 text-center mb-5" data-aos="fade-up">
            {t("Tu experiencia, paso a paso", "Your experience, step by step")}
          </h2>
          <div className="row g-4">
            {recommendations.map((stage, i) => <div className="col-12 col-md-4" key={stage.title} data-aos="fade-up" data-aos-delay={i * 100}>
              <article className="tnn-tile tnn-recommendation h-100">
                <span className="tnn-recommendation__number">0{i + 1}</span>
                <span className="tnn-ico mb-3"><i className={stage.icon} /></span>
                <h3 className="h5">{t(stage.title, stage.titleEn)}</h3>
                <ul className="list-unstyled mb-0">{t(stage.items, stage.itemsEn).map((item) => <li key={item}><i className="fa-solid fa-check" /><span>{item}</span></li>)}</ul>
              </article>
            </div>)}
          </div>
        </div>
      </section>

      <section className="tnn-section" style={{ background: "var(--tnn-surface-2)" }}>
        <div className="container tnn-app">
          <h2 className="display-6 text-center mb-5" data-aos="fade-up">
            {t("Disfruta de una experiencia", "Enjoy a")} <span className="tnn-grad-text">{t("completamente segura", "completely safe experience")}</span>
          </h2>
          <div className="row g-4">
            {safety.map((s, i) => (
              <div className="col-12 col-md-4" key={s.title} data-aos="zoom-in" data-aos-delay={i * 120}>
                <div className="tnn-tile text-center h-100">
                  <div className="tnn-ico mx-auto mb-3">
                    <i className={s.icon} />
                  </div>
                  <h3 className="h6 text-uppercase">{t(s.title, s.titleEn)}</h3>
                  <p className="small tnn-muted mb-0">{t(s.text, s.textEn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
