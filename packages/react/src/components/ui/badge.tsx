import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-lfui-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-lfui-primary text-lfui-primary-foreground hover:bg-lfui-primary/80",
        secondary:
          "border-transparent bg-lfui-secondary text-lfui-secondary-foreground hover:bg-lfui-secondary/80",
        destructive:
          "border-transparent bg-lfui-destructive text-lfui-destructive-foreground hover:bg-lfui-destructive/80",
        outline: "text-lfui-foreground",
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
