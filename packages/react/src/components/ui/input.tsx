import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "lf-flex lf-h-10 lf-w-full lf-rounded-md lf-border lf-border-input lf-bg-background lf-px-3 lf-py-2 lf-text-sm lf-ring-offset-background file:lf-border-0 file:lf-bg-transparent file:lf-text-sm file:lf-font-medium placeholder:lf-text-muted-foreground focus-visible:lf-outline-none focus-visible:lf-ring-2 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-2 disabled:lf-cursor-not-allowed disabled:lf-opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
