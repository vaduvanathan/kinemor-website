import { ArrowUpRight, Check } from "lucide-react";
import { HeroField } from "@/components/hero-field";
import { Navigation } from "@/components/navigation";

const pillars = [
  {
    number: "01",
    title: "Perceive",
    body: "World models grounded in what machines can actually see, touch, and measure.",
  },
  {
    number: "02",
    title: "Reason",
    body: "Learning systems that turn messy physical context into useful decisions.",
  },
  {
    number: "03",
    title: "Act",
    body: "Reliable robotic behaviour that creates leverage in the places people need it most.",
  },
];

const practices = [
  "Embodied AI research",
  "Robotics data systems",
  "Simulation and evaluation",
  "Human-centered deployment",
];

export default function Home() {
  return (
    <main>
      <Navigation />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <p className="eyebrow reveal">Kinemor / Physical intelligence</p>
            <h1 className="hero-title reveal reveal-delay-1" id="hero-title">
              Intelligence for the world that moves.
            </h1>
            <p className="hero-lede reveal reveal-delay-2">
              Kinemor is building embodied AI systems that help machines
              understand, learn, and work in the physical world.
            </p>
            <div className="hero-actions reveal reveal-delay-3">
              <a className="button button-primary" href="#thesis">
                Enter the thesis <ArrowUpRight aria-hidden="true" size={18} />
              </a>
              <a className="text-link" href="#contact">
                Work with us <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </div>
          </div>
          <HeroField />
        </div>
        <div className="hero-index" aria-label="Core focus areas">
          <div>
            <span>01</span> Perception
          </div>
          <div>
            <span>02</span> Learning
          </div>
          <div>
            <span>03</span> Action
          </div>
        </div>
      </section>

      <section className="thesis section" id="thesis" aria-labelledby="thesis-title">
        <div className="page-shell thesis-grid">
          <div>
            <p className="eyebrow ink-eyebrow">Our thesis</p>
            <h2 className="section-title" id="thesis-title">
              Machines should take on physical work. People should have more
              room to create.
            </h2>
          </div>
          <div className="thesis-copy">
            <p>
              The next generation of useful AI will not live only behind a
              screen. It will understand environments, adapt to uncertainty,
              and operate alongside people.
            </p>
            <p>
              We are developing the intelligence, data, and systems needed to
              make that future dependable.
            </p>
          </div>
        </div>
      </section>

      <section className="systems section" id="systems" aria-labelledby="systems-title">
        <div className="page-shell">
          <div className="section-heading">
            <p className="eyebrow">A complete physical AI stack</p>
            <h2 className="section-title" id="systems-title">
              Built from perception to performance.
            </h2>
          </div>
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <article className="pillar" key={pillar.number}>
                <div className="pillar-topline">
                  <span>{pillar.number}</span>
                  <span className="pillar-rule" />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
                <ArrowUpRight aria-hidden="true" className="pillar-arrow" size={22} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method section" id="approach" aria-labelledby="method-title">
        <div className="page-shell method-layout">
          <div className="method-panel">
            <p className="eyebrow ink-eyebrow">How we work</p>
            <h2 className="section-title" id="method-title">
              Research that earns its place in the real world.
            </h2>
            <p className="method-intro">
              We connect rigorous research with field data, robust systems, and
              careful deployment. Each layer makes the next one more useful.
            </p>
          </div>
          <ul className="practice-list">
            {practices.map((practice, index) => (
              <li key={practice}>
                <span>0{index + 1}</span>
                <p>{practice}</p>
                <Check aria-hidden="true" size={19} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="signal" aria-labelledby="signal-title">
        <div className="page-shell signal-layout">
          <p className="signal-kicker">Kinemor / 001</p>
          <h2 id="signal-title">
            We are here to make physical intelligence a practical part of human
            progress.
          </h2>
          <a className="button button-light" href="#contact">
            Start a conversation <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="page-shell footer-layout">
          <div>
            <p className="footer-wordmark">Kinemor</p>
            <p className="footer-statement">
              Physical intelligence for the real world.
            </p>
          </div>
          <div className="footer-contact">
            <p className="eyebrow">Contact</p>
            <a href="mailto:hello@kinemor.com">hello@kinemor.com</a>
            <p className="footer-note">
              This address becomes live once Google Workspace is configured.
            </p>
          </div>
          <div className="footer-meta">
            <p>Built in India. Thinking globally.</p>
            <p>© {new Date().getFullYear()} Kinemor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
