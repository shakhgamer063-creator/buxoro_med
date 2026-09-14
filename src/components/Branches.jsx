import React from "react";
import { Compass } from "lucide-react";
import { BRANCHES } from "../data/branches.js";
import BranchCard from "./BranchCard.jsx";
import Reveal from "./Reveal.jsx";

export default function Branches() {
  return (
    <section id="filiallar" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Bizning filiallarimiz</h2>
          <p className="text-slate-500 mt-3 max-w-md">Sizga eng qulay filialni tanlang.</p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BRANCHES.map((b, i) => (
            <Reveal key={b.id} delay={i * 90}>
              <BranchCard b={b} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8 rounded-2xl border border-dashed border-slate-200 h-56 flex items-center justify-center text-slate-400 text-sm bg-slate-50">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5" /> Interaktiv xarita shu yerda joylashadi (OpenStreetMap / Google Maps iframe)
          </div>
        </Reveal>
      </div>
    </section>
  );
}
