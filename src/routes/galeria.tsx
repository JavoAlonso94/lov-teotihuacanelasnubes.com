import { createFileRoute } from "@tanstack/react-router";
import { galleryImages, media } from "@/lib/media";
import { tnnSwal } from "@/lib/tnn";

export const Route = createFileRoute("/galeria")({
  component: Galeria,
  head: () => ({
    meta: [
      { title: "Galería | Teotihuacán en las nubes" },
      {
        name: "description",
        content:
          "Fotografías de nuestros vuelos en globo aerostático sobre Teotihuacán: amaneceres, parejas, familias y celebraciones.",
      },
      { property: "og:title", content: "Galería de vuelos en globo en Teotihuacán" },
      { property: "og:description", content: "Mira cómo se vive un amanecer en las nubes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const reviews = [
  { name: "Mariana G.", text: "El amanecer más bonito de mi vida. El piloto súper atento y todo muy seguro.", stars: 5 },
  { name: "Luis y Ana", text: "Reservamos el vuelo de pedida de mano… ¡dijo que sí en el cielo!", stars: 5 },
  { name: "Familia Ríos", text: "Fuimos 6 en globo privado, el desayuno buffet estuvo delicioso.", stars: 5 },
];

function Galeria() {
  return (
    <>
      <section className="tnn-section pb-0">
        <div className="container tnn-app text-center" data-aos="fade-up">
          <p className="tnn-eyebrow">Carrete fotográfico</p>
          <h1 className="display-5">Galería en las nubes</h1>
        </div>
      </section>

      <section className="tnn-section">
        <div className="container tnn-app">
          <div className="row g-3 tnn-gallery">
            {galleryImages.map((img, i) => (
              <div
                className={i % 5 === 0 ? "col-12 col-lg-8" : "col-6 col-lg-4"}
                key={img.src}
                data-aos="zoom-in"
                data-aos-delay={(i % 3) * 100}
              >
                <figure
                  style={{ height: i % 5 === 0 ? 380 : 240 }}
                  onClick={() =>
                    tnnSwal.fire({
                      imageUrl: img.src,
                      imageAlt: img.alt,
                      title: img.alt,
                      width: 820,
                      confirmButtonText: "Cerrar",
                    })
                  }
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tnn-section" style={{ background: "var(--tnn-surface-2)" }}>
        <div className="container tnn-app">
          <div className="text-center mb-5" data-aos="fade-up">
            <p className="tnn-eyebrow">En movimiento</p>
            <h2 className="display-6">Galería de videos</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              [media.launchVideo, "El despegue"],
              [media.heroVideo, "Sobre la Ciudad de los Dioses"],
              [media.sunriseVideo, "Amanecer entre globos"],
            ].map(([src, label], i) => (
              <div className="col-10 col-sm-6 col-lg-4" key={label} data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="tnn-video-card">
                  <video src={src} controls muted playsInline preload="metadata" poster={galleryImages[i]?.src} />
                  <span className="tnn-video-label"><i className="fa-solid fa-play-circle me-2" />{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tnn-section">
        <div className="container tnn-app">
          <h2 className="display-6 text-center mb-5" data-aos="fade-up">
            Lo que dicen nuestros viajeros
          </h2>
          <div className="row g-4">
            {reviews.map((r, i) => (
              <div className="col-12 col-md-4" key={r.name} data-aos="fade-up" data-aos-delay={i * 120}>
                <div className="tnn-tile h-100">
                  <div className="mb-2" style={{ color: "var(--tnn-sun)" }}>
                    {Array.from({ length: r.stars }).map((_, s) => (
                      <i key={s} className="fa-solid fa-star me-1" />
                    ))}
                  </div>
                  <p className="mb-3">“{r.text}”</p>
                  <div className="fw-bold small">{r.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
