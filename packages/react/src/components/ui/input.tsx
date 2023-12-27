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
          "flex h-10 w-full rounded-md border border-lfui-input bg-lfui-background px-3 py-2 text-sm ring-offset-lfui-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lfui-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lfui-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
