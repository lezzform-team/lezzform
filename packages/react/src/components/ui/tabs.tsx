import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "lf-inline-flex lf-h-10 lf-items-center lf-justify-center lf-rounded-md lf-bg-muted lf-p-1 lf-text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "lf-inline-flex lf-items-center lf-justify-center lf-whitespace-nowrap lf-rounded-sm lf-px-3 lf-py-1.5 lf-text-sm lf-font-medium lf-ring-offset-background lf-transition-all focus-visible:lf-outline-none focus-visible:lf-ring-2 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-2 disabled:lf-pointer-events-none disabled:lf-opacity-50 data-[state=active]:lf-bg-background data-[state=active]:lf-text-foreground data-[state=active]:lf-shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "lf-mt-2 lf-ring-offset-background focus-visible:lf-outline-none focus-visible:lf-ring-2 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
