import { cn } from "@/lib/utils";

function GridBackground({ className }: { className?: string }) {
  return (
    <div
      data-slot="grid-background"
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
    >
      {/* Grid lines — matches design's body::before */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 20%, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, black 10%, transparent 70%)",
          opacity: 0.6,
        }}
        aria-hidden
      />
      {/* Light mode grid lines */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,8,14,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,8,14,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 20%, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, black 10%, transparent 70%)",
          opacity: 0.7,
        }}
        aria-hidden
      />
      {/* Pink bottom glow — matches design's body::after */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 500px at 50% 100%, rgba(236,72,153,0.10), transparent 70%)",
        }}
        aria-hidden
      />
    </div>
  );
}

export default GridBackground;
