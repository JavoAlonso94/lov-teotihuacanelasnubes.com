import packagesData from "@/data/packages.json";
import Swal from "sweetalert2";

export const WHATSAPP_PRIMARY = "525523317774";
export const WHATSAPP_SECONDARY = "523321796983";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/teotihuacan_en_las_nubes?stkn=MWU4cnJsbTZpa3VqbQ%3D%3D&utm_source=qr",
  facebook: "https://www.facebook.com/share/1D8SnHorh9/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@teotihuacanenlasnubes?_r=1&_t=ZS-99u0RBw6zkj",
} as const;

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

export const getFlights = (lang: "es" | "en" = "es"): Flight[] =>
  packagesData.map((p) => {
    const en = p.en as { name: string; tagline: string; description: string; note: string; badge?: string };
    const badge = lang === "en" ? en.badge : "badge" in p ? p.badge : undefined;
    return {
      id: p.id,
      name: lang === "en" ? en.name : p.name,
      tagline: lang === "en" ? en.tagline : p.tagline,
      description: lang === "en" ? en.description : p.description,
      price: `${mxn.format(p.unitPrice)} MXN`.replace("MX$", "$"),
      note: lang === "en" ? en.note : p.note,
      icon: p.icon,
      ...(badge ? { badge } : {}),
    };
  });

export const flights: Flight[] = getFlights("es");

export const includes = [
  { icon: "fa-solid fa-fire-flame-curved", text: "Vuelo en globo de 45 a 60 min.", en: "45 to 60-minute balloon flight." },
  { icon: "fa-solid fa-mug-hot", text: "Coffee break.", en: "Coffee break." },
  { icon: "fa-solid fa-champagne-glasses", text: "Brindis con vino espumoso.", en: "Sparkling wine toast." },
  { icon: "fa-solid fa-certificate", text: "Certificado de vuelo.", en: "Flight certificate." },
  { icon: "fa-solid fa-utensils", text: "Desayuno buffet.", en: "Buffet breakfast." },
  { icon: "fa-solid fa-shield-heart", text: "Seguro de viajero.", en: "Travel insurance." },
];

export const extras = [
  { name: "Serenata en las nubes (mariachi al aterrizaje)", en: "Serenade in the clouds (mariachi at landing)", price: "$1,800.00 MXN", icon: "fa-solid fa-guitar" },
  { name: "Visita guiada por los senderos de Teotihuacán", en: "Guided tour of the Teotihuacan trails", price: "$1,200.00 MXN", icon: "fa-solid fa-map-location-dot" },
  { name: "Ramo de rosas", en: "Bouquet of roses", price: "$500.00 MXN", icon: "fa-solid fa-seedling" },
  { name: "Paquete fotográfico completo (fotos y video con dron)", en: "Full photo package (photos and drone video)", price: "$2,500.00 MXN", icon: "fa-solid fa-camera-retro" },
  { name: "Paquete fotográfico medio (fotos o video)", en: "Half photo package (photos or video)", price: "$2,000.00 MXN", icon: "fa-solid fa-image" },
];

export const safety = [
  {
    title: "Pilotos certificados",
    titleEn: "Certified pilots",
    textEn: "Our pilots hold commercial licenses for scenic flights.",
    text: "Nuestros pilotos cuentan con licencia comercial de vuelos panorámicos.",
    icon: "fa-solid fa-user-astronaut",
  },
  {
    title: "Globos matriculados",
    titleEn: "Registered balloons",
    textEn: "Aircraft in perfect condition with registrations and permits issued by AFAC.",
    text: "Aeronaves en perfecto estado con registros y permisos expedidos por la AFAC.",
    icon: "fa-solid fa-id-card",
  },
  {
    title: "Seguro de viajero",
    titleEn: "Travel insurance",
    textEn: "All our flights include insurance throughout the experience.",
    text: "Todos nuestros vuelos cuentan con seguro durante toda la experiencia.",
    icon: "fa-solid fa-shield-halved",
  },
];
