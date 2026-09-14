import React from "react";
import { Quote } from "lucide-react";
import { PARENT_TESTIMONIALS } from "../data/parentTestimonials.js";
import Reveal from "./Reveal.jsx";

function TestimonialCard({ t }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-6 sm:p-7 relative hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-950/5 transition-all duration-300">
      <Quote className="w-8 h-8 text-indigo-100 absolute top-5 right-5" fill="currentColor" />
      <p className="text-slate-600 leading-relaxed italic relative">"{t.quote}"</p>
      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center text-amber-700 font-semibold text-sm shrink-0">
          {t.parentName[0]}
        </div>
        <div>
          <div className="font-semibold text-indigo-950 text-sm">{t.parentName}</div>
          <div className="text-xs text-slate-500">{t.childName} · {t.course}</div>
        </div>
      </div>
    </div>
  );
}

export default function ParentTestimonials() {
  return (
    <section id="ota-onalar" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Ota-onalarimiz biz haqimizda</h2>
          <p className="text-slate-500 mt-3 max-w-md">Farzandlari markazimizda o'qiyotgan ota-onalarning samimiy fikrlari.</p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PARENT_TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 90}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
