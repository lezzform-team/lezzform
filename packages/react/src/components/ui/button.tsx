import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "lf-inline-flex lf-items-center lf-justify-center lf-whitespace-nowrap lf-rounded-md lf-text-sm lf-font-medium lf-ring-offset-background lf-transition-colors focus-visible:lf-outline-none focus-visible:lf-ring-2 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-2 disabled:lf-pointer-events-none disabled:lf-opacity-50",
  {
    variants: {
      variant: {
        default:
          "lf-bg-primary lf-text-primary-foreground hover:lf-bg-primary/90",
        destructive:
          "lf-bg-destructive lf-text-destructive-foreground hover:lf-bg-destructive/90",
        outline:
          "lf-border lf-border-input lf-bg-background hover:lf-bg-accent hover:lf-text-accent-foreground",
        secondary:
          "lf-bg-secondary lf-text-secondary-foreground hover:lf-bg-secondary/80",
        ghost: "hover:lf-bg-accent hover:lf-text-accent-foreground",
        link: "lf-text-primary lf-underline-offset-4 hover:lf-underline",
      },
      size: {
        default: "lf-h-10 lf-px-4 lf-py-2",
        sm: "lf-h-9 lf-rounded-md lf-px-3",
        lg: "lf-h-11 lf-rounded-md lf-px-8",
        icon: "lf-h-10 lf-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
