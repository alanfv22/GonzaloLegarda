"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useModalStore } from "@/lib/modal-store";

export default function Hero() {
  const openModal = useModalStore((s) => s.openModal);

  const scrollToEventos = () => {
    document.querySelector("#eventos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Imagenes/FotoPrincipal.png"
          alt="Celebración judía elegante — Garda Eventos"
          fill
          priority
          quality={100}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2A26]/90 via-[#2D2A26]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/60 text-primary text-xs font-dm-sans font-medium tracking-widest uppercase mb-6"
          >
            <span>✦</span>
            <span>Cocina Judía Auténtica</span>
            <span>✦</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6"
          >
            Cada evento es
            <br />
            <span className="text-primary italic">un viaje a la tradición</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-dm-sans text-base sm:text-lg text-cream/75 mb-10 max-w-xl leading-relaxed"
          >
            Catering exclusivo con recetas judías auténticas, ingredientes de
            primera calidad y una presentación impecable que hace de cada
            celebración una experiencia única.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => openModal()}
              className="relative overflow-hidden inline-flex items-center justify-center font-dm-sans font-semibold text-base bg-primary text-white px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 min-h-[52px] cursor-pointer"
            >
              <span className="relative z-10">Consultá tu evento</span>
              <span className="shimmer absolute inset-0" />
            </button>

            <button
              onClick={scrollToEventos}
              className="inline-flex items-center justify-center font-dm-sans font-medium text-base text-cream border border-cream/40 px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all duration-300 min-h-[52px] cursor-pointer"
            >
              Ver eventos
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-0.5 h-10 bg-gradient-to-b from-primary/80 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
