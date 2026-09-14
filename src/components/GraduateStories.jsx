import React, { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { GRADUATE_STORIES } from "../data/graduateStories.js";
import Reveal from "./Reveal.jsx";

function VideoCard({ story, onPlay }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-100 bg-white hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-950/5 transition-all duration-300 group">
      <button onClick={() => onPlay(story)} className="relative w-full aspect-video block">
        {/* Thumbnail — faqat rasm yuklanadi, video hech qachon avtomatik yuklanmaydi */}
        <img
          src={`https://img.youtube.com/vi/${story.videoId}/hqdefault.jpg`}
          alt={story.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo-950/30 group-hover:bg-indigo-950/45 transition-colors flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-indigo-700 ml-0.5" fill="currentColor" />
          </span>
        </div>
      </button>
      <div className="p-4">
        <div className="font-semibold text-indigo-950 text-sm">{story.name}</div>
        <div className="text-xs text-indigo-600 font-medium mt-0.5">{story.course}</div>
        <div className="text-xs text-slate-500 mt-1">{story.result}</div>
      </div>
    </div>
  );
}

function VideoModal({ story, onClose }) {
  useEffect(() => {
    if (!story) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-indigo-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl animate-[modalIn_0.25s_cubic-bezier(0.16,1,0.3,1)]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="rounded-2xl overflow-hidden aspect-video bg-black">
          {/* iframe faqat modal ochilganda, ya'ni foydalanuvchi bosgandan keyingina render qilinadi */}
          <iframe
            src={`https://www.youtube.com/embed/${story.videoId}?autoplay=1`}
            title={story.name}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function GraduateStories() {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Bitiruvchilarimiz hikoyalari</h2>
          <p className="text-slate-500 mt-3 max-w-md">O'quvchilarimizning o'z tilidan — markazdagi tajribasi va natijalari.</p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GRADUATE_STORIES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 90}>
              <VideoCard story={s} onPlay={setActive} />
            </Reveal>
          ))}
        </div>
      </div>

      <VideoModal story={active} onClose={() => setActive(null)} />
    </section>
  );
}
