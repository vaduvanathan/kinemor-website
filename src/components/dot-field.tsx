"use client";

import { useEffect, useRef } from "react";

/**
 * Draws a quiet measurement grid whose nearby points brighten as the visitor moves.
 * It gives the hero a responsive data surface without putting a decorative object in front of the message.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const pointer = { x: -1000, y: -1000 };
    const target = { x: -1000, y: -1000 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const paint = () => {
      context.clearRect(0, 0, width, height);
      const spacing = width < 700 ? 25 : 31;
      const radius = width < 700 ? 115 : 158;
      const radiusSquared = radius * radius;

      for (let y = spacing * 0.65; y < height; y += spacing) {
        for (let x = spacing * 0.65; x < width; x += spacing) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distanceSquared = dx * dx + dy * dy;
          const influence = Math.max(0, 1 - distanceSquared / radiusSquared);
          const baseOpacity = 0.16;
          const opacity = baseOpacity + influence * 0.78;
          const dotRadius = 0.82 + influence * 1.6;

          context.beginPath();
          context.arc(x, y, dotRadius, 0, Math.PI * 2);
          context.fillStyle = influence > 0.05
            ? `rgba(183, 255, 79, ${opacity.toFixed(3)})`
            : `rgba(229, 236, 222, ${opacity.toFixed(3)})`;
          context.fill();
        }
      }
    };

    const render = () => {
      pointer.x += (target.x - pointer.x) * 0.16;
      pointer.y += (target.y - pointer.y) * 0.16;
      paint();
      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      paint();
    };

    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      target.x = inside ? event.clientX - bounds.left : -1000;
      target.y = inside ? event.clientY - bounds.top : -1000;
    };

    const leave = () => {
      target.x = -1000;
      target.y = -1000;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", leave);
    resize();
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", leave);
    };
  }, []);

  return <canvas aria-hidden="true" className="dot-field" ref={canvasRef} />;
}
