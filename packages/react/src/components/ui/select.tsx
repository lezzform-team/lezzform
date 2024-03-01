import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "lf-flex lf-h-10 lf-w-full lf-items-center lf-justify-between lf-rounded-md lf-border lf-border-input lf-bg-background lf-px-3 lf-py-2 lf-text-sm lf-ring-offset-background placeholder:lf-text-muted-foreground focus:lf-outline-none focus:lf-ring-2 focus:lf-ring-ring focus:lf-ring-offset-2 disabled:lf-cursor-not-allowed disabled:lf-opacity-50 [&>span]:lf-line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="lf-h-4 lf-w-4 lf-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "lf-flex lf-cursor-default lf-items-center lf-justify-center lf-py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="lf-h-4 lf-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "lf-flex lf-cursor-default lf-items-center lf-justify-center lf-py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="lf-h-4 lf-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "lf-relative lf-z-50 lf-max-h-96 lf-min-w-[8rem] lf-overflow-hidden lf-rounded-md lf-border lf-bg-popover lf-text-popover-foreground lf-shadow-md data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0 data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-95 data-[side=bottom]:lf-slide-in-from-top-2 data-[side=left]:lf-slide-in-from-right-2 data-[side=right]:lf-slide-in-from-left-2 data-[side=top]:lf-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:lf-translate-y-1 data-[side=left]:lf--translate-x-1 data-[side=right]:lf-translate-x-1 data-[side=top]:lf--translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "lf-p-1",
          position === "popper" &&
            "lf-h-[var(--radix-select-trigger-height)] lf-w-full lf-min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "lf-py-1.5 lf-pl-8 lf-pr-2 lf-text-sm lf-font-semibold",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-w-full lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-py-1.5 lf-pl-8 lf-pr-2 lf-text-sm lf-outline-none focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="lf-absolute lf-left-2 lf-flex lf-h-3.5 lf-w-3.5 lf-items-center lf-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="lf-h-4 lf-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("lf--mx-1 lf-my-1 lf-h-px lf-bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
