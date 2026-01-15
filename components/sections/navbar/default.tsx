import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Github from "../../logos/github";
import LaunchUI from "../../logos/launch-ui";
import X from "../../logos/x";
import { Badge } from "../../ui/badge";
import { Button, buttonVariants } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { ThemeToggleIcon } from "../../ui/theme-toggle-icon";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <LaunchUI />,
  name = "Bycat AI",
  homeUrl = siteConfig.url,
  mobileLinks = [
    { text: "Docs", href: siteConfig.navigation.docs },
    { text: "Components", href: siteConfig.navigation.components },
    { text: "Blocks", href: siteConfig.navigation.blocks },
    { text: "Illustrations", href: siteConfig.navigation.illustrations },
    { text: "Templates", href: siteConfig.navigation.templates },
    { text: "Pricing", href: siteConfig.navigation.pricing },
  ],
  actions = [
    { text: "Sign in", href: siteConfig.url, isButton: false },
    {
      text: "Get Started",
      href: siteConfig.url,
      isButton: true,
      variant: "default",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4 md:px-8 lg:px-12", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              {logo}
              {name}
            </a>
            <Badge
              variant="outline"
              className="ml-2 hidden text-xs font-normal md:inline-flex"
            >
              {siteConfig.version}
            </Badge>
            {showNavigation && (
              customNavigation || (
                <nav className="ml-6 hidden items-center gap-6 md:flex">
                  <a
                    href={siteConfig.navigation.docs}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Docs
                  </a>
                  <a
                    href={siteConfig.navigation.components}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Components
                  </a>
                  <a
                    href={siteConfig.navigation.blocks}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Blocks
                  </a>
                  <a
                    href={siteConfig.navigation.illustrations}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Illustrations
                  </a>
                  <a
                    href={siteConfig.navigation.templates}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Templates
                  </a>
                  <a
                    href={siteConfig.navigation.pricing}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Pricing
                  </a>
                </nav>
              )
            )}
          </NavbarLeft>
          <NavbarRight>
            <div className="hidden items-center gap-2 md:flex">
              <Button
                variant="ghost"
                size="icon"
                className="size-9"
                asChild
                aria-label="GitHub"
              >
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="size-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-9"
                asChild
                aria-label="X (Twitter)"
              >
                <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
                  <X className="size-5" />
                </a>
              </Button>
              <ThemeToggleIcon />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>{name}</span>
                  </a>
                  {mobileLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
