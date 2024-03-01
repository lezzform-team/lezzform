import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "lf-inline-flex lf-items-center lf-rounded-full lf-border lf-px-2.5 lf-py-0.5 lf-text-xs lf-font-semibold lf-transition-colors focus:lf-outline-none focus:lf-ring-2 focus:lf-ring-ring focus:lf-ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "lf-border-transparent lf-bg-primary lf-text-primary-foreground hover:lf-bg-primary/80",
        secondary:
          "lf-border-transparent lf-bg-secondary lf-text-secondary-foreground hover:lf-bg-secondary/80",
        destructive:
          "lf-border-transparent lf-bg-destructive lf-text-destructive-foreground hover:lf-bg-destructive/80",
        outline: "lf-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
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
