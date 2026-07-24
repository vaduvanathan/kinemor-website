import { ImageResponse } from "next/og";

export const alt = "Kinemor - Infrastructure for Physical AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px",
          background: "#111213",
          color: "#f2f0ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 34, fontWeight: 600 }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #f2f0ea",
              borderRight: "0",
            }}
          >
            <div style={{ width: "12px", height: "12px", background: "#c8ff3d" }} />
          </div>
          Kinemor
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ color: "#c8ff3d", fontSize: 19, letterSpacing: "2px" }}>INFRASTRUCTURE FOR PHYSICAL AI</div>
          <div style={{ maxWidth: "930px", fontSize: 86, fontWeight: 600, lineHeight: 0.95, letterSpacing: "-3px" }}>
            Data that teaches machines the real world.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#c9ccc4", fontSize: 19 }}>
          <span>VISION / AUDIO / MOTION / CONTEXT</span>
          <span>KINEMOR.COM</span>
        </div>
      </div>
    ),
    size,
  );
}
