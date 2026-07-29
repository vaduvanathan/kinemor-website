import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Open Worlds | Real-World Data Programs",
  description: "Permissioned real-world data collection for robotics teams working in industrial environments.",
};

const outputs = ["Video and sensor recordings", "Clear task and location notes", "Privacy review and redaction", "Organized files and metadata", "Quality checks before delivery"];

/** Explains Kinemor's real-world capture programs without reducing them to a single industry. */
export default function OpenWorldsPage() {
  return (
    <main className="site-main feature-page">
      <Navigation />
      <section className="factory-hero" aria-labelledby="open-worlds-title">
        <div className="page-shell factory-hero-shell">
          <Reveal className="factory-hero-copy">
            <p className="eyebrow">OPEN WORLDS</p>
            <h1 id="open-worlds-title">Capture the work robots need to understand.</h1>
            <p>We help robotics teams collect useful, permissioned data from real industrial environments.</p>
            <Link className="button button-primary" href="/contact">Plan a data program <ArrowUpRight aria-hidden="true" size={17} /></Link>
          </Reveal>
          <Reveal delay={120} className="factory-image-frame">
            <Image alt="Industrial robotics workspace" className="factory-image" height={1024} priority src="/images/kinemor-industrial-worlds.png" width={1792} />
          </Reveal>
        </div>
      </section>
      <section className="feature-copy-band" aria-labelledby="open-worlds-purpose-title">
        <div className="page-shell feature-copy-layout">
          <Reveal><p className="eyebrow ink-eyebrow">REAL PLACES, CLEAR PERMISSION</p></Reveal>
          <Reveal delay={80}><h2 id="open-worlds-purpose-title">The details around a task are as important as the task itself.</h2></Reveal>
          <Reveal delay={140} className="feature-body-copy"><p>We record the environment, objects, movement, and task context that help a robotics team understand what the data means.</p><p>Every program starts with site permission and a privacy plan for people, badges, screens, documents, and sensitive equipment.</p></Reveal>
        </div>
      </section>
      <section className="feature-list-band" aria-labelledby="open-worlds-output-title">
        <div className="page-shell feature-list-layout">
          <Reveal><p className="eyebrow">WHAT YOU RECEIVE</p><h2 id="open-worlds-output-title">Data your team can work with</h2></Reveal>
          <div className="feature-signal-list">
            {outputs.map((output, index) => <Reveal delay={index * 55} key={output}><p><Check aria-hidden="true" size={17} /> {output}</p></Reveal>)}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
