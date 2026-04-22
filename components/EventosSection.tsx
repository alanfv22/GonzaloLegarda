"use client";

import { motion } from "framer-motion";
import { events } from "@/lib/events";
import EventCard from "./EventCard";

export default function EventosSection() {
  return (
    <section id="eventos" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 md:mb-18"
        >
          <p className="font-dm-sans text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            ✦ Nuestros eventos ✦
          </p>
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-secondary mb-5 leading-tight text-balance">
            Celebraciones que quedan
            <br className="hidden sm:block" /> en la memoria
          </h2>
          <p className="font-dm-sans text-base text-warm-gray max-w-xl mx-auto leading-relaxed">
            Cada evento tiene su ritual, su historia y su sabor. Acompañamos
            cada etapa con dedicación, cocina judía auténtica y catering de
            primer nivel.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {events.map((event, i) => (
            <div
              key={event.id}
              className={
                i === events.length - 1 && events.length % 2 !== 0
                  ? "col-span-2 lg:col-span-1 mx-auto w-1/2 lg:w-full"
                  : ""
              }
            >
              <EventCard event={event} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}