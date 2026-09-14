import React from "react";
import { BarChart3, BookOpen, ChevronRight, Clock, Layers } from "lucide-react";

const CATEGORY_ICON = { til: BookOpen, aniq: BarChart3, it: Layers };

export default function CourseCard({ course, onOpen }) {
  const Icon = CATEGORY_ICON[course.category] || BookOpen;
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-indigo-950/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="h-28 bg-gradient-to-br from-indigo-600 to-violet-600 relative flex items-center justify-between px-5 overflow-hidden">
        <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
        <Icon className="w-7 h-7 text-white/70 relative" />
        <span className="text-white text-xs font-medium bg-white/15 rounded-full px-2.5 py-1 relative">{course.level}</span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-indigo-950 text-lg leading-snug">{course.title}</h3>
        <p className="text-xs text-indigo-600 font-medium mt-1">{course.tagline}</p>
        <p className="text-sm text-slate-500 mt-3 leading-relaxed flex-1">{course.desc}</p>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-slate-500"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
          <span className="font-semibold text-indigo-950">{course.price} so'm</span>
        </div>
        <button
          onClick={() => onOpen(course)}
          className="mt-4 w-full rounded-full border border-indigo-200 text-indigo-700 font-semibold text-sm py-2.5 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5"
        >
          Batafsil <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
