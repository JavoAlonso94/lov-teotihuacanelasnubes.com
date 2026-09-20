import { createServerFn } from "@tanstack/react-start";
import { checkoutSchema, calculateTotal, validatePackage } from "@/lib/checkout";

type ClipResult = {
  id?: string;
  status?: string;
  status_detail?: string;
  error?: { message?: string };
  message?: string;
};

export const processClipPayment = createServerFn({ method: "POST" })
  .inputValidator((input) => checkoutSchema.parse(input))
  .handler(async ({ data }) => {
    const flightDate = new Date(`${data.flightDate}T12:00:00Z`);
    const tomorrow = new Date();
    tomorrow.setUTCHours(0, 0, 0, 0);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    if (flightDate < tomorrow) throw new Error("Selecciona una fecha futura para tu vuelo.");

    const rule = validatePackage(data.packageId, data.passengers);
    const amount = calculateTotal(data.packageId, data.passengers);
    const apiSecret = process.env["CLIP_API_SECRET"];
    if (!apiSecret) throw new Error("El pago no está disponible por el momento.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing } = await supabaseAdmin
      .from("clip_orders")
      .select("status, clip_payment_id")
      .eq("idempotency_key", data.idempotencyKey)
      .maybeSingle();

    if (existing?.status === "approved") {
      return { ok: true, paymentId: existing.clip_payment_id ?? "", status: "approved" };
    }
    if (existing) throw new Error("Este intento ya fue procesado. Inicia un pago nuevo.");

    const { error: insertError } = await supabaseAdmin.from("clip_orders").insert({
      idempotency_key: data.idempotencyKey,
      package_id: data.packageId,
      flight_date: data.flightDate,
      passengers: data.passengers,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone,
      amount,
      currency: "MXN",
      status: "pending",
    });
    if (insertError) throw new Error("No pudimos preparar la compra. Intenta nuevamente.");

    let response: Response;
    try {
      response = await fetch("https://api.payclip.com/payments", {
        method: "POST",
        headers: {
          Authorization: `Basic ${apiSecret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "MXN",
          description: `${rule.name} - ${data.passengers} pasajero${data.passengers === 1 ? "" : "s"}`,
          payment_method: { token: data.cardToken },
          customer: { email: data.customerEmail, phone: data.customerPhone },
          external_reference: data.idempotencyKey,
          capture_method: "automatic",
        }),
      });
    } catch {
      await supabaseAdmin.from("clip_orders").update({ status: "error" }).eq("idempotency_key", data.idempotencyKey);
      throw new Error("No fue posible conectar con Clip. No se realizó ningún cargo.");
    }

    const raw = (await response.json().catch(() => ({}))) as ClipResult;
    const normalizedStatus = String(raw.status ?? "").toLowerCase();
    const approved = response.ok && ["approved", "completed", "paid"].includes(normalizedStatus);
    const pending = response.ok && ["pending", "processing", "in_process"].includes(normalizedStatus);
    const status = approved ? "approved" : pending ? "pending" : "rejected";

    await supabaseAdmin
      .from("clip_orders")
      .update({
        status,
        clip_payment_id: raw.id ?? null,
        clip_status: raw.status ?? raw.status_detail ?? null,
        provider_response: { id: raw.id, status: raw.status, status_detail: raw.status_detail },
      })
      .eq("idempotency_key", data.idempotencyKey);

    if (!response.ok || status === "rejected") {
      return { ok: false, status: "rejected", message: "Clip rechazó el pago. Revisa los datos de tu tarjeta o intenta con otra." };
    }
    return { ok: true, status, paymentId: raw.id ?? "" };
  });