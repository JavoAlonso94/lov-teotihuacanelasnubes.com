import { createFileRoute } from "@tanstack/react-router";
import { media } from "@/lib/media";

export const Route = createFileRoute("/nosotros")({
  component: Nosotros,
  head: () => ({
    meta: [
      { title: "Nosotros | Teotihuacán en las nubes" },
      {
        name: "description",
        content:
          "Somos una agencia de vuelos en globo aerostático en Teotihuacán comprometida con la calidad, la calidez humana y tu seguridad.",
      },
      { property: "og:title", content: "Conoce Teotihuacán en las nubes" },
      {
        property: "og:description",
        content: "Calidad, calidez humana y experiencias 100% seguras en globo aerostático.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Nosotros() {
  return (
    <>
      <section className="tnn-section pb-0">
        <div className="container tnn-app text-center" data-aos="fade-up">
          <p className="tnn-eyebrow">Ahora conócenos</p>
          <h1 className="display-5">
            Vuela en <span className="tnn-grad-text">globo aerostático</span> con tu mejor compañía
          </h1>
        </div>
      </section>

      <section className="tnn-section">
        <div className="container tnn-app">
          <div className="row g-3 tnn-gallery mb-5">
            {[media.pano, media.shared, media.crew].map((src, i) => (
              <div className="col-12 col-md-4" key={src} data-aos="flip-up" data-aos-delay={i * 120}>
                <figure style={{ height: 260 }}>
                  <img src={src} alt="Carrete fotográfico de vuelos en globo" loading="lazy" />
                </figure>
              </div>
            ))}
          </div>

          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6" data-aos="fade-right">
              <h2 className="display-6">Teotihuacán en las nubes</h2>
              <p className="tnn-muted">
                Somos una agencia empeñada en ofrecerte una experiencia de altura. Nos motiva
                ofrecer a nuestros clientes un servicio de <b>calidad y calidez humana</b>. Nos
                esforzamos para que vivas una experiencia <b>100% segura</b> y digna de compartir
                con todos tus amigos y familiares. Nuestro principal objetivo es llevar a más
                personas a visitar el cielo y las nubes en Teotihuacán.
              </p>
              <p className="fw-bold tnn-grad-text fs-5">¡Seguro volarás seguro con nosotros!</p>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row g-3">
                <div className="col-12" data-aos="fade-up">
                  <div className="tnn-tile d-flex gap-3">
                    <span className="tnn-ico">
                      <i className="fa-solid fa-bullseye" />
                    </span>
                    <div>
                      <h3 className="h6">Misión</h3>
                      <p className="small tnn-muted mb-0">
                        Cumplir con las expectativas de nuestros clientes y ofrecer un servicio de
                        calidad asegurada.
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
                      <h3 className="h6">Visión</h3>
                      <p className="small tnn-muted mb-0">
                        Ser una agencia reconocida a nivel mundial gracias a nuestro servicio de
                        calidad.
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
                      <h3 className="h6">Nuestro compromiso es contigo</h3>
                      <p className="small tnn-muted mb-0">
                        No saturamos el espacio de la canastilla: podrás admirar la grandeza de
                        Teotihuacán placenteramente y con total comodidad.
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
