"use client";

import Link from "next/link";
import { track } from "@vercel/analytics/react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
} from "lucide-react";
import { DotField } from "@/components/dot-field";

const standards = [
  "Start with the real task, not a generic dataset.",
  "Obtain clear site permission and usage rights.",
  "Preserve context, quality signals, and useful metadata.",
  "Review privacy before delivery, not after.",
];

const operatingNotes = [
  ["01", "What Kinemor does", "We build data programs around the physical task a robotics team needs a model to understand."],
  ["02", "Data programs", "We combine capture planning, hardware choices, operators, metadata, and review into one workflow."],
  ["03", "Useful delivery", "We package the data with context, permissions, and quality signals so teams can evaluate and train with it."],
] as const;

const captureSteps = [
  ["01", "Understand the robot task", "Start from the behavior the robot must learn, the place it will operate, and the signals that matter."],
  ["02", "Design the capture setup", "Choose cameras, sensors, operators, timing, privacy rules, and metadata before collection begins."],
  ["03", "Collect real-world data", "Run permissioned capture in the actual environment with checks for coverage, quality, and context."],
  ["04", "Review privacy and quality", "Screen the data for sensitive details, missing context, weak samples, and unusable recordings."],
  ["05", "Deliver structured datasets", "Send files, metadata, review notes, and dataset structure in a form robotics teams can work with."],
] as const;

const researchCards = [
  {
    code: "04",
    eyebrow: "Research: DGlove1",
    title: "Contact-rich hand data.",
    body: "A prototype research glove for pressure, contact, wrist motion, and hand-object interaction data.",
    href: "/glove",
  },
  {
    code: "05",
    eyebrow: "Open Worlds / Industrial Data",
    title: "Real places, reusable context.",
    body: "Capture programs for factories, warehouses, labs, and workspaces where robots need to understand the environment.",
    href: "/open-worlds",
  },
] as const;

const faqs = [
  ["What kind of data can Kinemor collect?", "Video, audio, motion, task context, environment metadata, human-demonstration data, and research-stage signals such as hand-contact data through DGlove1."],
  ["Do you work with custom hardware?", "Yes. We can work with customer-provided hardware, build capture rigs around a task, or explore custom sensing when an off-the-shelf device is not enough."],
  ["Can you collect outside India?", "India is the starting base. For larger partnerships, we can discuss international collection through local operators, partner sites, or customer-provided locations."],
  ["How do you handle privacy?", "Every program starts with permission, usage rights, and a privacy plan. We review people, badges, screens, documents, and sensitive facility details before delivery."],
  ["Can robotics labs define their own data schema?", "Yes. The best datasets usually start with the lab's target behavior, evaluation needs, file format, metadata fields, and review criteria."],
] as const;

/**
 * The main Kinemor landing experience turns the visual grammar of a premium desktop tool
 * into an explorable account of field capture, research, and robotics-ready data.
 */
export function KinemorLanding() {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const entries = stepRefs.current.filter((step): step is HTMLElement => step !== null);
    if (!entries.length || reduceMotion) return undefined;

    const observer = new IntersectionObserver(
      (observations) => {
        const current = observations
          .filter((observation) => observation.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (current) {
          setActiveStep(Number(current.target.getAttribute("data-step")));
        }
      },
      { rootMargin: "-24% 0px -32% 0px", threshold: [0.2, 0.5, 0.75] },
    );

    entries.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [reduceMotion]);

  const stepReveal = reduceMotion
    ? { initial: false as const, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 } };

  return (
    <div className="aura-kine">
      <div className="aura-kine-backdrop" aria-hidden="true"><DotField /></div>
      <svg aria-hidden="true" className="aura-kine-filter" height="0" width="0">
        <filter id="kinemor-grain">
          <feTurbulence baseFrequency="0.78" numOctaves="2" stitchTiles="stitch" type="fractalNoise" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .28 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      <section className="aura-kine-hero" aria-labelledby="aura-kine-title">
        <div className="aura-kine-hero-copy">
          <p className="aura-kine-kicker"><span /> Physical AI data infrastructure</p>
          <h1 id="aura-kine-title">The physical world.<br /><span>Structured for robots.</span></h1>
          <p className="aura-kine-hero-deck">Kinemor works directly with robotics teams to capture, organize, and deliver useful evidence from real work.</p>
          <div className="aura-kine-hero-actions">
            <Link
              className="aura-kine-primary-action"
              href="/contact"
              onClick={() => track("hero_cta_click", { label: "Plan a data program", target: "/contact" })}
            >
              Plan a data program <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="aura-kine-text-action"
              href="#capture-process"
              onClick={() => track("hero_cta_click", { label: "Explore the system", target: "#capture-process" })}
            >
              Explore the system <ChevronRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <p className="aura-kine-hero-note">Research-led. Permissioned. Built around the task.</p>
        </div>
      </section>

      <section className="aura-kine-overview" aria-labelledby="what-kinemor-does-title">
        <div className="aura-kine-section-head">
          <p className="aura-kine-kicker"><span /> What Kinemor does</p>
          <h2 id="what-kinemor-does-title">We turn real work into evidence robots can learn from.</h2>
        </div>
        <div className="aura-kine-overview-grid">
          {operatingNotes.map(([code, title, body]) => (
            <article className="aura-kine-overview-card" key={title}>
              <span>{code}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aura-kine-split-section" aria-labelledby="program-title">
        <div className="aura-kine-split-copy">
          <p className="aura-kine-kicker"><span /> Data programs</p>
          <h2 id="program-title">A capture program is more than a camera.</h2>
          <p>We define the task, place, people policy, hardware, timing, and review rules together. That gives the data a useful purpose before collection begins.</p>
          <div className="aura-kine-chip-row"><span>Task context</span><span>Site permission</span><span>Privacy review</span><span>Dataset structure</span></div>
        </div>
        <div className="aura-kine-glass-stack" aria-label="Elements of a Kinemor data program">
          <p>PROGRAM PACKET / 01</p>
          {[
            ["Intent", "Target behavior and environment"],
            ["Capture", "Cameras, sensors, operators, and timing"],
            ["Review", "Quality signals, privacy, and usage rights"],
            ["Delivery", "Files, metadata, and review notes"],
          ].map(([title, detail], index) => <div className="aura-kine-glass-row" key={title}><span>0{index + 1}</span><div><strong>{title}</strong><small>{detail}</small></div><Check aria-hidden="true" size={17} /></div>)}
        </div>
      </section>

      <section className="aura-kine-process" id="capture-process" aria-labelledby="capture-process-title">
        <div className="aura-kine-section-head">
          <p className="aura-kine-kicker"><span /> How a capture program works</p>
          <h2 id="capture-process-title">A clear path from robot task to structured dataset.</h2>
        </div>
        <div className="aura-kine-process-list">
          {captureSteps.map(([code, title, body], index) => (
            <motion.article
              {...stepReveal}
              aria-current={activeStep === index ? "step" : undefined}
              className={`aura-kine-process-row${activeStep === index ? " is-active" : ""}`}
              data-step={index}
              key={title}
              ref={(element) => { stepRefs.current[index] = element; }}
              transition={{ duration: 0.72, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span key="code">{code}</span>
              <div key="copy">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="aura-kine-research-links" aria-labelledby="research-links-title">
        <div className="aura-kine-section-head">
          <p className="aura-kine-kicker"><span /> Research tracks</p>
          <h2 id="research-links-title">Two active directions for physical AI data.</h2>
        </div>
        <div className="aura-kine-research-grid">
          {researchCards.map((card) => (
            <article className="aura-kine-research-card" key={card.title}>
              <span>{card.code}</span>
              <p className="aura-kine-reader-kicker">{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <Link className="aura-kine-reader-link" href={card.href}>Open page <ArrowUpRight aria-hidden="true" size={16} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="aura-kine-standards" aria-labelledby="standards-title">
        <div>
          <h2 id="standards-title">Data is only useful when people can trust how it was made.</h2>
        </div>
        <div className="aura-kine-standard-list">
          {standards.map((standard) => <p key={standard}><Check aria-hidden="true" size={17} /> {standard}</p>)}
        </div>
      </section>

      <section className="aura-kine-faq" aria-labelledby="faq-title">
        <div className="aura-kine-section-head">
          <h2 id="faq-title">Questions robotics teams usually ask first.</h2>
        </div>
        <div className="aura-kine-faq-list">
          {faqs.map(([question, answer]) => (
            <details className="aura-kine-faq-item" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="aura-kine-cta" aria-labelledby="cta-title">
        <div className="aura-kine-cta-glass">
          <h2 id="cta-title">Tell us what your robot needs to learn.</h2>
          <p>Share the task, environment, and kind of evidence you need. We will reply to the address you provide.</p>
          <div className="aura-kine-cta-actions"><Link className="aura-kine-primary-action" href="/contact">Start a conversation <ArrowUpRight aria-hidden="true" size={17} /></Link><Link className="aura-kine-secondary-action" href="/glove">Explore DGlove1 <ChevronRight aria-hidden="true" size={17} /></Link></div>
        </div>
      </section>
    </div>
  );
}
