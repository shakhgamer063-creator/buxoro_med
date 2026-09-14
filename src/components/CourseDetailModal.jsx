import React, { useEffect } from "react";
import { ArrowRight, CheckCircle2, Trophy, X } from "lucide-react";

export default function CourseDetailModal({ course, onClose, onRegister }) {
  useEffect(() => {
    if (!course) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-indigo-950/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto animate-[modalIn_0.25s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-36 bg-gradient-to-br from-indigo-600 to-violet-600 relative rounded-t-3xl flex items-end p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 hover:rotate-90 transition-all duration-300 flex items-center justify-center text-white"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <span className="text-white/90 text-xs font-medium bg-white/15 rounded-full px-2.5 py-1">{course.level}</span>
            <h3 className="text-white text-2xl font-semibold mt-2">{course.title}</h3>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-slate-600 leading-relaxed">{course.desc}</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-slate-400 text-xs">Davomiyligi</div>
              <div className="font-semibold text-indigo-950 mt-0.5">{course.duration}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-slate-400 text-xs">Haftalik darslar</div>
              <div className="font-semibold text-indigo-950 mt-0.5">{course.weekly}</div>
            </div>
            {course.lessonsCount && (
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-slate-400 text-xs">Darslar soni</div>
                <div className="font-semibold text-indigo-950 mt-0.5">{course.lessonsCount} ta dars</div>
              </div>
            )}
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-slate-400 text-xs">Ishlatiladigan kitob</div>
              <div className="font-semibold text-indigo-950 mt-0.5">{course.book}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-slate-400 text-xs">Ustoz</div>
              <div className="font-semibold text-indigo-950 mt-0.5">{course.teacher}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="font-semibold text-indigo-950 mb-3">Kurs dasturi</div>
            <ul className="space-y-2">
              {course.program.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>

          {course.resultsNote && (
            <div className="mt-6 rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-3 flex items-start gap-2.5">
              <Trophy className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
              <p className="text-sm text-indigo-900 leading-relaxed">{course.resultsNote}</p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between flex-wrap gap-4 border-t border-slate-100 pt-6">
            <div>
              <div className="text-xs text-slate-400">Kurs narxi</div>
              <div className="text-2xl font-semibold text-indigo-950">
                {course.price} so'm<span className="text-sm text-slate-400 font-normal"> /oy</span>
              </div>
            </div>
            <button
              onClick={() => { onRegister(course.title); onClose(); }}
              className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 font-semibold px-6 py-3 flex items-center gap-2 hover:scale-[1.04] active:scale-95 transition-transform duration-200"
            >
              Qabulga yozilish <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
