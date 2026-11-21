import { ImageResponse } from "next/server";

export const ogSize = { width: 1200, height: 630 };

const HEX = "M50 4 90 27v46L50 96 10 73V27Z";

/** Branded 1200x630 social preview image. */
export function renderOgImage(title = "Small apps, made with care.", kicker = "hexa apps") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#F4F4F1",
          color: "#121417",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="260" height="260" viewBox="0 0 100 100" style={{ position: "absolute", right: -40, top: -30 }}>
          <path d="M50 8 86 29v42L50 92 14 71V29Z" fill="none" stroke="#34C99A" strokeWidth="7" strokeLinejoin="round" />
        </svg>
        <svg width="180" height="180" viewBox="0 0 100 100" style={{ position: "absolute", right: 120, bottom: 60, transform: "rotate(14deg)" }}>
          <path d={HEX} fill="#FFC94A" stroke="#FFC94A" strokeWidth="6" strokeLinejoin="round" />
        </svg>
        <svg width="90" height="90" viewBox="0 0 100 100" style={{ position: "absolute", right: 360, top: 120 }}>
          <path d={HEX} fill="#FF7759" stroke="#FF7759" strokeWidth="6" strokeLinejoin="round" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 36 36">
            <path d="M18 2 32 10v16L18 34 4 26V10Z" fill="#121417" />
            <path d="M18 11 24 14.5v7L18 25l-6-3.5v-7Z" fill="#2B4EE6" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 700 }}>{kicker}</span>
        </div>
        <div style={{ display: "flex", maxWidth: 820, fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#4A4D52" }}>
          Games · iOS · Android · Web — www.hexaapps.net
        </div>
      </div>
    ),
    ogSize
  );
}
