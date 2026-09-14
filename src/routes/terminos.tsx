import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terminos")({
  component: Terminos,
  head: () => ({
    meta: [
      { title: "Términos y condiciones | Teotihuacán en las nubes" },
      { name: "description", content: "Condiciones de reservación, seguridad, cambios y cancelaciones para vuelos en globo." },
      { property: "og:title", content: "Términos y condiciones | Teotihuacán en las nubes" },
      { property: "og:description", content: "Información importante para reservar tu experiencia de vuelo." },
    ],
  }),
});

const terms = [
  ["Reservación y pago", "Tu lugar queda confirmado al cubrir el 50% del total. El saldo restante deberá liquidarse antes del vuelo según las indicaciones de tu asesor."],
  ["Condiciones meteorológicas", "La seguridad es prioridad. El vuelo puede reprogramarse cuando el piloto determine que el clima no permite una operación segura."],
  ["Cambios y cancelaciones", "Los cambios de fecha están sujetos a disponibilidad. Comunícate con anticipación para conocer las condiciones aplicables a tu reservación."],
  ["Puntualidad", "La hora de llegada es indispensable para coordinar el inflado y despegue. Una llegada tardía puede ocasionar la pérdida del vuelo."],
  ["Salud y seguridad", "Informa previamente sobre embarazo, cirugías recientes, problemas de movilidad o cualquier condición médica relevante."],
  ["Menores de edad", "Los menores deben viajar acompañados por un adulto responsable y cumplir las indicaciones de altura y seguridad del equipo operativo."],
];

function Terminos() {
  return <section className="tnn-section">
    <div className="container tnn-app" style={{ maxWidth: 860 }}>
      <div className="text-center mb-5" data-aos="fade-up">
        <p className="tnn-eyebrow">Información importante</p>
        <h1 className="display-5">Términos y condiciones</h1>
        <p className="tnn-muted">Lee esta información antes de reservar tu experiencia.</p>
      </div>
      <div className="accordion" id="termsAccordion">
        {terms.map(([title, text], i) => <div className="accordion-item" key={title} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
          <h2 className="accordion-header">
            <button className={`accordion-button ${i ? "collapsed" : ""}`} type="button" data-bs-toggle="collapse" data-bs-target={`#term-${i}`}>
              <i className="fa-solid fa-circle-check me-3" />{title}
            </button>
          </h2>
          <div id={`term-${i}`} className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`} data-bs-parent="#termsAccordion">
            <div className="accordion-body tnn-muted">{text}</div>
          </div>
        </div>)}
      </div>
      <p className="small tnn-muted mt-4 text-center">Estas condiciones son informativas. Tu asesor confirmará las condiciones vigentes al reservar.</p>
    </div>
  </section>;
}