import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "lf-relative lf-z-10 lf-flex lf-max-w-max lf-flex-1 lf-items-center lf-justify-center",
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "lf-group lf-flex lf-flex-1 lf-list-none lf-items-center lf-justify-center lf-space-x-1",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "lf-group lf-inline-flex lf-h-10 lf-w-max lf-items-center lf-justify-center lf-rounded-md lf-bg-background lf-px-4 lf-py-2 lf-text-sm lf-font-medium lf-transition-colors hover:lf-bg-accent hover:lf-text-accent-foreground focus:lf-bg-accent focus:lf-text-accent-foreground focus:lf-outline-none disabled:lf-pointer-events-none disabled:lf-opacity-50 data-[active]:lf-bg-accent/50 data-[state=open]:lf-bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "lf-group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="lf-relative lf-top-[1px] lf-ml-1 lf-h-3 lf-w-3 lf-transition lf-duration-200 group-data-[state=open]:lf-rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "lf-left-0 lf-top-0 lf-w-full data-[motion^=from-]:lf-animate-in data-[motion^=to-]:lf-animate-out data-[motion^=from-]:lf-fade-in data-[motion^=to-]:lf-fade-out data-[motion=from-end]:lf-slide-in-from-right-52 data-[motion=from-start]:lf-slide-in-from-left-52 data-[motion=to-end]:lf-slide-out-to-right-52 data-[motion=to-start]:lf-slide-out-to-left-52 md:lf-absolute md:lf-w-auto lf-",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "lf-absolute lf-left-0 lf-top-full lf-flex lf-justify-center",
    )}
  >
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "lf-origin-top-center lf-relative lf-mt-1.5 lf-h-[var(--radix-navigation-menu-viewport-height)] lf-w-full lf-overflow-hidden lf-rounded-md lf-border lf-bg-popover lf-text-popover-foreground lf-shadow-lg data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-90 md:lf-w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "lf-top-full lf-z-[1] lf-flex lf-h-1.5 lf-items-end lf-justify-center lf-overflow-hidden data-[state=visible]:lf-animate-in data-[state=hidden]:lf-animate-out data-[state=hidden]:lf-fade-out data-[state=visible]:lf-fade-in",
      className,
    )}
    {...props}
  >
    <div className="lf-relative lf-top-[60%] lf-h-2 lf-w-2 lf-rotate-45 lf-rounded-tl-sm lf-bg-border lf-shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
