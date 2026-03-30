import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import LaunchUI from "../../logos/launch-ui";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";
import { ModeToggle } from "../../ui/mode-toggle";
import Glow from "@/components/ui/glow";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
  glow?: boolean;
}

export default function FooterSection({
  logo = <LaunchUI />,
  name = "Bycat AI",
  glow,
  columns = [
    // {
    //   title: "Product",
    //   links: [
    //     { text: "Changelog", href: siteConfig.url },
    //     { text: "Documentation", href: siteConfig.url },
    //   ],
    // },
    {
      title: "Company",
      links: [
        { text: "Skripe", href: siteConfig.links.skripe },
        { text: "Blog", href: "/blogs" },
      ],
    },
    // {
    //   title: "Contact",
    //   links: [
    //     { text: "Discord", href: siteConfig.url },
    //     { text: "Twitter", href: siteConfig.url },
    //     { text: "Github", href: siteConfig.links.github },
    //   ],
    // },
  ],
  copyright = "© 2026 Skripe.az All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Service", href: "/terms-conditions" },
    { text: "Refund Policy", href: "/terms-conditions#refund-policy" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer>
          {
            glow &&  <Glow variant="below" className="animate-appear-zoom  delay-1000 z-0 pointer-events-none opacity-50" />
          }
           
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
