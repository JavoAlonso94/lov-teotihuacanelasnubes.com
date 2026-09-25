import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
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
    const clientIp = (getRequestHeader("cf-connecting-ip") ?? getRequestIP({ xForwardedFor: true }) ?? "").slice(0, 64);
    const userAgent = (getRequestHeader("user-agent") ?? "").slice(0, 400);
    const siteUrl = process.env["SITE_URL"] ?? "https://teotihuacanenlasnubes.com";

    // Límite de intentos: máx. 5 por correo y 10 por IP en la última hora
    const since = new Date(Date.now() - 3_600_000).toISOString();
    const [{ count: byEmail }, { count: byIp }] = await Promise.all([
      supabaseAdmin.from("clip_orders").select("id", { count: "exact", head: true }).eq("customer_email", data.customerEmail).gte("created_at", since),
      clientIp
        ? supabaseAdmin.from("clip_orders").select("id", { count: "exact", head: true }).eq("client_ip", clientIp).gte("created_at", since)
        : Promise.resolve({ count: 0 }),
    ]);
    if ((byEmail ?? 0) >= 5 || (byIp ?? 0) >= 10) {
      throw new Error("Demasiados intentos de pago. Espera una hora o contáctanos.");
    }

    const { count: previousApproved } = await supabaseAdmin
      .from("clip_orders").select("id", { count: "exact", head: true })
      .eq("customer_email", data.customerEmail).eq("status", "approved");
    const { count: recentRejected } = await supabaseAdmin
      .from("clip_orders").select("id", { count: "exact", head: true })
      .eq("customer_email", data.customerEmail).in("status", ["rejected", "error"]).gte("created_at", since);
    const { data: existing } = await supabaseAdmin
      .from("clip_orders")
      .select("status, clip_payment_id")
      .eq("idempotency_key", data.idempotencyKey)
      .maybeSingle();

    if (existing?.status === "approved") {
      return { ok: true, paymentId: existing.clip_payment_id ?? "", status: "approved" };
    }
    if (existing) throw new Error("Este intento ya fue procesado. Inicia un pago nuevo.");

    let riskScore = 10;
    if (amount >= 9000) riskScore += 25;
    if (data.passengers >= 8) riskScore += 15;
    riskScore += Math.min((recentRejected ?? 0) * 20, 40);
    if ((previousApproved ?? 0) > 0) riskScore -= 10;
    riskScore = Math.max(1, Math.min(100, riskScore));
    const riskLevel = riskScore >= 60 ? "high" : riskScore >= 30 ? "med" : "low";
    const [firstName, ...rest] = data.customerName.split(/\s+/);
    const phoneDigits = data.customerPhone.replace(/\D/g, "").slice(-10);

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
      client_ip: clientIp || null,
      session_id: data.sessionId,
      risk_level: riskLevel,
      postal_code: data.postalCode,
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
          customer: {
            first_name: firstName,
            last_name: rest.join(" ") || firstName,
            email: data.customerEmail,
            phone: phoneDigits,
            address: { postal_code: data.postalCode, country: "México" },
          },
          prevention_data: {
            ...((previousApproved ?? 0) > 0 ? { customer_type: "returning_buyer" } : {}),
            customer_risk_score: riskScore,
            transaction_risk_level: riskLevel,
            session_id: data.sessionId,
            user_agent: userAgent,
            request_3ds: riskLevel !== "low",
          },
          metadata: {
            billing_address: { postal_code: data.postalCode, country: "México" },
            website: siteUrl,
          },
          ...(clientIp ? { location: { ip: clientIp } } : {}),
          webhook_url: `${siteUrl}/api/public/clip-webhook`,
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