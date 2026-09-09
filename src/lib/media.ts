import heroVideo from "@/assets/hero-tnn.mp4.asset.json";
import shared from "@/assets/tnn-shared.jpg.asset.json";
import privateFlight from "@/assets/tnn-private.jpg.asset.json";
import pano from "@/assets/tnn-pano.jpg.asset.json";
import family from "@/assets/tnn-family.jpg.asset.json";
import proposal from "@/assets/tnn-proposal.jpg.asset.json";
import celebration from "@/assets/tnn-celebration.jpg.asset.json";
import crew from "@/assets/tnn-crew.jpg.asset.json";
import logo from "@/assets/logo-tnn.png.asset.json";

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
};

export const flightImages: Record<string, string> = {
  compartido: media.shared,
  "todo-incluido": media.crew,
  privado: media.private,
  familiar: media.family,
  pedida: media.proposal,
  celebracion: media.celebration,
};

export const galleryImages = [
  { src: media.pano, alt: "Globos sobre el valle de Teotihuacán al amanecer" },
  { src: media.shared, alt: "Viajeros en canastilla compartida" },
  { src: media.private, alt: "Vuelo privado para parejas" },
  { src: media.family, alt: "Vuelo familiar en globo" },
  { src: media.proposal, alt: "Pedida de mano en globo aerostático" },
  { src: media.celebration, alt: "Celebración de cumpleaños en Teotihuacán" },
  { src: media.crew, alt: "Inflado del globo al amanecer" },
];
