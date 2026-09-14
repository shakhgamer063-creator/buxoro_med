import React from "react";
import Reveal from "./Reveal.jsx";

const PROCESS_STEPS = [
  { title: "Ro'yxatdan o'tish", desc: "Ariza formasini to'ldirasiz, administrator siz bilan bog'lanadi." },
  { title: "Darajani aniqlash", desc: "Qisqa suhbat orqali joriy darajangiz aniqlanadi." },
  { title: "Mos guruhga joylashish", desc: "Darajangiz va qulay vaqtga mos guruh tanlab beriladi." },
  { title: "O'qishni boshlash", desc: "Birinchi darsdan boshlab ustoz bilan reja asosida ilgarilaysiz." },
];

export default function Process() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight text-center">O'qish jarayoni</h2>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-4 gap-8 relative">
          <div className="hidden sm:block absolute top-5 left-[12%] right-[12%] h-px bg-slate-200" />
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 100} className="relative text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-indigo-950 text-white flex items-center justify-center font-semibold text-sm mx-auto sm:mx-0 relative z-10">
                {i + 1}
              </div>
              <h3 className="font-semibold text-indigo-950 mt-4">{s.title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
