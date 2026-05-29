import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b1528",
          borderRadius: 8,
        }}
      >
        <div style={{ fontSize: 20, display: "flex" }}>🌿</div>
      </div>
    ),
    { ...size }
  );
}
