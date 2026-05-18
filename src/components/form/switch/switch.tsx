import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../../lib/cn";

/**
 * Switch — built on @radix-ui/react-switch.
 *
 *   <Switch checked={value} onCheckedChange={setValue} />
 *
 * Radix supplies controlled/uncontrolled state, name + value for form
 * submission, keyboard (space/enter), and ARIA (role="switch", aria-checked).
 * Theming via --zen-* tokens; size is a CVA variant.
 */

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: SwitchSize;
}

const TRACK_SIZES: Record<SwitchSize, string> = {
  sm: "h-4 w-7",
  md: "h-5 w-9",
  lg: "h-6 w-11",
};
const THUMB_SIZES: Record<SwitchSize, string> = {
  sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0.5",
  md: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5",
  lg: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = "md", ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-zen-full",
      "transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-zen-primary data-[state=unchecked]:bg-zen-muted",
      TRACK_SIZES[size],
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "block rounded-zen-full bg-zen-background shadow-md ring-0",
        "transition-transform",
        THUMB_SIZES[size],
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
