import React from "react";
import { Camera } from "lucide-react";
import { GALLERY_ITEMS } from "../data/gallery.js";
import Reveal from "./Reveal.jsx";

function GalleryTile({ item }) {
  if (item.image) {
    return (
      <div className="relative rounded-2xl overflow-hidden aspect-square group">
        <img src={item.image} alt={item.caption} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent flex items-end p-4">
          <span className="text-white text-sm font-medium">{item.caption}</span>
        </div>
      </div>
    );
  }
  // Rasm hali qo'shilmagan bo'lsa — stilizatsiya qilingan gradient plitka
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-br from-indigo-600 to-violet-600 flex flex-col items-center justify-center gap-2 group hover:brightness-110 transition-all duration-300">
      <Camera className="w-7 h-7 text-white/70" />
      <span className="text-white text-xs font-medium text-center px-3">{item.caption}</span>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="galereya" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Markazimiz hayotidan</h2>
          <p className="text-slate-500 mt-3 max-w-md">Dars jarayoni, tadbirlar, imtihonlar va bitiruv kunlaridan lavhalar.</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={(i % 6) * 60}>
              <GalleryTile item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
