import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../button/button";

/**
 * FAB — fixed-position floating action button. Wraps the new Button with
 * positioning + elevation. No Radix primitive needed (none exists);
 * shadcn's pattern is the same — a styled positioned button.
 *
 *   <FAB onClick={...} iconLeft={<PlusIcon/>} />
 *   <FAB position="bottom-left" color="error" iconLeft={<TrashIcon/>} />
 *
 * For multi-action speed-dial menus, compose FAB with DropdownMenu —
 * <DropdownMenu><DropdownMenuTrigger asChild><FAB/></...>.
 */

const fabContainer = cva("fixed z-40", {
  variants: {
    position: {
      "bottom-right": "bottom-6 right-6",
      "bottom-left": "bottom-6 left-6",
      "top-right": "top-6 right-6",
      "top-left": "top-6 left-6",
    },
  },
  defaultVariants: {
    position: "bottom-right",
  },
});

export interface FABProps
  extends Omit<ButtonProps, "shape" | "size">,
    VariantProps<typeof fabContainer> {
  size?: "md" | "lg" | "xl";
}

const SHAPE_BY_SIZE: Record<NonNullable<FABProps["size"]>, string> = {
  md: "h-12 w-12",
  lg: "h-14 w-14",
  xl: "h-16 w-16",
};

const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ position, size = "lg", className, color = "primary", ...props }, ref) => (
    <div className={cn(fabContainer({ position }))}>
      <Button
        ref={ref}
        color={color}
        shape="circle"
        className={cn(
          "shadow-md hover:shadow-lg",
          SHAPE_BY_SIZE[size],
          className,
        )}
        {...props}
      />
    </div>
  ),
);
FAB.displayName = "FAB";

export { FAB };
