import { cn } from "@/lib/utils";

function GridBackground({ className }: { className?: string }) {
  return (
    <div
      data-slot="grid-background"
      className={cn("pointer-events-none fixed inset-0", className)}
    >
      {/* Radial mask to fade edges */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 0%, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 0%, black 30%, transparent 70%)",
        }}
      >
        {/* Large grid */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Small nested grid */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>
    </div>
  );
}

export default GridBackground;
