import { ImageResponse } from "next/og";

// Imagem Open Graph padrão (compartilhamento social + previews de mecanismos
// generativos). Marca oficial: navy profundo + acento âmbar + símbolo 5R.
export const alt = "Protocolo 5R — Ciência que vira conduta.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#131A45",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", width: 84, height: 84, borderRadius: 18, background: "#2B3990", alignItems: "center", justifyContent: "center" }}>
            <svg width="84" height="84" viewBox="0 0 100 100">
              <path
                d="M38 4 L38 22 Q38 30 46 30 L70 30 Q78 30 78 38 Q78 46 70 46 L40 46 Q32 46 32 54 Q32 62 40 62 L70 62 Q78 62 78 70 Q78 78 70 78 L54 78 Q46 78 46 86 L46 96"
                stroke="#F7F4EE"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#F7F4EE", fontSize: 30, fontWeight: 600 }}>Protocolo 5R</span>
            <span style={{ color: "#B9C1EA", fontSize: 16, letterSpacing: 2, fontFamily: "monospace" }}>
              UMA CERTIFICAÇÃO SCIENCE PLAY
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#fff", fontSize: 62, lineHeight: 1.05, maxWidth: 900 }}>
            O Protocolo 5R, traduzido da ciência para a sua vida.
          </span>
          <span style={{ color: "#B9C1EA", fontSize: 26, marginTop: 20 }}>
            Saúde intestinal e microbiota com base em evidências.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 60, height: 6, background: "#C8842E", borderRadius: 3 }} />
          <span style={{ color: "#C8842E", fontSize: 20, fontFamily: "monospace", letterSpacing: 1 }}>
            CIÊNCIA QUE VIRA CONDUTA
          </span>
        </div>
      </div>
    ),
    size
  );
}
