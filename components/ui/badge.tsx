import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors dark:font-mono dark:rounded-md dark:font-semibold",
  {
    variants: {
      variant: {
        default:
          "border-brand/20 bg-brand/10 text-brand dark:border-neon-cyan/30 dark:bg-neon-cyan/10 dark:text-neon-cyan",
        secondary:
          "border-border bg-muted text-muted-foreground dark:border-neon-violet/30 dark:bg-neon-violet/10 dark:text-neon-violet",
        outline:
          "border-border text-muted-foreground dark:border-white/20 dark:text-white/80",
        amber:
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-neon-amber/30 dark:bg-neon-amber/10 dark:text-neon-amber",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
