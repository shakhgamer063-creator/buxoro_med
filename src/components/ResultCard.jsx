import React from "react";
import { ArrowRight } from "lucide-react";

export default function ResultCard({ r }) {
  return (
    <div className="group rounded-2xl bg-indigo-950 p-6 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-violet-600/30 blur-2xl group-hover:bg-violet-500/40 transition-colors duration-300" />
      <div className="flex items-center gap-3 relative">
        <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-sm">
          {r.initials}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{r.name}</div>
          <div className="text-indigo-300 text-xs">{r.type}</div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3 relative">
        <span className="text-indigo-300 text-sm line-through">{r.prev}</span>
        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-amber-400 text-2xl font-semibold">{r.result}</span>
      </div>
    </div>
  );
}
