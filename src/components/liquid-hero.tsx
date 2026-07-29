"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { DotField } from "@/components/dot-field";

/**
 * A cursor-responsive frosted surface used as the Kinemor home-page signature.
 * Glass layers respond to the pointer while the data field underneath responds at point level.
 */
export function LiquidHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const moveHighlight = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      hero.style.setProperty("--liquid-x", `${(x * 100).toFixed(2)}%`);
      hero.style.setProperty("--liquid-y", `${(y * 100).toFixed(2)}%`);
      hero.style.setProperty("--liquid-shift-x", `${((x - 0.5) * 42).toFixed(1)}px`);
      hero.style.setProperty("--liquid-shift-y", `${((y - 0.5) * 28).toFixed(1)}px`);
      hero.style.setProperty("--liquid-shift-x-inverse", `${((0.5 - x) * 23).toFixed(1)}px`);
      hero.style.setProperty("--liquid-shift-y-inverse", `${((0.5 - y) * 15).toFixed(1)}px`);
    };

    const resetHighlight = () => {
      hero.style.setProperty("--liquid-x", "72%");
      hero.style.setProperty("--liquid-y", "28%");
      hero.style.setProperty("--liquid-shift-x", "0px");
      hero.style.setProperty("--liquid-shift-y", "0px");
      hero.style.setProperty("--liquid-shift-x-inverse", "0px");
      hero.style.setProperty("--liquid-shift-y-inverse", "0px");
    };

    hero.addEventListener("pointermove", moveHighlight);
    hero.addEventListener("pointerleave", resetHighlight);
    return () => {
      hero.removeEventListener("pointermove", moveHighlight);
      hero.removeEventListener("pointerleave", resetHighlight);
    };
  }, []);

  return (
    <section className="liquid-hero" aria-labelledby="home-title" ref={heroRef}>
      <div className="liquid-surface" aria-hidden="true">
        <DotField />
        <div className="liquid-reflection" />
        <div className="liquid-sweep" />
        <div className="liquid-lens liquid-lens-large" />
        <div className="liquid-lens liquid-lens-small" />
        <div className="liquid-contour liquid-contour-one" />
        <div className="liquid-contour liquid-contour-two" />
        <p className="liquid-index">KINEMOR / 01</p>
        <p className="liquid-status"><i /> LIVE FIELD SYSTEMS</p>
      </div>
      <div className="page-shell liquid-hero-shell">
        <div className="liquid-copy">
          <p className="eyebrow">DATA FOR ROBOTS</p>
          <h1 id="home-title">Help robots learn from real work.</h1>
          <p>
            Kinemor works with robotics teams to collect, organize, and deliver useful data from the physical world.
          </p>
          <div className="liquid-actions">
            <Link className="button button-primary" href="/contact">
              Talk to us <ArrowDownRight aria-hidden="true" size={17} />
            </Link>
            <Link className="text-link" href="#how-it-works">See how it works <ArrowDownRight aria-hidden="true" size={17} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
