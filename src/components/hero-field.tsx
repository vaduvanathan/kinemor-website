export function HeroField() {
  return (
    <div className="hero-field" aria-label="Animated physical intelligence system diagram" role="img">
      <div className="field-grid" aria-hidden="true">
        {Array.from({ length: 64 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <p className="field-coordinate field-coordinate-one">KNR / FIELD_01</p>
      <p className="field-status"><span className="status-dot" /> SYSTEM ACTIVE</p>
      <div className="assembly" aria-hidden="true">
        <span className="motion-path" />
        <span className="assembly-base" />
        <span className="assembly-segment segment-one" />
        <span className="assembly-joint joint-one" />
        <span className="assembly-segment segment-two" />
        <span className="assembly-joint joint-two" />
        <span className="assembly-target" />
      </div>
      <p className="field-coordinate field-coordinate-two">POSE: LOCKED</p>
    </div>
  );
}
