import heroVideo from "@/assets/hero-tnn.mp4.asset.json";
import logo from "@/assets/logo-tnn.png.asset.json";
import launchVideo from "@/assets/despegue.mp4.asset.json";
import sunriseVideo from "@/assets/amanecer.mp4.asset.json";
import realFlight1 from "@/assets/vuelo-real-1.jpg.asset.json";
import realFlight2 from "@/assets/vuelo-real-2.jpg.asset.json";
import realFlight3 from "@/assets/vuelo-real-3.jpg.asset.json";
import realFlight4 from "@/assets/vuelo-real-4.jpg.asset.json";
import realFlight5 from "@/assets/vuelo-real-5.jpg.asset.json";
import realFlight6 from "@/assets/vuelo-real-6.jpg.asset.json";
import realFlight7 from "@/assets/vuelo-real-7.jpg.asset.json";
import realFlight8 from "@/assets/vuelo-real-8.jpg.asset.json";

export const media = {
  heroVideo: heroVideo.url,
  logo: logo.url,
  shared: realFlight5.url,
  private: realFlight1.url,
  pano: realFlight3.url,
  family: realFlight4.url,
  proposal: realFlight8.url,
  celebration: realFlight7.url,
  crew: realFlight6.url,
  launchVideo: launchVideo.url,
  sunriseVideo: sunriseVideo.url,
  toastClose: realFlight1.url,
  toastBasket: realFlight2.url,
  toastFlight: realFlight3.url,
  toastPour: realFlight4.url,
  toastGround: realFlight5.url,
  toastFamily: realFlight6.url,
  toastTravelers: realFlight7.url,
};

export const flightImages: Record<string, string> = {
  compartido: realFlight5.url,
  "todo-incluido": realFlight6.url,
  privado: realFlight1.url,
  familiar: realFlight4.url,
  pedida: realFlight8.url,
  celebracion: realFlight7.url,
};

export const galleryImages = [
  { src: realFlight3.url, alt: "Pareja saludando desde un globo aerostático en Teotihuacán" },
  { src: realFlight1.url, alt: "Pareja disfrutando su experiencia dentro de la canastilla" },
  { src: realFlight5.url, alt: "Grupo de viajeros volando en globo aerostático" },
  { src: realFlight6.url, alt: "Viajeros celebrando durante un vuelo en globo" },
  { src: realFlight8.url, alt: "Pareja celebrando frente a un globo aerostático" },
  { src: realFlight2.url, alt: "Pareja antes de despegar en Teotihuacán" },
  { src: realFlight4.url, alt: "Viajeros junto a globos de colores al amanecer" },
  { src: realFlight7.url, alt: "Pareja después de su experiencia de vuelo" },
];
