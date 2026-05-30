import { supabase } from "@/lib/supabase";

export interface Review {
  id: string;
  store_id: string;
  nombre: string;
  texto: string;
  estrellas: number;
  foto_url: string | null;
  created_at: string;
}

const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID!;
const BUCKET = "Gonzalo-Legarda";

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("store_id", STORE_ID)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function insertReview(review: {
  nombre: string;
  texto: string;
  estrellas: number;
  foto_url: string | null;
}): Promise<void> {
  const { error } = await supabase.from("reviews").insert({
    store_id: STORE_ID,
    ...review,
  });
  if (error) throw error;
}

export async function updateReview(
  id: string,
  fields: { nombre: string; texto: string; estrellas: number; foto_url?: string | null }
): Promise<void> {
  const { error } = await supabase
    .from("reviews")
    .update(fields)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteReview(review: Review): Promise<void> {
  if (review.foto_url) {
    const path = review.foto_url.split(`${BUCKET}/`)[1];
    if (path) {
      await supabase.storage.from(BUCKET).remove([path]);
    }
  }
  const { error } = await supabase.from("reviews").delete().eq("id", review.id);
  if (error) throw error;
}

export async function deleteFotoFromStorage(fotoUrl: string): Promise<void> {
  const path = fotoUrl.split(`${BUCKET}/`)[1];
  if (path) {
    await supabase.storage.from(BUCKET).remove([path]);
  }
}

export async function uploadFoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `Comentarios/${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `hace ${years} ${years === 1 ? "año" : "años"}`;
  if (months > 0) return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
  if (days > 0) return `hace ${days} ${days === 1 ? "día" : "días"}`;
  if (hours > 0) return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
  if (minutes > 0) return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  return "hace un momento";
}
