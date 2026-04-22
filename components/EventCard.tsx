"use client";

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(201,151,58,0.25)] hover:-translate-y-1.5 transition-all duration-400 flex flex-col ${
        event.destacado ? "ring-1 ring-primary/30" : ""
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.imagen}
          alt={`${event.nombre} — Garda Eventos catering`}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button
            onClick={() => openModal(event.nombre)}
            className="font-dm-sans font-semibold text-sm bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-lg min-h-[44px] flex items-center cursor-pointer"
          >
            Consultá este evento
          </button>
        </div>

        {/* Icon pill */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-primary/95 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-full text-sm font-medium shadow-md">
          <span aria-hidden="true">{event.icono}</span>
        </div>

        {/* Destacado badge */}
        {event.destacado && (
          <div className="absolute top-3 right-3 z-10 bg-accent text-white text-xs font-dm-sans font-semibold px-2.5 py-1.5 rounded-full shadow-md">
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
