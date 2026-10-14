import { createFileRoute, Link } from "@tanstack/react-router";
import { FlightCard } from "@/components/FlightCard";
import { flightImages, media } from "@/lib/media";
import { extras, getFlights, includes, safety, tnnSwal } from "@/lib/tnn";
import { ctxLang, seo, SITE_URL, useLang, useT } from "@/lib/i18n";
import packagesData from "@/data/packages.json";

const packagesPrice = (id: string) => packagesData.find((p) => p.id === id)?.unitPrice ?? 0;

export const Route = createFileRoute("/")({
  component: Index,
  head: ({ match }) => {
    const lang = ctxLang(match);
    const base = seo(lang, "/", {
      es: { title: "Vuelo en globo en Teotihuacán al amanecer | Teotihuacán en las nubes", description: "Vuelo en globo aerostático sobre las pirámides de Teotihuacán desde $2,400 MXN. Vuelos compartidos, privados, familiares y celebraciones con pilotos certificados AFAC, desayuno y seguro." },
      en: { title: "Hot Air Balloon Ride in Teotihuacan at Sunrise | Teotihuacán en las nubes", description: "Hot air balloon flights over the Teotihuacan pyramids near Mexico City from $2,400 MXN. Shared, private, family and celebration flights with AFAC-certified pilots, breakfast and insurance." },
    }, { image: "/images/hero-poster.webp" });
    return {
      ...base,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: lang === "en" ? "Hot air balloon flight over Teotihuacan" : "Vuelo en globo sobre Teotihuacán",
          touristType: ["Parejas", "Familias", "Viajeros"],
          provider: { "@type": "TravelAgency", name: "Teotihuacán en las nubes" },
          offers: getFlights(lang).map((f) => ({ "@type": "Offer", name: f.name, price: packagesPrice(f.id), priceCurrency: "MXN", availability: "https://schema.org/InStock", url: `${SITE_URL}/checkout?package=${f.id}` })),
        }),
      }],
    };
  },
});

function Index() {
  const lang = useLang();
  const t = useT();
  const flights = getFlights(lang);
  return (
    <>
      {/* HERO */}
      <header className="tnn-hero">
        <video autoPlay muted loop playsInline poster="/images/hero-poster.webp" preload="auto">
          <source src="/images/hero-tnn.webm" type="video/webm" />
          <source src={media.heroVideo} type="video/mp4" />
        </video>
        <div className="container tnn-app tnn-hero-inner text-center d-flex flex-column align-items-center">
          <img
            src={media.logo}
            alt="Teotihuacán en las nubes"
            className="tnn-hero-logo tnn-balloon-float mb-3"
            width={320}
            height={414}
            fetchPriority="high"
          />
          <p className="tnn-eyebrow text-white-50">{t("Vuelo en globo en Teotihuacán", "Hot air balloon rides in Teotihuacan")}</p>
          <h1 className="animate__animated animate__fadeInUp">
            {t("Una vista increíble de", "An incredible view of")} <span className="tnn-grad-text">Teotihuacán</span>
          </h1>
          <p className="h5 fw-normal mt-3 animate__animated animate__fadeInUp animate__delay-1s">
            {t("“Ciudad de los Dioses”", "“City of the Gods”")}
          </p>
          <p
            className="lead mt-3 animate__animated animate__fadeInUp animate__delay-1s"
            style={{ maxWidth: 620 }}
          >
            {t("Descubre la magia de volar en globo aerostático sobre una de las ciudades precolombinas más importantes del mundo y maravíllate del panorama desde las nubes.", "Discover the magic of a hot air balloon ride over one of the most important pre-Columbian cities in the world and marvel at the view from the clouds.")}
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <Link className="btn btn-tnn btn-lg" to="/checkout">
              <i className="fa-solid fa-lock me-2" />{t("Comprar mi vuelo", "Book my flight")}
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/vuelos">
              {t("Ver paquetes", "See packages")}
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
          {t("✦ Amaneceres inolvidables ✦ Pilotos certificados AFAC ✦ Desayuno buffet ✦ Brindis con vino espumoso ✦ Seguro de viajero ✦ Certificado de vuelo ✦", "✦ Unforgettable sunrises ✦ AFAC-certified pilots ✦ Buffet breakfast ✦ Sparkling wine toast ✦ Travel insurance ✦ Flight certificate ✦")}
        </span>
      </div>

      {/* INTRO */}
      <section className="tnn-section">
        <div className="container tnn-app">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6" data-aos="fade-right">
              <figure className="tnn-gallery m-0">
                <img src={media.crew} alt={t("Globo inflándose al amanecer en Teotihuacán", "Balloon inflating at sunrise in Teotihuacan")} loading="lazy" />
              </figure>
            </div>
            <div className="col-12 col-lg-6" data-aos="fade-left">
              <p className="tnn-eyebrow">{t("Conócenos", "About us")}</p>
              <h2 className="display-6">{t("Tu seguridad y la calidad de nuestro servicio", "Your safety and the quality of our service")}</h2>
              <p className="tnn-muted mt-3">
                {t("En Teotihuacán en las nubes trabajamos todos los días para ofrecerte no solo un vuelo en globo, sino una experiencia completamente divertida y segura.", "At Teotihuacán en las nubes we work every day to offer you not just a balloon flight, but a completely fun and safe experience.")}
              </p>
              <div className="row g-3 mt-2">
                {safety.map((s, i) => (
                  <div className="col-12 col-sm-4" key={s.title} data-aos="zoom-in" data-aos-delay={i * 120}>
                    <div className="tnn-tile text-center">
                      <div className="tnn-ico mx-auto mb-3">
                        <i className={s.icon} />
                      </div>
                      <h3 className="h6">{t(s.title, s.titleEn)}</h3>
                      <p className="small tnn-muted mb-0">{t(s.text, s.textEn)}</p>
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
            <p className="tnn-eyebrow">{t("Nuestros vuelos", "Our flights")}</p>
            <h2 className="display-6">{t("¿Estás listo para un espectáculo al amanecer?", "Ready for a sunrise spectacle?")}</h2>
            <p className="tnn-muted">
              {t("Conquista el cielo y déjate llevar sin preocupaciones. Diseñamos tu experiencia a la medida.", "Conquer the sky and let yourself go, worry-free. We tailor your experience to you.")}
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
              {t("Ver los 6 paquetes", "See all 6 packages")}
            </Link>
          </div>
        </div>
      </section>

      {/* INCLUYE */}
      <section className="tnn-section">
        <div className="container tnn-app">
          <div className="text-center mb-4" data-aos="fade-up">
            <p className="tnn-eyebrow">{t("Siempre incluido", "Always included")}</p>
            <h2 className="display-6">{t("Todos nuestros vuelos incluyen", "All our flights include")}</h2>
          </div>
          <div className="row g-3">
            {includes.map((it, i) => (
              <div className="col-12 col-sm-6 col-lg-4" key={it.text} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="tnn-tile d-flex align-items-center gap-3">
                  <span className="tnn-ico sun">
                    <i className={it.icon} />
                  </span>
                  <span className="fw-bold">{t(it.text, it.en)}</span>
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
              <p className="tnn-eyebrow">{t("Complementos", "Add-ons")}</p>
              <h2 className="display-6">{t("¡Llena tu vida de recuerdos memorables!", "Fill your life with memorable moments!")}</h2>
              <p className="tnn-muted">
                {t("Revive la experiencia desde tu hogar incluyendo nuestros servicios de fotografía y video. Todos los paquetes se entregan en digital.", "Relive the experience at home with our photo and video services. All packages are delivered digitally.")}
              </p>
              <button
                className="btn btn-sky"
                onClick={() =>
                  tnnSwal.fire({
                    title: t("Arma tu experiencia", "Build your experience"),
                    html: extras
                      .map((e) => `<div class="d-flex justify-content-between border-bottom py-2"><span>${t(e.name, e.en)}</span><b>${e.price}</b></div>`)
                      .join(""),
                    confirmButtonText: t("Entendido", "Got it"),
                  })
                }
              >
                {t("Ver precios de extras", "See add-on prices")}
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
                        <div className="fw-bold small">{t(e.name, e.en)}</div>
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
            <h2 className="display-6">{t("Compra tu experiencia en línea", "Book your experience online")}</h2>
            <p className="tnn-muted mx-auto" style={{ maxWidth: 720 }}>
              {t("Elige tu paquete, fecha y número de pasajeros. Paga el 100% del total mediante el formulario seguro de Clip y recibe seguimiento para confirmar tu horario.", "Choose your package, date and number of passengers. Pay 100% of the total (in MXN) through Clip's secure form and we'll follow up to confirm your schedule.")}
            </p>
            <Link className="btn btn-tnn btn-lg" to="/checkout"><i className="fa-solid fa-basket-shopping me-2" />{t("Ir a comprar", "Go to checkout")}</Link>
            <div className="d-flex flex-wrap justify-content-center gap-4 mt-4 fs-2 tnn-muted">
              <i className="fa-brands fa-cc-visa" />
              <i className="fa-brands fa-cc-mastercard" />
              <i className="fa-brands fa-cc-amex" />
              <i className="fa-solid fa-shield-halved" title={t("Pago protegido", "Protected payment")} />
            </div>
            <p className="small tnn-muted mt-3 mb-0">
              {t("Pago cifrado y procesado de forma segura por Clip", "Encrypted payment securely processed by Clip")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA CONTACTO */}
      <section className="tnn-section" style={{ background: "var(--tnn-surface-2)" }}>
        <div className="container tnn-app text-center" data-aos="fade-up">
          <p className="tnn-eyebrow">{t("Ponte en contacto", "Get in touch")}</p>
          <h2 className="display-6">{t("Resolvemos todas tus dudas", "We answer all your questions")}</h2>
          <p className="tnn-muted mx-auto" style={{ maxWidth: 640 }}>
            {t("Nuestros asesores te ayudarán a elegir la mejor opción para que tu experiencia en las nubes sea inolvidable.", "Our advisors will help you choose the best option so your experience in the clouds is unforgettable.")}
          </p>
          <Link className="btn btn-sky btn-lg" to="/contacto">
            {t("Escríbenos", "Write to us")}
          </Link>
        </div>
      </section>
    </>
  );
}
