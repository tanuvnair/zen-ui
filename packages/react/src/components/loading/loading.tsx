import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Loading — animated spinner. No Radix primitive (none exists);
 * shadcn ships the same pattern as a plain SVG with `animate-spin`.
 *
 *   <Loading />                  // sr-only label, defaults to md primary
 *   <Loading size="xl" label="Submitting…" />
 *
 * `label` becomes accessible text for screen readers. Pass `label=""` to
 * keep the loader purely decorative; the surrounding context should then
 * carry the loading semantics (e.g. `aria-busy` on the parent button).
 */

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-6 w-6",
      xl: "h-10 w-10",
    },
    color: {
      primary: "text-zen-primary",
      neutral: "text-zen-foreground",
      info: "text-zen-info",
      success: "text-zen-success",
      warning: "text-zen-warning",
      error: "text-zen-error",
      current: "text-current",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

export interface LoadingProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "color">,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label (visually hidden). Default "Loading". Pass "" to mark decorative. */
  label?: string;
}

const Loading = React.forwardRef<SVGSVGElement, LoadingProps>(
  ({ className, size, color, label = "Loading", ...props }, ref) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <svg
        ref={ref}
        role={label ? "status" : "presentation"}
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
        viewBox="0 0 24 24"
        fill="none"
        className={cn(spinnerVariants({ size, color, className }))}
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      {label ? (
        <span
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {label}
        </span>
      ) : null}
    </span>
  ),
);
Loading.displayName = "Loading";

export { Loading, spinnerVariants };
