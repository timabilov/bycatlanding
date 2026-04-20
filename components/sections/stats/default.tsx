"use client";

import { useEffect, useState } from "react";
import { Section } from "../../ui/section";

const STATS = [
  {
    key: "notes",
    initial: 2847293,
    live: true,
    increment: () => Math.floor(Math.random() * 4) + 1,
    format: (n: number) => n.toLocaleString(),
    label: "Notes generated",
    showDot: true,
  },
  {
    key: "online",
    initial: 1247,
    live: true,
    // oscillates between 900-1800
    increment: (n: number) => Math.max(900, Math.min(1800, n + (Math.random() > 0.5 ? 1 : -1))),
    format: (n: number) => n.toLocaleString(),
    label: "Studying now",
    showDot: true,
    oscillate: true,
  },
  {
    key: "sessions",
    initial: 18409,
    live: true,
    increment: (n: number) => n + (Math.random() > 0.7 ? 1 : 0),
    format: (n: number) => n.toLocaleString(),
    label: "AI sessions today",
    showDot: false,
  },
  {
    key: "rating",
    initial: null,
    live: false,
    format: () => "4.9★",
    label: "App Store rating",
    showDot: false,
  },
];

export default function Stats() {
  const [notes, setNotes] = useState(2847293);
  const [online, setOnline] = useState(1247);
  const [sessions, setSessions] = useState(18409);

  useEffect(() => {
    const id = setInterval(() => {
      setNotes((n) => n + Math.floor(Math.random() * 4) + 1);
      setOnline((n) => Math.max(900, Math.min(1800, n + (Math.random() > 0.5 ? 1 : -1))));
      setSessions((n) => n + (Math.random() > 0.7 ? 1 : 0));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { value: notes.toLocaleString(), label: "Notes generated", dot: true, live: true },
    { value: online.toLocaleString(), label: "Studying now", dot: true, live: true },
    { value: sessions.toLocaleString(), label: "AI sessions today", dot: false, live: false },
    { value: "4.9★", label: "App Store rating", dot: false, live: false },
  ];

  return (
    <Section className="py-12">
      <div className="max-w-container mx-auto px-4">
        <div
          className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl border border-border overflow-hidden"
        >
          {cells.map((cell, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1.5 px-5 py-6 text-center border-r border-border last:border-r-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r [&:nth-child(1)]:border-b [&:nth-child(2)]:border-b sm:[&:nth-child(1)]:border-b-0 sm:[&:nth-child(2)]:border-b-0"
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
                    style={{
                      boxShadow: "0 0 6px #22c55e",
                      animation: "blink-dot 1.8s ease-in-out infinite",
                    }}
                  />
                )}
                {cell.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
