import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Toast — transient notification on @radix-ui/react-toast.
 *
 * Usage (compound):
 *   <ToastProvider>
 *     <Toast open={open} onOpenChange={setOpen}>
 *       <div>
 *         <ToastTitle>Saved</ToastTitle>
 *         <ToastDescription>Profile updated.</ToastDescription>
 *       </div>
 *       <ToastClose />
 *     </Toast>
 *     <ToastViewport />
 *   </ToastProvider>
 *
 * For most cases the imperative `useToast()` hook + `<Toaster />`
 * (./toaster.tsx) is friendlier:
 *
 *   const { toast } = useToast();
 *   toast({ title: "Saved", description: "Profile updated." });
 *
 * Radix handles queuing, swipe-to-dismiss, hover-to-pause-the-timer,
 * keyboard focus on hot-key, ARIA live region.
 */

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col p-4",
      "md:max-w-sm",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start gap-3",
    "overflow-hidden rounded-zen-md border p-4 shadow-zen-lg",
    "data-[swipe=cancel]:translate-x-0",
    "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
    "data-[swipe=move]:transition-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-zen-background border-zen-border text-zen-foreground",
        success:
          "bg-zen-success-soft border-zen-success text-zen-success-soft-fg",
        warning:
          "bg-zen-warning-soft border-zen-warning text-zen-warning-soft-fg",
        destructive:
          "bg-zen-error-soft border-zen-error text-zen-error-soft-fg",
        info: "bg-zen-info-soft border-zen-info text-zen-info-soft-fg",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
));
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      "ml-auto inline-flex h-8 shrink-0 items-center justify-center",
      "rounded-zen-sm border border-current/30 bg-transparent px-3 text-sm font-medium",
      "hover:bg-current/10",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    toast-close=""
    aria-label="Close"
    className={cn(
      "absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center",
      "rounded-zen-sm bg-transparent border-0 cursor-pointer opacity-70",
      "hover:opacity-100 hover:bg-current/10",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
      className,
    )}
    {...props}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("text-sm font-semibold leading-tight", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-sm opacity-90 leading-snug", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toastVariants,
};
