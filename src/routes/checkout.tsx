import { ctxLang, seo, useT } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { ClipCheckout } from "@/components/ClipCheckout";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: ({ match }) => seo(ctxLang(match), "/checkout", {
    es: { title: "Compra tu vuelo en globo en Teotihuacán | Pago seguro", description: "Reserva y paga tu vuelo en globo en Teotihuacán en línea de forma segura con Clip, en pesos mexicanos." },
    en: { title: "Book Your Teotihuacan Balloon Ride | Secure Payment", description: "Book and pay for your Teotihuacan hot air balloon ride online, securely with Clip, in Mexican pesos (MXN)." },
  }),
});

function Checkout() {
  const t = useT();
  return <section className="tnn-section tnn-checkout-page">
    <div className="container tnn-app">
      <div className="text-center mb-4 mb-lg-5" data-aos="fade-up">
        <p className="tnn-eyebrow">{t("Reservación en línea", "Online booking")}</p>
        <h1 className="display-5">{t("Compra tu vuelo", "Book your flight")}</h1>
        <p className="tnn-muted">{t("Una experiencia por compra, pago completo y protección de Clip.", "One experience per purchase, full payment in MXN, protected by Clip.")}</p>
      </div>
      <ClipCheckout />
    </div>
  </section>;
}