import type { ReactNode } from "react";

export type LogoVariant = "aperture" | "orbit" | "axis" | "frame" | "link";

type LogoMarkProps = {
  className?: string;
  variant?: LogoVariant;
};

const paths: Record<LogoVariant, ReactNode> = {
  aperture: (
    <>
      <path d="M10 7v34" />
      <path d="m15 24 22-17" />
      <path d="m15 24 22 17" />
      <circle cx="15" cy="24" r="3.25" className="mark-signal" />
    </>
  ),
  orbit: (
    <>
      <path d="M24 7a17 17 0 1 0 17 17" />
      <path d="M41 11v13H28" />
      <circle cx="24" cy="24" r="3" className="mark-signal" />
    </>
  ),
  axis: (
    <>
      <path d="M24 7v34M7 24h34" />
      <path d="m17 17 14 14M31 17 17 31" />
      <circle cx="24" cy="24" r="3.4" className="mark-signal" />
    </>
  ),
  frame: (
    <>
      <path d="M9 18V9h9M39 30v9h-9M30 9h9v9M18 39H9v-9" />
      <path d="M16 31 31 16" />
      <circle cx="24" cy="24" r="3" className="mark-signal" />
    </>
  ),
  link: (
    <>
      <path d="M14 31a11 11 0 1 1 0-14" />
      <path d="M34 17a11 11 0 1 1 0 14" />
      <path d="m18 24 12 0" />
      <circle cx="24" cy="24" r="3" className="mark-signal" />
    </>
  ),
};

export function LogoMark({ className, variant = "aperture" }: LogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="mark-stroke">{paths[variant]}</g>
    </svg>
  );
}

export function BrandMark() {
  return <LogoMark className="brand-mark" />;
}
