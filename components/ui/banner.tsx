"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Timer } from "lucide-react";

export default function Banner() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 4, m: 59, s: 0 });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex justify-center mb-8 fade-in animate-in zoom-in-95 duration-500">
      <a
        href="#pricing"
        // 1. THICKNESS: Changed p-[2px] to p-[1px] to make the border thinner
        className="group relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      >
        {/* 
            2. LENGTH: Adjusted gradient stops.
            Old: #0000 50% -> 100%
            New: #0000 80% -> 100% (This makes the tail much shorter)
        */}
        <span 
          className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
          style={{
            background: "conic-gradient(from 90deg at 50% 50%, #0000 0%, #0000 80%, #fb7185 90%, #ec4899 100%)"
          }}
        />

        {/* Content Mask */}
        <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-background px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-3xl transition-all group-hover:bg-background/90">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 rounded-full bg-pink-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pink-500 ring-1 ring-inset ring-pink-500/20">
              {/* <Sparkles className="size-2.5" /> */}
              Sale
            </span>

            <span className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <span>50% Off Annual Plans</span>
              <span className="hidden sm:inline w-px h-3 bg-border mx-1"></span>
              <span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs text-foreground/80">
                <Timer className="size-3 opacity-70" />
                <span className="tabular-nums">
                  {mounted ? `${format(timeLeft.h)}:${format(timeLeft.m)}:${format(timeLeft.s)}` : "00:00:00"}
                </span>
              </span>
            </span>

            <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-pink-500" />
          </div>
        </span>
      </a>
    </div>
  );
}