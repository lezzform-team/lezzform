import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "lf-relative lf-w-full lf-rounded-lg lf-border lf-p-4 [&>svg~*]:lf-pl-7 [&>svg+div]:lf-translate-y-[-3px] [&>svg]:lf-absolute [&>svg]:lf-left-4 [&>svg]:lf-top-4 [&>svg]:lf-text-foreground",
  {
    variants: {
      variant: {
        default: "lf-bg-background lf-text-foreground",
        destructive:
          "lf-border-destructive/50 lf-text-destructive dark:lf-border-destructive [&>svg]:lf-text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "lf-mb-1 lf-font-medium lf-leading-none lf-tracking-tight",
      className,
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("lf-text-sm [&_p]:lf-leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
