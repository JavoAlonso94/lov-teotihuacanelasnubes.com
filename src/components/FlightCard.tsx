import { tnnSwal, waLink, type Flight } from "@/lib/tnn";

export function reservar(flight: Flight) {
  tnnSwal
    .fire({
      title: flight.name,
      html: `
        <p class="mb-2">${flight.description}</p>
        <p class="tnn-price mb-0">${flight.price}<span class="small tnn-muted"> ${flight.note ?? ""}</span></p>
        <p class="small tnn-muted mt-2 mb-0">Reserva con el 50% y asegura tu lugar.</p>`,
      icon: "info",
      iconColor: "#29abe2",
      showCancelButton: true,
      confirmButtonText: '<i class="fa-brands fa-whatsapp"></i> Reservar ahora',
      cancelButtonText: "Seguir viendo",
    })
    .then((r) => {
      if (r.isConfirmed) {
        window.open(
          waLink(`¡Hola! Me interesa el ${flight.name} (${flight.price}). ¿Hay disponibilidad?`),
          "_blank",
        );
      }
    });
}

export function FlightCard({ flight, image, delay = 0 }: { flight: Flight; image: string; delay?: number }) {
  return (
    <div className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={delay}>
      <article className="tnn-card d-flex flex-column">
        <div className={`tnn-card__media tnn-card__media--${flight.id}`}>
          <img src={image} alt={`Experiencia ${flight.name} en Teotihuacán`} loading="lazy" />
          {flight.badge && <span className="tnn-badge">{flight.badge}</span>}
          <span className="tnn-card__image-icon" aria-hidden="true">
            <i className={flight.icon} />
          </span>
        </div>
        <div className="tnn-card__body d-flex flex-column flex-grow-1">
          <div className="tnn-card__heading">
            <div>
              <h3 className="h5 mb-1">{flight.name}</h3>
              <p className="tnn-muted small mb-0">{flight.tagline}</p>
            </div>
            <div className="tnn-card__price text-end">
              <span>Desde</span>
              <div className="tnn-price">{flight.price}</div>
              <small className="tnn-muted">{flight.note}</small>
            </div>
          </div>
          <p className="tnn-card__description">{flight.description}</p>
          <button className="btn btn-sky w-100 mt-auto" onClick={() => reservar(flight)}>
            Reservar ahora
            <i className="fa-solid fa-arrow-right ms-2" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  );
}
