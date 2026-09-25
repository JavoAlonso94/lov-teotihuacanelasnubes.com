import { z } from "zod";
import packagesData from "@/data/packages.json";

export type PackageRule = { name: string; unitPrice: number; min: number; max: number; fixed: boolean };

export type PackageId = "compartido" | "todo-incluido" | "privado" | "familiar" | "pedida" | "celebracion";

export const packageRules = Object.fromEntries(
  packagesData.map((p) => [
    p.id,
    { name: p.name, unitPrice: p.unitPrice, min: p.minPassengers, max: p.maxPassengers, fixed: p.fixedPrice },
  ]),
) as Record<PackageId, PackageRule>;

const packageIds = packagesData.map((p) => p.id) as [PackageId, ...PackageId[]];

export const checkoutSchema = z.object({
  packageId: z.enum(packageIds),
  flightDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  passengers: z.number().int().min(1).max(20),
  customerName: z.string().trim().min(2).max(100).regex(/^[\p{L} .'-]+$/u, "Nombre inválido"),
  customerEmail: z.string().trim().email().max(255),
  customerPhone: z.string().trim().regex(/^\+?[0-9 ]{10,18}$/),
  postalCode: z.string().trim().regex(/^\d{5}$/, "Código postal de 5 dígitos"),
  cardToken: z.string().trim().min(10).max(500),
  sessionId: z.string().uuid(),
  idempotencyKey: z.string().uuid(),
  acceptedTerms: z.literal(true),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export function calculateTotal(packageId: PackageId, passengers: number) {
  const rule = packageRules[packageId];
  return rule.fixed ? rule.unitPrice : rule.unitPrice * passengers;
}

export function validatePackage(packageId: PackageId, passengers: number) {
  const rule = packageRules[packageId];
  if (!rule) throw new Error("Paquete no disponible.");
  if (passengers < rule.min || passengers > rule.max) {
    throw new Error(`Este paquete admite de ${rule.min} a ${rule.max} pasajeros.`);
  }
  return rule;
}
