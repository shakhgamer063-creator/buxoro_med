import React from "react";
import { Clock, Instagram, MapPin, Phone, Send, Stethoscope } from "lucide-react";
import { NAV_LINKS } from "../data/nav.js";
import { COURSES } from "../data/courses.js";
import { scrollToId } from "../utils/scroll.js";

export default function Footer() {
  return (
    <footer className="bg-indigo-950 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 text-white" />
            </span>
            <span className="font-semibold text-lg text-white">Buxoro Med Academy</span>
          </div>
          <p className="text-sm text-indigo-300 mt-4 leading-relaxed">Zamonaviy ta'lim markazi — bilimni natijaga aylantiramiz.</p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200">
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Menyu</h4>
          <div className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
                className="block text-sm text-indigo-300 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Kurslar</h4>
          <div className="space-y-2.5">
            {COURSES.slice(0, 5).map((c) => (
              <a
                key={c.id}
                href="#kurslar"
                onClick={(e) => { e.preventDefault(); scrollToId("kurslar"); }}
                className="block text-sm text-indigo-300 hover:text-white transition-colors"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Aloqa</h4>
          <div className="space-y-2.5 text-sm text-indigo-300">
            <a href="tel:+998712001010" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" /> +998 71 200 10 10
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Chilonzor tumani, Bunyodkor shoh ko'chasi, 12
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Dush–Shan: 09:00–20:00
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-white/5 text-xs text-indigo-400">
        © {new Date().getFullYear()} Buxoro Med Academy. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
