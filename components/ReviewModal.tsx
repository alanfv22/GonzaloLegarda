"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { insertReview, uploadFoto } from "@/lib/reviews";

interface ReviewForm {
  nombre: string;
  estrellas: number;
  texto: string;
  foto: File | null;
}

interface FormErrors {
  nombre?: string;
  estrellas?: string;
  texto?: string;
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function StarRating({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (v: number) => void;
  error?: string;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div>
      <label className="block font-dm-sans text-sm font-medium text-[#2D2A26] mb-1.5">
        Puntuación <span className="text-[#C9973A]">*</span>
      </label>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const star = i + 1;
          const filled = star <= (hovered || value);
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`${star} estrella${star !== 1 ? "s" : ""}`}
              className="transition-transform hover:scale-110 cursor-pointer"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill={filled ? "#C9973A" : "none"}
                stroke={filled ? "#C9973A" : "#C9973A80"}
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-1 text-xs text-[#E63946] flex items-center gap-1">⚠️ {error}</p>
      )}
    </div>
  );
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({ isOpen, onClose, onSuccess }: ReviewModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ReviewForm>({ nombre: "", estrellas: 0, texto: "", foto: null });
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const inputBase =
    "w-full bg-white rounded-lg px-4 py-3 font-dm-sans text-sm text-[#2D2A26] placeholder:text-[#8B7355]/60 focus:outline-none transition-all duration-200";

  const inputClass = (error?: string) =>
    `${inputBase} border ${
      error
        ? "border-[#E63946] focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946]"
        : "border-[#C9973A]/30 focus:ring-2 focus:ring-[#C9973A]/50 focus:border-[#C9973A]"
    }`;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (form.estrellas === 0) newErrors.estrellas = "Seleccioná al menos 1 estrella";
    if (form.texto.trim().length < 10) newErrors.texto = "El comentario debe tener al menos 10 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, foto: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setFotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(null);
    }
  };

  const handleClose = () => {
    if (status === "loading") return;
    setForm({ nombre: "", estrellas: 0, texto: "", foto: null });
    setFotoPreview(null);
    setErrors({});
    setStatus("idle");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const foto_url = form.foto ? await uploadFoto(form.foto) : null;
      await insertReview({ nombre: form.nombre.trim(), texto: form.texto.trim(), estrellas: form.estrellas, foto_url });
      setStatus("success");
      setTimeout(() => { onSuccess(); handleClose(); }, 1500);
    } catch {
      setStatus("idle");
      setErrors({ texto: "Ocurrió un error. Intentá de nuevo." });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-[#FDF6EC] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-4 border-b border-[#C9973A]/15 flex-shrink-0 relative">
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#2D2A26]/10 hover:bg-[#2D2A26]/20 text-[#2D2A26] transition-colors cursor-pointer"
              >
                <CloseIcon />
              </button>
              <h2 className="font-playfair font-bold text-2xl text-[#2D2A26] leading-snug pr-10">
                Dejá tu comentario
              </h2>
              <p className="font-dm-sans text-sm text-[#8B7355] mt-1">
                Contanos cómo fue tu experiencia con Gonzalo Legarda
              </p>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block font-dm-sans text-sm font-medium text-[#2D2A26] mb-1.5">
                    Tu nombre <span className="text-[#C9973A]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className={inputClass(errors.nombre)}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-[#E63946] flex items-center gap-1">⚠️ {errors.nombre}</p>
                  )}
                </div>

                <StarRating value={form.estrellas} onChange={(v) => setForm({ ...form, estrellas: v })} error={errors.estrellas} />

                <div>
                  <label className="block font-dm-sans text-sm font-medium text-[#2D2A26] mb-1.5">
                    Comentario <span className="text-[#C9973A]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Contanos tu experiencia..."
                    maxLength={500}
                    value={form.texto}
                    onChange={(e) => setForm({ ...form, texto: e.target.value })}
                    className={`${inputClass(errors.texto)} resize-none`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.texto ? (
                      <p className="text-xs text-[#E63946] flex items-center gap-1">⚠️ {errors.texto}</p>
                    ) : <span />}
                    <span className="text-xs text-[#8B7355] ml-auto">{form.texto.length}/500</span>
                  </div>
                </div>

                <div>
                  <label className="block font-dm-sans text-sm font-medium text-[#2D2A26] mb-1.5">
                    Foto <span className="text-[#8B7355] font-normal">(opcional)</span>
                  </label>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
                  {fotoPreview ? (
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9973A]/30 flex-shrink-0">
                        <Image src={fotoPreview} alt="Preview" fill className="object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => { setForm({ ...form, foto: null }); setFotoPreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="text-xs text-[#E63946] hover:underline cursor-pointer"
                      >
                        Eliminar foto
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border border-dashed border-[#C9973A]/40 rounded-lg py-3 px-4 text-sm font-dm-sans text-[#8B7355] hover:border-[#C9973A] hover:text-[#C9973A] transition-colors cursor-pointer"
                    >
                      📷 Subir foto (opcional)
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="relative overflow-hidden w-full bg-[#C9973A] text-white font-dm-sans font-semibold text-base px-6 py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-md shadow-[#C9973A]/30 min-h-[52px] flex items-center justify-center gap-2 disabled:opacity-80 mt-2 cursor-pointer"
                >
                  {status === "loading" && <><Spinner /> Publicando...</>}
                  {status === "success" && "✓ Comentario publicado"}
                  {status === "idle" && (
                    <>
                      <span className="relative z-10">Publicar comentario</span>
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
