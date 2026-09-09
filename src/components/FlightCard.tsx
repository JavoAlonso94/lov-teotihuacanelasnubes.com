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
        <div className="tnn-card__media">
          <img src={image} alt={flight.name} loading="lazy" />
          {flight.badge && <span className="tnn-badge">{flight.badge}</span>}
        </div>
        <div className="p-4 d-flex flex-column flex-grow-1">
          <div className="d-flex align-items-center gap-3 mb-2">
            <span className="tnn-ico sun" style={{ width: 44, height: 44, fontSize: "1.05rem" }}>
              <i className={flight.icon} />
            </span>
            <h3 className="h5 mb-0">{flight.name}</h3>
          </div>
          <p className="tnn-muted small mb-2">{flight.tagline}</p>
          <p className="mb-3 small">{flight.description}</p>
          <div className="mt-auto d-flex align-items-center justify-content-between gap-2">
            <div>
              <div className="tnn-price">{flight.price}</div>
              <div className="small tnn-muted">{flight.note}</div>
            </div>
            <button className="btn btn-sky btn-sm" onClick={() => reservar(flight)}>
              Reservar
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
