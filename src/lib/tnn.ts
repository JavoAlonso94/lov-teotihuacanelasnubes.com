import packagesData from "@/data/packages.json";
import Swal from "sweetalert2";

export const WHATSAPP_PRIMARY = "525523317774";
export const WHATSAPP_SECONDARY = "523321796983";

export const waLink = (msg: string, phone = WHATSAPP_PRIMARY) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

export const tnnSwal = Swal.mixin({
  customClass: {
    popup: "tnn-swal",
    confirmButton: "btn btn-tnn mx-2",
    cancelButton: "btn btn-outline-tnn mx-2",
  },
  buttonsStyling: false,
  showClass: { popup: "animate__animated animate__zoomIn animate__faster" },
  hideClass: { popup: "animate__animated animate__fadeOut animate__faster" },
});

export type Flight = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  note?: string;
  icon: string;
  badge?: string;
  image?: string;
};

const mxn = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

export const flights: Flight[] = packagesData.map((p) => ({
  id: p.id,
  name: p.name,
  tagline: p.tagline,
  description: p.description,
  price: `${mxn.format(p.unitPrice)} MXN`.replace("MX$", "$"),
  note: p.note,
  icon: p.icon,
  ...("badge" in p && p.badge ? { badge: p.badge } : {}),
}));

export const includes = [
  { icon: "fa-solid fa-fire-flame-curved", text: "Vuelo en globo de 45 a 60 min." },
  { icon: "fa-solid fa-mug-hot", text: "Coffee break." },
  { icon: "fa-solid fa-champagne-glasses", text: "Brindis con vino espumoso." },
  { icon: "fa-solid fa-certificate", text: "Certificado de vuelo." },
  { icon: "fa-solid fa-utensils", text: "Desayuno buffet." },
  { icon: "fa-solid fa-shield-heart", text: "Seguro de viajero." },
];

export const extras = [
  { name: "Serenata en las nubes (mariachi al aterrizaje)", price: "$1,800.00 MXN", icon: "fa-solid fa-guitar" },
  { name: "Visita guiada por los senderos de Teotihuacán", price: "$1,200.00 MXN", icon: "fa-solid fa-map-location-dot" },
  { name: "Ramo de rosas", price: "$500.00 MXN", icon: "fa-solid fa-seedling" },
  { name: "Paquete fotográfico completo (fotos y video con dron)", price: "$2,500.00 MXN", icon: "fa-solid fa-camera-retro" },
  { name: "Paquete fotográfico medio (fotos o video)", price: "$2,000.00 MXN", icon: "fa-solid fa-image" },
];

export const safety = [
  {
    title: "Pilotos certificados",
    text: "Nuestros pilotos cuentan con licencia comercial de vuelos panorámicos.",
    icon: "fa-solid fa-user-astronaut",
  },
  {
    title: "Globos matriculados",
    text: "Aeronaves en perfecto estado con registros y permisos expedidos por la AFAC.",
    icon: "fa-solid fa-id-card",
  },
  {
    title: "Seguro de viajero",
    text: "Todos nuestros vuelos cuentan con seguro durante toda la experiencia.",
    icon: "fa-solid fa-shield-halved",
  },
];
