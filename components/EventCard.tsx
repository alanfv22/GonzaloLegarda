"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Event } from "@/lib/events";
import { useModalStore } from "@/lib/modal-store";

interface EventCardProps {
  event: Event;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const openModal = useModalStore((s) => s.openModal);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + event.imagenes.length) % event.imagenes.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % event.imagenes.length);
  };

  const hasMultiple = event.imagenes.length > 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(201,151,58,0.25)] hover:-translate-y-1.5 transition-all duration-400 flex flex-col h-full ${event.destacado ? "ring-1 ring-primary/30" : ""
        }`}
    >
      {/* Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          key={currentIndex}
          src={event.imagenes[currentIndex]}
          alt={`${event.nombre} — Gonzalo Legarda Cocina Judía`}
          fill
          className="object-cover object-center transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        {/* Hover overlay with CTA — oculto en mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-end justify-center pb-6 z-10">
          <button
            onClick={() => openModal(event.nombre)}
            className="font-dm-sans font-semibold text-sm bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg min-h-[44px] flex items-center cursor-pointer"
          >
            Consultá este evento
          </button>
        </div>

        {/* Prev button */}
        {hasMultiple && (
          <button
            onClick={prev}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/75 text-white text-xl leading-none transition-all sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
          >
            ‹
          </button>
        )}

        {/* Next button */}
        {hasMultiple && (
          <button
            onClick={next}
            aria-label="Foto siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/75 text-white text-xl leading-none transition-all sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
          >
            ›
          </button>
        )}

        {/* Dots */}
        {hasMultiple && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {event.imagenes.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                aria-label={`Foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex
                  ? "w-3 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/75"
                  }`}
              />
            ))}
          </div>
        )}

        {/* Icon pill */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-primary/95 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-full text-sm font-medium shadow-md">
          <span aria-hidden="true">{event.icono}</span>
        </div>

        {/* Destacado badge */}
        {event.destacado && (
          <div className="absolute top-3 right-3 z-20 bg-accent text-white text-xs font-dm-sans font-semibold px-2.5 py-1.5 rounded-full shadow-md">
            Destacado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-playfair font-bold text-xl text-secondary mb-2 leading-snug">
          {event.nombre}
        </h3>
        <p className="font-dm-sans text-sm text-warm-gray leading-relaxed flex-1">
          {event.descripcion}
        </p>

        {/* Footer button */}
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={() => openModal(event.nombre)}
            className="inline-flex items-center gap-2 font-dm-sans text-sm font-semibold text-primary border border-primary/50 px-4 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all duration-300 min-h-[44px] cursor-pointer"
          >
            Consultá
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}