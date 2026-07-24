"use client";

import { useEffect, useRef } from "react";

type Point = {
  phase: number;
  radius: number;
  speed: number;
  x: number;
  y: number;
};

const pointCount = 96;

function makePoints() {
  return Array.from({ length: pointCount }, (_, index) => ({
    phase: index * 1.713,
    radius: 0.7 + ((index * 7) % 5) * 0.2,
    speed: 0.35 + ((index * 11) % 7) * 0.045,
    x: (index * 37) % 100,
    y: (index * 61) % 100,
  }));
}

function drawField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  points: Point[],
  time: number,
  pointer: { x: number; y: number },
) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#171a1a";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(242, 240, 234, 0.075)";
  context.lineWidth = 1;
  const grid = Math.max(42, width / 12);
  for (let x = 0; x < width; x += grid) {
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, height);
    context.stroke();
  }
  for (let y = 0; y < height; y += grid) {
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(width, y + 0.5);
    context.stroke();
  }

  const activePoints = points.map((point) => {
    const driftX = Math.sin(time * point.speed + point.phase) * 15;
    const driftY = Math.cos(time * (point.speed * 0.72) + point.phase) * 11;
    const parallaxX = (pointer.x - 0.5) * ((point.y - 50) / 50) * 18;
    const parallaxY = (pointer.y - 0.5) * ((point.x - 50) / 50) * 14;
    return {
      ...point,
      dx: (point.x / 100) * width + driftX + parallaxX,
      dy: (point.y / 100) * height + driftY + parallaxY,
    };
  });

  context.lineWidth = 1;
  for (let index = 0; index < activePoints.length; index += 1) {
    const source = activePoints[index];
    for (let neighbor = index + 1; neighbor < activePoints.length; neighbor += 1) {
      const target = activePoints[neighbor];
      const distance = Math.hypot(source.dx - target.dx, source.dy - target.dy);
      if (distance < 74) {
        context.strokeStyle = `rgba(200, 255, 61, ${(1 - distance / 74) * 0.18})`;
        context.beginPath();
        context.moveTo(source.dx, source.dy);
        context.lineTo(target.dx, target.dy);
        context.stroke();
      }
    }
  }

  const traceX = width * (0.15 + ((Math.sin(time * 0.38) + 1) / 2) * 0.7);
  const traceY = height * (0.36 + Math.sin(time * 0.56) * 0.1);
  context.strokeStyle = "rgba(200, 255, 61, 0.84)";
  context.setLineDash([3, 8]);
  context.beginPath();
  context.moveTo(width * 0.08, height * 0.76);
  context.quadraticCurveTo(width * 0.42, height * 0.3, traceX, traceY);
  context.stroke();
  context.setLineDash([]);

  activePoints.forEach((point) => {
    const emphasis = Math.hypot(point.dx - traceX, point.dy - traceY) < 58;
    context.fillStyle = emphasis ? "#c8ff3d" : "rgba(242, 240, 234, 0.64)";
    context.beginPath();
    context.arc(point.dx, point.dy, point.radius + (emphasis ? 1.2 : 0), 0, Math.PI * 2);
    context.fill();
  });

  context.strokeStyle = "rgba(200, 255, 61, 0.9)";
  context.lineWidth = 1.25;
  context.beginPath();
  context.arc(traceX, traceY, 14, 0, Math.PI * 2);
  context.stroke();
  context.fillStyle = "#c8ff3d";
  context.beginPath();
  context.arc(traceX, traceY, 3.2, 0, Math.PI * 2);
  context.fill();
}

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const points = makePoints();
    const pointer = { x: 0.52, y: 0.46 };
    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let start = performance.now();

    const render = (now: number) => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.floor(bounds.width * ratio);
      const targetHeight = Math.floor(bounds.height * ratio);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawField(context, bounds.width, bounds.height, points, (now - start) / 1000, pointer);
      if (!motionReduced) animationFrame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width;
      pointer.y = (event.clientY - bounds.top) / bounds.height;
    };

    const resizeObserver = new ResizeObserver(() => {
      start = performance.now();
      render(start);
    });

    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    render(start);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="hero-field" aria-label="Interactive field of linked physical AI observations" role="img">
      <canvas ref={canvasRef} />
      <div className="field-hud field-hud-top" aria-hidden="true">
        <span>KNR / FIELD_01</span>
        <span><i /> LIVE CAPTURE</span>
      </div>
      <div className="field-hud field-hud-bottom" aria-hidden="true">
        <span>VISION + MOTION + AUDIO</span>
        <span>OBSERVATION / 03</span>
      </div>
    </div>
  );
}
