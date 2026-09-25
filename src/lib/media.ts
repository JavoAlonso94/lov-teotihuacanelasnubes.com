const img = (name: string) => `/images/${name}`;

export const media = {
  heroVideo: img("hero-tnn.mp4"),
  logo: img("logo-tnn.png"),
  shared: img("vuelo-real-5.jpg"),
  private: img("vuelo-real-1.jpg"),
  pano: img("vuelo-real-3.jpg"),
  family: img("vuelo-real-4.jpg"),
  proposal: img("vuelo-real-8.jpg"),
  celebration: img("vuelo-real-7.jpg"),
  crew: img("vuelo-real-6.jpg"),
  launchVideo: img("despegue.mp4"),
  sunriseVideo: img("amanecer.mp4"),
  toastClose: img("vuelo-real-1.jpg"),
  toastBasket: img("vuelo-real-2.jpg"),
  toastFlight: img("vuelo-real-3.jpg"),
  toastPour: img("vuelo-real-4.jpg"),
  toastGround: img("vuelo-real-5.jpg"),
  toastFamily: img("vuelo-real-6.jpg"),
  toastTravelers: img("vuelo-real-7.jpg"),
};

export const flightImages: Record<string, string> = {
  compartido: img("vuelo-real-5.jpg"),
  "todo-incluido": img("vuelo-real-6.jpg"),
  privado: img("vuelo-real-1.jpg"),
  familiar: img("vuelo-real-4.jpg"),
  pedida: img("vuelo-real-8.jpg"),
  celebracion: img("vuelo-real-7.jpg"),
};

export const galleryImages = [
  { src: img("vuelo-real-3.jpg"), alt: "Pareja saludando desde un globo aerostático en Teotihuacán" },
  { src: img("vuelo-real-1.jpg"), alt: "Pareja disfrutando su experiencia dentro de la canastilla" },
  { src: img("vuelo-real-5.jpg"), alt: "Grupo de viajeros volando en globo aerostático" },
  { src: img("vuelo-real-6.jpg"), alt: "Viajeros celebrando durante un vuelo en globo" },
  { src: img("vuelo-real-8.jpg"), alt: "Pareja celebrando frente a un globo aerostático" },
  { src: img("vuelo-real-2.jpg"), alt: "Pareja antes de despegar en Teotihuacán" },
  { src: img("vuelo-real-4.jpg"), alt: "Viajeros junto a globos de colores al amanecer" },
  { src: img("vuelo-real-7.jpg"), alt: "Pareja después de su experiencia de vuelo" },
  { src: img("galeria-real-1.jpg"), alt: "Familia celebrando frente a los globos aerostáticos" },
  { src: img("galeria-real-2.jpg"), alt: "Grupo de amigos después de volar sobre Teotihuacán" },
  { src: img("galeria-real-3.jpg"), alt: "Familia saludando desde la canastilla del globo" },
  { src: img("galeria-real-4.jpg"), alt: "Familia reunida frente a un globo de colores" },
  { src: img("galeria-real-5.jpg"), alt: "Viajeros saludando durante su vuelo en globo" },
  { src: img("galeria-real-6.jpg"), alt: "Grupo de amigos divirtiéndose junto al globo" },
  { src: img("galeria-real-7.jpg"), alt: "Familia disfrutando su experiencia entre globos" },
];
