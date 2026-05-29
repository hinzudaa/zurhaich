import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #1b1528 0%, #241d36 50%, #1b1528 100%)",
          position: "relative",
        }}
      >
        {/* Decorative stars */}
        {["✦", "✧", "✦", "✧", "✦", "✧", "✦", "✧"].map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              color: "#c9a96e",
              opacity: 0.25 + (i % 3) * 0.15,
              fontSize: i % 2 === 0 ? 18 : 12,
              top: `${[8, 15, 75, 82, 20, 70, 45, 55][i]}%`,
              left: `${[8, 88, 5, 92, 50, 50, 3, 95][i]}%`,
            }}
          >
            {star}
          </div>
        ))}

        {/* Gold top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #c9a96e, transparent)",
          }}
        />

        {/* Palm icon */}
        <div style={{ fontSize: 80, marginBottom: 24, display: "flex" }}>🌿</div>

        {/* Title */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#c9a96e",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 16,
            display: "flex",
          }}
        >
          Зурхайч
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 1,
            background: "#c9a96e",
            opacity: 0.4,
            marginBottom: 20,
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#e8d5a3",
            opacity: 0.85,
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          Таны гарын мөрний нууц
        </div>

        {/* Gold bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #c9a96e, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
