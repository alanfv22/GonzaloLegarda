"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useModalStore } from "@/lib/modal-store";

export default function QuienSoy() {
  const { openModal } = useModalStore();

  return (
    <section id="quien-soy" className="py-20 md:py-28 bg-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Columna izquierda — Foto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#C9973A]/40 rounded-2xl" />
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
              <Image
                src="/Imagenes/QuienSoy.jpeg"
                alt="Gonzalo Legarda — Cocina Judía"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#C9973A] text-white px-5 py-3 rounded-xl shadow-lg">
              <p className="font-dm-sans text-xs font-medium">Desde</p>
              <p className="font-playfair font-bold text-2xl leading-none">2014</p>
            </div>
          </motion.div>

          {/* Columna derecha — Texto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <p className="font-dm-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#C9973A]">
              ✦ Mi historia ✦
            </p>
            <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-[#FDF6EC] leading-tight">
              Quién soy
            </h2>
            <div className="flex flex-col gap-4">
              <p className="font-dm-sans text-base text-[#FDF6EC]/75 leading-relaxed">
                Llegué a Buenos Aires en 2014 y comencé mi carrera gastronómica en Cano (Ugarteche y Cerviño). El chef a cargo de la cocina, con el tiempo, me recomendó para trabajar en una casa de té kosher. No conocía nada del tema, pero empecé yendo dos veces por semana hasta que quedé a cargo de la cocina, realizando pastelería y los típicos calentitos.
              </p>
              <p className="font-dm-sans text-base text-[#FDF6EC]/75 leading-relaxed">
                Al mismo tiempo, estaba a cargo de la pastelería en Batacazo, el restaurante del Hipódromo de Palermo. Como freelance, también hacía producción para eventos kosher de la colectividad.
              </p>
              <p className="font-dm-sans text-base text-[#FDF6EC]/75 leading-relaxed">
                En 2020 quedé a cargo de la pastelería de Mudrá Restaurante (actualmente ubicado en el edificio Patagonia Flooring). Llegó la pandemia y todos nos fuimos a casa. Desde un departamento en el barrio de Villa Urquiza comencé a elaborar bohíos de verdura, knishes y sambusak. A medida que crecía la demanda, fui incorporando más productos.
              </p>
              <p className="font-dm-sans text-base text-[#FDF6EC]/75 leading-relaxed">
                En 2021 llegó mi primer gran evento: un casamiento para 150 personas. Ya con un equipo armado, comenzamos este proyecto que, hasta el día de hoy, me brinda infinitas satisfacciones.
              </p>
            </div>
            <div className="flex items-center gap-8 pt-4 border-t border-[#FDF6EC]/10">
              <div>
                <p className="font-playfair font-bold text-3xl text-[#C9973A]">10+</p>
                <p className="font-dm-sans text-sm text-[#FDF6EC]/60">Años de experiencia</p>
              </div>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 font-dm-sans font-semibold text-base bg-[#C9973A] text-white px-8 py-4 rounded-full hover:bg-[#C9973A]/90 transition-all duration-300 shadow-lg cursor-pointer"
              >
                Consultá tu evento
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}