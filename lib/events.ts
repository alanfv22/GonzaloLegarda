export interface Event {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  imagenes: string[];
  destacado: boolean;
  objectFit?: "cover" | "contain";
}

export const events: Event[] = [
  {
    id: 1,
    nombre: "Bar Mitzvá",
    descripcion:
      "Una celebración que marca un antes y un después. Creamos una experiencia sofisticada donde la tradición, la emoción y la alta gastronomía se unen en perfecta armonía.",
    icono: "🕍",
    imagenes: [
      "/Imagenes/barmitzva.png",
    ],
    destacado: true,
  },
  {
    id: 2,
    nombre: "Bat Mitzvá",
    descripcion:
      "Elegancia, significado y celebración en su máxima expresión. Diseñamos cada detalle para acompañar este momento único con estilo, calidez y distinción.",
    icono: "✡️",
    imagenes: [
      "/Imagenes/Batmitzva.png",
    ],
    destacado: true,
  },
  {
    id: 3,
    nombre: "Brit Milá",
    descripcion:
      "Un momento íntimo, profundo e irrepetible. Acompañamos esta ceremonia con una propuesta delicada, cuidando cada detalle con sensibilidad y excelencia.",
    icono: "🕯️",
    imagenes: [
      "/Imagenes/britmila1.png",
      "/Imagenes/britmila.png"
    ],
    destacado: false,
  },
  {
    id: 9,
    nombre: "Séder de Pésaj",
    descripcion:
      "Tradición, historia y mesa compartida. Elevamos la experiencia del Séder con una propuesta gastronómica refinada, respetando cada costumbre con precisión.",
    icono: "🍷",
    imagenes: [
      "/Imagenes/Seder (1).jpg",
      "/Imagenes/Seder (2).jpg",
      "/Imagenes/Seder (3).jpg",
    ],
    destacado: true,
  },
  {
    id: 4,
    nombre: "Cumpleaños",
    descripcion:
      "Celebrar también puede ser extraordinario. Creamos experiencias a medida con una impronta estética y gastronómica que transforma cada festejo en algo único.",
    icono: "🎂",
    imagenes: [
      "/Imagenes/6c4d4e31-af1b-4c5e-aace-c4bc556490ef.jpg",
      "/Imagenes/a07805e5-6ba2-4fdd-b285-61e88d4e126c.jpg",
    ],
    destacado: false,
  },
  {
    id: 5,
    nombre: "Aniversarios",
    descripcion:
      "El paso del tiempo merece ser celebrado con elegancia. Diseñamos encuentros memorables donde cada detalle transmite emoción, estilo y sofisticación.",
    icono: "💛",
    imagenes: [
      "/Imagenes/casamiento1.png",
    ],
    destacado: false,
  },
  {
    id: 6,
    nombre: "Casamientos",
    descripcion:
      "Una experiencia inolvidable, pensada en cada instante. Creamos propuestas gastronómicas de alto nivel que acompañan y realzan uno de los días más importantes.",
    icono: "💍",
    imagenes: [
      "/Imagenes/casamiento.png",
      "/Imagenes/casamiento1.png"
    ],
    destacado: true,
  },
  {
    id: 7,
    nombre: "Té de lluvia",
    descripcion:
      "Un encuentro delicado y lleno de emoción. Pastelería fina, estética cuidada y una atmósfera pensada para celebrar cada instante con dulzura y elegancia.",
    icono: "🍰",
    imagenes: [
      "/Imagenes/301edf8d-968a-4c3b-8eb3-3bc59727ad85.jpg",
      "/Imagenes/ccf08a4a-8d56-42e0-9373-6c0eb8be4285.jpg",
    ],
    destacado: false,
  },
  {
    id: 8,
    nombre: "Coffee Break",
    descripcion:
      "Minimalismo, calidad y precisión. Ofrecemos un servicio corporativo de alto nivel, donde cada detalle refleja profesionalismo y excelencia.",
    icono: "☕",
    imagenes: [
      "/Imagenes/coffebreak.png",
    ],
    destacado: false,
    objectFit: "cover" as const,
  },
];