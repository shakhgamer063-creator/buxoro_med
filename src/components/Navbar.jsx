import React, { useEffect, useState } from "react";
import { Menu, Stethoscope, X } from "lucide-react";
import { NAV_LINKS } from "../data/nav.js";
import { scrollToId } from "../utils/scroll.js";

export default function Navbar({ onRegisterClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menyu ochiq bo'lsa fon scrollini bloklaymiz (mobil UX)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md shadow-indigo-950/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToId("hero"); }}
          className="flex items-center gap-2 shrink-0 group"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shrink-0">
            <Stethoscope className="w-5 h-5 text-white" />
          </span>
          <span className="font-semibold text-base sm:text-lg tracking-tight text-indigo-950 leading-tight">Buxoro Med Academy</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
              className="relative text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={onRegisterClick}
            className="rounded-full bg-indigo-950 text-white text-sm font-semibold px-5 py-2.5 hover:bg-indigo-900 hover:scale-[1.04] active:scale-95 transition-all duration-200"
          >
            Qabulga yozilish
          </button>
        </div>

        <button
          className="lg:hidden p-2 text-indigo-950 relative z-10"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menyu"
          aria-expanded={open}
        >
          <span className="relative w-6 h-6 block">
            <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`} />
            <X className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`} />
          </span>
        </button>
      </div>

      {/* Mobil menyu — max-height/opacity orqali silliq ochilib-yopiladi */}
      <div
        className={`lg:hidden overflow-hidden bg-white border-t border-slate-100 shadow-lg transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4 space-y-1">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); scrollToId(l.id); setOpen(false); }}
              className="block py-2.5 text-slate-700 font-medium border-b border-slate-50 last:border-0 transition-all duration-300"
              style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { onRegisterClick(); setOpen(false); }}
            className="w-full mt-3 rounded-full bg-indigo-950 text-white text-sm font-semibold px-5 py-3 active:scale-95 transition-transform"
          >
            Qabulga yozilish
          </button>
        </div>
      </div>
    </header>
  );
}
