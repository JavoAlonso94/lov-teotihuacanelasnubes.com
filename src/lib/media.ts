const img = (name: string) => `/images/${name}`;

export const media = {
  heroVideo: img("hero-tnn.mp4"),
  logo: img("logo-tnn.webp"),
  shared: img("vuelo-real-5.webp"),
  private: img("vuelo-real-1.webp"),
  pano: img("vuelo-real-3.webp"),
  family: img("vuelo-real-4.webp"),
  proposal: img("vuelo-real-8.webp"),
  celebration: img("vuelo-real-7.webp"),
  crew: img("vuelo-real-6.webp"),
  launchVideo: img("despegue.mp4"),
  sunriseVideo: img("amanecer.mp4"),
  toastClose: img("vuelo-real-1.webp"),
  toastBasket: img("vuelo-real-2.webp"),
  toastFlight: img("vuelo-real-3.webp"),
  toastPour: img("vuelo-real-4.webp"),
  toastGround: img("vuelo-real-5.webp"),
  toastFamily: img("vuelo-real-6.webp"),
  toastTravelers: img("vuelo-real-7.webp"),
};

export const flightImages: Record<string, string> = {
  compartido: img("vuelo-real-5.webp"),
  "todo-incluido": img("vuelo-real-6.webp"),
  privado: img("vuelo-real-1.webp"),
  familiar: img("vuelo-real-4.webp"),
  pedida: img("vuelo-real-8.webp"),
  celebracion: img("vuelo-real-7.webp"),
};

export const galleryImages = [
  { src: img("vuelo-real-3.webp"), alt: "Pareja saludando desde un globo aerostático en Teotihuacán" },
  { src: img("vuelo-real-1.webp"), alt: "Pareja disfrutando su experiencia dentro de la canastilla" },
  { src: img("vuelo-real-5.webp"), alt: "Grupo de viajeros volando en globo aerostático" },
  { src: img("vuelo-real-6.webp"), alt: "Viajeros celebrando durante un vuelo en globo" },
  { src: img("vuelo-real-8.webp"), alt: "Pareja celebrando frente a un globo aerostático" },
  { src: img("vuelo-real-2.webp"), alt: "Pareja antes de despegar en Teotihuacán" },
  { src: img("vuelo-real-4.webp"), alt: "Viajeros junto a globos de colores al amanecer" },
  { src: img("vuelo-real-7.webp"), alt: "Pareja después de su experiencia de vuelo" },
  { src: img("galeria-real-1.webp"), alt: "Familia celebrando frente a los globos aerostáticos" },
  { src: img("galeria-real-2.webp"), alt: "Grupo de amigos después de volar sobre Teotihuacán" },
  { src: img("galeria-real-3.webp"), alt: "Familia saludando desde la canastilla del globo" },
  { src: img("galeria-real-4.webp"), alt: "Familia reunida frente a un globo de colores" },
  { src: img("galeria-real-5.webp"), alt: "Viajeros saludando durante su vuelo en globo" },
  { src: img("galeria-real-6.webp"), alt: "Grupo de amigos divirtiéndose junto al globo" },
  { src: img("galeria-real-7.webp"), alt: "Familia disfrutando su experiencia entre globos" },
];
