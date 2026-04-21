"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "../../ui/section";

const SHOW_TITLES = false;

const REVIEWS = [
  { quote: "It nags in a good way.",   views: "33.1K",  video: "ugcbycataisippingondesk" },
  { quote: "2am therapy sessions.",    views: "91.7K",  video: "ugcsimplebycatdeskroom" },
  { quote: "My cat studies with me.",  views: "84.3K",  video: "ugcchessestickbycatai" },
  { quote: "Humbled. Healed.",         views: "72.8K",  video: "midtermstressugc" },
  { quote: "Crying into my notes.",    views: "61.5K",  video: "fooduserreview" },
  { quote: "Dropped the book, kept the grade.", views: "44.9K", video: "droppingabookbycatai" },
];

function TikTokPhone({ review }: { review: typeof REVIEWS[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const lastTouchTime = useRef(0);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    setMuted(true);
    v.play().catch(() => {});
  };

  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    v.muted = true;
    setMuted(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    setMuted(next);
    v.muted = next;
    if (!next) v.play().catch(() => {});
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
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        // Ignore synthetic mouse events fired right after touch
        if (lastTouchTime.current && Date.now() - lastTouchTime.current < 800) return;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        play();
      }}
      onMouseLeave={(e) => {
        if (lastTouchTime.current && Date.now() - lastTouchTime.current < 800) return;
        (e.currentTarget as HTMLDivElement).style.transform = "";
        stop();
      }}
      onTouchStart={() => { lastTouchTime.current = Date.now(); }}
      onClick={() => {
        // Only handle clicks from touch (desktop uses hover)
        if (Date.now() - lastTouchTime.current > 800) return;
        if (isPlaying) stop(); else play();
      }}
    >
      {/*
        isolation: "isolate" creates a new stacking context so Safari's native
        video compositing layer cannot bleed above our z-indexed overlays.
      */}
      <div style={{ width: "100%", height: "100%", background: "#000", borderRadius: "28px", overflow: "hidden", position: "relative", isolation: "isolate" }}>
        {/* Notch */}
        <div style={{ position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)", width: "60px", height: "16px", background: "#000", borderRadius: "999px", zIndex: 4 }} />

        {/* Video */}
        <video
          ref={videoRef}
          src={`https://bycatassets.com/${review.video}.mp4#t=0.001`}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />

        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.25) 100%)", zIndex: 1 }} />

        {/* Center: quote */}
        {SHOW_TITLES && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) translateZ(0)", textAlign: "center", color: "rgba(255,255,255,0.95)", zIndex: 2, padding: "0 20px" }}>
            <div style={{ fontSize: "17px", lineHeight: 1.25, fontWeight: 700, letterSpacing: "-0.01em" }}>"{review.quote}"</div>
          </div>
        )}

        {/*
          View count — always in DOM.
          translateZ(0) forces a GPU compositing layer above the video on Safari,
          preventing the video from covering it when it plays.
        */}
        <div style={{ position: "absolute", left: "12px", bottom: "14px", zIndex: 3, display: "flex", alignItems: "center", gap: "5px", transform: "translateZ(0)" }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 1.5L11.5 6.5L2.5 11.5V1.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>{review.views}</span>
        </div>

        {/*
          Mute button — always in DOM, shown when playing.
          Never conditionally rendered: React removing/adding it caused Safari
          to lose the stacking context and drop the element behind the video.
          translateZ(0) keeps it on its own GPU layer above the video.
        */}
        <button
          onClick={toggleMute}
          style={{
            position: "absolute", right: "10px", bottom: "14px", zIndex: 5,
            background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
            width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#fff",
            transform: "translateZ(0)",
            opacity: isPlaying ? 1 : 0,
            pointerEvents: isPlaying ? "auto" : "none",
            transition: "opacity 0.2s",
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
      </div>
    </div>
  );
}

export default function TikTokCarousel() {
  const items = [...REVIEWS, ...REVIEWS];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTouchTime = useRef(0);

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

  const pauseStrip = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    if (stripRef.current) stripRef.current.style.animationPlayState = "paused";
  };

  const resumeStrip = (delay = 0) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (stripRef.current) stripRef.current.style.animationPlayState = "running";
    }, delay);
  };

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
            When something actually helps at 2am, videos happen.
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
            ref={stripRef}
            style={{
              display: "flex",
              gap: "18px",
              width: "max-content",
              animation: "uni-scroll 40s linear infinite",
              padding: "20px 9px",
              alignItems: "center",
            }}
            // Mouse: hover pauses, leave resumes immediately
            onMouseEnter={() => {
              if (Date.now() - lastTouchTime.current < 800) return;
              pauseStrip();
            }}
            onMouseLeave={() => {
              if (Date.now() - lastTouchTime.current < 800) return;
              resumeStrip(0);
            }}
            // Touch: tap pauses, finger-up auto-resumes after 3s
            onTouchStart={() => {
              lastTouchTime.current = Date.now();
              pauseStrip();
            }}
            onTouchEnd={() => {
              lastTouchTime.current = Date.now();
              resumeStrip(3000);
            }}
          >
            {items.map((r, i) => <TikTokPhone key={i} review={r} />)}
          </div>
        )}
      </div>
    </Section>
  );
}
