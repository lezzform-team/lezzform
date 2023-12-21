import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-lfui-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lfui-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-lfui-primary text-lfui-primary-foreground hover:bg-lfui-primary/90",
        destructive:
          "bg-lfui-destructive text-lfui-destructive-foreground hover:bg-lfui-destructive/90",
        outline:
          "border border-lfui-input bg-lfui-background hover:bg-lfui-accent hover:text-lfui-accent-foreground",
        secondary:
          "bg-lfui-secondary text-lfui-secondary-foreground hover:bg-lfui-secondary/80",
        ghost: "hover:bg-lfui-accent hover:text-lfui-accent-foreground",
        link: "text-lfui-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
