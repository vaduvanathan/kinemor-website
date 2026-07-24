import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark, type LogoVariant } from "@/components/brand-mark";

export const metadata: Metadata = {
  title: "Brand directions",
  robots: { index: false, follow: false },
};

const directions: Array<{
  note: string;
  title: string;
  variant: LogoVariant;
}> = [
  {
    variant: "aperture",
    title: "Kinetic Aperture",
    note: "The selected direction. A precise K opens into two paths: perception entering, action leaving.",
  },
  {
    variant: "orbit",
    title: "Signal Orbit",
    note: "A measurement orbit finding its target. The most sensor-led and scientific direction.",
  },
  {
    variant: "axis",
    title: "Motion Axis",
    note: "Coordinates, orientation, and motion in one compact mark. The most technical direction.",
  },
  {
    variant: "frame",
    title: "Frame Shift",
    note: "A captured frame with a diagonal time shift. The most data-capture-led direction.",
  },
  {
    variant: "link",
    title: "Continuum Link",
    note: "Two systems sharing one signal. The most collaborative direction, but less distinct than the aperture.",
  },
];

export default function BrandOptionsPage() {
  return (
    <main className="brand-options-page">
      <header className="brand-options-header">
        <Link href="/" className="brand-options-wordmark">Kinemor</Link>
        <p>Brand directions / July 2026</p>
      </header>
      <section className="brand-options-intro">
        <p className="eyebrow ink-eyebrow">MARK STUDY</p>
        <h1>Five marks. One coherent system.</h1>
        <p>Each option is designed to work at favicon scale, on hardware, in a browser tab, and across a future product family.</p>
      </section>
      <section className="brand-option-grid" aria-label="Kinemor logo directions">
        {directions.map((direction, index) => (
          <article className="brand-option" key={direction.variant}>
            <span>0{index + 1}</span>
            <LogoMark className="brand-option-mark" variant={direction.variant} />
            <div>
              <h2>{direction.title}</h2>
              <p>{direction.note}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
