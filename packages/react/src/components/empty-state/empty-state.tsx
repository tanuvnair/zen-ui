import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * EmptyState — surface shown when a list / table / dashboard has no
 * data yet. The first-run experience in any onboarding flow.
 *
 *   <EmptyState>
 *     <EmptyStateIcon><InboxIcon /></EmptyStateIcon>
 *     <EmptyStateTitle>No invoices yet</EmptyStateTitle>
 *     <EmptyStateDescription>
 *       Create your first invoice to track revenue.
 *     </EmptyStateDescription>
 *     <EmptyStateActions>
 *       <Button>Create invoice</Button>
 *       <Button variant="outline">Import from CSV</Button>
 *     </EmptyStateActions>
 *   </EmptyState>
 *
 * The default `size="md"` centers content with comfortable padding for
 * a card-sized container. Use `size="sm"` for inline empty states
 * (table body, dropdown menu) and `size="lg"` for full-page first-run
 * screens. `bordered` adds a dashed border + muted background to
 * communicate "drop something here" / "this is intentionally empty".
 */

const emptyStateVariants = cva(
  [
    "flex flex-col items-center justify-center text-center",
    "text-zen-foreground",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "py-6 px-3 gap-1.5",
        md: "py-10 px-6 gap-3",
        lg: "py-16 px-8 gap-4",
      },
      bordered: {
        true: "border-2 border-dashed border-zen-border rounded-zen-md bg-zen-muted/40",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      bordered: false,
    },
  },
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, size, bordered, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn(emptyStateVariants({ size, bordered }), className)}
      {...props}
    />
  ),
);
EmptyState.displayName = "EmptyState";

/**
 * Wraps the leading icon. Renders a muted circular tile around the
 * icon so an SVG passed as a child gets a consistent visual frame
 * without the caller needing to style the surface.
 */
export const EmptyStateIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden
    className={cn(
      "inline-flex items-center justify-center",
      "h-12 w-12 rounded-zen-full bg-zen-muted text-zen-muted-fg",
      "mb-1",
      className,
    )}
    {...props}
  />
));
EmptyStateIcon.displayName = "EmptyStateIcon";

export const EmptyStateTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-base font-semibold m-0", className)}
    {...props}
  />
));
EmptyStateTitle.displayName = "EmptyStateTitle";

export const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-zen-muted-fg max-w-[40ch] m-0 leading-relaxed",
      className,
    )}
    {...props}
  />
));
EmptyStateDescription.displayName = "EmptyStateDescription";

export const EmptyStateActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-wrap items-center justify-center gap-2 mt-2",
      className,
    )}
    {...props}
  />
));
EmptyStateActions.displayName = "EmptyStateActions";

export { emptyStateVariants };
