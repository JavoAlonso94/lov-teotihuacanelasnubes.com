import { createFileRoute } from "@tanstack/react-router";
import { FormEvent } from "react";
import { media } from "@/lib/media";
import { tnnSwal, waLink, WHATSAPP_PRIMARY, WHATSAPP_SECONDARY } from "@/lib/tnn";

export const Route = createFileRoute("/contacto")({
  component: Contacto,
  head: () => ({ meta: [
    { title: "Contacto y reservaciones | Teotihuacán en las nubes" },
    { name: "description", content: "Consulta disponibilidad y reserva tu vuelo en globo sobre Teotihuacán por WhatsApp." },
    { property: "og:title", content: "Reserva tu vuelo | Teotihuacán en las nubes" },
    { property: "og:description", content: "Nuestros asesores te ayudarán a elegir la experiencia ideal." },
  ]}),
});

function Contacto() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const flight = String(data.get("flight") || "un vuelo");
    tnnSwal.fire({ title: "¡Estamos listos para ayudarte!", text: "Abriremos WhatsApp con tu consulta preparada.", icon: "success", confirmButtonText: "Continuar" }).then((r) => {
      if (r.isConfirmed) window.open(waLink(`Hola, soy ${name}. Quiero consultar disponibilidad para ${flight}.`), "_blank");
    });
  };
  return <>
    <section className="tnn-section pb-0">
      <div className="container tnn-app text-center" data-aos="fade-up">
        <p className="tnn-eyebrow">Ponte en contacto</p><h1 className="display-5">Tu aventura comienza aquí</h1>
        <p className="tnn-muted">Nuestros asesores resolverán tus dudas y te ayudarán a elegir la mejor opción.</p>
      </div>
    </section>
    <section className="tnn-section">
      <div className="container tnn-app"><div className="row g-4 align-items-stretch">
        <div className="col-12 col-lg-6" data-aos="fade-right">
          <div className="tnn-card h-100"><img src={media.pano} alt="Globos sobre Teotihuacán" className="w-100 h-100" style={{ objectFit: "cover", minHeight: 400 }} /></div>
        </div>
        <div className="col-12 col-lg-6" data-aos="fade-left">
          <form className="tnn-glass p-4 p-lg-5 h-100" onSubmit={submit}>
            <div className="mb-3"><label className="form-label" htmlFor="name">Tu nombre</label><input className="form-control" id="name" name="name" required /></div>
            <div className="mb-3"><label className="form-label" htmlFor="flight">Experiencia</label><select className="form-select" id="flight" name="flight"><option>Vuelo Compartido</option><option>Vuelo Todo Incluido</option><option>Vuelo Privado</option><option>Vuelo Familiar</option><option>Pedida de Mano</option><option>Celebración</option></select></div>
            <div className="mb-4"><label className="form-label" htmlFor="message">Mensaje</label><textarea className="form-control" id="message" name="message" rows={4} /></div>
            <button className="btn btn-tnn w-100" type="submit"><i className="fa-brands fa-whatsapp me-2" />Consultar disponibilidad</button>
            <div className="text-center small tnn-muted mt-4"><div>+52 {WHATSAPP_PRIMARY.slice(2)}</div><div>+52 {WHATSAPP_SECONDARY.slice(2)}</div></div>
          </form>
        </div>
      </div></div>
    </section>
  </>;
}