import React from "react";

export default function TeacherCard({ t }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-lg hover:shadow-indigo-950/5 hover:-translate-y-1 transition-all duration-300">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-700 font-semibold text-xl">
        {t.name.split(" ").map((n) => n[0]).join("")}
      </div>
      <h3 className="font-semibold text-indigo-950 mt-4">{t.name}</h3>
      <p className="text-sm text-indigo-600 font-medium">{t.subject}</p>
      <p className="text-xs text-slate-400 mt-2">{t.exp} · {t.cert}</p>
      <p className="text-sm text-slate-500 mt-3 leading-relaxed">{t.bio}</p>
    </div>
  );
}
