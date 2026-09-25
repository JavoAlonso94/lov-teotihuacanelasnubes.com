import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const payloadSchema = z
  .object({ id: z.string().max(200).optional(), payment_id: z.string().max(200).optional() })
  .passthrough();

// Clip notifica cambios de estado. Nunca confiamos en el cuerpo:
// consultamos el pago directamente a Clip con la clave secreta.
export const Route = createFileRoute("/api/public/clip-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = payloadSchema.safeParse(await request.json().catch(() => null));
        const paymentId = parsed.success ? parsed.data.payment_id ?? parsed.data.id : undefined;
        if (!paymentId || !/^[\w-]+$/.test(paymentId)) return new Response("bad request", { status: 400 });

        const secret = process.env["CLIP_API_SECRET"];
        if (!secret) return new Response("unavailable", { status: 503 });

        const res = await fetch(`https://api.payclip.com/payments/${encodeURIComponent(paymentId)}`, {
          headers: { Authorization: `Basic ${secret}` },
        });
        if (!res.ok) return new Response("not found", { status: 404 });
        const payment = (await res.json()) as { id?: string; status?: string; external_reference?: string };

        const s = String(payment.status ?? "").toLowerCase();
        const status = ["approved", "completed", "paid"].includes(s)
          ? "approved"
          : ["pending", "processing", "in_process"].includes(s)
            ? "pending"
            : ["refunded"].includes(s)
              ? "refunded"
              : ["cancelled", "canceled"].includes(s)
                ? "cancelled"
                : "rejected";

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const query = supabaseAdmin.from("clip_orders").update({ status, clip_status: payment.status ?? null, clip_payment_id: payment.id ?? paymentId });
        if (payment.external_reference) await query.eq("idempotency_key", payment.external_reference);
        else await query.eq("clip_payment_id", paymentId);

        return new Response("ok");
      },
    },
  },
});
