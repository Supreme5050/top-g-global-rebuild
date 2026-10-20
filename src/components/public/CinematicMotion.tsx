"use client";

import { useEffect } from "react";

/** Visual enhancement only: without JavaScript, content remains visible. */
export function CinematicMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-cinematic-root]");
    if (!root || !window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-cinematic-reveal]"));
    const observer = new IntersectionObserver((entries, activeObserver) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("cinema-is-visible");
          activeObserver.unobserve(entry.target);
        }
      }
    }, { threshold: 0.06, rootMargin: "0px 0px 40px 0px" });

    // Install the observer first. An unloaded client does not conceal content.
    elements.forEach((element) => observer.observe(element));
    root.setAttribute("data-cinematic-motion", "active");
    return () => {
      observer.disconnect();
      root.removeAttribute("data-cinematic-motion");
    };
  }, []);
  return null;
}
