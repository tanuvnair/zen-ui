import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Sheet — slide-in side panel built on Radix Dialog. Use when a Dialog
 * is too modal for the task: long-form filter panels, edit screens that
 * need the underlying list visible as reference, KYC document review,
 * help / onboarding tour content. Slides in from any edge.
 *
 *   <Sheet>
 *     <SheetTrigger asChild>
 *       <Button>Filters</Button>
 *     </SheetTrigger>
 *     <SheetContent side="right">
 *       <SheetHeader>
 *         <SheetTitle>Filters</SheetTitle>
 *         <SheetDescription>Narrow the dashboard.</SheetDescription>
 *       </SheetHeader>
 *       …
 *       <SheetFooter>
 *         <Button>Apply</Button>
 *         <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
 *       </SheetFooter>
 *     </SheetContent>
 *   </Sheet>
 *
 * `side` controls which edge the panel slides from:
 *   - right (default) — desktop filters / details / edit forms
 *   - left — secondary navigation drawer
 *   - top — banner-style notifications, command palettes
 *   - bottom — mobile bottom-sheet (responsive: pair with media-query
 *     prop on the consumer side)
 *
 * Differences from Dialog:
 *   - Slides instead of fading + scaling.
 *   - The overlay still dims the rest of the page (Dialog semantics) so
 *     the user knows the sheet is the focus. For a non-modal slide-in
 *     panel that lets the page stay interactive, use Popover instead.
 */

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40",
      "data-[state=open]:animate-zen-fade-in",
      "data-[state=closed]:animate-zen-fade-out",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const sheetContentVariants = cva(
  [
    "fixed z-50 flex flex-col gap-4 bg-zen-background p-6 shadow-zen-lg",
    "transition ease-in-out",
    "focus-visible:outline-none",
  ].join(" "),
  {
    variants: {
      side: {
        right: [
          "inset-y-0 right-0 h-full w-3/4 max-w-md border-l border-zen-border",
          "data-[state=open]:animate-zen-slide-in-right",
          "data-[state=closed]:animate-zen-slide-out-right",
        ].join(" "),
        left: [
          "inset-y-0 left-0 h-full w-3/4 max-w-md border-r border-zen-border",
          "data-[state=open]:animate-zen-slide-in-left",
          "data-[state=closed]:animate-zen-slide-out-left",
        ].join(" "),
        top: [
          "inset-x-0 top-0 w-full max-h-[80vh] border-b border-zen-border",
          "data-[state=open]:animate-zen-slide-in-top",
          "data-[state=closed]:animate-zen-slide-out-top",
        ].join(" "),
        bottom: [
          "inset-x-0 bottom-0 w-full max-h-[80vh] border-t border-zen-border",
          "rounded-t-zen-lg",
          "data-[state=open]:animate-zen-slide-in-bottom",
          "data-[state=closed]:animate-zen-slide-out-bottom",
        ].join(" "),
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {
  /** Show a built-in close ✕ in the top-right. Default true. */
  showCloseButton?: boolean;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, side = "right", showCloseButton = true, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetContentVariants({ side }), className)}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DialogPrimitive.Close
          aria-label="Close sheet"
          className={cn(
            "absolute top-3 right-3 inline-flex items-center justify-center",
            "h-7 w-7 rounded-zen-sm bg-transparent border-0 cursor-pointer",
            "text-zen-muted-fg hover:text-zen-foreground hover:bg-zen-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </DialogPrimitive.Close>
      ) : null}
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-1.5", className)}
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
      "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-base font-semibold leading-tight text-zen-foreground m-0",
      className,
    )}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-zen-muted-fg m-0", className)}
    {...props}
  />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetContentVariants,
};
