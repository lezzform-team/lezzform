import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "lf-flex lf-h-10 lf-items-center lf-space-x-1 lf-rounded-md lf-border lf-bg-background lf-p-1",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-px-3 lf-py-1.5 lf-text-sm lf-font-medium lf-outline-none focus:lf-bg-accent focus:lf-text-accent-foreground data-[state=open]:lf-bg-accent data-[state=open]:lf-text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
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
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "lf-z-50 lf-min-w-[8rem] lf-overflow-hidden lf-rounded-md lf-border lf-bg-popover lf-p-1 lf-text-popover-foreground data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0 data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-95 data-[side=bottom]:lf-slide-in-from-top-2 data-[side=left]:lf-slide-in-from-right-2 data-[side=right]:lf-slide-in-from-left-2 data-[side=top]:lf-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "lf-z-50 lf-min-w-[12rem] lf-overflow-hidden lf-rounded-md lf-border lf-bg-popover lf-p-1 lf-text-popover-foreground lf-shadow-md data-[state=open]:lf-animate-in data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0 data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-95 data-[side=bottom]:lf-slide-in-from-top-2 data-[side=left]:lf-slide-in-from-right-2 data-[side=right]:lf-slide-in-from-left-2 data-[side=top]:lf-slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-px-2 lf-py-1.5 lf-text-sm lf-outline-none focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      inset && "lf-pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-py-1.5 lf-pl-8 lf-pr-2 lf-text-sm lf-outline-none focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="lf-absolute lf-left-2 lf-flex lf-h-3.5 lf-w-3.5 lf-items-center lf-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="lf-h-4 lf-w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-py-1.5 lf-pl-8 lf-pr-2 lf-text-sm lf-outline-none focus:lf-bg-accent focus:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="lf-absolute lf-left-2 lf-flex lf-h-3.5 lf-w-3.5 lf-items-center lf-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="lf-h-2 lf-w-2 lf-fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "lf-px-2 lf-py-1.5 lf-text-sm lf-font-semibold",
      inset && "lf-pl-8",
      className,
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("lf--mx-1 lf-my-1 lf-h-px lf-bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({
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
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
