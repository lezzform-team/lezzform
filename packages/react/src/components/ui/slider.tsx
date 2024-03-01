import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-w-full lf-touch-none lf-select-none lf-items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="lf-relative lf-h-2 lf-w-full lf-grow lf-overflow-hidden lf-rounded-full lf-bg-secondary">
      <SliderPrimitive.Range className="lf-absolute lf-h-full lf-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="lf-block lf-h-5 lf-w-5 lf-rounded-full lf-border-2 lf-border-primary lf-bg-background lf-ring-offset-background lf-transition-colors focus-visible:lf-outline-none focus-visible:lf-ring-2 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-2 disabled:lf-pointer-events-none disabled:lf-opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
