import type { Metadata } from "next";
import { Check } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "DGlove1 | Hand Data Research",
  description: "DGlove1 is Kinemor's research prototype for collecting contact-rich hand manipulation data.",
};

const signals = ["Pressure across the hand", "Contact location and grip patterns", "Wrist motion", "Acoustic hand-pose research", "Timestamped task context"];

export default function GlovePage() {
  return (
    <main className="site-main feature-page">
      <Navigation />
      <HeroScene />
      <section className="feature-copy-band" aria-labelledby="glove-purpose-title">
        <div className="page-shell feature-copy-layout">
          <Reveal><p className="eyebrow ink-eyebrow">WHY WE ARE BUILDING IT</p></Reveal>
          <Reveal delay={80}>
            <h2 id="glove-purpose-title">Robotic hands need to learn how contact feels.</h2>
          </Reveal>
          <Reveal delay={140} className="feature-body-copy">
            <p>DGlove1 is an early research prototype for recording how people grasp, hold, and move real objects.</p>
            <p>It is designed to help create better training data for robotic hands. It is not a finished product.</p>
          </Reveal>
        </div>
      </section>
      <section className="feature-list-band" aria-labelledby="glove-signals-title">
        <div className="page-shell feature-list-layout">
          <Reveal><p className="eyebrow">PLANNED DATA</p><h2 id="glove-signals-title">Signals we are exploring</h2></Reveal>
          <div className="feature-signal-list">
            {signals.map((signal, index) => <Reveal delay={index * 55} key={signal}><p><Check aria-hidden="true" size={17} /> {signal}</p></Reveal>)}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
