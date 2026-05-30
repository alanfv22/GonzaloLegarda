"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("admin_auth", "true");
        router.push("/admin/reviews");
      } else {
        setError("Contraseña incorrecta");
      }
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2D2A26] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-playfair font-bold text-3xl text-[#C9973A]">Gonzalo Legarda</h1>
          <p className="font-dm-sans text-[#FDF6EC]/50 text-sm mt-1">Panel de administración</p>
        </div>
        <div className="bg-[#3a3630] rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block font-dm-sans text-sm font-medium text-[#FDF6EC]/70 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#2D2A26] border border-white/10 rounded-lg px-4 py-3 font-dm-sans text-sm text-[#FDF6EC] placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#C9973A]/50 focus:border-[#C9973A] transition-all"
              />
              {error && <p className="mt-2 text-xs text-[#E63946] flex items-center gap-1">⚠️ {error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#C9973A] text-white font-dm-sans font-semibold text-base px-6 py-3.5 rounded-xl hover:brightness-110 transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
            >
              {loading ? <><Spinner /> Verificando...</> : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
