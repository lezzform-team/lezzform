import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "lf-flex lf-h-full lf-w-full lf-flex-col lf-overflow-hidden lf-rounded-md lf-bg-popover lf-text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="lf-overflow-hidden lf-p-0 lf-shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:lf-px-2 [&_[cmdk-group-heading]]:lf-font-medium [&_[cmdk-group-heading]]:lf-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:lf-pt-0 [&_[cmdk-group]]:lf-px-2 [&_[cmdk-input-wrapper]_svg]:lf-h-5 [&_[cmdk-input-wrapper]_svg]:lf-w-5 [&_[cmdk-input]]:lf-h-12 [&_[cmdk-item]]:lf-px-2 [&_[cmdk-item]]:lf-py-3 [&_[cmdk-item]_svg]:lf-h-5 [&_[cmdk-item]_svg]:lf-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="lf-flex lf-items-center lf-border-b lf-px-3"
    cmdk-input-wrapper=""
  >
    <Search className="lf-mr-2 lf-h-4 lf-w-4 lf-shrink-0 lf-opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "lf-flex lf-h-11 lf-w-full lf-rounded-md lf-bg-transparent lf-py-3 lf-text-sm lf-outline-none placeholder:lf-text-muted-foreground disabled:lf-cursor-not-allowed disabled:lf-opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "lf-max-h-[300px] lf-overflow-y-auto lf-overflow-x-hidden",
      className,
    )}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="lf-py-6 lf-text-center lf-text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "lf-overflow-hidden lf-p-1 lf-text-foreground [&_[cmdk-group-heading]]:lf-px-2 [&_[cmdk-group-heading]]:lf-py-1.5 [&_[cmdk-group-heading]]:lf-text-xs [&_[cmdk-group-heading]]:lf-font-medium [&_[cmdk-group-heading]]:lf-text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("lf--mx-1 lf-h-px lf-bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "lf-relative lf-flex lf-cursor-default lf-select-none lf-items-center lf-rounded-sm lf-px-2 lf-py-1.5 lf-text-sm lf-outline-none aria-selected:lf-bg-accent aria-selected:lf-text-accent-foreground data-[disabled]:lf-pointer-events-none data-[disabled]:lf-opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
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
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
