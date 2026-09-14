import React from "react";
import { TEACHERS } from "../data/teachers.js";
import TeacherCard from "./TeacherCard.jsx";
import Reveal from "./Reveal.jsx";

export default function Teachers() {
  return (
    <section id="ustozlar" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">O'quv markazi ustozlari</h2>
          <p className="text-slate-500 mt-3 max-w-md">
            Har biri o'z sohasida sertifikatlangan va yillar davomida natija bergan mutaxassislar.
          </p>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEACHERS.map((t, i) => (
            <Reveal key={t.id} delay={(i % 4) * 80}>
              <TeacherCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
