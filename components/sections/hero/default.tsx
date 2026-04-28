"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import HeroVideo from "../../ui/hero-video";
import { Section } from "../../ui/section";

// --- Apple logo ---
const AppleLogo = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.127 3.675-.552 9.127 1.519 12.153 1.015 1.481 2.228 3.143 3.82 3.083 1.528-.057 2.103-1.026 3.945-1.026 1.841 0 2.378 1.026 4.004 1.002 1.666-.027 2.731-1.503 3.75-2.99 1.186-1.728 1.673-3.395 1.696-3.483-.037-.015-3.268-1.253-3.297-4.968-.031-3.11 2.54-4.595 2.663-4.673-1.455-2.126-3.719-2.365-4.524-2.408-1.04-.047-2.023.633-2.655.633zM10.237 3.518c.855-1.037 1.433-2.48 1.275-3.917-1.233.05-2.727.822-3.612 1.861-.793.922-1.487 2.411-1.306 3.83 1.378.107 2.783-.736 3.643-1.774z" />
  </svg>
);

// --- Format pills ---
const FORMATS = [
  { label: "PDFs",   icon: "/pdf.svg",  lightBg: "normal" as const },
  { label: "Videos", icon: "/yt.svg",   lightBg: false as const },
  { label: "Audio",  icon: "/mic.svg",  lightBg: false as const },
  { label: "Notes",  icon: "/text.svg", lightBg: "tight" as const },
];

function FormatPills() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => setActive(p => (p + 1) % FORMATS.length), 2800);
    return () => clearInterval(iv);
  }, [paused]);

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {FORMATS.map((fmt, i) => {
        const isActive = i === active;
        return (
          <motion.button
            key={fmt.label}
            onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
            className={cn(
              "relative flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer border",
              isActive
                ? "border-border/60 bg-muted/60 text-foreground"
                : "border-transparent bg-transparent text-muted-foreground hover:text-foreground"
            )}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={fmt.icon}
              alt=""
              className={cn(
                "size-[18px] rounded-md transition-all duration-300",
                fmt.lightBg === "normal" && "dark:bg-transparent bg-neutral-800/80 p-0.5 dark:p-0",
                fmt.lightBg === "tight"  && "dark:bg-transparent bg-neutral-800/80 p-[3px] dark:p-0 rounded-sm",
                isActive ? "scale-110" : "opacity-60"
              )}
            />
            {fmt.label}
          </motion.button>
        );
      })}
    </div>
  );
}

// --- Topographic SVG lines ---
function TopoLines() {
  const lines: React.ReactElement[] = [];
  for (let i = 0; i < 14; i++) {
    const r = 30 + i * 22;
    const cx = 200 + Math.sin(i * 1.3) * 20;
    const cy = 200 + Math.cos(i * 0.7) * 20;
    const s = Math.sin;
    const c = Math.cos;
    const d = `M ${cx-r} ${cy} C ${cx-r/2} ${cy-r*(0.7+s(i)*0.1)}, ${cx+r/2} ${cy-r*(0.7+c(i)*0.1)}, ${cx+r} ${cy} C ${cx+r/2} ${cy+r*(0.7+s(i+1)*0.1)}, ${cx-r/2} ${cy+r*(0.7+c(i+1)*0.1)}, ${cx-r} ${cy} Z`;
    lines.push(<path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />);
  }
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }}>
      {lines}
    </svg>
  );
}

// --- Animated Wavy Orb (port from design) ---
function WavyOrb({ size = 58, speaking = true }: { size?: number; speaking?: boolean }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!speaking) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speaking]);

  const points = 16;
  const cx = 50, cy = 50, baseR = 32;
  const amp = speaking ? 3.2 : 1.0;
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < points; i++) {
    const ang = (i / points) * Math.PI * 2;
    const r =
      baseR
      + Math.sin(ang * 3 + t * 2.1) * amp
      + Math.sin(ang * 5 - t * 1.3) * (amp * 0.6)
      + Math.cos(ang * 2 + t * 0.9) * (amp * 0.4);
    pts.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
  }

  let d = "";
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % points];
    const p3 = pts[(i + 2) % points];
    if (i === 0) d += `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} `;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  d += "Z";

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="orbGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#ec4899" />
          <stop offset="60%"  stopColor="#f97316" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#orbGrad)" strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
}

// --- Chat typewriter ---
const CHAT_SCRIPT = [
  { who: "ai-label" as const, text: "Bycat" },
  { who: "ai-sub"   as const, text: "Question 1 of 5" },
  { who: "ai"       as const, text: "Name two things mitochondria do besides making ATP." },
  { who: "user"     as const, text: "uhh… signaling?" },
  { who: "ai-label" as const, text: "Bycat" },
  { who: "ai"       as const, text: "Close. From your lecture: calcium buffering and apoptosis. Want me to drill this tomorrow at 8pm?" },
  { who: "user"     as const, text: "yes — cell cycle. no mercy" },
];
type Turn = typeof CHAT_SCRIPT[number];

function useChatFlow() {
  const [step, setStep]         = useState(0);
  const [typed, setTyped]       = useState("");
  const [turns, setTurns]       = useState<Turn[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertKey, setAlertKey]  = useState(0);

  useEffect(() => {
    if (step >= CHAT_SCRIPT.length) {
      setShowAlert(true);
      setAlertKey(k => k + 1);
      const hideTimer  = setTimeout(() => setShowAlert(false), 4000);
      const resetTimer = setTimeout(() => { setTurns([]); setStep(0); setTyped(""); }, 4500);
      return () => { clearTimeout(hideTimer); clearTimeout(resetTimer); };
    }
    const cur = CHAT_SCRIPT[step];
    if (cur.who === "ai-label" || cur.who === "ai-sub") {
      setTurns(prev => [...prev, cur]);
      const t = setTimeout(() => setStep(s => s + 1), 250);
      return () => clearTimeout(t);
    }
    let i = 0;
    setTyped("");
    const speed = cur.who === "user" ? 90 : 28;
    const iv = setInterval(() => {
      i++;
      setTyped(cur.text.slice(0, i));
      if (i >= cur.text.length) {
        clearInterval(iv);
        setTimeout(() => {
          setTurns(prev => [...prev, cur]);
          setTyped("");
          setStep(s => s + 1);
        }, 550);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [step]);

  return { turns, typed, current: CHAT_SCRIPT[step], showAlert, alertKey };
}

const Caret = () => (
  <span style={{
    display: "inline-block", width: "4px", height: "10px",
    verticalAlign: "-1px", background: "rgba(255,255,255,0.85)",
    marginLeft: "2px", animation: "caret-blink 0.9s steps(2,end) infinite"
  }} />
);

function ChatTurnEl({ turn, typed }: { turn: Turn; typed?: string }) {
  const text = typed ?? turn.text;
  if (turn.who === "ai-label")
    return <div style={{ color: "#a78bfa", fontSize: "9px", fontWeight: 600, marginTop: "4px" }}>{turn.text}</div>;
  if (turn.who === "ai-sub")
    return <div style={{ color: "#a78bfa", fontSize: "10px", fontWeight: 700 }}>{turn.text}</div>;
  if (turn.who === "ai")
    return <div style={{ color: "#fff", fontSize: "9.5px", lineHeight: 1.4 }}>{text}{typed !== undefined && <Caret />}</div>;
  if (turn.who === "user")
    return <div style={{ color: "rgba(255,255,255,0.55)", textAlign: "right", fontSize: "9.5px", marginTop: "2px" }}>{text}{typed !== undefined && <Caret />}</div>;
  return null;
}

// --- Full phone chat visual ---
function HeroPhoneVisual() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { turns, typed, current, showAlert, alertKey } = useChatFlow();
  const aiSpeaking = current && (current.who === "ai" || current.who === "ai-label" || current.who === "ai-sub");

  const isLight = mounted && resolvedTheme === "light";
  const chipBg     = isLight ? "rgba(255,255,255,0.97)" : "rgba(15,13,20,0.9)";
  const chipBorder = isLight ? "rgba(10,8,14,0.10)"     : "rgba(255,255,255,0.12)";
  const chipText   = isLight ? "#0c0a14"                : "#f5f4f8";
  const bubbleBg   = isLight ? "rgba(255,255,255,0.97)" : "rgba(15,13,20,0.94)";
  const bubbleText = isLight ? "#0c0a14"                : "#f5f4f8";
  const bubbleSub  = isLight ? "#52505a"                : "#9a96a8";

  const chipStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    position: "absolute", zIndex: 3,
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: "8px 12px", borderRadius: "10px",
    background: chipBg, border: `1px solid ${chipBorder}`,
    backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
    fontSize: "12px", color: chipText, whiteSpace: "nowrap",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    animation: "float-y 6s ease-in-out infinite",
    ...extra,
  });

  const chipIcon = (children: React.ReactNode) => (
    <span style={{
      width: "20px", height: "20px", display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: "6px",
      background: "rgba(236,72,153,0.14)", color: "#f472b6", flexShrink: 0,
    }}>{children}</span>
  );

  return (
    <div style={{ position: "relative", aspectRatio: "1 / 1", width: "100%", maxWidth: "520px", minWidth: "300px", margin: "0 auto" }}>

      {/* Topo card */}
      <div style={{
        position: "absolute", inset: "4%", borderRadius: "24px", overflow: "hidden",
        background: "#0a0812", border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 120px rgba(236,72,153,0.12)",
      }}>
        <TopoLines />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(236,72,153,0.12), transparent 50%), radial-gradient(ellipse at 80% 85%, rgba(99,102,241,0.08), transparent 55%)" }} />
      </div>

      {/* Phone frame */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "46%", aspectRatio: "9/19",
        borderRadius: "34px", background: "#000",
        border: "1px solid rgba(255,255,255,0.15)", padding: "6px",
        boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)",
        zIndex: 2,
      }}>
        <div style={{ width: "100%", height: "100%", background: "#000", borderRadius: "28px", overflow: "hidden", position: "relative" }}>
          {/* Notch */}
          <div style={{ position: "absolute", top: "6px", left: "50%", transform: "translateX(-50%)", width: "40%", height: "5%", background: "#000", borderRadius: "999px", zIndex: 3 }} />
          {/* Status bar */}
          <div style={{ position: "absolute", top: "8px", left: "14px", right: "14px", display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#fff", zIndex: 4, fontWeight: 500 }}>
            <span>21:57</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff"><rect x="1" y="15" width="4" height="8"/><rect x="7" y="11" width="4" height="12"/><rect x="13" y="7" width="4" height="16"/><rect x="19" y="3" width="4" height="20"/></svg>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><circle cx="12" cy="20" r="1.2" fill="#fff" stroke="none"/></svg>
              <span style={{ width: "16px", height: "8px", border: "1.5px solid rgba(255,255,255,0.6)", borderRadius: "2px", display: "inline-flex", position: "relative" }}>
                <span style={{ position: "absolute", left: "1px", top: "1px", bottom: "1px", width: "55%", background: "#fff", borderRadius: "1px" }} />
              </span>
            </span>
          </div>
          {/* Chat screen */}
          <div style={{ position: "absolute", top: "30px", left: 0, right: 0, bottom: 0, color: "#fff", display: "flex", flexDirection: "column", padding: "0 14px 10px" }}>
            {/* Top bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "8px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "3px 9px 3px 8px", borderRadius: "999px", background: "#dc2626", color: "#fff", fontSize: "9px", fontWeight: 700 }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#fff", flexShrink: 0, animation: "live-pulse 1.4s ease-in-out infinite" }} />
                LIVE
              </span>
              <span style={{ color: "#a78bfa", fontSize: "10px", fontWeight: 600 }}>Practice · Cell Biology</span>
              <span style={{ marginLeft: "auto", color: "#ef4444", fontSize: "13px", fontWeight: 600 }}>×</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "9px", margin: "4px 0 8px" }}>Joined live · picked up right where you left off.</div>
            {/* Chat log */}
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: "4px", lineHeight: 1.35 }}>
              {turns.map((turn, i) => <ChatTurnEl key={i} turn={turn} />)}
              {typed && current && <ChatTurnEl turn={current} typed={typed} />}
            </div>
            {/* Footer with wavy orb */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", paddingBottom: "4px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 9px", borderRadius: "999px", background: aiSpeaking ? "rgba(220,38,38,0.12)" : "rgba(34,197,94,0.12)", border: `1px solid ${aiSpeaking ? "rgba(220,38,38,0.25)" : "rgba(34,197,94,0.25)"}`, color: aiSpeaking ? "#f87171" : "#4ade80", fontSize: "8px", fontWeight: 500 }}>
                {aiSpeaking ? "🎙 Mic paused — Bycat is speaking" : "🎙 Listening..."}
              </span>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "2px" }}>
                <WavyOrb size={62} speaking={!!aiSpeaking} />
              </div>
              <div style={{ color: "#f87171", fontSize: "10px", fontWeight: 500, textAlign: "center" }}>Bycat is purring along.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mascot peek */}
      <div style={{ position: "absolute", top: "-2%", left: "2%", zIndex: 4, display: "flex", alignItems: "flex-start", gap: "10px", animation: "float-y 6.5s ease-in-out infinite", animationDelay: "-3s" }}>
        <img src="/apple-touch-icon.png" alt="Bycat mascot" style={{ width: "68px", height: "68px", borderRadius: "18px", boxShadow: "0 12px 28px rgba(0,0,0,0.45)", transform: "rotate(-8deg)" }} />
        <div style={{ marginTop: "10px", padding: "8px 12px", background: bubbleBg, border: `1px solid ${chipBorder}`, borderRadius: "12px 12px 12px 4px", backdropFilter: "blur(10px)", minWidth: "100px", boxShadow: "0 10px 24px rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: bubbleText }}>Nice try!</div>
          <div style={{ fontSize: "11px", color: bubbleSub, marginTop: "2px" }}>You got 4 / 5 right.</div>
        </div>
      </div>

      {/* Float chip 1: YouTube */}
      <div style={chipStyle({ top: "58%", left: "-4%", animationDelay: "0s" })}>
        {chipIcon(<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="14" height="12" rx="2"/><path d="m17 10 4-2v8l-4-2z"/></svg>)}
        YouTube → Notes
      </div>

      {/* Float chip 2: PDF */}
      <div style={chipStyle({ top: "8%", right: "1%", animationDelay: "-2s" })}>
        {chipIcon(<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>)}
        PDF parsed · 12 pages
      </div>

      {/* Float chip 3: Live lecture capture */}
      <div style={chipStyle({ top: "32%", right: "-7%", animationDelay: "-1s" })}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {chipIcon(
            /* waveform bars — modern audio feel */
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <rect x="1"  y="9"  width="3" height="6"  rx="1.5"/>
              <rect x="6"  y="5"  width="3" height="14" rx="1.5"/>
              <rect x="11" y="2"  width="3" height="20" rx="1.5"/>
              <rect x="16" y="5"  width="3" height="14" rx="1.5"/>
              <rect x="21" y="9"  width="3" height="6"  rx="1.5"/>
            </svg>
          )}
          <span style={{ fontWeight: 600 }}>Capture live</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", padding: "1px 6px", borderRadius: "999px", background: "rgba(239,68,68,0.12)", color: "#f87171", fontSize: "10px", fontWeight: 600 }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ef4444", animation: "live-pulse 1.4s ease-in-out infinite" }} />
            REC
          </span>
        </div>
      </div>

      {/* Alert card */}
      <div style={{ position: "absolute", bottom: "4%", right: "-6%", zIndex: 3, animation: "float-y 7s ease-in-out infinite" }}>
        <div key={alertKey} style={{
          width: "190px",
          padding: "12px 14px", borderRadius: "14px",
          background: bubbleBg, border: `1px solid ${chipBorder}`,
          backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
          animation: showAlert
            ? "pop-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
            : "fade-out-card 0.45s ease forwards",
          pointerEvents: showAlert ? "auto" : "none",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ position: "relative", width: "22px", height: "22px", borderRadius: "7px", background: "rgba(236,72,153,0.14)", color: "#f472b6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
            <span style={{ position: "absolute", top: "2px", right: "2px", width: "6px", height: "6px", borderRadius: "50%", background: "#ec4899", boxShadow: "0 0 6px #ec4899", animation: "bell-pulse 1.8s ease-in-out infinite" }} />
          </span>
          <div style={{ fontSize: "12px", fontWeight: 600, color: bubbleText }}>Quiz alert set</div>
          <div style={{ marginLeft: "auto", fontSize: "10px", color: bubbleSub }}>just now</div>
        </div>
        <div style={{ fontSize: "11px", color: bubbleSub, lineHeight: 1.45, marginBottom: "10px" }}>
          <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#f472b6", marginRight: "4px" }}>You:</span>
          "yes — <strong style={{ color: bubbleText }}>cell cycle</strong>. no mercy"
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "999px", background: "rgba(34,197,94,0.12)", color: "#22c55e", fontSize: "9.5px", fontWeight: 600 }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
            On
          </span>
          <span style={{ fontSize: "10px", color: bubbleSub }}>Pings you when ready</span>
        </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Hero ---
interface HeroProps {
  title?: string;
  description?: string;
  badge?: ReactNode | false;
  className?: string;
}

export default function Hero({
  title = "Study Less. Master More.",
  description = "Drop any PDF, video, or lecture — Bycat AI turns it into flashcards, quizzes, and live drill sessions in seconds.",
  badge = (
    <a href="https://apps.apple.com/us/app/leitner-ai-note-quiz-alerts/id6747087851" target="_blank" rel="noopener noreferrer" className="animate-appear">
      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-muted/60 px-1 py-1 transition-colors hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20">
        <span className="inline-flex h-full w-full items-center justify-center gap-2 rounded-full px-2 py-0.5 text-xs font-medium">
          <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-foreground text-background dark:bg-zinc-700 dark:text-zinc-100">New</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            Bycat AI mobile app is out!
            <ArrowRightIcon className="size-3" />
          </span>
        </span>
      </div>
    </a>
  ),
  className,
}: HeroProps) {
  return (
    <Section className={cn("overflow-hidden px-0 pb-0 pt-8 sm:pt-12 md:py-10", className)}>
      <div className="flex flex-col gap-8 px-4 sm:gap-12 sm:px-6 md:px-16 lg:px-24">

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12 lg:items-center">
          {/* ---- Left content ---- */}
          <div className="flex max-w-2xl flex-col items-start gap-5 text-left lg:flex-1">
            {badge !== false && <div className="w-full flex justify-start">{badge}</div>}

            <h1
              className="animate-appear relative z-10 opacity-0 text-foreground"
              style={{ fontSize: "clamp(40px,5.2vw,66px)", lineHeight: 1.02, fontWeight: 600, letterSpacing: "-0.035em" }}
            >
              {title}
              <br />
              <span>Stay sharp.</span>
            </h1>

            <div className="animate-appear opacity-0 delay-75">
              <FormatPills />
            </div>

            <p className="animate-appear relative z-10 text-base text-muted-foreground opacity-0 delay-100 sm:text-lg leading-relaxed max-w-[500px]">
              {description}
            </p>

            <div className="animate-appear relative z-10 flex flex-col sm:flex-row gap-3 opacity-0 delay-300 w-full sm:w-auto">
              <Button size="lg" variant="default" className="h-12 px-6 text-sm font-medium from-white! to-white! text-zinc-900! shadow-sm hover:from-zinc-50! hover:to-zinc-50! dark:from-primary/100! dark:to-primary/70! dark:text-primary-foreground! dark:hover:from-primary/80! dark:hover:to-primary/70!" asChild>
                <a href={siteConfig.getStartedUrl}>
                  <Globe className="mr-2 size-4" /> Web platform
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-sm font-medium" asChild>
                <a href="https://apps.apple.com/us/app/leitner-ai-note-quiz-alerts/id6747087851">
                  <AppleLogo className="mr-2 size-4" /> App Store
                </a>
              </Button>
            </div>

            {/* Trust row with real avatars */}
            <div className="animate-appear relative z-10 flex items-center gap-3 opacity-0 delay-500">
              <div className="flex -space-x-2">
                {["user1.png","user2.png","user3.png","user4.png","user5.png"].map((n, i) => (
                  <div key={i} className="size-8 overflow-hidden rounded-full border-2 border-background">
                    <img src={`/${n}`} alt="Student" width={32} height={32} className="size-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-foreground leading-snug">
                  Used by <strong>20,000+ students</strong> at Stanford, UCL, NYU &amp; 300 more.
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">Free for the first week — zero risk, pure upside.</span>
              </div>
            </div>
          </div>

          {/* ---- Right: phone visual ---- */}
          <div className="relative hidden lg:flex lg:flex-1 items-center justify-center overflow-visible">
            <HeroPhoneVisual />
          </div>
        </div>

        {/* ---- Demo video section ---- */}
        <div className="relative w-full pt-12 sm:pt-20">
          <div className="text-center mb-10 animate-appear opacity-0 delay-500">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="size-1.5 rounded-full bg-primary flex-shrink-0" style={{ boxShadow: "0 0 8px #ec4899" }} />
              30-second demo
            </span>
            <h2
              className="text-foreground font-semibold"
              style={{ fontSize: "clamp(28px,4.2vw,54px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              See everything click into place.
            </h2>
          </div>
          <div className="relative z-10 animate-appear opacity-0 delay-700">
            <HeroVideo variant="below" />
          </div>
        </div>
      </div>
      <div className="pointer-events-none h-24 w-full bg-gradient-to-b from-transparent to-background sm:h-32" />
    </Section>
  );
}
