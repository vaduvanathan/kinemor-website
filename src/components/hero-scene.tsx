"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

/**
 * Renders the DGlove image as a small interactive scene instead of a static hero asset.
 * Pointer and scroll values are written as CSS variables so the visual work stays on the GPU.
 */
export function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, bounds.height);
      const progress = Math.max(0, Math.min(1, -bounds.top / distance));
      section.style.setProperty("--hero-scroll", progress.toFixed(3));
    };

    const requestScrollUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      section.style.setProperty("--hero-pointer-x", x.toFixed(3));
      section.style.setProperty("--hero-pointer-y", y.toFixed(3));
    };

    const clearPointer = () => {
      section.style.setProperty("--hero-pointer-x", "0");
      section.style.setProperty("--hero-pointer-y", "0");
    };

    updateScroll();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    section.addEventListener("pointermove", updatePointer);
    section.addEventListener("pointerleave", clearPointer);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      section.removeEventListener("pointermove", updatePointer);
      section.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <section className="hero-dossier" id="top" aria-labelledby="hero-title" ref={sectionRef}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-scanline" aria-hidden="true" />
      <div className="page-shell hero-dossier-shell">
        <div className="hero-media">
          <div className="hero-glove-motion" aria-hidden="true">
            <Image
              alt=""
              className="hero-glove-image"
              height={992}
              priority
              src="/images/dglove-palm.png"
              width={1586}
            />
          </div>
          <div className="hero-index hero-index-one" aria-hidden="true">01 / DGlove1</div>
          <div className="callout callout-sample" aria-hidden="true">
            <span className="callout-dot" />
            <strong>120Hz</strong>
            <small>target sampling</small>
          </div>
          <div className="callout callout-resolution" aria-hidden="true">
            <span className="callout-dot" />
            <strong>0.5mm</strong>
            <small>target pressure map</small>
          </div>
        </div>
        <div className="hero-copy-panel">
          <p className="eyebrow hero-kicker">KINEMOR / DGLOVE1 RESEARCH</p>
          <h1 id="hero-title">Data that helps robotic hands learn.</h1>
          <p className="hero-deck">
            We are building a research glove that records how people hold, move, and use real objects.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Start a conversation <ArrowUpRight aria-hidden="true" size={17} />
            </a>
            <a className="button button-quiet" href="#research">
              View research <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
        <p className="hero-scroll-cue" aria-hidden="true"><span /> Scroll to explore</p>
      </div>
    </section>
  );
}
