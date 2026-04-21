"use client";

import { useEffect, useState } from "react";
import { Section } from "../../ui/section";

export default function Stats() {
  // Only "active now" drifts — everything else is a static past-30-days figure.
  const [online, setOnline] = useState(483);

  useEffect(() => {
    const id = setInterval(() => {
      setOnline((n) => Math.max(320, Math.min(580, n + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { value: "127,493",              label: "Notes generated",    sublabel: "past 30 days", dot: false },
    { value: online.toLocaleString(),label: "Studying right now", sublabel: null,           dot: true  },
    { value: "18,247",               label: "AI sessions",        sublabel: "past 30 days", dot: false },
  ];

  return (
    <Section className="py-12">
      <div className="max-w-container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-border overflow-hidden">
          {cells.map((cell, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1 px-5 py-6 text-center border-b border-border last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <div
                className="text-2xl sm:text-3xl font-semibold text-foreground tabular-nums"
                style={{ letterSpacing: "-0.025em" }}
              >
                {cell.value}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {cell.dot && (
                  <span
                    className="inline-block size-1.5 rounded-full bg-emerald-500 flex-shrink-0"
                    style={{ boxShadow: "0 0 6px #22c55e", animation: "blink-dot 1.8s ease-in-out infinite" }}
                  />
                )}
                {cell.label}
              </div>
              {cell.sublabel && (
                <div className="text-[10px] text-muted-foreground/60 mt-0.5">{cell.sublabel}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
