"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    icon: "🕍",
    title: "Tradición y autenticidad",
    text: "Cada plato está preparado con recetas judías auténticas y el respeto que merece la cultura. La tradición se siente en cada bocado.",
  },
  {
    icon: "👨‍🍳",
    title: "Ingredientes de primera calidad",
    text: "Productos frescos, seleccionados con cuidado. La calidad se nota desde la presentación hasta el último detalle del evento.",
  },
  {
    icon: "✨",
    title: "Una experiencia cultural",
    text: "Cada evento se convierte en una experiencia cultural y sensorial. Cuidamos cada detalle para que tus celebraciones sean verdaderamente inolvidables.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="font-dm-sans text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            ✦ Por qué elegirnos ✦
          </p>
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-cream leading-tight">
            Por qué elegir a Gonzalo Legarda
          </h2>
        </motion.div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-2xl shadow-md shadow-primary/10">
                <span role="img" aria-label={r.title}>{r.icon}</span>
              </div>
              <div>
                <h3 className="font-playfair font-bold text-xl text-cream mb-2">
                  {r.title}
                </h3>
                <p className="font-dm-sans text-sm text-cream/65 leading-relaxed max-w-xs mx-auto">
                  {r.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
