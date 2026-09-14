import React from "react";
import { Award, GraduationCap, TrendingUp, Users } from "lucide-react";
import { ACHIEVEMENT_STATS } from "../data/achievementStats.js";
import Reveal from "./Reveal.jsx";
import Counter from "./Counter.jsx";

const ICONS = { users: Users, award: Award, graduation: GraduationCap, trending: TrendingUp };

export default function AchievementStatsBanner() {
  return (
    <section className="bg-indigo-950 py-16 sm:py-20 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-violet-600/15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">Raqamlarda natijalarimiz</h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {ACHIEVEMENT_STATS.map((s, i) => {
            const Icon = ICONS[s.icon] || Users;
            return (
              <Reveal key={i} delay={i * 80} className="text-center">
                <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-semibold text-white">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-indigo-300 mt-1">{s.label}</div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
