"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

const navItems = [
  { href: "/admin/reviews", label: "Reviews", icon: StarIcon },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBagIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (pathname === "/admin") { setChecked(true); return; }
    if (sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  if (!checked) return null;
  if (pathname === "/admin") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#1e1c19] flex">
      <aside className="w-60 bg-[#2D2A26] flex flex-col border-r border-white/5 flex-shrink-0">
        <div className="px-6 py-6 border-b border-white/5">
          <h1 className="font-playfair font-bold text-lg text-[#C9973A] leading-tight">Gonzalo Legarda</h1>
          <p className="font-dm-sans text-xs text-[#FDF6EC]/40 mt-0.5">Panel Admin</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-dm-sans text-sm font-medium transition-colors ${
                  active ? "bg-[#C9973A]/15 text-[#C9973A]" : "text-[#FDF6EC]/50 hover:text-[#FDF6EC]/80 hover:bg-white/5"
                }`}
              >
                <Icon />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-dm-sans text-sm font-medium text-[#FDF6EC]/50 hover:text-[#E63946] hover:bg-[#E63946]/10 transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
