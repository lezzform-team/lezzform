import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "lf-flex lf-min-h-[80px] lf-w-full lf-rounded-md lf-border lf-border-input lf-bg-background lf-px-3 lf-py-2 lf-text-sm lf-ring-offset-background placeholder:lf-text-muted-foreground focus-visible:lf-outline-none focus-visible:lf-ring-2 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-2 disabled:lf-cursor-not-allowed disabled:lf-opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
