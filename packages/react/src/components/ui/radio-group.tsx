import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("lf-grid lf-gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "lf-aspect-square lf-h-4 lf-w-4 lf-rounded-full lf-border lf-border-primary lf-text-primary lf-ring-offset-background focus:lf-outline-none focus-visible:lf-ring-2 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-2 disabled:lf-cursor-not-allowed disabled:lf-opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="lf-flex lf-items-center lf-justify-center">
        <Circle className="lf-h-2.5 lf-w-2.5 lf-fill-current lf-text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
