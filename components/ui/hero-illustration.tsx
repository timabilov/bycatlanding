import { Bell, BookOpen, Brain, CheckCircle2, Sparkles, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

function HeroIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[400px] w-full items-center justify-center lg:h-[500px]",
        className,
      )}
    >
      {/* Central flashcard */}
      <div className="animate-appear absolute z-20 flex h-48 w-36 flex-col items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-br from-background to-muted/50 p-4 opacity-0 shadow-xl delay-300 dark:from-muted/20 dark:to-background/50 sm:h-56 sm:w-44">
        <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 sm:size-14">
          <Brain className="size-6 text-white sm:size-7" />
        </div>
        <div className="mb-2 h-2 w-20 rounded-full bg-foreground/20 sm:w-24" />
        <div className="mb-1 h-2 w-16 rounded-full bg-foreground/10 sm:w-20" />
        <div className="h-2 w-12 rounded-full bg-foreground/10 sm:w-16" />
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-12 rounded-md bg-violet-500/20 dark:bg-violet-500/30" />
          <div className="h-6 w-12 rounded-md bg-cyan-500/20 dark:bg-cyan-500/30" />
        </div>
      </div>

      {/* Quiz card - top right */}
      <div className="animate-appear absolute right-4 top-8 z-10 flex h-28 w-24 flex-col rounded-xl border border-border/50 bg-background/80 p-3 opacity-0 shadow-lg backdrop-blur-sm delay-500 dark:bg-muted/30 sm:right-8 sm:h-32 sm:w-28">
        <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
          <Zap className="size-4 text-white" />
        </div>
        <div className="mb-1.5 h-1.5 w-14 rounded-full bg-foreground/15 sm:w-16" />
        <div className="mb-1.5 h-1.5 w-10 rounded-full bg-foreground/10 sm:w-12" />
        <div className="mt-auto flex items-center gap-1">
          <CheckCircle2 className="size-3 text-emerald-500" />
          <span className="text-[10px] text-muted-foreground">85%</span>
        </div>
      </div>

      {/* Alert/reminder card - top left */}
      <div className="animate-appear absolute left-4 top-16 z-10 flex h-20 w-28 items-center gap-2 rounded-xl border border-border/50 bg-background/80 p-3 opacity-0 shadow-lg backdrop-blur-sm delay-700 dark:bg-muted/30 sm:left-8 sm:h-24 sm:w-32">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 sm:size-10">
          <Bell className="size-4 text-white sm:size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-10 rounded-full bg-foreground/20 sm:w-12" />
          <div className="h-1.5 w-8 rounded-full bg-foreground/10 sm:w-10" />
        </div>
      </div>

      {/* Book/study card - bottom left */}
      <div className="animate-appear absolute bottom-12 left-8 z-10 flex h-24 w-24 flex-col items-center justify-center rounded-xl border border-border/50 bg-background/80 p-3 opacity-0 shadow-lg backdrop-blur-sm delay-500 dark:bg-muted/30 sm:bottom-16 sm:left-12 sm:h-28 sm:w-28">
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500">
          <BookOpen className="size-5 text-white" />
        </div>
        <div className="h-1.5 w-14 rounded-full bg-foreground/15 sm:w-16" />
        <div className="mt-1 h-1.5 w-10 rounded-full bg-foreground/10 sm:w-12" />
      </div>

      {/* AI sparkle card - bottom right */}
      <div className="animate-appear absolute bottom-20 right-8 z-10 flex h-20 w-20 flex-col items-center justify-center rounded-xl border border-border/50 bg-background/80 p-2 opacity-0 shadow-lg backdrop-blur-sm delay-700 dark:bg-muted/30 sm:bottom-24 sm:right-12 sm:h-24 sm:w-24">
        <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 sm:size-12">
          <Sparkles className="size-5 text-white sm:size-6" />
        </div>
        <span className="mt-1 text-[10px] font-medium text-muted-foreground">
          AI
        </span>
      </div>

      {/* Floating dots/particles */}
      <div className="animate-pulse absolute left-1/4 top-4 size-2 rounded-full bg-violet-400/60 delay-100" />
      <div className="animate-pulse absolute right-1/3 top-12 size-1.5 rounded-full bg-cyan-400/60 delay-300" />
      <div className="animate-pulse absolute bottom-8 left-1/3 size-2 rounded-full bg-pink-400/60 delay-500" />
      <div className="animate-pulse absolute bottom-16 right-1/4 size-1.5 rounded-full bg-amber-400/60 delay-700" />

      {/* Glow effect behind */}
      <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl dark:from-violet-500/30 dark:to-cyan-500/30 sm:size-64" />
    </div>
  );
}

export default HeroIllustration;
