"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Review, timeAgo } from "@/lib/reviews";

function capitalize(str: string) {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function capitalizeSentence(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < count ? "#C9973A" : "none"}
          stroke="#C9973A"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md shadow-black/5 border border-[#e8dcc8]/60 overflow-hidden hover:shadow-lg hover:shadow-black/10 transition-shadow duration-300 flex flex-col"
    >
      {/* Foto arriba */}
      {review.foto_url ? (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={review.foto_url}
            alt={`Foto de ${review.nombre}`}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#C9973A]/20 to-[#FDF6EC] flex items-center justify-center">
          <span className="font-playfair font-bold text-7xl text-[#C9973A]/40">
            {capitalize(review.nombre).charAt(0)}
          </span>
        </div>
      )}

      {/* Contenido */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <Stars count={review.estrellas} />
        <p className="font-dm-sans text-sm text-[#2D2A26]/80 leading-relaxed">
          {capitalizeSentence(review.texto)}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#e8dcc8]/60">
          <p className="font-dm-sans font-semibold text-sm text-[#2D2A26]">
            — {capitalize(review.nombre)}
          </p>
          <p className="font-dm-sans text-xs text-[#8B7355]">
            {timeAgo(review.created_at)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
