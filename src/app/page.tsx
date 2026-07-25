import { ArrowDownRight, ArrowUpRight, Check } from "lucide-react";
import { HeroField } from "@/components/hero-field";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { SystemRail } from "@/components/system-rail";

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
            <p className="eyebrow hero-reveal">KINEMOR / PHYSICAL AI DATA</p>
            <h1 className="hero-title hero-reveal hero-reveal-delay-1" id="hero-title">
              Teach machines how work gets done.
            </h1>
            <p className="hero-lede hero-reveal hero-reveal-delay-2">
              Kinemor turns consented, multimodal observations into the structured evidence teams use to build robots for the real world.
            </p>
            <div className="hero-actions hero-reveal hero-reveal-delay-3">
              <a className="button button-primary" href="#system">
                See the system <ArrowDownRight aria-hidden="true" size={18} />
              </a>
              <a className="button button-secondary" href="#contact">
                Start a data program <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-index page-shell" aria-label="Kinemor data system">
          <div><span>01</span> Ground truth</div>
          <div><span>02</span> Structured context</div>
          <div><span>03</span> Model behavior</div>
        </div>
      </section>

      <section className="manifesto section" id="what-we-do" aria-labelledby="what-we-do-title">
        <div className="page-shell manifesto-grid">
          <Reveal>
            <p className="eyebrow ink-eyebrow">WHAT WE DO</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title" id="what-we-do-title">
              Capture the reality robots need to learn from.
            </h2>
          </Reveal>
          <Reveal className="manifesto-copy" delay={160}>
            <p>
              The most capable robots need more than visual labels. They need accountable records of people, places, objects, motion, sound, and consequence.
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
              <h2 className="section-title" id="system-title">Every collection should become a learning system.</h2>
            </div>
            <p className="section-aside">Move through the layers. The system keeps the context that makes physical AI useful.</p>
          </Reveal>
          <SystemRail />
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

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="page-shell contact-layout">
          <Reveal className="contact-copy">
            <p className="eyebrow">CONNECT WITH KINEMOR</p>
            <h2 id="contact-title">Tell us what you are trying to build.</h2>
            <p>
              We are building data programs for teams working on physical intelligence. Tell us where you need real-world evidence, and we will get back to you.
            </p>
            <div className="contact-topics" aria-label="Kinemor contact topics">
              <span>DATA PROGRAMS</span>
              <span>RESEARCH PARTNERSHIPS</span>
              <span>CAPTURE OPERATIONS</span>
            </div>
            <p className="contact-response-note"><i /> We acknowledge every inquiry by email.</p>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="page-shell footer-layout">
          <div>
            <p className="footer-wordmark">Kinemor</p>
            <p className="footer-statement">Infrastructure for physical AI.</p>
          </div>
          <div className="footer-contact">
            <p className="eyebrow">CONTACT</p>
            <a href="mailto:admin@kinemor.com">admin@kinemor.com</a>
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
