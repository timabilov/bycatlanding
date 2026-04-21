"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "../../ui/section";

const REVIEWS = [
  { quote: "It nags in a good way.",   views: "33.1K",  video: "ugcbycataisippingondesk" },
  { quote: "2am therapy sessions.",    views: "91.7K",  video: "ugcsimplebycatdeskroom" },
  { quote: "I cried. Then I aced it.", views: "48.2K",  video: "ugcbycataisippingondesk" },
  { quote: "11 papers / day.",         views: "127K",   video: "ugcsimplebycatdeskroom" },
  { quote: "Humbled. Healed.",         views: "72.8K",  video: "ugcbycataisippingondesk" },
  { quote: "92. On the bus.",          views: "56.4K",  video: "ugcsimplebycatdeskroom" },
  { quote: "My cat studies with me.",  views: "84.3K",  video: "ugcchessestickbycatai" },
];

function TikTokPhone({ review }: { review: typeof REVIEWS[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    setHovered(false);
    setMuted(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !muted;
    setMuted(next);
    videoRef.current.muted = next;
    if (!next) videoRef.current.play().catch(() => {});
  };

  return (
    <div
      style={{
        flexShrink: 0,
        width: "220px",
        aspectRatio: "9/19",
        background: "#0a0812",
        borderRadius: "32px",
        padding: "5px",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        position: "relative",
        transition: "transform 0.3s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; handleEnter(); }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; handleLeave(); }}
    >
      <div style={{ width: "100%", height: "100%", background: "#000", borderRadius: "28px", overflow: "hidden", position: "relative" }}>
        {/* Notch */}
        <div style={{ position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)", width: "60px", height: "16px", background: "#000", borderRadius: "999px", zIndex: 4 }} />

        {/* Video — preload="metadata" loads first frame for thumbnail, not full video */}
        <video
          ref={videoRef}
          src={`https://bycatassets.com/${review.video}.mp4`}
          muted
          loop
          playsInline
          preload="metadata"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />

        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.25) 100%)", zIndex: 1 }} />

        {/* Center: quote */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", color: "rgba(255,255,255,0.95)", zIndex: 2, padding: "0 20px" }}>
          <div style={{ fontSize: "17px", lineHeight: 1.25, fontWeight: 700, letterSpacing: "-0.01em" }}>"{review.quote}"</div>
        </div>

        {/* Play icon + view count */}
        <div style={{ position: "absolute", left: "12px", bottom: "14px", zIndex: 3, display: "flex", alignItems: "center", gap: "5px" }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 1.5L11.5 6.5L2.5 11.5V1.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>{review.views}</span>
        </div>

        {/* Sound toggle — visible on hover */}
        {hovered && (
          <button
            onClick={toggleMute}
            style={{
              position: "absolute", right: "10px", bottom: "14px", zIndex: 5,
              background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
              width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff",
            }}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function TikTokCarousel() {
  const items = [...REVIEWS, ...REVIEWS];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section>
      <div className="max-w-container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground mb-4">
            <span className="text-primary">🔥</span> Trending on TikTok
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>
            Real students. Real all-nighters.
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-md mx-auto">
            Tagged us, posted themselves, cried in public. We just made the tool.
          </p>
        </div>
      </div>

      <div
        ref={sectionRef}
        style={{
          position: "relative",
          overflow: "hidden",
          maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          minHeight: "420px",
        }}
      >
        {isVisible && (
          <div
            style={{
              display: "flex",
              gap: "18px",
              width: "max-content",
              animation: "uni-scroll 40s linear infinite",
              padding: "20px 9px",
              alignItems: "center",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}
          >
            {items.map((r, i) => <TikTokPhone key={i} review={r} />)}
          </div>
        )}
      </div>
    </Section>
  );
}
