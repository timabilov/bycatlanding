"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  className?: string;
  variant?: "right" | "below";
}

export default function HeroVideo({ className, variant = "below" }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Keep the muted property in sync
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Play video when scrolled into view with a 1.5s delay.
  // IntersectionObserver + playsinline + muted ensures autoplay
  // works on iOS Safari, Android Chrome, and all modern browsers.
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let delayTimer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          delayTimer = setTimeout(() => {
            video.play().catch(() => {});
            setHasPlayed(true);
          }, 1000);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(container);
    return () => {
      clearTimeout(delayTimer);
      observer.disconnect();
    };
  }, [hasPlayed]);

  const handleToggleMute = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }

    setIsMuted((prev) => !prev);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative mx-auto",
        variant === "right" && "w-full h-full flex items-center justify-center",
        variant === "below" && "w-full max-w-5xl",
        className,
      )}
    >
      {/* Outer glow */}
      <div className="absolute -inset-3 rounded-[22px] bg-gradient-to-br from-violet-500/15 via-cyan-500/10 to-violet-500/15 blur-2xl opacity-50 transition-opacity duration-700 group-hover:opacity-75" />

      {/* Thin continuous border frame */}
      <div className="relative rounded-[12px] bg-gradient-to-b from-border/30 via-border/15 to-border/30 p-[1px]">
        <div className="rounded-[11px] bg-muted/20 p-[3px]">
          <div className="relative overflow-hidden rounded-[10px] shadow-lg ring-1 ring-black/5 dark:ring-white/5">
            {/* Native 16:9 aspect ratio — no cropping */}
            <video
              ref={videoRef}
              className="block w-full aspect-video object-contain bg-black/5 dark:bg-black/20"
              src="https://bycatassets.com/bycatdemoiosweb.mp4"
              muted
              playsInline
              loop
              preload="auto"
            >
              Your browser does not support the video tag.
            </video>

            {/* Mute/Unmute button */}
            <button
              type="button"
              onClick={handleToggleMute}
              className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-95"
            >
              {isMuted ? (
                <>
                  <VolumeX className="size-5" />
                  <span className="text-sm font-medium">Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="size-5" />
                  <span className="text-sm font-medium">Mute</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
