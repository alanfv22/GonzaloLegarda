"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { getReviews, updateReview, deleteReview, uploadFoto, deleteFotoFromStorage, Review, timeAgo } from "@/lib/reviews";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? "#C9973A" : "none"} stroke={i < count ? "#C9973A" : "#C9973A60"} strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function StarRatingEdit({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        const filled = star <= (hovered || value);
        return (
          <button key={star} type="button" onClick={() => onChange(star)} onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)} className="cursor-pointer transition-transform hover:scale-110" aria-label={`${star} estrella${star !== 1 ? "s" : ""}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "#C9973A" : "none"} stroke={filled ? "#C9973A" : "#C9973A60"} strokeWidth="1.5" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

interface EditModalProps {
  review: Review;
  onClose: () => void;
  onSave: () => void;
}

function EditModal({ review, onClose, onSave }: EditModalProps) {
  const [nombre, setNombre] = useState(review.nombre);
  const [texto, setTexto] = useState(review.texto);
  const [estrellas, setEstrellas] = useState(review.estrellas);
  const [fotoActual, setFotoActual] = useState<string | null>(review.foto_url);
  const [nuevaFoto, setNuevaFoto] = useState<File | null>(null);
  const [nuevaFotoPreview, setNuevaFotoPreview] = useState<string | null>(null);
  const [eliminarFoto, setEliminarFoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNuevaFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNuevaFoto(file);
    setNuevaFotoPreview(URL.createObjectURL(file));
    setEliminarFoto(false);
  };

  const handleEliminarFoto = () => {
    setFotoActual(null);
    setNuevaFoto(null);
    setNuevaFotoPreview(null);
    setEliminarFoto(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!nombre.trim() || !texto.trim() || estrellas === 0) { setError("Completá todos los campos."); return; }
    setLoading(true);
    try {
      let foto_url: string | null = fotoActual;
      if (nuevaFoto) {
        if (review.foto_url) await deleteFotoFromStorage(review.foto_url);
        foto_url = await uploadFoto(nuevaFoto);
      } else if (eliminarFoto && review.foto_url) {
        await deleteFotoFromStorage(review.foto_url);
        foto_url = null;
      }
      await updateReview(review.id, { nombre: nombre.trim(), texto: texto.trim(), estrellas, foto_url });
      onSave();
      onClose();
    } catch {
      setError("Error al guardar. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const previewSrc = nuevaFotoPreview ?? fotoActual;
  const tieneFoto = !!previewSrc && !eliminarFoto;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div className="bg-[#2D2A26] rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-playfair font-bold text-xl text-[#FDF6EC]">Editar comentario</h3>

        <div>
          <label className="block font-dm-sans text-xs font-medium text-[#FDF6EC]/60 mb-1">Nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-[#1e1c19] border border-white/10 rounded-lg px-3 py-2 text-sm font-dm-sans text-[#FDF6EC] focus:outline-none focus:ring-2 focus:ring-[#C9973A]/50" />
        </div>

        <div>
          <label className="block font-dm-sans text-xs font-medium text-[#FDF6EC]/60 mb-1">Estrellas</label>
          <StarRatingEdit value={estrellas} onChange={setEstrellas} />
        </div>

        <div>
          <label className="block font-dm-sans text-xs font-medium text-[#FDF6EC]/60 mb-1">Comentario</label>
          <textarea rows={4} maxLength={500} value={texto} onChange={(e) => setTexto(e.target.value)} className="w-full bg-[#1e1c19] border border-white/10 rounded-lg px-3 py-2 text-sm font-dm-sans text-[#FDF6EC] focus:outline-none focus:ring-2 focus:ring-[#C9973A]/50 resize-none" />
        </div>

        <div>
          <label className="block font-dm-sans text-xs font-medium text-[#FDF6EC]/60 mb-2">Foto</label>
          {tieneFoto && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 mb-3">
              <Image src={previewSrc!} alt="Preview" fill className="object-cover" />
            </div>
          )}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="cursor-pointer inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FDF6EC] font-dm-sans transition-colors">
              {tieneFoto ? "Cambiar foto" : "Agregar foto"}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleNuevaFoto} />
            </label>
            {tieneFoto && (
              <button type="button" onClick={handleEliminarFoto} className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg bg-[#E63946]/20 hover:bg-[#E63946]/30 text-[#E63946] font-dm-sans transition-colors cursor-pointer">
                Eliminar foto
              </button>
            )}
            {eliminarFoto && <span className="text-xs text-[#E63946]/80 font-dm-sans self-center">La foto será eliminada al guardar</span>}
          </div>
        </div>

        {error && <p className="text-xs text-[#E63946]">⚠️ {error}</p>}

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 border border-white/10 text-[#FDF6EC]/60 font-dm-sans text-sm rounded-lg py-2.5 hover:bg-white/5 transition-colors cursor-pointer">Cancelar</button>
          <button onClick={handleSave} disabled={loading} className="flex-1 bg-[#C9973A] text-white font-dm-sans text-sm font-semibold rounded-lg py-2.5 hover:brightness-110 transition-all disabled:opacity-60 cursor-pointer">
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try { const data = await getReviews(); setReviews(data); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (review: Review) => {
    if (!confirm(`¿Estás seguro que querés eliminar el comentario de "${review.nombre}"?`)) return;
    setDeletingId(review.id);
    try { await deleteReview(review); setReviews((prev) => prev.filter((r) => r.id !== review.id)); }
    finally { setDeletingId(null); }
  };

  const avgStars = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.estrellas, 0) / reviews.length).toFixed(1)
    : "—";

  const lastReview = reviews[0]
    ? new Date(reviews[0].created_at).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h2 className="font-playfair font-bold text-2xl text-[#FDF6EC]">Reviews</h2>
        <p className="font-dm-sans text-sm text-[#FDF6EC]/40 mt-1">Administrá los comentarios de clientes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total de reviews", value: reviews.length.toString() },
          { label: "Promedio de estrellas", value: `⭐ ${avgStars}` },
          { label: "Último comentario", value: lastReview },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#2D2A26] rounded-xl p-4 border border-white/5">
            <p className="font-dm-sans text-xs text-[#FDF6EC]/40 mb-1">{label}</p>
            <p className="font-dm-sans font-semibold text-[#FDF6EC] text-lg">{value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-[#C9973A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 text-[#FDF6EC]/40 font-dm-sans">No hay reviews todavía.</div>
      ) : (
        <div className="bg-[#2D2A26] rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["Foto", "Nombre", "Estrellas", "Comentario", "Fecha", "Acciones"].map((col) => (
                    <th key={col} className="px-4 py-3 text-left font-dm-sans text-xs font-semibold text-[#FDF6EC]/40 uppercase tracking-wider">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      {review.foto_url ? (
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C9973A]/30">
                          <Image src={review.foto_url} alt={review.nombre} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#C9973A] flex items-center justify-center">
                          <span className="text-white font-dm-sans font-bold text-sm">{review.nombre.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3"><span className="font-dm-sans text-sm text-[#FDF6EC] whitespace-nowrap">{review.nombre}</span></td>
                    <td className="px-4 py-3"><Stars count={review.estrellas} /></td>
                    <td className="px-4 py-3 max-w-xs"><p className="font-dm-sans text-sm text-[#FDF6EC]/70 line-clamp-2">{review.texto}</p></td>
                    <td className="px-4 py-3"><span className="font-dm-sans text-xs text-[#FDF6EC]/40 whitespace-nowrap">{timeAgo(review.created_at)}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setEditingReview(review)} aria-label="Editar" className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#C9973A]/15 text-[#C9973A] hover:bg-[#C9973A]/30 transition-colors cursor-pointer">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </button>
                        <button onClick={() => handleDelete(review)} disabled={deletingId === review.id} aria-label="Eliminar" className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E63946]/15 text-[#E63946] hover:bg-[#E63946]/30 transition-colors disabled:opacity-50 cursor-pointer">
                          {deletingId === review.id
                            ? <div className="w-3 h-3 border border-[#E63946] border-t-transparent rounded-full animate-spin" />
                            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingReview && <EditModal review={editingReview} onClose={() => setEditingReview(null)} onSave={load} />}
    </div>
  );
}
