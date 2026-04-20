import { cn } from "@/lib/utils";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import { ModeToggle } from "../../ui/mode-toggle";
import Glow from "@/components/ui/glow";
import X from "@/components/logos/x";
import LaunchUI from "../../logos/launch-ui";

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
  </svg>
);

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

interface FooterProps {
  glow?: boolean;
  className?: string;
}

export default function FooterSection({ glow, className }: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer>
          {glow && <Glow variant="below" className="animate-appear-zoom delay-1000 z-0 pointer-events-none opacity-50" />}

          <FooterContent>
            {/* Brand column */}
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-2 gap-3">
              <div className="flex items-center gap-2">
                <LaunchUI />
                <h3 className="text-xl font-bold">Bycat AI</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px]">
                The study tool that reads your textbook for you, drills you on what you miss, and keeps its paws off your GPA.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground mt-1">
                <a href="https://x.com/bycatai" className="hover:text-foreground transition-colors" aria-label="X / Twitter">
                  <X width={16} height={16} />
                </a>
                <a href="https://www.tiktok.com/@bycatai" className="hover:text-foreground transition-colors" aria-label="TikTok">
                  <TikTokIcon />
                </a>
                <a href="https://discord.gg/bycatai" className="hover:text-foreground transition-colors" aria-label="Discord">
                  <DiscordIcon />
                </a>
              </div>
            </FooterColumn>

            {/* Product */}
            <FooterColumn>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-1">Product</h3>
              {[
                { text: "How it works", href: "/#how-it-works" },
                { text: "Reviews", href: "/#reviews" },
                { text: "Pricing", href: "/#pricing" },
                { text: "iOS app", href: "#" },
              ].map((l) => (
                <a key={l.text} href={l.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors">{l.text}</a>
              ))}
            </FooterColumn>

            {/* Company */}
            <FooterColumn>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-1">Company</h3>
              {[
                { text: "Blog", href: "/blogs" },
                { text: "Careers", href: "/careers" },
                { text: "Press kit", href: "/press" },
                { text: "Contact", href: "/contact" },
              ].map((l) => (
                <a key={l.text} href={l.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors">{l.text}</a>
              ))}
            </FooterColumn>

            {/* Legal */}
            <FooterColumn>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-1">Legal</h3>
              {[
                { text: "Privacy", href: "/privacy-policy" },
                { text: "Terms", href: "/terms-conditions" },
                { text: "Refunds", href: "/terms-conditions#refund-policy" },
              ].map((l) => (
                <a key={l.text} href={l.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors">{l.text}</a>
              ))}
            </FooterColumn>
          </FooterContent>

          <FooterBottom>
            <div>© 2026 Bycat Labs — made with nine lives of effort.</div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground/50">v0.27.0 · built by a tiny team, not a tiny bot</span>
              <ModeToggle />
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
