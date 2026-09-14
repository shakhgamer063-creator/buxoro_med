import React, { useMemo, useState } from "react";
import { COURSES, COURSE_FILTERS } from "../data/courses.js";
import CourseCard from "./CourseCard.jsx";
import Reveal from "./Reveal.jsx";

export default function Courses({ onOpenCourse }) {
  const [filter, setFilter] = useState("barcha");
  const filtered = useMemo(
    () => (filter === "barcha" ? COURSES : COURSES.filter((c) => c.category === filter)),
    [filter]
  );

  return (
    <section id="kurslar" className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Bizning kurslarimiz</h2>
          <p className="text-slate-500 mt-3 max-w-md">
            Har bir yo'nalish aniq dastur, tajribali ustoz va o'lchanadigan natija bilan.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-6 flex flex-row flex-nowrap gap-2 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {COURSE_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                filter === f.id
                  ? "bg-indigo-950 text-white shadow-md shadow-indigo-950/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 90}>
              <CourseCard course={c} onOpen={onOpenCourse} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
