import React from "react";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { scrollToId } from "../utils/scroll.js";
import Reveal from "./Reveal.jsx";

export default function MidCTA() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 to-violet-600 py-16 sm:py-20">
      <Reveal className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Farzandingiz uchun to'g'ri yo'nalishni tanlang
        </h2>
        <p className="text-indigo-100 mt-3">Bepul maslahat oling yoki sinov darsiga yoziling — birinchi qadam bizdan.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => scrollToId("aloqa")}
            className="rounded-full bg-white text-indigo-700 font-semibold px-6 py-3.5 flex items-center gap-2 hover:scale-[1.04] active:scale-95 transition-transform duration-200"
          >
            Bepul maslahat olish <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToId("aloqa")}
            className="rounded-full bg-white/10 border border-white/30 text-white font-semibold px-6 py-3.5 flex items-center gap-2 hover:bg-white/20 hover:scale-[1.04] active:scale-95 transition-all duration-200"
          >
            <CalendarCheck className="w-4 h-4" /> Sinov darsiga yozilish
          </button>
        </div>
      </Reveal>
    </section>
  );
}
