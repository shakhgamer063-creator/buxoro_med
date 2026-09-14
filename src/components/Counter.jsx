import React, { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView.js";

export default function Counter({ value, suffix = "" }) {
  const [ref, inView] = useInView(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}{suffix}
    </span>
  );
}
