"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";
import { Section } from "../../ui/section";

// --- COUNTER COMPONENT ---
const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  // Trigger animation when element is 50px inside the viewport
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            // If the target value is a decimal (e.g. 1.5), keep 1 decimal place.
            // Otherwise round to integer.
            ref.current.textContent = 
              value % 1 !== 0 ? latest.toFixed(1) : Math.round(latest).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
};

// --- MAIN STATS COMPONENT ---

interface StatItemProps {
  label?: string;
  value: number; // Changed to number to ensure math works
  suffix?: string;
  description?: string;
}

interface StatsProps {
  items?: StatItemProps[] | false;
  className?: string;
}

export default function Stats({
  items = [
    {
      label: "trusted by",
      value: 20,
      suffix: "k+",
      description: "students and researchers worldwide",
    },
    {
      label: "processed",
      value: 1.5,
      suffix: "M",
      description: "summaries and lecture notes generated",
    },
    {
      label: "created",
      value: 850,
      suffix: "k",
      description: "AI quizzes and flashcards generated",
    },
    {
      label: "saved",
      value: 120,
      suffix: "k+",
      description: "hours of study time for our users",
    },
  ],
  className,
}: StatsProps) {
  return (
    <Section className={className}>
      <div className="container mx-auto max-w-[960px]">
        {items !== false && items.length > 0 && (
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-3 text-left"
              >
                {item.label && (
                  <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                    {item.label}
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <div className="bg-gradient-to-r from-foreground to-foreground/70 dark:to-primary bg-clip-text text-4xl font-bold text-transparent transition-all duration-300 sm:text-5xl md:text-6xl">
                    <Counter value={item.value} />
                  </div>
                  {item.suffix && (
                    <div className="text-primary text-2xl font-semibold mb-1">
                      {item.suffix}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="text-muted-foreground text-sm font-medium text-pretty leading-relaxed">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}