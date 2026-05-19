import { splitProps, mergeProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../button/button";

/**
 * FAB — fixed-position floating action button. Wraps the Button primitive
 * with positioning + elevation. No Kobalte primitive needed; shadcn's
 * pattern is the same — a styled positioned button.
 *
 *   <FAB onClick={...} iconLeft={<PlusIcon/>} />
 *   <FAB position="bottom-left" color="error" iconLeft={<TrashIcon/>} />
 *
 * For multi-action speed-dial menus, compose FAB inside Kobalte's
 * DropdownMenu trigger — Solid's `as` prop makes this clean.
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

export type FABProps = Omit<ButtonProps, "shape" | "size"> &
  VariantProps<typeof fabContainer> & {
    size?: "md" | "lg" | "xl";
  };

const SHAPE_BY_SIZE: Record<NonNullable<FABProps["size"]>, string> = {
  md: "h-12 w-12",
  lg: "h-14 w-14",
  xl: "h-16 w-16",
};

export const FAB = (rawProps: FABProps) => {
  const props = mergeProps({ size: "lg" as const, color: "primary" as const }, rawProps);
  const [local, rest] = splitProps(props, ["position", "size", "class", "color"]);
  return (
    <div class={cn(fabContainer({ position: local.position }))}>
      <Button
        color={local.color}
        shape="circle"
        class={cn("shadow-md hover:shadow-lg", SHAPE_BY_SIZE[local.size], local.class)}
        {...rest}
      />
    </div>
  );
};
