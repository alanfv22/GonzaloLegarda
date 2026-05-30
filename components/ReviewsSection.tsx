"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ReviewCard from "@/components/ReviewCard";
import ReviewModal from "@/components/ReviewModal";
import { getReviews, Review } from "@/lib/reviews";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#e8dcc8]/60 p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-[#e8dcc8]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#e8dcc8] rounded w-1/2" />
          <div className="h-3 bg-[#e8dcc8] rounded w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-[#e8dcc8] rounded" />
        <div className="h-3 bg-[#e8dcc8] rounded w-5/6" />
        <div className="h-3 bg-[#e8dcc8] rounded w-4/6" />
      </div>
      <div className="h-3 bg-[#e8dcc8] rounded w-1/4 mt-auto" />
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section id="resenas" className="py-20 md:py-28 bg-[#FDF6EC]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-dm-sans text-sm font-semibold tracking-widest text-[#C9973A] uppercase mb-3">
            ✦ Lo que dicen nuestros clientes ✦
          </p>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl lg:text-5xl text-[#2D2A26] mb-4">
            Experiencias que hablan por sí solas
          </h2>
          <p className="font-dm-sans text-[#8B7355] text-base md:text-lg max-w-2xl mx-auto">
            Cada celebración deja una huella. Estas son algunas de las historias que nos compartieron.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="font-playfair text-2xl text-[#2D2A26]/60 mb-2">
              ¡Aún no hay comentarios!
            </p>
            <p className="font-dm-sans text-[#8B7355]">
              Sé el primero en dejar tu comentario.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setModalOpen(true)}
            className="relative overflow-hidden inline-flex items-center gap-2 bg-[#C9973A] text-white font-dm-sans font-semibold text-base px-8 py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-md shadow-[#C9973A]/30 cursor-pointer"
          >
            <span className="relative z-10">✍️ Dejá tu comentario</span>
            <span className="shimmer absolute inset-0" />
          </button>
        </motion.div>
      </div>

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={load}
      />
    </section>
  );
}