import { ReactNode } from "react";
import { 
  FileTextIcon, 
  HardDriveUploadIcon, 
  InfinityIcon, 
  MicIcon, 
  YoutubeIcon,
  LucideIcon
} from "lucide-react";

import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import { cn } from "@/lib/utils";

// --- Custom Item Component for Organic Look ---
interface LimitItemProps {
  icon: LucideIcon;
  label: string;
  limit: string;
}

const LimitItem = ({ icon: Icon, label, limit }: LimitItemProps) => (
  <div className="group flex flex-col items-center gap-3">
    {/* Organic Icon Container */}
    <div className="flex size-12 items-center justify-center rounded-2xl border border-border/40 bg-background/50 shadow-sm transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-accent group-hover:shadow-md">
      <Icon className="size-6 text-muted-foreground transition-colors group-hover:text-foreground" />
    </div>
    
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {/* Subtle, Organic Badge */}
      <span className="inline-flex items-center rounded-full border border-border/50 bg-secondary/30 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-sm transition-colors group-hover:bg-secondary/50 group-hover:text-secondary-foreground">
        {limit}
      </span>
    </div>
  </div>
);

// --- Main Component ---

interface CapabilitiesProps {
  title?: string;
  badge?: ReactNode | false;
  className?: string;
}

export default function Capabilities({
  title = "Generous limits for deep work",
  badge = (
    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
      Powerhouse Capabilities
    </Badge>
  ),
  className,
}: CapabilitiesProps) {
  
  const limits = [
    {
      icon: YoutubeIcon,
      label: "YouTube",
      limit: "Max 2 Hours",
    },
    {
      icon: MicIcon,
      label: "Audio",
      limit: "Max 3 Hours",
    },
    {
      icon: FileTextIcon,
      label: "Documents",
      limit: "Up to 500 Pages",
    },
    {
      icon: HardDriveUploadIcon,
      label: "Uploads",
      limit: "Max 100 MB",
    },
    {
      icon: InfinityIcon,
      label: "Context",
      limit: "Unlimited",
    },
  ];

  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 text-center">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4">
          {badge !== false && badge}
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-balance">
            {title}
          </h2>
        </div>

        {/* Limits Grid - using flex wrap to center naturally */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-10 sm:gap-x-16">
          {limits.map((item, index) => (
            <LimitItem 
              key={index} 
              icon={item.icon} 
              label={item.label} 
              limit={item.limit} 
            />
          ))}
        </div>
      </div>
    </Section>
  );
}