import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "lf-fixed lf-inset-0 lf-z-50 lf-bg-black/80 lf- data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "lf-fixed lf-left-[50%] lf-top-[50%] lf-z-50 lf-grid lf-w-full lf-max-w-lg lf-translate-x-[-50%] lf-translate-y-[-50%] lf-gap-4 lf-border lf-bg-background lf-p-6 lf-shadow-lg lf-duration-200 data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[state=closed]:lf-fade-out-0 data-[state=open]:lf-fade-in-0 data-[state=closed]:lf-zoom-out-95 data-[state=open]:lf-zoom-in-95 data-[state=closed]:lf-slide-out-to-left-1/2 data-[state=closed]:lf-slide-out-to-top-[48%] data-[state=open]:lf-slide-in-from-left-1/2 data-[state=open]:lf-slide-in-from-top-[48%] sm:lf-rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="lf-absolute lf-right-4 lf-top-4 lf-rounded-sm lf-opacity-70 lf-ring-offset-background lf-transition-opacity hover:lf-opacity-100 focus:lf-outline-none focus:lf-ring-2 focus:lf-ring-ring focus:lf-ring-offset-2 disabled:lf-pointer-events-none data-[state=open]:lf-bg-accent data-[state=open]:lf-text-muted-foreground">
        <X className="lf-h-4 lf-w-4" />
        <span className="lf-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "lf-flex lf-flex-col lf-space-y-1.5 lf-text-center sm:lf-text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "lf-text-lg lf-font-semibold lf-leading-none lf-tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("lf-text-sm lf-text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
