import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-px-2 lf-py-1.5 lf-text-sm lf-outline-none focus:lf-bg-accent data-[state=open]:lf-bg-accent",
      inset && "lf-pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="lf-ml-auto lf-h-4 lf-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "lf-z-50 lf-min-w-[8rem] lf-overflow-hidden lf-rounded-md lf-border lf-bg-popover lf-p-1 lf-text-popover-foreground lf-shadow-lg data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0 data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-95 data-[side=bottom]:lf-slide-in-from-top-2 data-[side=left]:lf-slide-in-from-right-2 data-[side=right]:lf-slide-in-from-left-2 data-[side=top]:lf-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "lf-z-50 lf-min-w-[8rem] lf-overflow-hidden lf-rounded-md lf-border lf-bg-popover lf-p-1 lf-text-popover-foreground lf-shadow-md data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0 data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-95 data-[side=bottom]:lf-slide-in-from-top-2 data-[side=left]:lf-slide-in-from-right-2 data-[side=right]:lf-slide-in-from-left-2 data-[side=top]:lf-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-px-2 lf-py-1.5 lf-text-sm lf-outline-none lf-transition-colors focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      inset && "lf-pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-py-1.5 lf-pl-8 lf-pr-2 lf-text-sm lf-outline-none lf-transition-colors focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="lf-absolute lf-left-2 lf-flex lf-h-3.5 lf-w-3.5 lf-items-center lf-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="lf-h-4 lf-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-py-1.5 lf-pl-8 lf-pr-2 lf-text-sm lf-outline-none lf-transition-colors focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="lf-absolute lf-left-2 lf-flex lf-h-3.5 lf-w-3.5 lf-items-center lf-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="lf-h-2 lf-w-2 lf-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "lf-px-2 lf-py-1.5 lf-text-sm lf-font-semibold",
      inset && "lf-pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("lf--mx-1 lf-my-1 lf-h-px lf-bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "lf-ml-auto lf-text-xs lf-tracking-widest lf-opacity-60",
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
