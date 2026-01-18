import { type VariantProps } from "class-variance-authority";
import { ArrowRightIcon, StarIcon } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Github from "../../logos/github";
import { Badge } from "../../ui/badge";
import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import HeroIllustration from "../../ui/hero-illustration";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
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
  mockup = (
    <Screenshot
      srcLight="/dashboard-light.png"
      srcDark="/dashboard-dark.png"
      alt="Bycat AI app screenshot"
      width={1248}
      height={765}
      className="w-full"
    />
  ),
  badge = (
    <Badge variant="outline" className="animate-appear">
      <span className="text-muted-foreground">Bycat AI v2 is out!</span>
      <a href={siteConfig.getStartedUrl} className="flex items-center gap-1">
        Read more
        <ArrowRightIcon className="size-3" />
      </a>
    </Badge>
  ),
  buttons = [
    {
      href: siteConfig.getStartedUrl,
      text: "Get Started",
      variant: "default",
    },
    {
      href: siteConfig.links.github,
      text: "Github",
      variant: "glow",
      icon: <Github className="mr-2 size-4" />,
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
        <div className="flex max-w-3xl flex-col items-start gap-6 text-left">
          {badge !== false && badge}
          <h1 className="animate-appear relative z-10 text-4xl font-bold leading-tight text-foreground opacity-0 sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
            {title}
          </h1>
          <p className="animate-appear relative z-10 text-base font-normal text-muted-foreground opacity-0 delay-100 sm:text-lg">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex gap-4 opacity-0 delay-300">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
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
          <div className="animate-appear relative z-10 flex items-center gap-3 opacity-0 delay-500">
            <div className="flex -space-x-2">
              <div className="size-8 overflow-hidden rounded-full border-2 border-background">
                <img
                  src="https://avatar.vercel.sh/1"
                  alt="User"
                  className="size-full object-cover"
                />
              </div>
              <div className="size-8 overflow-hidden rounded-full border-2 border-background">
                <img
                  src="https://avatar.vercel.sh/2"
                  alt="User"
                  className="size-full object-cover"
                />
              </div>
              <div className="size-8 overflow-hidden rounded-full border-2 border-background">
                <img
                  src="https://avatar.vercel.sh/3"
                  alt="User"
                  className="size-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="size-4 fill-current text-foreground"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Used by 261k+ designers and developers
              </span>
            </div>
          </div>
        </div>
        {mockup !== false && (
          <div className="relative w-full pt-6 sm:pt-8">
            <MockupFrame
              className="animate-appear opacity-0 delay-700"
              size="small"
            >
              <Mockup
                type="responsive"
                className="bg-background/90 w-full rounded-xl border-0"
              >
                {mockup}
              </Mockup>
            </MockupFrame>
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
