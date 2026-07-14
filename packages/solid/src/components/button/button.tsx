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
      { variant: "solid", color: "primary", class: "zen-bg-zen-primary zen-text-zen-primary-fg hover:zen-opacity-90" },
      { variant: "solid", color: "neutral", class: "zen-bg-zen-neutral zen-text-zen-neutral-fg hover:zen-opacity-90" },
      { variant: "solid", color: "info", class: "zen-bg-zen-info zen-text-zen-info-fg hover:zen-opacity-90" },
      { variant: "solid", color: "success", class: "zen-bg-zen-success zen-text-zen-success-fg hover:zen-opacity-90" },
      { variant: "solid", color: "warning", class: "zen-bg-zen-warning zen-text-zen-warning-fg hover:zen-opacity-90" },
      { variant: "solid", color: "error", class: "zen-bg-zen-error zen-text-zen-error-fg hover:zen-opacity-90" },
      { variant: "outline", color: "primary", class: "zen-border-zen-primary zen-text-zen-primary hover:zen-bg-zen-primary-soft" },
      { variant: "outline", color: "neutral", class: "zen-border-zen-border zen-text-zen-foreground hover:zen-bg-zen-muted" },
      { variant: "outline", color: "info", class: "zen-border-zen-info zen-text-zen-info hover:zen-bg-zen-info-soft" },
      { variant: "outline", color: "success", class: "zen-border-zen-success zen-text-zen-success hover:zen-bg-zen-success-soft" },
      { variant: "outline", color: "warning", class: "zen-border-zen-warning zen-text-zen-warning hover:zen-bg-zen-warning-soft" },
      { variant: "outline", color: "error", class: "zen-border-zen-error zen-text-zen-error hover:zen-bg-zen-error-soft" },
      { variant: "soft", color: "primary", class: "zen-bg-zen-primary-soft zen-text-zen-primary-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "neutral", class: "zen-bg-zen-neutral-soft zen-text-zen-neutral-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "info", class: "zen-bg-zen-info-soft zen-text-zen-info-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "success", class: "zen-bg-zen-success-soft zen-text-zen-success-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "warning", class: "zen-bg-zen-warning-soft zen-text-zen-warning-soft-fg hover:zen-opacity-90" },
      { variant: "soft", color: "error", class: "zen-bg-zen-error-soft zen-text-zen-error-soft-fg hover:zen-opacity-90" },
      { variant: "ghost", color: "primary", class: "zen-text-zen-primary" },
      { variant: "ghost", color: "neutral", class: "zen-text-zen-foreground" },
      { variant: "ghost", color: "info", class: "zen-text-zen-info" },
      { variant: "ghost", color: "success", class: "zen-text-zen-success" },
      { variant: "ghost", color: "warning", class: "zen-text-zen-warning" },
      { variant: "ghost", color: "error", class: "zen-text-zen-error" },
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
    class="zen-animate-spin zen-h-4 zen-w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle class="zen-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path class="zen-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
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
