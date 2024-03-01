import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "lf-peer lf-inline-flex lf-h-6 lf-w-11 lf-shrink-0 lf-cursor-pointer lf-items-center lf-rounded-full lf-border-2 lf-border-transparent lf-transition-colors focus-visible:lf-outline-none focus-visible:lf-ring-2 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-2 focus-visible:lf-ring-offset-background disabled:lf-cursor-not-allowed disabled:lf-opacity-50 data-[state=checked]:lf-bg-primary data-[state=unchecked]:lf-bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "lf-pointer-events-none lf-block lf-h-5 lf-w-5 lf-rounded-full lf-bg-background lf-shadow-lg lf-ring-0 lf-transition-transform data-[state=checked]:lf-translate-x-5 data-[state=unchecked]:lf-translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
