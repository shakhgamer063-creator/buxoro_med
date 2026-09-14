import React from "react";
import { useInView } from "../hooks/useInView.js";

/**
 * Yengil scroll-reveal wrapper.
 * Elementni ko'rinishga kirganda fade + slide-up animatsiyasi bilan chiqaradi.
 * Faqat CSS transition + IntersectionObserver ishlatadi — qo'shimcha
 * kutubxona yo'q, shuning uchun sahifa og'irlashmaydi.
 */
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", threshold = 0.15 }) {
  const [ref, inView] = useInView(threshold);
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
