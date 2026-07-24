import { ArrowDownRight, ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import { HeroField } from "@/components/hero-field";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";

const layers = [
  {
    code: "01",
    title: "Capture",
    body: "Consented, multi-sensor observations of real work, movement, and environment.",
    detail: "Video / audio / motion / context",
  },
  {
    code: "02",
    title: "Curate",
    body: "Quality systems that turn raw physical experience into trustworthy training data.",
    detail: "Metadata / QA / provenance",
  },
  {
    code: "03",
    title: "Compound",
    body: "A growing intelligence asset for models that need to reason before they act.",
    detail: "Evaluation / learning / insight",
  },
];

const standards = [
  "Clear contributor consent and data governance",
  "Multimodal context, not isolated annotations",
  "Traceable provenance from capture to training",
  "Quality evaluation that improves with every collection",
];

export default function Home() {
  return (
    <main>
      <Navigation />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <HeroField />
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <p className="eyebrow hero-reveal">KINEMOR / INFRASTRUCTURE FOR PHYSICAL AI</p>
            <h1 className="hero-title hero-reveal hero-reveal-delay-1" id="hero-title">
              Data that teaches machines the real world.
            </h1>
            <p className="hero-lede hero-reveal hero-reveal-delay-2">
              Kinemor builds the multimodal data infrastructure behind embodied intelligence: real environments, real movement, and the context models need to act with care.
            </p>
            <div className="hero-actions hero-reveal hero-reveal-delay-3">
              <a className="button button-primary" href="#system">
                Explore the system <ArrowDownRight aria-hidden="true" size={18} />
              </a>
              <a className="text-link" href="#contact">
                Work with us <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-index page-shell" aria-label="Kinemor data system">
          <div><span>01</span> Capture signal</div>
          <div><span>02</span> Build context</div>
          <div><span>03</span> Train action</div>
        </div>
      </section>

      <section className="manifesto section" id="thesis" aria-labelledby="thesis-title">
        <div className="page-shell manifesto-grid">
          <Reveal>
            <p className="eyebrow ink-eyebrow">THE KINEMOR THESIS</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title" id="thesis-title">
              Physical intelligence is not scraped. It is earned in the world.
            </h2>
          </Reveal>
          <Reveal className="manifesto-copy" delay={160}>
            <p>
              The most capable robots will need more than visual labels. They will need rich, accountable records of people, places, objects, motion, sound, and consequence.
            </p>
            <p>
              Kinemor makes that evidence usable for the teams building the next generation of machines.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="system section" id="system" aria-labelledby="system-title">
        <div className="page-shell">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">A DATA SYSTEM, NOT A DATA DROP</p>
              <h2 className="section-title" id="system-title">From lived experience to model behavior.</h2>
            </div>
            <p className="section-aside">Every layer preserves the context that makes physical AI useful.</p>
          </Reveal>
          <div className="layer-list">
            {layers.map((layer, index) => (
              <Reveal className="layer-row" delay={index * 85} key={layer.code}>
                <span className="layer-code">{layer.code}</span>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
                <span className="layer-detail">{layer.detail}</span>
                <MoveUpRight aria-hidden="true" className="layer-arrow" size={21} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="proof section" id="approach" aria-labelledby="approach-title">
        <div className="page-shell proof-grid">
          <Reveal className="proof-lead">
            <p className="eyebrow ink-eyebrow">BUILT FOR THE HARD PART</p>
            <h2 className="section-title" id="approach-title">Data worthy of systems that will work beside people.</h2>
            <p>
              Kinemor is designed around the details that determine whether a dataset becomes a durable advantage: quality, consent, context, and operational trust.
            </p>
          </Reveal>
          <div className="standard-list" role="list">
            {standards.map((standard, index) => (
              <Reveal className="standard-item" delay={index * 75} key={standard}>
                <div role="listitem">
                  <span>0{index + 1}</span>
                  <p>{standard}</p>
                  <Check aria-hidden="true" size={19} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="invitation" aria-labelledby="invitation-title">
        <div className="page-shell invitation-layout">
          <p className="invitation-index">KNR / 001</p>
          <Reveal>
            <h2 id="invitation-title">Build the evidence layer for machines that matter.</h2>
          </Reveal>
          <a className="button button-dark" href="#contact">
            Start a conversation <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="page-shell footer-layout">
          <div>
            <p className="footer-wordmark">Kinemor</p>
            <p className="footer-statement">Infrastructure for physical AI.</p>
          </div>
          <div className="footer-contact">
            <p className="eyebrow">CONTACT</p>
            <a href="mailto:vaduvanathan@kinemor.com">vaduvanathan@kinemor.com</a>
            <p className="footer-note">Partnerships, research, and ambitious problems welcome.</p>
          </div>
          <div className="footer-meta">
            <p>Built in India. Working globally.</p>
            <p>&copy; {new Date().getFullYear()} Kinemor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
