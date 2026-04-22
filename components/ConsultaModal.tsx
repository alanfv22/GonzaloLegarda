"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/lib/modal-store";

const TIPOS_EVENTO = [
  "Bar Mitzva",
  "Bat Mitzva",
  "Brit Milá",
  "Cumpleaños",
  "Aniversario",
  "Casamiento",
  "Té de lluvia",
  "Coffee Break",
  "Seder de Pesaj",
  "Otro",
];

const CANT_PERSONAS = [
  "Hasta 20 personas",
  "20 a 50 personas",
  "50 a 100 personas",
  "100 a 200 personas",
  "Más de 200 personas",
  "No sé todavía",
];

interface ConsultaForm {
  nombre: string;
  tipoEvento: string;
  fecha: string;
  cantPersonas: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  tipoEvento?: string;
  fecha?: string;
  cantPersonas?: string;
}

function formatearFecha(fechaStr: string): string {
  if (!fechaStr) return "";
  const [year, month, day] = fechaStr.split("-");
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${parseInt(day)} de ${meses[parseInt(month) - 1]} de ${year}`;
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export default function ConsultaModal() {
  const { isOpen, defaultEvento, closeModal } = useModalStore();

  const [form, setForm] = useState<ConsultaForm>({
    nombre: "",
    tipoEvento: "",
    fecha: "",
    cantPersonas: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({ ...prev, tipoEvento: defaultEvento ?? "" }));
      setErrors({});
    }
  }, [isOpen, defaultEvento]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.tipoEvento) newErrors.tipoEvento = "Seleccioná el tipo de evento";
    if (!form.fecha) newErrors.fecha = "La fecha es requerida";
    if (!form.cantPersonas) newErrors.cantPersonas = "Seleccioná la cantidad aproximada";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 150));

    const mensaje = `Hola Gonzalo! 👋 Me gustaría consultar sobre un evento.

📋 *Tipo de evento:* ${form.tipoEvento}
👤 *Nombre:* ${form.nombre}
📅 *Fecha tentativa:* ${formatearFecha(form.fecha)}
👥 *Cantidad de personas:* ${form.cantPersonas}${form.mensaje ? `\n\n💬 *Comentario:* ${form.mensaje}` : ""}

¡Quedamos en contacto!`;

    const url = `https://wa.me/5491157660036?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    setLoading(false);
    closeModal();
  };

  const inputBase =
    "w-full bg-white rounded-lg px-4 py-3 font-dm-sans text-sm text-[#2D2A26] placeholder:text-[#8B7355]/60 focus:outline-none transition-all duration-200";

  const inputClass = (error?: string) =>
    `${inputBase} border ${
      error
        ? "border-[#E63946] focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946]"
        : "border-[#C9973A]/30 focus:ring-2 focus:ring-[#C9973A]/50 focus:border-[#C9973A]"
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-[#FDF6EC] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-[#C9973A]/15 flex-shrink-0 relative">
              <button
                onClick={closeModal}
                aria-label="Cerrar"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#2D2A26]/10 hover:bg-[#2D2A26]/20 text-[#2D2A26] transition-colors cursor-pointer"
              >
                <CloseIcon />
              </button>
              <h2 className="font-playfair font-bold text-2xl text-[#2D2A26] leading-snug pr-10">
                Contanos sobre tu evento
              </h2>
              <p className="font-dm-sans text-sm text-[#8B7355] mt-1">
                Completá los datos y te respondemos a la brevedad
              </p>
            </div>

            {/* Scrollable form */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block font-dm-sans text-sm font-medium text-[#2D2A26] mb-1.5">
                    Tu nombre <span className="text-[#C9973A]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="¿Cómo te llamás?"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                    className={inputClass(errors.nombre)}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-[#E63946] flex items-center gap-1">
                      ⚠️ {errors.nombre}
                    </p>
                  )}
                </div>

                {/* Tipo de evento */}
                <div>
                  <label className="block font-dm-sans text-sm font-medium text-[#2D2A26] mb-1.5">
                    ¿Qué evento estás planeando?{" "}
                    <span className="text-[#C9973A]">*</span>
                  </label>
                  <select
                    value={form.tipoEvento}
                    onChange={(e) =>
                      setForm({ ...form, tipoEvento: e.target.value })
                    }
                    className={inputClass(errors.tipoEvento)}
                  >
                    <option value="">Seleccioná un tipo de evento</option>
                    {TIPOS_EVENTO.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                  {errors.tipoEvento && (
                    <p className="mt-1 text-xs text-[#E63946] flex items-center gap-1">
                      ⚠️ {errors.tipoEvento}
                    </p>
                  )}
                </div>

                {/* Fecha */}
                <div>
                  <label className="block font-dm-sans text-sm font-medium text-[#2D2A26] mb-1.5">
                    ¿Cuándo sería? <span className="text-[#C9973A]">*</span>
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={form.fecha}
                    onChange={(e) =>
                      setForm({ ...form, fecha: e.target.value })
                    }
                    className={inputClass(errors.fecha)}
                  />
                  {errors.fecha && (
                    <p className="mt-1 text-xs text-[#E63946] flex items-center gap-1">
                      ⚠️ {errors.fecha}
                    </p>
                  )}
                </div>

                {/* Cantidad de personas */}
                <div>
                  <label className="block font-dm-sans text-sm font-medium text-[#2D2A26] mb-1.5">
                    ¿Cuántas personas aprox.?{" "}
                    <span className="text-[#C9973A]">*</span>
                  </label>
                  <select
                    value={form.cantPersonas}
                    onChange={(e) =>
                      setForm({ ...form, cantPersonas: e.target.value })
                    }
                    className={inputClass(errors.cantPersonas)}
                  >
                    <option value="">Seleccioná un rango</option>
                    {CANT_PERSONAS.map((rango) => (
                      <option key={rango} value={rango}>
                        {rango}
                      </option>
                    ))}
                  </select>
                  {errors.cantPersonas && (
                    <p className="mt-1 text-xs text-[#E63946] flex items-center gap-1">
                      ⚠️ {errors.cantPersonas}
                    </p>
                  )}
                </div>

                {/* Mensaje adicional */}
                <div>
                  <label className="block font-dm-sans text-sm font-medium text-[#2D2A26] mb-1.5">
                    ¿Algo más que quieras contarnos?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contanos cualquier detalle extra, dudas, pedidos especiales..."
                    value={form.mensaje}
                    onChange={(e) =>
                      setForm({ ...form, mensaje: e.target.value })
                    }
                    className={`${inputClass()} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative overflow-hidden w-full bg-[#C9973A] text-white font-dm-sans font-semibold text-base px-6 py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-md shadow-[#C9973A]/30 min-h-[52px] flex items-center justify-center gap-2 disabled:opacity-80 mt-2 cursor-pointer"
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <span className="relative z-10">
                        Consultar por WhatsApp 💬
                      </span>
                      <span className="shimmer absolute inset-0" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
