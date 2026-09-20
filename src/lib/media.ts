import heroVideo from "@/assets/hero-tnn.mp4.asset.json";
import shared from "@/assets/tnn-shared.jpg.asset.json";
import privateFlight from "@/assets/tnn-private.jpg.asset.json";
import pano from "@/assets/tnn-pano.jpg.asset.json";
import family from "@/assets/tnn-family.jpg.asset.json";
import proposal from "@/assets/tnn-proposal.jpg.asset.json";
import celebration from "@/assets/tnn-celebration.jpg.asset.json";
import crew from "@/assets/tnn-crew.jpg.asset.json";
import logo from "@/assets/logo-tnn.png.asset.json";
import launchVideo from "@/assets/despegue.mp4.asset.json";
import sunriseVideo from "@/assets/amanecer.mp4.asset.json";
import packageShared from "@/assets/paquete-4.png.asset.json";
import packageAllInclusive from "@/assets/paquete-9.png.asset.json";
import packagePrivate from "@/assets/paquete-8.png.asset.json";
import packageFamily from "@/assets/paquete-6.png.asset.json";
import packageProposal from "@/assets/paquete-7.png.asset.json";
import packageCelebration from "@/assets/paquete-3.png.asset.json";
import experience11 from "@/assets/experiencia-vuelo-11.png.asset.json";
import experience12 from "@/assets/experiencia-vuelo-12.png.asset.json";
import experience13 from "@/assets/experiencia-vuelo-13.png.asset.json";
import experience14 from "@/assets/experiencia-vuelo-14.png.asset.json";
import experience15 from "@/assets/experiencia-vuelo-15.png.asset.json";
import experience16 from "@/assets/experiencia-vuelo-16.png.asset.json";
import experience17 from "@/assets/experiencia-vuelo-17.png.asset.json";

export const media = {
  heroVideo: heroVideo.url,
  logo: logo.url,
  shared: shared.url,
  private: privateFlight.url,
  pano: pano.url,
  family: family.url,
  proposal: proposal.url,
  celebration: celebration.url,
  crew: crew.url,
  launchVideo: launchVideo.url,
  sunriseVideo: sunriseVideo.url,
  toastClose: experience11.url,
  toastBasket: experience12.url,
  toastFlight: experience13.url,
  toastPour: experience14.url,
  toastGround: experience15.url,
  toastFamily: experience16.url,
  toastTravelers: experience17.url,
};

export const flightImages: Record<string, string> = {
  compartido: packageShared.url,
  "todo-incluido": packageAllInclusive.url,
  privado: packagePrivate.url,
  familiar: packageFamily.url,
  pedida: packageProposal.url,
  celebracion: packageCelebration.url,
};

export const galleryImages = [
  { src: media.toastFlight, alt: "Pasajeros brindando durante el vuelo sobre Teotihuacán" },
  { src: media.toastClose, alt: "Brindis de celebración después del vuelo" },
  { src: media.toastBasket, alt: "Viajeros brindando dentro de la canastilla" },
  { src: media.toastPour, alt: "Brindis con vino espumoso incluido en la experiencia" },
  { src: media.toastGround, alt: "Grupo celebrando junto al globo aerostático" },
  { src: media.toastFamily, alt: "Familia celebrando su vuelo en globo" },
  { src: media.toastTravelers, alt: "Viajeros disfrutando el brindis en Teotihuacán" },
  { src: media.pano, alt: "Globos sobre el valle de Teotihuacán al amanecer" },
  { src: media.shared, alt: "Viajeros en canastilla compartida" },
  { src: media.private, alt: "Vuelo privado para parejas" },
  { src: media.family, alt: "Vuelo familiar en globo" },
  { src: media.proposal, alt: "Pedida de mano en globo aerostático" },
  { src: media.celebration, alt: "Celebración de cumpleaños en Teotihuacán" },
  { src: media.crew, alt: "Inflado del globo al amanecer" },
];
