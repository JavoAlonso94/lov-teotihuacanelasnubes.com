import { ctxLang, seo, useT } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { media } from "@/lib/media";

export const Route = createFileRoute("/nosotros")({
  component: Nosotros,
  head: ({ match }) => seo(ctxLang(match), "/nosotros", {
    es: { title: "Nosotros | Vuelos en globo seguros en Teotihuacán", description: "Agencia de vuelos en globo aerostático en Teotihuacán con pilotos certificados AFAC, calidad y calidez humana." },
    en: { title: "About Us | Safe Hot Air Balloon Flights in Teotihuacan", description: "Hot air balloon agency in Teotihuacan with AFAC-certified pilots, quality service and a human touch." },
  }),
});

function Nosotros() {
  const t = useT();
  return (
    <>
      <section className="tnn-section pb-0">
        <div className="container tnn-app text-center" data-aos="fade-up">
          <p className="tnn-eyebrow">{t("Ahora conócenos", "Get to know us")}</p>
          <h1 className="display-5">
            {t("Vuela en", "Fly in a")} <span className="tnn-grad-text">{t("globo aerostático", "hot air balloon")}</span> {t("con tu mejor compañía", "with your favorite people")}
          </h1>
        </div>
      </section>

      <section className="tnn-section">
        <div className="container tnn-app">
          <div className="row g-3 tnn-gallery mb-5">
            {[media.toastBasket, media.toastFlight, media.toastGround].map((src, i) => (
              <div className="col-12 col-md-4" key={src} data-aos="flip-up" data-aos-delay={i * 120}>
                <figure className="tnn-gallery-frame tnn-gallery-frame--story">
                  <img src={src} alt={t("Carrete fotográfico de vuelos en globo", "Balloon flight photo reel")} loading="lazy" />
                </figure>
              </div>
            ))}
          </div>

          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6" data-aos="fade-right">
              <h2 className="display-6">Teotihuacán en las nubes</h2>
              <p className="tnn-muted">
                {t("Somos una agencia empeñada en ofrecerte una experiencia de altura. Nos motiva ofrecer a nuestros clientes un servicio de calidad y calidez humana. Nos esforzamos para que vivas una experiencia 100% segura y digna de compartir con todos tus amigos y familiares. Nuestro principal objetivo es llevar a más personas a visitar el cielo y las nubes en Teotihuacán.", "We are an agency committed to giving you an experience that reaches new heights. We are driven by offering our clients quality service with a human touch. We work hard so you enjoy a 100% safe experience worth sharing with all your friends and family. Our main goal is to take more people to visit the sky and clouds over Teotihuacan.")}
              </p>
              <p className="fw-bold tnn-grad-text fs-5">{t("¡Seguro volarás seguro con nosotros!", "You will fly safely with us!")}</p>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row g-3">
                <div className="col-12" data-aos="fade-up">
                  <div className="tnn-tile d-flex gap-3">
                    <span className="tnn-ico">
                      <i className="fa-solid fa-bullseye" />
                    </span>
                    <div>
                      <h3 className="h6">{t("Misión", "Mission")}</h3>
                      <p className="small tnn-muted mb-0">
                        {t("Cumplir con las expectativas de nuestros clientes y ofrecer un servicio de calidad asegurada.", "To meet our clients' expectations and offer guaranteed quality service.")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12" data-aos="fade-up" data-aos-delay="120">
                  <div className="tnn-tile d-flex gap-3">
                    <span className="tnn-ico sun">
                      <i className="fa-solid fa-eye" />
                    </span>
                    <div>
                      <h3 className="h6">{t("Visión", "Vision")}</h3>
                      <p className="small tnn-muted mb-0">
                        {t("Ser una agencia reconocida a nivel mundial gracias a nuestro servicio de calidad.", "To be a globally recognized agency thanks to our quality service.")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12" data-aos="fade-up" data-aos-delay="240">
                  <div className="tnn-tile d-flex gap-3">
                    <span className="tnn-ico">
                      <i className="fa-solid fa-handshake-angle" />
                    </span>
                    <div>
                      <h3 className="h6">{t("Nuestro compromiso es contigo", "Our commitment is to you")}</h3>
                      <p className="small tnn-muted mb-0">
                        {t("No saturamos el espacio de la canastilla: podrás admirar la grandeza de Teotihuacán placenteramente y con total comodidad.", "We never overcrowd the basket: you can admire the grandeur of Teotihuacan comfortably and at ease.")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
