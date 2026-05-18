import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/cn";

/**
 * Avatar — compound API built on @radix-ui/react-avatar.
 *
 *   <Avatar>
 *     <AvatarImage src="…" alt="…" />
 *     <AvatarFallback>AB</AvatarFallback>
 *   </Avatar>
 *
 * Radix's AvatarImage emits `data-loading-status="idle|loading|loaded|error"`
 * so the fallback shows automatically while the image is loading or failed.
 *
 * For grouped / stacked avatars use <AvatarGroup>.
 */

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = "md", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative inline-flex shrink-0 overflow-hidden rounded-zen-full",
      SIZES[size],
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-zen-muted text-zen-muted-fg font-medium",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

/* --------------------------------- AvatarGroup ------------------------- */

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show. Excess collapses to "+N". */
  max?: number;
  /** Spacing between stacked avatars (negative left margin on children). */
  spacing?: "tight" | "default" | "loose";
  size?: AvatarSize;
}

const SPACING: Record<NonNullable<AvatarGroupProps["spacing"]>, string> = {
  tight: "-ml-3",
  default: "-ml-2",
  loose: "-ml-1",
};

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, spacing = "default", size = "md", children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visible = typeof max === "number" ? childArray.slice(0, max) : childArray;
    const overflow =
      typeof max === "number" && childArray.length > max
        ? childArray.length - max
        : 0;

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {visible.map((child, idx) => (
          <div
            key={idx}
            className={cn(
              "ring-2 ring-zen-background rounded-zen-full",
              idx > 0 && SPACING[spacing],
            )}
          >
            {child}
          </div>
        ))}
        {overflow > 0 ? (
          <div className={cn("ring-2 ring-zen-background rounded-zen-full", SPACING[spacing])}>
            <Avatar size={size}>
              <AvatarFallback>+{overflow}</AvatarFallback>
            </Avatar>
          </div>
        ) : null}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
