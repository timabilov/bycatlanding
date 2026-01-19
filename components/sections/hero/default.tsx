"use client";

import { type VariantProps } from "class-variance-authority";
import { ArrowRightIcon, Globe, StarIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import HeroIllustration from "../../ui/hero-illustration";
import { Section } from "../../ui/section";

// --- 1. STATIC 3D STACK COMPONENT (View from Left) ---

const images = [
  { srcLight: "/ss1.png", srcDark: "/ss1.png", alt: "Dashboard" },
  { srcLight: "/ss2.png", srcDark: "/ss2.png", alt: "Chat" },
  { srcLight: "/ss3.png", srcDark: "/ss3.png", alt: "Quiz" },
];

function StaticImageStack({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={cn("bg-muted w-full aspect-[16/9] mx-auto", className)} />;

  return (
    <div className={cn("relative w-full aspect-[16/10] sm:aspect-[2/1] overflow-visible perspective-1000 mx-auto", className)}>
      {/* 
        3D Transform adjustments:
        rotateY(25deg): Turns the right side away (viewing from left).
        rotateX(10deg): Slight tilt backward.
        translateX(-10%): Re-centers the stack since rotation pushes it right.
      */}
      <div 
        className="relative w-full h-full flex items-center justify-center scale-100 sm:scale-110 origin-center mx-auto"
        style={{ transform: "perspective(1200px) rotateY(25deg) rotateX(10deg) translateX(-5%)" }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={cn(
              "absolute top-0 w-[60%] rounded-xl shadow-2xl border border-border/40 bg-background transition-all duration-500 hover:z-50 hover:scale-105 hover:-translate-y-4 mx-auto",
              // Positioning: Stacked left to right
              index === 0 && "left-0 top-12 z-30 opacity-100", // Leftmost image is closest/clearest
              index === 1 && "left-[20%] top-6 z-20 opacity-[0.95]",
              index === 2 && "left-[40%] top-0 z-10 opacity-[0.9]"
            )}
            style={{
               boxShadow: "25px 25px 50px -12px rgba(0, 0, 0, 0.4)" // Stronger shadow to the right
            }}
          >
            {/* Window Browser Header */}
            <div className="h-4 w-full border-b border-border/20 bg-muted/20 flex items-center gap-1.5 px-3 rounded-t-xl mx-auto">
              <div className="size-2 rounded-full bg-red-400/80" />
              <div className="size-2 rounded-full bg-amber-400/80" />
              <div className="size-2 rounded-full bg-green-400/80" />
            </div>

            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-xl bg-background">
              <Image
                src={resolvedTheme === "light" ? img.srcLight : img.srcDark}
                alt={img.alt}
                fill
                className="object-cover object-top"
                priority={index === 0} 
              />
            </div>
            
            {/* Glass Sheen Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 2. ICONS ---

const AppleLogo = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.127 3.675-.552 9.127 1.519 12.153 1.015 1.481 2.228 3.143 3.82 3.083 1.528-.057 2.103-1.026 3.945-1.026 1.841 0 2.378 1.026 4.004 1.002 1.666-.027 2.731-1.503 3.75-2.99 1.186-1.728 1.673-3.395 1.696-3.483-.037-.015-3.268-1.253-3.297-4.968-.031-3.11 2.54-4.595 2.663-4.673-1.455-2.126-3.719-2.365-4.524-2.408-1.04-.047-2.023.633-2.655.633zM10.237 3.518c.855-1.037 1.433-2.48 1.275-3.917-1.233.05-2.727.822-3.612 1.861-.793.922-1.487 2.411-1.306 3.83 1.378.107 2.783-.736 3.643-1.774z" />
  </svg>
);

// --- 3. MAIN COMPONENT ---

interface HeroButtonProps {
  href: string;
  text: ReactNode;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
  title = "Your secret to smarter studying",
  description = "Professionally designed blocks and templates built with React, Shadcn/ui and Tailwind that will help your product stand out.",
  
  // *** MOCKUP SECTION REPLACED ***
  mockup = (
    <StaticImageStack className="w-full" />
  ),
  
  badge = (
    <div className="relative z-10 animate-appear">
      <div className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-neutral-200 bg-white/5 p-[1px] dark:border-white/10">
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-950 backdrop-blur-3xl transition-colors hover:bg-neutral-100 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900/80">
          <span className="flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            New
          </span>
          <span className="flex items-center gap-1">
            Bycat AI mobile app is out!
            <ArrowRightIcon className="size-3" />
          </span>
        </span>
      </div>
    </div>
  ),
  buttons = [
    {
      href: siteConfig.getStartedUrl,
      text: "Web platform",
      variant: "outline",
      icon: <Globe className="mr-2 size-4" />,
      className: "h-12 px-6 text-base",
    },
    {
      href: "#",
      variant: "outline",
      className: "h-12 px-5 flex items-center gap-3",
      text: (
        <div className="flex items-center gap-3">
          <AppleLogo className="size-5 fill-current mb-0.5" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-base font-bold ">
              Download on the
            </span>
          </div>
        </div>
      ),
    },
  ],
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "fade-bottom overflow-hidden px-0 pb-0 pt-8 sm:pb-0 sm:pt-12 md:pb-0",
        className,
      )}
    >
      <div className="flex flex-col gap-8 px-4 sm:gap-12 sm:px-4 md:px-16 lg:px-24">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Left content */}
          <div className="flex max-w-2xl flex-col items-start gap-6 text-left lg:flex-1">
            {badge !== false && (
              <div className="w-full flex justify-start">
                {badge}
              </div>
            )}
            
            <h1 className="animate-appear relative z-10 text-4xl font-bold leading-tight text-foreground opacity-0 sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
              {title}
            </h1>
            
            <p className="animate-appear relative z-10 text-base font-normal text-muted-foreground opacity-0 delay-100 sm:text-lg">
              {description}
            </p>
            
            {buttons !== false && buttons.length > 0 && (
              <div className="animate-appear relative z-10 flex flex-col sm:flex-row gap-4 opacity-0 delay-300 w-full sm:w-auto">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant || "default"}
                    size="lg"
                    className={cn(button.className)}
                    asChild
                  >
                    <a href={button.href}>
                      {button.icon}
                      {button.text}
                      {button.iconRight}
                    </a>
                  </Button>
                ))}
              </div>
            )}

            {/* User Avatars */}
            <div className="animate-appear relative z-10 flex items-center gap-3 opacity-0 delay-500">
              <div className="flex -space-x-2">
                {["user1.png", "user2.png", "user3.png", "user4.png", "user5.png"].map((name, index) => (
                  <div
                    key={index}
                    className="size-8 overflow-hidden rounded-full border-2 border-background"
                  >
                    <img
                      src={`/${name}`} 
                      alt="User"
                      width={32}
                      height={32}
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Used by 20k+ students and teachers
                </span>
              </div>
            </div>
          </div>
          
          {/* Right illustration */}
          <div className="relative hidden lg:block lg:flex-1">
            <HeroIllustration />
          </div>
        </div>
        
        {/* Mockup Section */}
        {mockup !== false && (
          <div className="relative w-full pt-6 sm:pt-8 sm:px-12 md:px-24">
            {mockup}
            <Glow
              variant="top"
              className="animate-appear-zoom opacity-0 delay-1000"
            />
          </div>
        )}
      </div>
    </Section>
  );
}