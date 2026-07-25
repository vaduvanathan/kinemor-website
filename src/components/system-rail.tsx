"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stages = [
  {
    code: "01",
    title: "Capture",
    body: "Consented observations of real work, movement, and environment - collected with the context intact.",
    signal: "VISION / AUDIO / MOTION",
  },
  {
    code: "02",
    title: "Curate",
    body: "Quality systems make every moment searchable, accountable, and ready for rigorous evaluation.",
    signal: "METADATA / QA / PROVENANCE",
  },
  {
    code: "03",
    title: "Compound",
    body: "Structured evidence becomes a durable learning asset for models that must reason before they act.",
    signal: "EVALUATION / LEARNING / INSIGHT",
  },
];

export function SystemRail() {
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (mostVisible) {
          setActiveStage(Number(mostVisible.target.getAttribute("data-stage")));
        }
      },
      { rootMargin: "-28% 0px -28% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    stageRefs.current.forEach((stage) => {
      if (stage) observer.observe(stage);
    });

    return () => observer.disconnect();
  }, []);

  const active = stages[activeStage];

  return (
    <div className="system-rail">
      <div className="system-console" data-stage={activeStage}>
        <div className="console-topline">
          <span>DATA PROGRAM / {active.code}</span>
          <span className="console-status"><i /> ACTIVE</span>
        </div>
        <div className="console-visual" aria-hidden="true">
          <div className="console-grid" />
          <div className="console-orbit console-orbit-one" />
          <div className="console-orbit console-orbit-two" />
          <div className="console-origin"><span /></div>
          <div className="console-pulse console-pulse-one" />
          <div className="console-pulse console-pulse-two" />
          <div className="console-axis console-axis-x" />
          <div className="console-axis console-axis-y" />
        </div>
        <div className="console-readout">
          <span>{active.signal}</span>
          <span>TRACE / 0{activeStage + 4}</span>
        </div>
      </div>

      <div className="system-stages">
        {stages.map((stage, index) => (
          <button
            aria-pressed={activeStage === index}
            className={`system-stage ${activeStage === index ? "is-active" : ""}`}
            data-stage={index}
            key={stage.code}
            onClick={() => setActiveStage(index)}
            ref={(element) => {
              stageRefs.current[index] = element;
            }}
            type="button"
          >
            <div className="stage-number">{stage.code}</div>
            <div className="stage-copy">
              <p className="stage-kicker">{stage.signal}</p>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </div>
            <ArrowUpRight aria-hidden="true" className="stage-arrow" size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}
