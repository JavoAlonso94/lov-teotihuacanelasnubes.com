import { Link, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { calculateTotal, packageRules, type PackageId } from "@/lib/checkout";
import { processClipPayment } from "@/lib/checkout.functions";
import { flightImages } from "@/lib/media";
import { tnnSwal } from "@/lib/tnn";

type ClipCard = {
  mount: (id: string) => void;
  setAmount: (amount: number) => void;
  cardToken: () => Promise<{ id: string }>;
};
type ClipConstructor = new (key: string, config: { env: "stage" }) => {
  element: { create: (type: "Card", config: { locale: "es"; paymentAmount: number }) => ClipCard };
};
declare global { interface Window { ClipSDK?: ClipConstructor } }

const publicKey = "test_51906bf2-0747-49bf-876b-35246d9bb19c";
const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

export function ClipCheckout() {
  const search = useSearch({ strict: false }) as { package?: string };
  const initial = search.package && search.package in packageRules ? search.package as PackageId : "compartido";
  const [packageId, setPackageId] = useState<PackageId>(initial);
  const [passengers, setPassengers] = useState(packageRules[initial].min);
  const [sdkReady, setSdkReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const card = useRef<ClipCard | null>(null);
  const pay = useServerFn(processClipPayment);
  const rule = packageRules[packageId];
  const total = useMemo(() => calculateTotal(packageId, passengers), [packageId, passengers]);

  useEffect(() => {
    const mountCard = () => {
      if (!window.ClipSDK || card.current) return;
      const sdk = new window.ClipSDK(publicKey, { env: "stage" });
      card.current = sdk.element.create("Card", { locale: "es", paymentAmount: total });
      card.current.mount("clip-card");
      setSdkReady(true);
    };
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://sdk.clip.mx/js/clip-sdk.js"]');
    if (window.ClipSDK) mountCard();
    else if (existing) existing.addEventListener("load", mountCard, { once: true });
    else {
      const script = document.createElement("script");
      script.src = "https://sdk.clip.mx/js/clip-sdk.js";
      script.async = true;
      script.onload = mountCard;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => { card.current?.setAmount(total); }, [total]);

  const selectPackage = (value: PackageId) => {
    setPackageId(value);
    setPassengers(packageRules[value].min);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!card.current || processing) return;
    const data = new FormData(event.currentTarget);
    setProcessing(true);
    try {
      const token = await card.current.cardToken();
      const result = await pay({ data: {
        packageId,
        flightDate: String(data.get("flightDate") ?? ""),
        passengers,
        customerName: String(data.get("customerName") ?? ""),
        customerEmail: String(data.get("customerEmail") ?? ""),
        customerPhone: String(data.get("customerPhone") ?? ""),
        acceptedTerms: data.get("terms") === "on" as true,
        cardToken: token.id,
        idempotencyKey: crypto.randomUUID(),
      } });
      if (!result.ok) throw new Error(result.message);
      await tnnSwal.fire({
        icon: result.status === "approved" ? "success" : "info",
        title: result.status === "approved" ? "¡Pago aprobado!" : "Pago en proceso",
        text: result.status === "approved" ? "Tu vuelo quedó pagado. Te contactaremos para confirmar el horario." : "Clip está procesando tu pago. Te contactaremos al confirmarse.",
        confirmButtonText: "Entendido",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Revisa los datos e intenta nuevamente.";
      await tnnSwal.fire({ icon: "error", title: "No pudimos completar el pago", text: message, confirmButtonText: "Revisar datos" });
    } finally { setProcessing(false); }
  };

  const minDate = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
  return (
    <form className="tnn-checkout" onSubmit={submit}>
      <div className="tnn-checkout__details">
        <p className="tnn-eyebrow">Tu experiencia</p>
        <h2 className="h3 mb-4">Datos de reservación</h2>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label" htmlFor="packageId">Paquete</label>
            <select className="form-select" id="packageId" value={packageId} onChange={(e) => selectPackage(e.target.value as PackageId)}>
              {Object.entries(packageRules).map(([id, item]) => <option key={id} value={id}>{item.name}</option>)}
            </select>
          </div>
          <div className="col-12 col-sm-6">
            <label className="form-label" htmlFor="flightDate">Fecha de vuelo</label>
            <input className="form-control" id="flightDate" name="flightDate" type="date" min={minDate} required />
          </div>
          <div className="col-12 col-sm-6">
            <label className="form-label" htmlFor="passengers">Pasajeros</label>
            <input className="form-control" id="passengers" name="passengers" type="number" min={rule.min} max={rule.max} value={passengers} disabled={rule.fixed} onChange={(e) => setPassengers(Number(e.target.value))} required />
            <div className="form-text tnn-muted">{rule.fixed ? "Paquete para 2 personas" : `De ${rule.min} a ${rule.max} personas`}</div>
          </div>
          <div className="col-12"><label className="form-label" htmlFor="customerName">Nombre completo</label><input className="form-control" id="customerName" name="customerName" minLength={2} maxLength={100} autoComplete="name" required /></div>
          <div className="col-12 col-sm-6"><label className="form-label" htmlFor="customerEmail">Correo</label><input className="form-control" id="customerEmail" name="customerEmail" type="email" maxLength={255} autoComplete="email" required /></div>
          <div className="col-12 col-sm-6"><label className="form-label" htmlFor="customerPhone">Teléfono</label><input className="form-control" id="customerPhone" name="customerPhone" type="tel" pattern="[+0-9 ]{10,18}" autoComplete="tel" required /></div>
        </div>
      </div>
      <aside className="tnn-checkout__summary">
        <img src={flightImages[packageId]} alt={rule.name} />
        <div className="p-4">
          <span className="tnn-checkout__secure"><i className="fa-solid fa-lock" /> Pago seguro con Clip</span>
          <h2 className="h4 mt-3">{rule.name}</h2>
          <div className="d-flex justify-content-between align-items-end border-bottom py-3"><span className="tnn-muted">Total a pagar</span><strong className="tnn-price">{money.format(total)}</strong></div>
          <p className="small tnn-muted mt-3">Se cobrará el 100% de la experiencia. Los datos de tu tarjeta se capturan directamente en Clip.</p>
          <div id="clip-card" className="tnn-clip-frame" aria-label="Datos de tarjeta" />
          {!sdkReady && <div className="small tnn-muted py-3"><span className="spinner-border spinner-border-sm me-2" />Cargando pago seguro…</div>}
          <div className="form-check mt-3">
            <input className="form-check-input" type="checkbox" id="terms" name="terms" required />
            <label className="form-check-label small" htmlFor="terms">Acepto los <Link to="/terminos">términos y condiciones</Link>.</label>
          </div>
          <button className="btn btn-tnn btn-lg w-100 mt-4" type="submit" disabled={!sdkReady || processing}>
            {processing ? <><span className="spinner-border spinner-border-sm me-2" />Procesando…</> : <><i className="fa-solid fa-lock me-2" />Pagar {money.format(total)}</>}
          </button>
        </div>
      </aside>
    </form>
  );
}