import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Button — shadcn/radix-style primitive.
 *
 * Design notes:
 *  - Forwards a ref to the underlying button element.
 *  - `asChild` renders the variant styles onto its child via Radix Slot,
 *    so consumers can compose with `<Link>`, `<a>`, etc. without losing styling
 *    and without us re-implementing each element type.
 *  - Variants are declared with class-variance-authority. Colors and radii
 *    resolve through UnoCSS theme aliases (`zen-*`) that point at the
 *    `--zen-*` CSS custom properties in src/styles/tokens.css. Override
 *    those vars to retheme.
 *  - No business logic (no HTTP, no form-field side effects). Use `onClick`.
 */

const buttonVariants = cva(
  // base
  [
    // Reset browser-default <button> chrome. UnoCSS's presetUno preflight does
    // NOT ship Tailwind v3's element reset, so without these every <button>
    // renders with the OS's 3D border / native background.
    "zen-appearance-none zen-border-0 zen-bg-transparent",
    "zen-inline-flex zen-items-center zen-justify-center zen-gap-2",
    "zen-whitespace-nowrap zen-font-medium",
    "zen-select-none zen-cursor-pointer",
    "zen-transition-colors zen-duration-150",
    "focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring focus-visible:zen-ring-offset-2",
    "disabled:zen-opacity-50 disabled:zen-cursor-not-allowed disabled:zen-pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "",
        outline: "zen-border zen-bg-transparent",
        soft: "",
        ghost: "zen-bg-transparent hover:zen-bg-zen-muted",
        link: "zen-bg-transparent zen-underline-offset-4 hover:zen-underline zen-p-0 zen-h-auto",
      },
      color: {
        primary: "",
        neutral: "",
        info: "",
        success: "",
        warning: "",
        error: "",
      },
      size: {
        xs: "zen-h-7 zen-px-2 zen-text-xs zen-rounded-zen-sm",
        sm: "zen-h-8 zen-px-3 zen-text-sm zen-rounded-zen-sm",
        md: "zen-h-10 zen-px-4 zen-text-sm zen-rounded-zen-md",
        lg: "zen-h-11 zen-px-6 zen-text-base zen-rounded-zen-md",
        xl: "zen-h-12 zen-px-8 zen-text-base zen-rounded-zen-lg",
      },
      shape: {
        default: "",
        square: "zen-aspect-square zen-px-0",
        circle: "zen-aspect-square zen-px-0 zen-rounded-zen-full",
        block: "zen-w-full",
      },
      // Let the label wrap across lines instead of forcing a single line.
      // Drops the fixed height + nowrap (keeps a min tap height) and
      // left-aligns content — useful for long-text options / list buttons.
      multiline: {
        true: "!zen-whitespace-normal !zen-h-auto zen-min-h-10 !zen-items-start !zen-justify-start zen-text-left zen-py-2",
        false: "",
      },
    },
    compoundVariants: [
      // solid
      { variant: "solid", color: "primary", class: "zen-bg-zen-primary zen-text-zen-primary-fg hover:zen-opacity-90" },
      { variant: "solid", color: "neutral", class: "zen-bg-zen-neutral zen-text-zen-neutral-fg hover:zen-opacity-90" },
      { variant: "solid", color: "info", class: "zen-bg-zen-info zen-text-zen-info-fg hover:zen-opacity-90" },
      { variant: "solid", color: "success", class: "zen-bg-zen-success zen-text-zen-success-fg hover:zen-opacity-90" },
      { variant: "solid", color: "warning", class: "zen-bg-zen-warning zen-text-zen-warning-fg hover:zen-opacity-90" },
      { variant: "solid", color: "error", class: "zen-bg-zen-error zen-text-zen-error-fg hover:zen-opacity-90" },
      // outline
      { variant: "outline", color: "primary", class: "zen-border-zen-primary zen-text-zen-primary hover:zen-bg-zen-primary-soft" },
      { variant: "outline", color: "neutral", class: "zen-border-zen-border zen-text-zen-foreground hover:zen-bg-zen-muted" },
      { variant: "outline", color: "info", class: "zen-border-zen-info zen-text-zen-info hover:zen-bg-zen-info-soft" },
      { variant: "outline", color: "success", class: "zen-border-zen-success zen-text-zen-success hover:zen-bg-zen-success-soft" },
      { variant: "outline", color: "warning", class: "zen-border-zen-warning zen-text-zen-warning hover:zen-bg-zen-warning-soft" },
      { variant: "outline", color: "error", class: "zen-border-zen-error zen-text-zen-error hover:zen-bg-zen-error-soft" },
      // soft
      { variant: "soft", color: "primary", class: "zen-bg-zen-primary-soft zen-text-zen-primary-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "neutral", class: "zen-bg-zen-neutral-soft zen-text-zen-neutral-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "info", class: "zen-bg-zen-info-soft zen-text-zen-info-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "success", class: "zen-bg-zen-success-soft zen-text-zen-success-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "warning", class: "zen-bg-zen-warning-soft zen-text-zen-warning-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "error", class: "zen-bg-zen-error-soft zen-text-zen-error-soft-fg hover:zen-opacity-90" },
      // ghost text color follows the chosen color
      { variant: "ghost", color: "primary", class: "zen-text-zen-primary" },
      { variant: "ghost", color: "neutral", class: "zen-text-zen-foreground" },
      { variant: "ghost", color: "info", class: "zen-text-zen-info" },
      { variant: "ghost", color: "success", class: "zen-text-zen-success" },
      { variant: "ghost", color: "warning", class: "zen-text-zen-warning" },
      { variant: "ghost", color: "error", class: "zen-text-zen-error" },
      // link text color follows the chosen color
      { variant: "link", color: "primary", class: "zen-text-zen-primary" },
      { variant: "link", color: "neutral", class: "zen-text-zen-foreground" },
      { variant: "link", color: "info", class: "zen-text-zen-info" },
      { variant: "link", color: "success", class: "zen-text-zen-success" },
      { variant: "link", color: "warning", class: "zen-text-zen-warning" },
      { variant: "link", color: "error", class: "zen-text-zen-error" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
      shape: "default",
      multiline: false,
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  /** Render the variant styles onto the child element (Radix Slot pattern). */
  asChild?: boolean;
  /** When true, shows a spinner and disables the button. */
  loading?: boolean;
  /** Icon node placed before children. */
  iconLeft?: React.ReactNode;
  /** Icon node placed after children. */
  iconRight?: React.ReactNode;
}

const Spinner = () => (
  <svg
    className="zen-animate-spin zen-h-4 zen-w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="zen-opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="zen-opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      shape,
      multiline,
      asChild = false,
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, color, size, shape, multiline, className }))}
        // When rendering a real <button>, default type="button" to avoid
        // accidental form submission. When asChild, leave type to the child.
        type={asChild ? undefined : (type ?? "button")}
        disabled={asChild ? undefined : isDisabled}
        aria-disabled={asChild ? isDisabled || undefined : undefined}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...props}
      >
        {/* Slottable marks `children` as the Radix Slot target when asChild
         * is true, so iconLeft / iconRight render as siblings inside the
         * slotted element rather than tripping React.Children.only(). When
         * asChild is false, Slottable is a transparent fragment.
         */}
        {loading ? <Spinner /> : iconLeft}
        <Slottable>{children}</Slottable>
        {!loading && iconRight}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
