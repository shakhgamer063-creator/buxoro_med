import React from "react";
import { ArrowRight } from "lucide-react";
import { scrollToId } from "../utils/scroll.js";
import Reveal from "./Reveal.jsx";

export default function BottomCTA({ onRegisterClick }) {
  return (
    <section className="bg-indigo-950 py-20 sm:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-violet-600/20 blur-3xl" />
      <Reveal className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Bugunoq o'qishni boshlang.</h2>
        <p className="text-indigo-300 mt-4">Bilimingizni rivojlantirish uchun birinchi qadamni hoziroq tashlang.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={onRegisterClick}
            className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold px-6 py-3.5 flex items-center gap-2 hover:scale-[1.04] active:scale-95 transition-transform duration-200"
          >
            Qabulga yozilish <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToId("kurslar")}
            className="rounded-full bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 hover:bg-white/15 hover:scale-[1.04] active:scale-95 transition-all duration-200"
          >
            Kurslarni ko'rish
          </button>
        </div>
      </Reveal>
    </section>
  );
}
