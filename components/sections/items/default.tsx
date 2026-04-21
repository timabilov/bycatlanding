import { Section } from "../../ui/section";
import { FileTextIcon, MicIcon, YoutubeIcon, ImageIcon } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Drop anything in",
    description:
      "Lecture video, textbook PDF, voice memo, whiteboard photo, a YouTube link. Combine them into one note if you want.",
    visual: (
      <div className="flex gap-2 flex-wrap justify-center p-4">
        {[
          { icon: <FileTextIcon className="size-3.5" />, label: "slides.pdf" },
          { icon: <YoutubeIcon className="size-3.5" />, label: "lecture.mp4" },
          { icon: <MicIcon className="size-3.5" />, label: "memo.m4a" },
          { icon: <ImageIcon className="size-3.5" />, label: "notes.png" },
        ].map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-muted-foreground border border-border bg-muted/30"
          >
            {f.icon}
            {f.label}
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "02",
    title: "Bycat reads it",
    description:
      "Real synthesis, not copy-paste. You get a structured summary, a searchable transcript, flashcards, and three difficulty tiers of quiz.",
    visual: (
      <div className="flex flex-col items-center gap-2 w-4/5 p-3 rounded-xl border border-border bg-muted/20">
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400"
            style={{ width: "72%" }}
          />
        </div>
        <p className="text-xs text-muted-foreground">Generating flashcards… 72%</p>
      </div>
    ),
  },
  {
    num: "03",
    title: "Drill until it sticks",
    description:
      "Live AI sessions twice daily. Quiz alerts for the questions you keep missing. Unlocks the next tier when you're actually ready.",
    visual: (
      <div className="flex items-center gap-3">
        <div
          className="size-11 rounded-full flex-shrink-0"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(236,72,153,0) 70%)",
            boxShadow: "0 0 18px rgba(236,72,153,0.4)",
          }}
        />
        <div className="flex flex-col gap-1">
          {/* LIVE badge — same style as hero phone */}
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "2px 8px 2px 7px", borderRadius: "999px", background: "#dc2626", color: "#fff", fontSize: "9px", fontWeight: 700, width: "fit-content" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#fff", flexShrink: 0, animation: "live-pulse 1.4s ease-in-out infinite" }} />
            LIVE
          </span>
          <p className="text-sm text-foreground">AI session in 2h</p>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <div className="max-w-container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground mb-4">
            How it works
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>
            Three steps, zero excuses.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
            You do the uploading. Bycat does the reading, summarising, quizzing, and nagging-you-to-study.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="flex flex-col gap-4 rounded-2xl p-6 transition-colors bg-muted/30 border border-border"
            >
              <div className="text-xs font-semibold text-primary" style={{ fontVariantNumeric: "tabular-nums" }}>
                {step.num}
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{step.description}</p>
              <div className="h-[130px] rounded-xl flex items-center justify-center overflow-hidden bg-muted/40 border border-border dark:bg-[rgba(13,11,20,0.9)] dark:border-[rgba(255,255,255,0.07)]">
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
