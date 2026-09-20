import { z } from "zod";

export const packageRules = {
  compartido: { name: "Vuelo Compartido", unitPrice: 2400, min: 1, max: 12, fixed: false },
  "todo-incluido": { name: "Vuelo Todo Incluido", unitPrice: 3200, min: 1, max: 12, fixed: false },
  privado: { name: "Vuelo Privado", unitPrice: 9500, min: 2, max: 2, fixed: true },
  familiar: { name: "Vuelo Privado Familiar", unitPrice: 3200, min: 4, max: 12, fixed: false },
  pedida: { name: "Vuelo Pedida de Mano", unitPrice: 10800, min: 2, max: 2, fixed: true },
  celebracion: { name: "Vuelo Celebración", unitPrice: 2550, min: 1, max: 12, fixed: false },
} as const;

export type PackageId = keyof typeof packageRules;

export const checkoutSchema = z.object({
  packageId: z.enum(["compartido", "todo-incluido", "privado", "familiar", "pedida", "celebracion"]),
  flightDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  passengers: z.number().int().min(1).max(20),
  customerName: z.string().trim().min(2).max(100),
  customerEmail: z.string().trim().email().max(255),
  customerPhone: z.string().trim().regex(/^\+?[0-9 ]{10,18}$/),
  cardToken: z.string().trim().min(10).max(500),
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
  if (passengers < rule.min || passengers > rule.max) {
    throw new Error(`Este paquete admite de ${rule.min} a ${rule.max} pasajeros.`);
  }
  return rule;
}