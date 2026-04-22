"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { buildWhatsAppLink } from "@/lib/whatsapp";

const navLinks = [
  { label: "Eventos", href: "#eventos" },
  { label: "Menú Shabat", href: "#menu-shabat" },
];

function StarOfDavid() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-primary inline-block"
      aria-hidden="true"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-secondary/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 group"
              aria-label="Gonzalo Legarda Cocina Judía - inicio"
            >
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-playfair font-bold text-xl text-primary tracking-tight group-hover:text-primary/80 transition-colors">
                    Gonzalo Legarda
                  </span>
                  <StarOfDavid />
                </div>
                <span className="font-dm-sans text-[10px] font-medium tracking-widest uppercase text-cream/50 group-hover:text-cream/70 transition-colors">
                  Cocina Judía
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-dm-sans text-sm font-medium text-cream/80 hover:text-primary transition-colors relative group cursor-pointer"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden font-dm-sans text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors min-h-[44px] flex items-center"
              >
                <span className="relative z-10">Consultá por WhatsApp</span>
                <span className="shimmer absolute inset-0 opacity-0 hover:opacity-100 transition-opacity" />
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-cream hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-secondary flex flex-col pt-20 pb-8 px-6 md:hidden"
              aria-label="Menú móvil"
            >
              <button
                className="absolute top-4 right-4 p-2 text-cream hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleNavClick(link.href)}
                    className="font-playfair text-xl text-cream hover:text-primary transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-4">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans font-semibold bg-primary text-white px-5 py-3 rounded-full text-center hover:bg-primary/90 transition-colors min-h-[44px] flex items-center justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Consultá por WhatsApp
                </a>
                <a
                  href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_USER ?? "gonzalegarda"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cream/70 hover:text-primary transition-colors min-h-[44px]"
                  onClick={() => setMobileOpen(false)}
                >
                  <InstagramIcon size={18} />
                  <span className="font-dm-sans text-sm">@gonzalegarda</span>
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
