import { ImageResponse } from "next/og";

export const alt = "Oguz Nurlu, software engineer based in Ankara, Türkiye";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview card shown when oguznurlu.com is shared (LinkedIn, WhatsApp, Slack, X)
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0a0a",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: 96, height: 8, background: "#22c55e", borderRadius: 4 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: "-0.03em", color: "#4ade80" }}>Oguz Nurlu</div>
          <div style={{ fontSize: 44, marginTop: 16, color: "#ededed" }}>Software engineer based in Ankara, Türkiye</div>
          <div style={{ fontSize: 30, marginTop: 24, color: "#a3a3a3" }}>
            Full-stack &amp; mobile · AI agents · Hardware-accelerated ML
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#737373" }}>oguznurlu.com</div>
      </div>
    ),
    size
  );
}
