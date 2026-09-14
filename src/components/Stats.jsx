import React from "react";
import { Award, Layers, TrendingUp, Users } from "lucide-react";
import { STATS } from "../data/stats.js";
import Reveal from "./Reveal.jsx";
import Counter from "./Counter.jsx";

const ICONS = { users: Users, award: Award, trending: TrendingUp, layers: Layers };

export default function Stats() {
  return (
    <section className="bg-white py-14 sm:py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => {
          const Icon = ICONS[s.icon] || Users;
          return (
            <Reveal key={i} delay={i * 80} className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-indigo-600 mb-2">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-semibold text-indigo-950">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
