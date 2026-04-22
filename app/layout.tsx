import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gonzalo Legarda | Cocina Judía",
  description:
    "Catering exclusivo con recetas judías auténticas, ingredientes de primera calidad y presentación impecable. Ideal para Bar Mitzva, Casamientos, Seder de Pesaj y más celebraciones.",
  openGraph: {
    title: "Gonzalo Legarda | Cocina Judía",
    description:
      "Cada evento es un viaje a la tradición. Catering judío auténtico para tus celebraciones más especiales.",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gonzalo Legarda | Cocina Judía",
    description:
      "Catering exclusivo con recetas judías auténticas para tus celebraciones más especiales.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable} h-full`}>
      <body className="antialiased min-h-full flex flex-col">{children}</body>
    </html>
  );
}
