import React from "react";
import { Landmark } from "lucide-react";
import { UNIVERSITIES } from "../data/universities.js";
import Reveal from "./Reveal.jsx";

export default function Universities() {
  return (
    <section id="bitiruvchilar" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">
            Bitiruvchilarimiz qayerlarda tahsil olmoqda?
          </h2>
          <p className="text-slate-500 mt-3 max-w-md">Markazimiz bitiruvchilari qabul qilingan universitet va ta'lim muassasalari.</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {UNIVERSITIES.map((u, i) => (
            <Reveal key={u.id} delay={(i % 6) * 60}>
              <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-950/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto">
                  <Landmark className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-indigo-950 text-sm mt-3 leading-snug">{u.name}</div>
                <div className="text-xs text-slate-500 mt-1">{u.count} nafar bitiruvchi</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
