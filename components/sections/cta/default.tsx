import { Globe } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Section } from "../../ui/section";

const AppleLogo = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.127 3.675-.552 9.127 1.519 12.153 1.015 1.481 2.228 3.143 3.82 3.083 1.528-.057 2.103-1.026 3.945-1.026 1.841 0 2.378 1.026 4.004 1.002 1.666-.027 2.731-1.503 3.75-2.99 1.186-1.728 1.673-3.395 1.696-3.483-.037-.015-3.268-1.253-3.297-4.968-.031-3.11 2.54-4.595 2.663-4.673-1.455-2.126-3.719-2.365-4.524-2.408-1.04-.047-2.023.633-2.655.633zM10.237 3.518c.855-1.037 1.433-2.48 1.275-3.917-1.233.05-2.727.822-3.612 1.861-.793.922-1.487 2.411-1.306 3.83 1.378.107 2.783-.736 3.643-1.774z" />
  </svg>
);

interface CTAProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function CTA({
  title = "Be honest — how's the cramming going?",
  description = "Start free this week. Keep it if it works. Cancel in two taps if it doesn't. The cat won't take it personally. Much.",
  className,
}: CTAProps) {
  return (
    <Section className={cn("overflow-hidden", className)}>
      <div className="max-w-container mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-3xl border border-border bg-muted/20 px-8 py-20 text-center"
        >
          {/* Pink gradient top */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(236,72,153,0.10), transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
              Your exam isn&apos;t going to study itself
            </span>

            <h2
              className="max-w-[560px] text-3xl font-semibold sm:text-5xl"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              {title}
            </h2>

            <p className="max-w-[480px] text-muted-foreground text-base leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" asChild className="h-12 px-6">
                <a href={siteConfig.getStartedUrl}>
                  <Globe className="mr-2 size-4" />
                  Start 7-day free
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-6">
                <a href="https://apps.apple.com/us/app/leitner-ai-note-quiz-alerts/id6747087851">
                  <AppleLogo className="mr-2 size-4" />
                  Get the app
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
