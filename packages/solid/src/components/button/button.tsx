import { type JSX, type ValidComponent, splitProps, mergeProps, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import type { PolymorphicProps } from "../../lib/polymorphic";

/**
 * Button — shadcn-style primitive ported to Solid.
 *
 * Design notes:
 *  - Polymorphic via `as` (Solid's equivalent of Radix `asChild`). Default
 *    renders <button>; pass `as={A}` from @solidjs/router to render an
 *    <a>-flavoured link with identical styling. Anchor-specific props
 *    (`href`, `target`, …) typecheck when `as="a"` thanks to the
 *    PolymorphicProps helper.
 *  - Variants come from class-variance-authority — same package the
 *    React binding uses — so styling stays byte-identical.
 *  - Variant colours resolve through UnoCSS theme aliases (`zen-*`) that
 *    point at the `--zen-*` CSS custom properties in
 *    @algorisys/zen-ui-core/tokens.css.
 *  - No business logic (no HTTP, no form-field side effects). Use `onClick`.
 */

const buttonVariants = cva(
  [
    "appearance-none border-0 bg-transparent",
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap font-medium",
    "select-none cursor-pointer",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "",
        outline: "border bg-transparent",
        soft: "",
        ghost: "bg-transparent hover:bg-zen-muted",
        link: "bg-transparent underline-offset-4 hover:underline p-0 h-auto",
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
        xs: "h-7 px-2 text-xs rounded-zen-sm",
        sm: "h-8 px-3 text-sm rounded-zen-sm",
        md: "h-10 px-4 text-sm rounded-zen-md",
        lg: "h-11 px-6 text-base rounded-zen-md",
        xl: "h-12 px-8 text-base rounded-zen-lg",
      },
      shape: {
        default: "",
        square: "aspect-square px-0",
        circle: "aspect-square px-0 rounded-zen-full",
        block: "w-full",
      },
      // Let the label wrap across lines instead of forcing a single line.
      // Drops the fixed height + nowrap (keeps a min tap height) and
      // left-aligns content — useful for long-text options / list buttons.
      multiline: {
        true: "!whitespace-normal !h-auto min-h-10 !items-start !justify-start text-left py-2",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "solid", color: "primary", class: "bg-zen-primary text-zen-primary-fg hover:opacity-90" },
      { variant: "solid", color: "neutral", class: "bg-zen-neutral text-zen-neutral-fg hover:opacity-90" },
      { variant: "solid", color: "info", class: "bg-zen-info text-zen-info-fg hover:opacity-90" },
      { variant: "solid", color: "success", class: "bg-zen-success text-zen-success-fg hover:opacity-90" },
      { variant: "solid", color: "warning", class: "bg-zen-warning text-zen-warning-fg hover:opacity-90" },
      { variant: "solid", color: "error", class: "bg-zen-error text-zen-error-fg hover:opacity-90" },
      { variant: "outline", color: "primary", class: "border-zen-primary text-zen-primary hover:bg-zen-primary-soft" },
      { variant: "outline", color: "neutral", class: "border-zen-border text-zen-foreground hover:bg-zen-muted" },
      { variant: "outline", color: "info", class: "border-zen-info text-zen-info hover:bg-zen-info-soft" },
      { variant: "outline", color: "success", class: "border-zen-success text-zen-success hover:bg-zen-success-soft" },
      { variant: "outline", color: "warning", class: "border-zen-warning text-zen-warning hover:bg-zen-warning-soft" },
      { variant: "outline", color: "error", class: "border-zen-error text-zen-error hover:bg-zen-error-soft" },
      { variant: "soft", color: "primary", class: "bg-zen-primary-soft text-zen-primary-soft-fg hover:opacity-90" },
      { variant: "soft", color: "neutral", class: "bg-zen-neutral-soft text-zen-neutral-soft-fg hover:opacity-90" },
      { variant: "soft", color: "info", class: "bg-zen-info-soft text-zen-info-soft-fg hover:opacity-90" },
      { variant: "soft", color: "success", class: "bg-zen-success-soft text-zen-success-soft-fg hover:opacity-90" },
      { variant: "soft", color: "warning", class: "bg-zen-warning-soft text-zen-warning-soft-fg hover:opacity-90" },
      { variant: "soft", color: "error", class: "bg-zen-error-soft text-zen-error-soft-fg hover:opacity-90" },
      { variant: "ghost", color: "primary", class: "text-zen-primary" },
      { variant: "ghost", color: "neutral", class: "text-zen-foreground" },
      { variant: "ghost", color: "info", class: "text-zen-info" },
      { variant: "ghost", color: "success", class: "text-zen-success" },
      { variant: "ghost", color: "warning", class: "text-zen-warning" },
      { variant: "ghost", color: "error", class: "text-zen-error" },
      { variant: "link", color: "primary", class: "text-zen-primary" },
      { variant: "link", color: "neutral", class: "text-zen-foreground" },
      { variant: "link", color: "info", class: "text-zen-info" },
      { variant: "link", color: "success", class: "text-zen-success" },
      { variant: "link", color: "warning", class: "text-zen-warning" },
      { variant: "link", color: "error", class: "text-zen-error" },
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

type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
  loading?: boolean;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  class?: string;
  children?: JSX.Element;
};

export type ButtonProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  ButtonOwnProps
>;

const Spinner = () => (
  <svg
    class="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export const Button = <T extends ValidComponent = "button">(
  rawProps: ButtonProps<T>,
) => {
  const props = mergeProps({ as: "button" as ValidComponent, loading: false }, rawProps);
  const [local, rest] = splitProps(props as ButtonProps<"button"> & { as: ValidComponent }, [
    "as",
    "class",
    "variant",
    "color",
    "size",
    "shape",
    "multiline",
    "loading",
    "disabled",
    "iconLeft",
    "iconRight",
    "children",
    "type",
  ]);
  const isDisabled = () => local.disabled || local.loading;

  return (
    <Dynamic
      component={local.as}
      class={cn(
        buttonVariants({
          variant: local.variant,
          color: local.color,
          size: local.size,
          shape: local.shape,
          multiline: local.multiline,
        }),
        local.class,
      )}
      type={local.as === "button" ? (local.type ?? "button") : local.type}
      disabled={isDisabled() || undefined}
      aria-busy={local.loading || undefined}
      data-loading={local.loading || undefined}
      {...rest}
    >
      <Show when={local.loading} fallback={local.iconLeft}>
        <Spinner />
      </Show>
      {local.children}
      <Show when={!local.loading}>{local.iconRight}</Show>
    </Dynamic>
  );
};

export { buttonVariants };
