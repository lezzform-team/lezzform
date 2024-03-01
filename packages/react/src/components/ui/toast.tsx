import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "lf-fixed lf-top-0 lf-z-[100] lf-flex lf-max-h-screen lf-w-full lf-flex-col-reverse lf-p-4 sm:lf-bottom-0 sm:lf-right-0 sm:lf-top-auto sm:lf-flex-col md:lf-max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "lf-group lf-pointer-events-auto lf-relative lf-flex lf-w-full lf-items-center lf-justify-between lf-space-x-4 lf-overflow-hidden lf-rounded-md lf-border lf-p-6 lf-pr-8 lf-shadow-lg lf-transition-all data-[swipe=cancel]:lf-translate-x-0 data-[swipe=end]:lf-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:lf-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:lf-transition-none data-[state=open]:lf-animate-in data-[state=closed]:lf-animate-out data-[swipe=end]:lf-animate-out data-[state=closed]:lf-fade-out-80 data-[state=closed]:lf-slide-out-to-right-full data-[state=open]:lf-slide-in-from-top-full data-[state=open]:sm:lf-slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "lf-border lf-bg-background lf-text-foreground",
        destructive:
          "lf-destructive lf-group lf-border-destructive lf-bg-destructive lf-text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "lf-inline-flex lf-h-8 lf-shrink-0 lf-items-center lf-justify-center lf-rounded-md lf-border lf-bg-transparent lf-px-3 lf-text-sm lf-font-medium lf-ring-offset-background lf-transition-colors hover:lf-bg-secondary focus:lf-outline-none focus:lf-ring-2 focus:lf-ring-ring focus:lf-ring-offset-2 disabled:lf-pointer-events-none disabled:lf-opacity-50 group-[.destructive]:lf-border-muted/40 group-[.destructive]:hover:lf-border-destructive/30 group-[.destructive]:hover:lf-bg-destructive group-[.destructive]:hover:lf-text-destructive-foreground group-[.destructive]:focus:lf-ring-destructive",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "lf-absolute lf-right-2 lf-top-2 lf-rounded-md lf-p-1 lf-text-foreground/50 lf-opacity-0 lf-transition-opacity hover:lf-text-foreground focus:lf-opacity-100 focus:lf-outline-none focus:lf-ring-2 group-hover:lf-opacity-100 group-[.destructive]:lf-text-red-300 group-[.destructive]:hover:lf-text-red-50 group-[.destructive]:focus:lf-ring-red-400 group-[.destructive]:focus:lf-ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="lf-h-4 lf-w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("lf-text-sm lf-font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("lf-text-sm lf-opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
