import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-px-2 lf-py-1.5 lf-text-sm lf-outline-none focus:lf-bg-accent focus:lf-text-accent-foreground data-[state=open]:lf-bg-accent data-[state=open]:lf-text-accent-foreground",
      inset && "lf-pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="lf-ml-auto lf-h-4 lf-w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "lf-z-50 lf-min-w-[8rem] lf-overflow-hidden lf-rounded-md lf-border lf-bg-popover lf-p-1 lf-text-popover-foreground lf-shadow-md data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0 data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-95 data-[side=bottom]:lf-slide-in-from-top-2 data-[side=left]:lf-slide-in-from-right-2 data-[side=right]:lf-slide-in-from-left-2 data-[side=top]:lf-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "lf-z-50 lf-min-w-[8rem] lf-overflow-hidden lf-rounded-md lf-border lf-bg-popover lf-p-1 lf-text-popover-foreground lf-shadow-md lf-animate-in lf-fade-in-80 data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0 data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-95 data-[side=bottom]:lf-slide-in-from-top-2 data-[side=left]:lf-slide-in-from-right-2 data-[side=right]:lf-slide-in-from-left-2 data-[side=top]:lf-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-px-2 lf-py-1.5 lf-text-sm lf-outline-none focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      inset && "lf-pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-py-1.5 lf-pl-8 lf-pr-2 lf-text-sm lf-outline-none focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="lf-absolute lf-left-2 lf-flex lf-h-3.5 lf-w-3.5 lf-items-center lf-justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="lf-h-4 lf-w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-py-1.5 lf-pl-8 lf-pr-2 lf-text-sm lf-outline-none focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="lf-absolute lf-left-2 lf-flex lf-h-3.5 lf-w-3.5 lf-items-center lf-justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="lf-h-2 lf-w-2 lf-fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "lf-px-2 lf-py-1.5 lf-text-sm lf-font-semibold lf-text-foreground",
      inset && "lf-pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("lf--mx-1 lf-my-1 lf-h-px lf-bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "lf-ml-auto lf-text-xs lf-tracking-widest lf-text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
