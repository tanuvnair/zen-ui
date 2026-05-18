import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Alert — feedback / message banner. Compound API.
 *
 *   <Alert color="info" variant="soft">
 *     <AlertIcon><InfoIcon /></AlertIcon>
 *     <AlertContent>
 *       <AlertTitle>Heads up</AlertTitle>
 *       <AlertDescription>
 *         Your trial expires in 3 days.
 *       </AlertDescription>
 *     </AlertContent>
 *     <AlertActions>
 *       <button type="button">Action 1</button>
 *       <button type="button">Action 2</button>
 *     </AlertActions>
 *     <AlertClose onClick={dismiss} />
 *   </Alert>
 *
 * Zen theme parts (all opt-in via composition):
 *   icon  ·  title  ·  description (body)  ·  actions  ·  close button
 *
 * Variants per the Zen theme artifact:
 *   color   — destructive | info | neutral | primary | success | warning
 *   variant — soft (default, light tinted bg) | outline (white bg + colored border)
 *
 * Role="alert" announces immediately to screen readers; pass
 * `role="status"` for less-urgent messages.
 */

const alertVariants = cva(
  [
    "relative w-full rounded-zen-md p-3",
    "flex items-start gap-2",
  ].join(" "),
  {
    variants: {
      color: {
        neutral: "",
        primary: "",
        info: "",
        success: "",
        warning: "",
        destructive: "",
      },
      variant: {
        soft: "",
        outline: "bg-zen-background",
      },
    },
    compoundVariants: [
      // soft (Zen theme "Sky Bg" / tinted background)
      { variant: "soft", color: "neutral", class: "bg-zen-muted text-zen-foreground border border-zen-border" },
      { variant: "soft", color: "primary", class: "bg-zen-primary-soft text-zen-primary-soft-fg border border-zen-primary-soft" },
      { variant: "soft", color: "info", class: "bg-zen-info-soft text-zen-info-soft-fg border border-zen-info-soft" },
      { variant: "soft", color: "success", class: "bg-zen-success-soft text-zen-success-soft-fg border border-zen-success-soft" },
      { variant: "soft", color: "warning", class: "bg-zen-warning-soft text-zen-warning-soft-fg border border-zen-warning-soft" },
      { variant: "soft", color: "destructive", class: "bg-zen-error-soft text-zen-error-soft-fg border border-zen-error-soft" },
      // outline (Zen theme "Opaque Bg" / white surface with colored border)
      { variant: "outline", color: "neutral", class: "border border-zen-border text-zen-foreground" },
      { variant: "outline", color: "primary", class: "border border-zen-primary text-zen-foreground" },
      { variant: "outline", color: "info", class: "border border-zen-info text-zen-foreground" },
      { variant: "outline", color: "success", class: "border border-zen-success text-zen-foreground" },
      { variant: "outline", color: "warning", class: "border border-zen-warning text-zen-foreground" },
      { variant: "outline", color: "destructive", class: "border border-zen-error text-zen-foreground" },
    ],
    defaultVariants: {
      variant: "soft",
      color: "info",
    },
  },
);

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, color, variant, role = "alert", ...props }, ref) => (
    <div
      ref={ref}
      role={role}
      className={cn(alertVariants({ color, variant, className }))}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

/* ----------------------------- Icon slot ------------------------------ */
const AlertIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    className={cn("shrink-0 inline-flex items-center justify-center mt-0.5", className)}
    {...props}
  />
));
AlertIcon.displayName = "AlertIcon";

/* ----------------------------- Content stack -------------------------- */
const AlertContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 flex-1 flex flex-col gap-1", className)}
    {...props}
  />
));
AlertContent.displayName = "AlertContent";

/* ----------------------------- Title --------------------------------- */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-semibold leading-tight text-sm", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/* ----------------------------- Description --------------------------- */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm opacity-90 leading-snug", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

/* ----------------------------- Actions row --------------------------- */
const AlertActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ml-auto shrink-0 flex items-center gap-4 self-center", className)}
    {...props}
  />
));
AlertActions.displayName = "AlertActions";

/* ----------------------------- Close button -------------------------- */
export interface AlertCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AlertClose = React.forwardRef<HTMLButtonElement, AlertCloseProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Dismiss"
      className={cn(
        "shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-zen-sm",
        "bg-transparent border-0 cursor-pointer text-current opacity-70",
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
    </button>
  ),
);
AlertClose.displayName = "AlertClose";

export {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
  AlertClose,
  alertVariants,
};
