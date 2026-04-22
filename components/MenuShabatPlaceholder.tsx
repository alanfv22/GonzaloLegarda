"use client";

import { motion } from "framer-motion";

export default function MenuShabatPlaceholder() {
  return (
    <section id="menu-shabat" className="py-20 md:py-28 bg-cream border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Menorá decorativa */}
          <div className="text-5xl mb-6" role="img" aria-label="Menorá">
            🕎
          </div>

          <span className="inline-block font-dm-sans text-xs font-bold tracking-widest uppercase bg-accent/10 text-accent border border-accent/20 px-4 py-1.5 rounded-full mb-6">
            Muy pronto
          </span>

          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-secondary mb-5 leading-tight">
            Menú para Shabat
          </h2>

          <p className="font-dm-sans text-base text-warm-gray leading-relaxed max-w-md mx-auto">
            Muy pronto vas a poder ver nuestros menús especiales para el Shabat.
            Mientras tanto, consultanos directamente.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-10 text-primary/40">
            <div className="h-px w-16 bg-primary/30" />
            <span className="text-lg">✦</span>
            <div className="h-px w-16 bg-primary/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
