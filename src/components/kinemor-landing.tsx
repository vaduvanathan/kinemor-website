"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BadgeCheck,
  Camera,
  Check,
  ChevronRight,
  CircleDot,
  FileText,
  FolderOpen,
  Hand,
  Layers3,
  LockKeyhole,
  MapPin,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { DotField } from "@/components/dot-field";

const programs = [
  {
    label: "DGlove1",
    eyebrow: "RESEARCH / HAND INTERACTION",
    title: "Contact-rich human hand data.",
    body: "A research glove for recording pressure, contact, wrist motion, and task context while people handle real objects.",
    image: "/images/dglove-palm.png",
    href: "/glove",
    status: "Prototype research",
  },
  {
    label: "Open Worlds",
    eyebrow: "FIELD SYSTEMS / REAL ENVIRONMENTS",
    title: "Real work, with the context intact.",
    body: "Permissioned capture programs for industrial spaces, operations, and the details robotics teams need to reuse data responsibly.",
    image: "/images/kinemor-industrial-worlds.png",
    href: "/open-worlds",
    status: "Pilot programs",
  },
] as const;

const programRows = [
  { icon: Camera, label: "Visual capture", detail: "video + scene context", status: "Ready" },
  { icon: Hand, label: "Contact research", detail: "DGlove1 signals", status: "Research" },
  { icon: MapPin, label: "Site programs", detail: "permissioned places", status: "Planning" },
] as const;

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
  const [activeProgram, setActiveProgram] = useState(0);
  const reduceMotion = useReducedMotion();
  const selected = programs[activeProgram];

  const rise = reduceMotion
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
            <Link className="aura-kine-primary-action" href="/contact">Plan a data program <ArrowUpRight aria-hidden="true" size={17} /></Link>
            <Link className="aura-kine-text-action" href="#field-console">Explore the system <ChevronRight aria-hidden="true" size={17} /></Link>
          </div>
          <p className="aura-kine-hero-note">Research-led. Permissioned. Built around the task.</p>
        </div>
      </section>

      <section className="aura-kine-overview" aria-labelledby="what-kinemor-does-title">
        <motion.div {...rise} className="aura-kine-section-head">
          <p className="aura-kine-kicker"><span /> 01 What Kinemor does</p>
          <h2 id="what-kinemor-does-title">We turn real work into evidence robots can learn from.</h2>
        </motion.div>
        <div className="aura-kine-overview-grid">
          {operatingNotes.map(([code, title, body], index) => (
            <motion.article {...rise} transition={{ duration: 0.72, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }} className="aura-kine-overview-card" key={title}>
              <span>{code}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="aura-kine-console-section" id="field-console" aria-labelledby="field-console-title">
        <motion.div {...rise} className="aura-kine-section-head aura-kine-section-head-compact">
          <p className="aura-kine-kicker"><span /> 02 Data programs</p>
          <h2>Choose the program around the evidence your robot needs.</h2>
        </motion.div>
        <motion.div {...rise} className="aura-kine-menubar">
          <div className="aura-kine-menubar-left"><span className="traffic traffic-red" /><span className="traffic traffic-yellow" /><span className="traffic traffic-green" /><strong>Kinemor</strong><span className="aura-kine-menu-items">Field&nbsp;&nbsp; Capture&nbsp;&nbsp; Review&nbsp;&nbsp; Delivery</span></div>
          <div className="aura-kine-menubar-right"><Search aria-hidden="true" size={14} /> Field Console / 01</div>
        </motion.div>
        <motion.div {...rise} transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="aura-kine-console">
          <aside className="aura-kine-console-sidebar">
            <span className="aura-kine-console-caption">Kinemor systems</span>
            <Link className="aura-kine-console-create" href="/contact"><Sparkles aria-hidden="true" size={15} /> Start a program</Link>
            <div className="aura-kine-console-nav" aria-label="Field console views">
              <button className="is-active" type="button"><Layers3 aria-hidden="true" size={16} /> Programs <span>02</span></button>
              <button type="button"><FolderOpen aria-hidden="true" size={16} /> Evidence</button>
              <button type="button"><ScanLine aria-hidden="true" size={16} /> Review queue</button>
              <button type="button"><ShieldCheck aria-hidden="true" size={16} /> Privacy plan</button>
            </div>
            <div className="aura-kine-console-status"><CircleDot aria-hidden="true" size={14} /><span>Systems designed around the work.</span></div>
          </aside>

          <div className="aura-kine-program-list">
            <div className="aura-kine-console-search"><Search aria-hidden="true" size={15} /> Browse Kinemor programs</div>
            {programs.map((program, index) => (
              <button
                aria-pressed={activeProgram === index}
                className={`aura-kine-program-row ${activeProgram === index ? "is-selected" : ""}`}
                key={program.label}
                onClick={() => setActiveProgram(index)}
                type="button"
              >
                <span className="aura-kine-program-dot" />
                <span><strong>{program.label}</strong><small>{program.eyebrow}</small></span>
                <em>{program.status}</em>
              </button>
            ))}
            <div className="aura-kine-list-label">Capture stack</div>
            {programRows.map(({ icon: Icon, label, detail, status }) => (
              <div className="aura-kine-stack-row" key={label}><Icon aria-hidden="true" size={15} /><span><strong>{label}</strong><small>{detail}</small></span><em>{status}</em></div>
            ))}
          </div>

          <article className="aura-kine-program-reader">
            <div className="aura-kine-reader-toolbar"><span><FileText aria-hidden="true" size={15} /> Program brief</span><span><LockKeyhole aria-hidden="true" size={15} /> Permission-first</span></div>
            <div className="aura-kine-reader-image">
              <Image alt="" fill priority sizes="(max-width: 960px) 100vw, 42vw" src={selected.image} />
              <span>{selected.label}</span>
            </div>
            <p className="aura-kine-reader-kicker">{selected.eyebrow}</p>
            <h2 id="field-console-title">{selected.title}</h2>
            <p>{selected.body}</p>
            <div className="aura-kine-reader-summary"><BadgeCheck aria-hidden="true" size={17} /><span><strong>Designed for useful context</strong> Capture plans include the task, place, people policy, and the data format a team can actually use.</span></div>
            <Link className="aura-kine-reader-link" href={selected.href}>View {selected.label} <ArrowUpRight aria-hidden="true" size={16} /></Link>
          </article>
        </motion.div>
      </section>

      <section className="aura-kine-process" aria-labelledby="capture-process-title">
        <motion.div {...rise} className="aura-kine-section-head">
          <p className="aura-kine-kicker"><span /> 03 How a capture program works</p>
          <h2 id="capture-process-title">A clear path from robot task to structured dataset.</h2>
        </motion.div>
        <div className="aura-kine-process-list">
          {captureSteps.map(([code, title, body], index) => (
            <motion.article {...rise} transition={{ duration: 0.72, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }} className="aura-kine-process-row" key={title}>
              <span>{code}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="aura-kine-research-links" aria-labelledby="research-links-title">
        <motion.div {...rise} className="aura-kine-section-head">
          <p className="aura-kine-kicker"><span /> 04 Research and field systems</p>
          <h2 id="research-links-title">Two active directions for physical AI data.</h2>
        </motion.div>
        <div className="aura-kine-research-grid">
          {researchCards.map((card, index) => (
            <motion.article {...rise} transition={{ duration: 0.76, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }} className="aura-kine-research-card" key={card.title}>
              <span>{card.code}</span>
              <p className="aura-kine-reader-kicker">{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <Link className="aura-kine-reader-link" href={card.href}>Open page <ArrowUpRight aria-hidden="true" size={16} /></Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="aura-kine-split-section" aria-labelledby="quality-title">
        <motion.div {...rise} className="aura-kine-split-copy">
          <p className="aura-kine-kicker"><span /> Quality before volume</p>
          <h2 id="quality-title">Make every hour of capture count.</h2>
          <p>Robots learn from the details around an action. We make the purpose, place, permissions, and useful signals part of the data program from the beginning.</p>
          <div className="aura-kine-chip-row"><span>Task context</span><span>Site permission</span><span>Privacy review</span><span>Dataset structure</span></div>
        </motion.div>
        <motion.div {...rise} transition={{ duration: 0.76, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="aura-kine-glass-stack">
          <p>FIELD REVIEW / TODAY</p>
          {[
            ["Intent", "Task, environment, and target behaviors"],
            ["Capture", "Cameras, sensors, operators, and quality gates"],
            ["Protection", "Privacy plan, rights, and sensitive-data handling"],
            ["Delivery", "Files, metadata, and reviewable evidence"],
          ].map(([title, detail], index) => <div className="aura-kine-glass-row" key={title}><span>0{index + 1}</span><div><strong>{title}</strong><small>{detail}</small></div><Check aria-hidden="true" size={17} /></div>)}
        </motion.div>
      </section>

      <section className="aura-kine-standards" aria-labelledby="standards-title">
        <motion.div {...rise}>
          <p className="aura-kine-kicker"><span /> 06 Standards</p>
          <h2 id="standards-title">Data is only useful when people can trust how it was made.</h2>
        </motion.div>
        <div className="aura-kine-standard-list">
          {standards.map((standard) => <p key={standard}><Check aria-hidden="true" size={17} /> {standard}</p>)}
        </div>
      </section>

      <section className="aura-kine-faq" aria-labelledby="faq-title">
        <motion.div {...rise} className="aura-kine-section-head">
          <p className="aura-kine-kicker"><span /> 07 FAQ</p>
          <h2 id="faq-title">Questions robotics teams usually ask first.</h2>
        </motion.div>
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
        <motion.div {...rise} className="aura-kine-cta-glass">
          <p className="aura-kine-kicker"><span /> 08 Contact</p>
          <h2 id="cta-title">Tell us what your robot needs to learn.</h2>
          <p>Share the task, environment, and kind of evidence you need. We will reply to the address you provide.</p>
          <div className="aura-kine-cta-actions"><Link className="aura-kine-primary-action" href="/contact">Start a conversation <ArrowUpRight aria-hidden="true" size={17} /></Link><Link className="aura-kine-secondary-action" href="/glove">Explore DGlove1 <ChevronRight aria-hidden="true" size={17} /></Link></div>
        </motion.div>
      </section>
    </div>
  );
}
