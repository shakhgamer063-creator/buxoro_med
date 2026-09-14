import React from "react";
import { BarChart3, GraduationCap, Layers, MapPin, Sparkles, TrendingUp } from "lucide-react";
import Reveal from "./Reveal.jsx";

const ADVANTAGES = [
  { icon: GraduationCap, title: "Tajribali ustozlar", desc: "Har biri o'z sohasida sertifikatlangan mutaxassis." },
  { icon: TrendingUp, title: "Real natijalar", desc: "1000+ o'quvchi tasdiqlagan isbotlangan metodika." },
  { icon: Sparkles, title: "Zamonaviy metodika", desc: "Interaktiv va amaliyotga yo'naltirilgan darslar." },
  { icon: Layers, title: "Daraja bo'yicha guruhlar", desc: "Har bir o'quvchi o'z darajasiga mos guruhda o'qiydi." },
  { icon: MapPin, title: "Qulay filiallar", desc: "Shahar bo'ylab 3 ta filial, uyingizga yaqin joyni tanlang." },
  { icon: BarChart3, title: "Doimiy monitoring", desc: "Har oylik progress-testlar va ota-onalarga hisobot." },
];

export default function WhyUs() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-950 tracking-tight">Nega aynan biz?</h2>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((a, i) => (
            <Reveal key={i} delay={(i % 3) * 90}>
              <div className="rounded-2xl bg-white border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-950/5 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <a.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-indigo-950 mt-4">{a.title}</h3>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
