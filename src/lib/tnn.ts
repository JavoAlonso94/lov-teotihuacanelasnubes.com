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

export const flights: Flight[] = [
  {
    id: "compartido",
    name: "Vuelo Compartido",
    tagline: "Nuestro vuelo más popular entre nuestros viajeros.",
    description:
      "Conoce y disfruta el valle de Teotihuacán desde las alturas compartiendo canastilla con más viajeros como tú. Haz amigos en las nubes y viaja seguro con nosotros.",
    price: "$2,400.00 MXN",
    note: "por persona",
    icon: "fa-solid fa-users",
    badge: "Más popular",
  },
  {
    id: "todo-incluido",
    name: "Vuelo Todo Incluido",
    tagline: "Nosotros nos hacemos cargo de todo.",
    description:
      "Incluye transporte redondo desde CDMX (compartido) y entradas a la zona arqueológica. No te preocupes por nada, pasarás un amanecer inolvidable en las nubes.",
    price: "$3,200.00 MXN",
    note: "por persona",
    icon: "fa-solid fa-van-shuttle",
  },
  {
    id: "privado",
    name: "Vuelo Privado",
    tagline: "Nuestro vuelo especial para parejas.",
    description:
      "Un viaje en globo único admirando la belleza de Teotihuacán con panorama de 360° de todo el valle, en una canastilla exclusiva para su comodidad.",
    price: "$9,500.00 MXN",
    note: "por pareja",
    icon: "fa-solid fa-heart",
  },
  {
    id: "familiar",
    name: "Vuelo Privado Familiar",
    tagline: "Pasa un amanecer de ensueño en Teotihuacán.",
    description:
      "Junta a tu familia, amigos o compañeros de trabajo y vuelen en un globo exclusivo para ustedes (a partir de 4 personas).",
    price: "$3,200.00 MXN",
    note: "por persona",
    icon: "fa-solid fa-people-roof",
  },
  {
    id: "pedida",
    name: "Vuelo Pedida de Mano",
    tagline: "¿Estás listo para dar el siguiente paso?",
    description:
      "Vayan juntos al cielo de los dioses en un vuelo exclusivo. Incluye ramo de rosas y lona con el mensaje «¿Te quieres casar conmigo?». Seguro dirá ¡sí, acepto!",
    price: "$10,800.00 MXN",
    note: "por pareja",
    icon: "fa-solid fa-ring",
  },
  {
    id: "celebracion",
    name: "Vuelo Celebración",
    tagline: "Porque la vida pasa volando, celebra en globo.",
    description:
      "Festeja un año más de vida o sorprende a esa persona especial. Incluye pastel sorpresa y lona con el mensaje «¡Feliz Cumpleaños!» o «Feliz Aniversario».",
    price: "$2,550.00 MXN",
    note: "por persona",
    icon: "fa-solid fa-cake-candles",
  },
];

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
