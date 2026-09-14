import React from "react";
import { ArrowRight, Award, Sparkles, TrendingUp, Users } from "lucide-react";
import { scrollToId } from "../utils/scroll.js";

const TRUST_ITEMS = [
  { icon: Users, text: "5000+ o'quvchi" },
  { icon: Award, text: "300+ sertifikat" },
  { icon: TrendingUp, text: "100+ yuqori natija" },
];

export default function Hero({ onRegisterClick }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-indigo-950 pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative text-center">
        <div className="animate-hero-in inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-indigo-100 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          2013-yildan buyon natijaga xizmat qilamiz
        </div>

        <h1
          className="animate-hero-in text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold text-white tracking-tight"
          style={{ animationDelay: "80ms" }}
        >
          Bilimingizni natijaga aylantiring.
        </h1>

        <p
          className="animate-hero-in mt-6 text-lg text-indigo-200 max-w-xl mx-auto leading-relaxed"
          style={{ animationDelay: "160ms" }}
        >
          Zamonaviy ta'lim, kuchli ustozlar va real natijalar bilan kelajagingizni quring.
        </p>

        <div className="animate-hero-in mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: "240ms" }}>
          <button
            onClick={onRegisterClick}
            className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold px-6 py-3.5 flex items-center gap-2 hover:brightness-105 hover:scale-[1.04] active:scale-95 transition-all duration-200 shadow-lg shadow-amber-500/20"
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

        <div
          className="animate-hero-in mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3"
          style={{ animationDelay: "320ms" }}
        >
          {TRUST_ITEMS.map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-indigo-200 text-sm">
              <t.icon className="w-4 h-4 text-amber-400" /> {t.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
