"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Clock, Flame } from "lucide-react";

interface BannerProps {
  promoData: {
    claim_until: string;
  };
}

export default function Banner({ promoData }: BannerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);
    if (!promoData?.claim_until) return;

    const targetDate = new Date(promoData.claim_until).getTime();
    const tick = () => {
      const now = Date.now();
      const dist = Math.max(0, targetDate - now);
      const s = Math.floor(dist / 1000);
      setTimeLeft({
        d: Math.floor(s / 86400),
        h: Math.floor((s % 86400) / 3600),
        m: Math.floor((s % 3600) / 60),
        s: s % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [promoData]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex justify-center mb-2 md:mb-8">
      <a
        href="#pricing"
        className="relative inline-flex rounded-full focus:outline-none"
      >
        {/* Inner pill */}
        <span
          className="relative inline-flex h-full w-full items-center rounded-full transition-all"
          style={{
            background: "rgba(236,72,153,0.08)",
            border: "1px solid rgba(236,72,153,0.3)",
            padding: "6px 14px 6px 6px",
            gap: "12px",
          }}
        >
          {/* SALE tag */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
            style={{
              background: "#ec4899",
              letterSpacing: "0.02em",
            }}
          >
            <Flame className="size-3" />
            SALE
          </span>

          {/* Text — shortened on mobile */}
          <span className="text-sm text-foreground whitespace-nowrap">
            <span className="sm:hidden">50% off Annual</span>
            <span className="hidden sm:inline">50% off Annual plans</span>
          </span>

          {/* Separator — desktop only */}
          <span className="hidden sm:block h-3.5 w-px bg-white/20" />

          {/* Countdown */}
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Clock className="size-3 flex-shrink-0" />
            <span className="font-mono text-xs tabular-nums text-foreground font-medium">
              {mounted ? (
                <>
                  <span className="sm:hidden">{`${timeLeft.d}d ${pad(timeLeft.h)}:${pad(timeLeft.m)}:${pad(timeLeft.s)}`}</span>
                  <span className="hidden sm:inline">{`${timeLeft.d}d ${pad(timeLeft.h)}h ${pad(timeLeft.m)}m ${pad(timeLeft.s)}s`}</span>
                </>
              ) : "—"}
            </span>
          </span>

          <ArrowRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-pink-400" />
        </span>
      </a>
    </div>
  );
}
