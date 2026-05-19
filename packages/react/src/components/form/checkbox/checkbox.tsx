import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../../lib/cn";

/**
 * Checkbox — built on @radix-ui/react-checkbox.
 *
 *   <Checkbox checked={value} onCheckedChange={setValue} />
 *   <Checkbox checked="indeterminate" onCheckedChange={setValue} />
 *
 * Radix supports the tri-state `"indeterminate"` natively (no DOM ref-poking
 * needed), keyboard activation (space), and ARIA. Themed via --zen-* tokens.
 */

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: CheckboxSize;
}

const BOX_SIZES: Record<CheckboxSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = "md", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer shrink-0 rounded-zen-sm border border-zen-border bg-zen-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-zen-primary data-[state=checked]:border-zen-primary data-[state=checked]:text-zen-primary-fg",
      "data-[state=indeterminate]:bg-zen-primary data-[state=indeterminate]:border-zen-primary data-[state=indeterminate]:text-zen-primary-fg",
      BOX_SIZES[size],
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {props.checked === "indeterminate" ? (
        <DashIcon />
      ) : (
        <CheckIcon />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const DashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" width="100%" height="100%">
    <line x1="6" y1="12" x2="18" y2="12" />
  </svg>
);

export { Checkbox };
