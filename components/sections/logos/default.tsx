"use client";

import { Section } from "../../ui/section";

const UNIVERSITIES = [
  { name: "Stanford", sub: "University", style: "serif-sans" },
  { name: "HARVARD", sub: "· University", style: "serif-caps" },
  { name: "MIT", sub: "", style: "sans-bold" },
  { name: "Oxford", sub: "", style: "old-serif" },
  { name: "Cambridge", sub: "", style: "old-serif" },
  { name: "Yale", sub: "University", style: "serif-sans" },
  { name: "PRINCETON", sub: "", style: "serif-caps" },
  { name: "Columbia", sub: "University", style: "serif-sans" },
  { name: "UCL", sub: "", style: "sans-bold" },
  { name: "Imperial", sub: "College London", style: "serif-sans" },
  { name: "Berkeley", sub: "· UC", style: "serif-sans" },
  { name: "NYU", sub: "", style: "sans-bold" },
  { name: "ETH Zürich", sub: "", style: "sans-bold" },
  { name: "Tsinghua", sub: "清華", style: "serif-sans" },
  { name: "Tokyo", sub: "東京大學", style: "serif-sans" },
];

const fontStyles: Record<string, React.CSSProperties> = {
  "serif-sans": {
    fontFamily: "'Times New Roman', Georgia, serif",
    fontSize: "24px",
    fontWeight: 400,
  },
  "serif-caps": {
    fontFamily: "'Times New Roman', Georgia, serif",
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.22em",
  },
  "old-serif": {
    fontFamily: "'Times New Roman', Georgia, serif",
    fontSize: "26px",
    fontWeight: 400,
    fontStyle: "italic",
    letterSpacing: "-0.02em",
  },
  "sans-bold": {
    fontFamily: "inherit",
    fontSize: "24px",
    fontWeight: 700,
    letterSpacing: "-0.04em",
  },
};

export default function UniversityRail() {
  // Duplicate for seamless loop
  const list = [...UNIVERSITIES, ...UNIVERSITIES];

  return (
    <section className="py-16" aria-label="Universities">
      <div className="max-w-container mx-auto px-4 mb-8 text-center">
        <p
          className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
        >
          Real students from 300+ universities
        </p>
      </div>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "56px",
            width: "max-content",
            animation: "uni-scroll 50s linear infinite",
            alignItems: "center",
            padding: "0 28px",
          }}
          className="group-hover:[animation-play-state:paused]"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
          }}
        >
          {list.map((u, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "8px",
                opacity: 0.45,
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "opacity 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.opacity = "0.45";
              }}
            >
              <span
                className="text-foreground"
                style={fontStyles[u.style] || fontStyles["sans-bold"]}
              >
                {u.name}
              </span>
              {u.sub && (
                <span className="text-muted-foreground" style={{ fontSize: "13px", letterSpacing: "0.02em" }}>
                  {u.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
