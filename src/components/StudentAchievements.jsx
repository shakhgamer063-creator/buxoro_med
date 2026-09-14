import React from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { STUDENT_ACHIEVEMENTS } from "../data/studentAchievements.js";
import Reveal from "./Reveal.jsx";

function AchievementCard({ a }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-950/5 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-700 font-semibold">
          {a.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <div className="font-semibold text-indigo-950">{a.name}</div>
          <div className="text-xs text-indigo-600 font-medium">{a.course}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1.5">
          <Sparkles className="w-3.5 h-3.5" /> {a.result}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
        <GraduationCap className="w-4 h-4 text-slate-400" /> {a.place}
      </div>

      <p className="text-sm text-slate-500 mt-3 leading-relaxed">{a.note}</p>
    </div>
  );
}

export default function StudentAchievements() {
  return (
    <section id="yutuqlar" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">O'quvchilarimiz natijalari</h2>
          <p className="text-slate-500 mt-3 max-w-md">Biz uchun eng katta natija — o'quvchilarimizning yutuqlari.</p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STUDENT_ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 90}>
              <AchievementCard a={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
