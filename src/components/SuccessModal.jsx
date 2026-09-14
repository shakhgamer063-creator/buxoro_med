import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export default function SuccessModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-indigo-950/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center animate-[modalIn_0.25s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-semibold text-indigo-950 mt-5">Arizangiz muvaffaqiyatli yuborildi!</h3>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">Tez orada administratorimiz siz bilan bog'lanadi.</p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-indigo-950 text-white font-semibold py-3 hover:bg-indigo-900 active:scale-95 transition-all duration-200"
        >
          Yopish
        </button>
      </div>
    </div>
  );
}
