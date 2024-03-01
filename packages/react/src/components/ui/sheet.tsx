import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "lf-fixed lf-inset-0 lf-z-50 lf-bg-black/80 lf- data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "lf-fixed lf-z-50 lf-gap-4 lf-bg-background lf-p-6 lf-shadow-lg lf-transition lf-ease-in-out data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-duration-300 data-[state=open]:lf-duration-500",
  {
    variants: {
      side: {
        top: "lf-inset-x-0 lf-top-0 lf-border-b data-[state=closed]:lf-slide-out-to-top data-[state=open]:lf-slide-in-from-top",
        bottom:
          "lf-inset-x-0 lf-bottom-0 lf-border-t data-[state=closed]:lf-slide-out-to-bottom data-[state=open]:lf-slide-in-from-bottom",
        left: "lf-inset-y-0 lf-left-0 lf-h-full lf-w-3/4 lf-border-r data-[state=closed]:lf-slide-out-to-left data-[state=open]:lf-slide-in-from-left sm:lf-max-w-sm",
        right:
          "lf-inset-y-0 lf-right-0 lf-h-full lf-w-3/4 lf- lf-border-l data-[state=closed]:lf-slide-out-to-right data-[state=open]:lf-slide-in-from-right sm:lf-max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="lf-absolute lf-right-4 lf-top-4 lf-rounded-sm lf-opacity-70 lf-ring-offset-background lf-transition-opacity hover:lf-opacity-100 focus:lf-outline-none focus:lf-ring-2 focus:lf-ring-ring focus:lf-ring-offset-2 disabled:lf-pointer-events-none data-[state=open]:lf-bg-secondary">
        <X className="lf-h-4 lf-w-4" />
        <span className="lf-sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "lf-flex lf-flex-col lf-space-y-2 lf-text-center sm:lf-text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "lf-flex lf-flex-col-reverse sm:lf-flex-row sm:lf-justify-end sm:lf-space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("lf-text-lg lf-font-semibold lf-text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("lf-text-sm lf-text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
