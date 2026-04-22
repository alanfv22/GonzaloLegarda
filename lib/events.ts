export interface Event {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  imagenes: string[];
  destacado: boolean;
}

export const events: Event[] = [
  {
    id: 1,
    nombre: "Bar Mitzva",
    descripcion:
      "El paso a la adultez merece una celebración a la altura. Organizamos cada detalle para que sea un momento único e irrepetible.",
    icono: "🕍",
    imagenes: [
      "/Imagenes/1f30b115-b7da-4d9a-a11c-8eba880b2eed.jpg",
      "/Imagenes/5bdf0da8-8afe-44a0-a446-af7e39c6f2e7.jpg",
      "/Imagenes/5ce77e96-f223-4667-9e84-32a801a99d71.jpg",
    ],
    destacado: true,
  },
  {
    id: 2,
    nombre: "Bat Mitzva",
    descripcion:
      "Un momento sagrado y festivo. Acompañamos a las familias con catering y ambientación que refleja la importancia del evento.",
    icono: "✡️",
    imagenes: [
      "/Imagenes/5bdf0da8-8afe-44a0-a446-af7e39c6f2e7.jpg",
      "/Imagenes/6c4d4e31-af1b-4c5e-aace-c4bc556490ef.jpg",
      "/Imagenes/23b4fa9d-99c4-46d6-89c8-89c887127aad.jpg",
    ],
    destacado: true,
  },
  {
    id: 3,
    nombre: "Brit Milá",
    descripcion:
      "La primera celebración de vida. Un evento íntimo y emotivo que merece atención y cariño en cada detalle.",
    icono: "🕯️",
    imagenes: [
      "/Imagenes/5ce77e96-f223-4667-9e84-32a801a99d71.jpg",
      "/Imagenes/301edf8d-968a-4c3b-8eb3-3bc59727ad85.jpg",
      "/Imagenes/b619c2cf-d027-4e8a-8f81-c6b00ae2022b.jpg",
    ],
    destacado: false,
  },
  {
    id: 9,
    nombre: "Seder de Pesaj",
    descripcion:
      "La mesa del Seder es sagrada. Preparamos todo para que la noche sea especial, siguiendo la tradición con productos de calidad.",
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
      "Porque cada año que pasa merece festejarse con todo. Bocados únicos, presentación impecable y mucha alegría.",
    icono: "🎂",
    imagenes: [
      "/Imagenes/6c4d4e31-af1b-4c5e-aace-c4bc556490ef.jpg",
      "/Imagenes/a07805e5-6ba2-4fdd-b285-61e88d4e126c.jpg",
      "/Imagenes/ccf08a4a-8d56-42e0-9373-6c0eb8be4285.jpg",
    ],
    destacado: false,
  },
  {
    id: 5,
    nombre: "Aniversarios",
    descripcion:
      "Años compartidos, momentos únicos. Celebrá con sabores que van a hacer del aniversario algo que no van a olvidar más.",
    icono: "💛",
    imagenes: [
      "/Imagenes/23b4fa9d-99c4-46d6-89c8-89c887127aad.jpg",
      "/Imagenes/63e03ae2-e879-4e75-a040-50f645a10e59.jpg",
      "/Imagenes/e6bc9499-4dae-4d50-9284-fd467ab251d7.jpg",
    ],
    destacado: false,
  },
  {
    id: 6,
    nombre: "Casamientos",
    descripcion:
      "El día más especial merece el catering más especial. Desde el cóctel hasta el postre, todo pensado para emocionar.",
    icono: "💍",
    imagenes: [
      "/Imagenes/63e03ae2-e879-4e75-a040-50f645a10e59.jpg",
      "/Imagenes/1f30b115-b7da-4d9a-a11c-8eba880b2eed.jpg",
      "/Imagenes/a07805e5-6ba2-4fdd-b285-61e88d4e126c.jpg",
    ],
    destacado: true,
  },
  {
    id: 7,
    nombre: "Té de lluvia",
    descripcion:
      "Una tarde cálida para recibir al bebé que viene. Pastelería fina, decoración delicada y mucho amor en cada bocado.",
    icono: "🍰",
    imagenes: [
      "/Imagenes/301edf8d-968a-4c3b-8eb3-3bc59727ad85.jpg",
      "/Imagenes/ccf08a4a-8d56-42e0-9373-6c0eb8be4285.jpg",
      "/Imagenes/b619c2cf-d027-4e8a-8f81-c6b00ae2022b.jpg",
    ],
    destacado: false,
  },
  {
    id: 8,
    nombre: "Coffee Break",
    descripcion:
      "Para reuniones, eventos corporativos o encuentros especiales. Presentación profesional y sabor en cada detalle.",
    icono: "☕",
    imagenes: [
      "/Imagenes/b619c2cf-d027-4e8a-8f81-c6b00ae2022b.jpg",
      "/Imagenes/5bdf0da8-8afe-44a0-a446-af7e39c6f2e7.jpg",
      "/Imagenes/939b4cde-986e-40da-8c7c-9ad71721b8fe.jpg",
    ],
    destacado: false,
  },
];