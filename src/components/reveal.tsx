"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const fallback = window.setTimeout(() => {
      element.dataset.revealed = "true";
    }, 900 + delay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.revealed = "true";
          window.clearTimeout(fallback);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      className={`reveal-block ${className}`}
      ref={elementRef}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
