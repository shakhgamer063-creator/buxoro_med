import React from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";

export default function BranchCard({ b }) {
  return (
    <div
      className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        b.isMain ? "border-amber-300 bg-amber-50/40" : "border-slate-100 bg-white"
      } relative`}
    >
      {b.isMain && (
        <span className="absolute -top-3 left-6 bg-amber-400 text-indigo-950 text-[11px] font-semibold rounded-full px-3 py-1">
          Asosiy filial
        </span>
      )}
      <h3 className="font-semibold text-indigo-950 text-lg mt-1">{b.name}</h3>
      <div className="mt-4 space-y-2.5 text-sm text-slate-600">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> {b.address}
        </div>
        <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-indigo-700 transition-colors">
          <Phone className="w-4 h-4 text-indigo-500 shrink-0" /> {b.phone}
        </a>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-500 shrink-0" /> {b.hours}
        </div>
      </div>
      <a
        href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(b.address)}`}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-900 group"
      >
        Xaritada ko'rish <Navigation className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
}
