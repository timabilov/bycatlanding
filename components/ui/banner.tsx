"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Timer } from "lucide-react";

// 1. Define the props to accept the API response
interface BannerProps {
  promoData: {
    claim_until: string;
    // You can add other properties here if your API returns them (e.g., discount amount)
  };
}

export default function Banner({ promoData }: BannerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);

    // 2. If there's no date provided, do nothing
    if (!promoData?.claim_until) return;

    // 3. Use the dynamic date from the API response
    const targetDate = new Date(promoData.claim_until).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      } else {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [promoData]); // Re-run if promoData changes

  // Helper to keep numbers as double digits (e.g., 05 instead of 5)
  const format = (n: number) => n.toString().padStart(2, "0");

  return (
    <>
      <style jsx global>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          25% { transform: rotate(-25deg) translateX(-1px); }
          75% { transform: rotate(25deg) translateX(1px); }
        }
        .animate-wiggle {
          animation: wiggle 0.3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex justify-center mb-2 md:mb-8 fade-in animate-in zoom-in-95 duration-500">
        <a
          href="#pricing"
          className="group shadow-lg shadow-pink-500/10 relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 items-center gap-2 border border-pink-500/20 bg-pink-500/5 text-sm font-medium text-primary"
        >
          <span 
            className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
            style={{
              background: "conic-gradient(from 90deg at 50% 50%, #0000 0%, #0000 80%, #fb7185 90%, #ec4899 100%)"
            }}
          />

          <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-background px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-3xl transition-all group-hover:bg-background/90">
            
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-pink-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pink-500 ring-1 ring-inset ring-pink-500/20">
                🔥 Sale
              </span>

              <span className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <span>50% Off Annual Plans</span>
                <span className="hidden sm:inline w-px h-3 bg-border mx-1"></span>
                
                <span className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-foreground/90 font-semibold">
                  <Timer className="size-3.5 text-pink-500 animate-wiggle" />
                  
                  <span className="tabular-nums tracking-tight">
                    {/* 4. Applied your 'format' function here so it stays a consistent width */}
                    {mounted 
                      ? `${timeLeft.d} days ${format(timeLeft.h)} h ${format(timeLeft.m)} m ${format(timeLeft.s)} s` 
                      : "00 days 00 h 00 m 00 s"}
                  </span>
                </span>
              </span>

              <ArrowRight onClick={() => window.open("https://leitner-2adq.onrender.com/price-page?sale=true")} className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-pink-500" />
            </div>
          </span>
        </a>
      </div>
    </>
  );
}