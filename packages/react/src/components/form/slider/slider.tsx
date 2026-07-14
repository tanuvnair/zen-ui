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
        "zen-relative zen-flex zen-w-full zen-touch-none zen-select-none zen-items-center",
        "data-[orientation=vertical]:zen-h-full data-[orientation=vertical]:zen-w-2 data-[orientation=vertical]:zen-flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "zen-relative zen-h-2 zen-w-full zen-grow zen-overflow-hidden zen-rounded-zen-full zen-bg-zen-muted",
          "data-[orientation=vertical]:zen-h-full data-[orientation=vertical]:zen-w-2",
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "zen-absolute zen-h-full zen-bg-zen-primary",
            "data-[orientation=vertical]:zen-w-full",
          )}
        />
      </SliderPrimitive.Track>
      {thumbs.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "zen-block zen-h-5 zen-w-5 zen-rounded-zen-full zen-border-2 zen-border-zen-primary zen-bg-zen-background",
            "zen-transition-colors",
            "focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring focus-visible:zen-ring-offset-2",
            "disabled:zen-pointer-events-none disabled:zen-opacity-50",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
