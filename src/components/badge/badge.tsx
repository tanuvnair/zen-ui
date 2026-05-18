import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Badge — shadcn-style. Not built on a Radix primitive (Radix has no Badge);
 * it's a styled span with CVA variants. Supports `asChild` so it can render
 * as an <a>, NavLink, etc. for clickable status pills.
 */

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-zen-full",
    "px-2 py-0.5 text-xs font-medium",
    "border border-transparent",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
    "transition-colors",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "",
        soft: "",
        outline: "bg-transparent",
      },
      color: {
        primary: "",
        neutral: "",
        info: "",
        success: "",
        warning: "",
        error: "",
      },
    },
    compoundVariants: [
      { variant: "solid", color: "primary", class: "bg-zen-primary text-zen-primary-fg" },
      { variant: "solid", color: "neutral", class: "bg-zen-neutral text-zen-neutral-fg" },
      { variant: "solid", color: "info", class: "bg-zen-info text-zen-info-fg" },
      { variant: "solid", color: "success", class: "bg-zen-success text-zen-success-fg" },
      { variant: "solid", color: "warning", class: "bg-zen-warning text-zen-warning-fg" },
      { variant: "solid", color: "error", class: "bg-zen-error text-zen-error-fg" },
      { variant: "soft", color: "primary", class: "bg-zen-primary-soft text-zen-primary-soft-fg" },
      { variant: "soft", color: "neutral", class: "bg-zen-neutral-soft text-zen-neutral-soft-fg" },
      { variant: "soft", color: "info", class: "bg-zen-info-soft text-zen-info-soft-fg" },
      { variant: "soft", color: "success", class: "bg-zen-success-soft text-zen-success-soft-fg" },
      { variant: "soft", color: "warning", class: "bg-zen-warning-soft text-zen-warning-soft-fg" },
      { variant: "soft", color: "error", class: "bg-zen-error-soft text-zen-error-soft-fg" },
      { variant: "outline", color: "primary", class: "border-zen-primary text-zen-primary" },
      { variant: "outline", color: "neutral", class: "border-zen-border text-zen-foreground" },
      { variant: "outline", color: "info", class: "border-zen-info text-zen-info" },
      { variant: "outline", color: "success", class: "border-zen-success text-zen-success" },
      { variant: "outline", color: "warning", class: "border-zen-warning text-zen-warning" },
      { variant: "outline", color: "error", class: "border-zen-error text-zen-error" },
    ],
    defaultVariants: {
      variant: "soft",
      color: "primary",
    },
  },
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, color, className }))}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
