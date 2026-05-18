import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../../lib/cn";

/**
 * Slider — built on @radix-ui/react-slider. Supports single-thumb and
 * range (multi-thumb). Radix supplies keyboard control (Arrow keys,
 * PgUp/Dn, Home/End), ARIA, RTL, and form submission.
 *
 *   <Slider defaultValue={[50]} max={100} step={1} />
 *   <Slider defaultValue={[20, 80]} max={100} step={1} />
 */

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ...props }, ref) => {
  // Determine the number of thumbs from either value or defaultValue.
  const thumbs = (props.value ?? props.defaultValue ?? [0]) as number[];
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative h-2 w-full grow overflow-hidden rounded-zen-full bg-zen-muted",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute h-full bg-zen-primary",
            "data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {thumbs.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "block h-5 w-5 rounded-zen-full border-2 border-zen-primary bg-zen-background",
            "transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
