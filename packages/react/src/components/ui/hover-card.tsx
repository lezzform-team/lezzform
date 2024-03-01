import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "lf-z-50 lf-w-64 lf-rounded-md lf-border lf-bg-popover lf-p-4 lf-text-popover-foreground lf-shadow-md lf-outline-none data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0 data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-95 data-[side=bottom]:lf-slide-in-from-top-2 data-[side=left]:lf-slide-in-from-right-2 data-[side=right]:lf-slide-in-from-left-2 data-[side=top]:lf-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
