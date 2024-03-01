import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "lf-inline-flex lf-items-center lf-justify-center lf-rounded-md lf-text-sm lf-font-medium lf-ring-offset-background lf-transition-colors hover:lf-bg-muted hover:lf-text-muted-foreground focus-visible:lf-outline-none focus-visible:lf-ring-2 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-2 disabled:lf-pointer-events-none disabled:lf-opacity-50 data-[state=on]:lf-bg-accent data-[state=on]:lf-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "lf-bg-transparent",
        outline:
          "lf-border lf-border-input lf-bg-transparent hover:lf-bg-accent hover:lf-text-accent-foreground",
      },
      size: {
        default: "lf-h-10 lf-px-3",
        sm: "lf-h-9 lf-px-2.5",
        lg: "lf-h-11 lf-px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
