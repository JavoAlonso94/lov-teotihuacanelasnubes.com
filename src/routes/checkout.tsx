import { createFileRoute } from "@tanstack/react-router";
import { ClipCheckout } from "@/components/ClipCheckout";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [
    { title: "Pago seguro | Teotihuacán en las nubes" },
    { name: "description", content: "Reserva y paga tu experiencia de vuelo en globo de forma segura con Clip." },
    { property: "og:title", content: "Pago seguro | Teotihuacán en las nubes" },
    { property: "og:description", content: "Elige tu fecha, pasajeros y paga tu vuelo completo de forma segura." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
});

function Checkout() {
  return <section className="tnn-section tnn-checkout-page">
    <div className="container tnn-app">
      <div className="text-center mb-4 mb-lg-5" data-aos="fade-up">
        <p className="tnn-eyebrow">Reservación en línea</p>
        <h1 className="display-5">Compra tu vuelo</h1>
        <p className="tnn-muted">Una experiencia por compra, pago completo y protección de Clip.</p>
      </div>
      <ClipCheckout />
    </div>
  </section>;
}