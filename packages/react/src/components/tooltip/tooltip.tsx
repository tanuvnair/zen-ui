import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/cn";

/**
 * Tooltip — built on @radix-ui/react-tooltip.
 *
 * Compound API (shadcn-style):
 *   <TooltipProvider>
 *     <Tooltip>
 *       <TooltipTrigger asChild><Button>?</Button></TooltipTrigger>
 *       <TooltipContent>Helpful hint</TooltipContent>
 *     </Tooltip>
 *   </TooltipProvider>
 *
 * Radix handles positioning, collision detection, keyboard dismissal (Esc),
 * pointer-down dismissal, focus/hover triggers, and a11y (aria-describedby).
 * Theming flows through --zen-* CSS variables.
 */

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipPortal = TooltipPrimitive.Portal;

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  /** Render an arrow pointing at the trigger. Default false. */
  arrow?: boolean;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 6, arrow = false, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 max-w-xs px-2.5 py-1.5",
      "rounded-zen-md bg-zen-neutral text-xs text-zen-neutral-fg",
      "shadow-md",
      // Radix sets data-state="delayed-open" / "instant-open" / "closed".
      // Open uses a small transition; closed unmounts so we don't fade out.
      "transition-opacity duration-100 data-[state=closed]:opacity-0",
      className,
    )}
    {...props}
  >
    {children}
    {arrow ? (
      <TooltipPrimitive.Arrow className="fill-zen-neutral" width={10} height={5} />
    ) : null}
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipPortal,
};
