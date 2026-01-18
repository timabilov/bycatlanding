import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

function Glow({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof glowVariants>) {
  return (
    <div
      data-slot="glow"
      className={cn(glowVariants({ variant }), className)}
      {...props}
    >
      {/* Outer glow - purple/violet */}
      <div
        className={cn(
          "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-radial from-10% to-60% sm:h-[512px]",
          "from-violet-500/30 to-transparent opacity-60",
          "dark:from-violet-500/40 dark:opacity-80",
          variant === "center" && "-translate-y-1/2",
        )}
      />
      {/* Middle glow - cyan/teal */}
      <div
        className={cn(
          "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-200 rounded-[50%] bg-radial from-10% to-60% sm:h-[256px]",
          "from-cyan-400/20 to-transparent opacity-50",
          "dark:from-cyan-400/30 dark:opacity-70",
          variant === "center" && "-translate-y-1/2",
        )}
      />
      {/* Inner accent glow - soft blue */}
      <div
        className={cn(
          "absolute left-1/2 h-[64px] w-[20%] -translate-x-1/2 scale-150 rounded-[50%] bg-radial from-10% to-60% sm:h-[128px]",
          "from-blue-400/15 to-transparent opacity-40",
          "dark:from-blue-400/25 dark:opacity-60",
          variant === "center" && "-translate-y-1/2",
        )}
      />
    </div>
  );
}

export default Glow;
