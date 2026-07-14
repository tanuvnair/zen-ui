import { type JSX, type ValidComponent, splitProps, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import type { PolymorphicProps } from "../../lib/polymorphic";

/**
 * Badge — shadcn-style status pill. Polymorphic via `as` so it can
 * render as <a>, <A> from @solidjs/router, etc. for clickable pills.
 */

const badgeVariants = cva(
  [
    "zen-inline-flex zen-items-center zen-gap-1 zen-rounded-zen-full",
    "zen-px-2 zen-py-0.5 zen-text-xs zen-font-medium",
    "zen-border zen-border-transparent",
    "focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring focus-visible:zen-ring-offset-2",
    "zen-transition-colors",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "",
        soft: "",
        outline: "zen-bg-transparent",
      },
      color: {
        primary: "",
        neutral: "",
        info: "",
        success: "",
        warning: "",
        error: "",
      },
    },
    compoundVariants: [
      { variant: "solid", color: "primary", class: "zen-bg-zen-primary zen-text-zen-primary-fg" },
      { variant: "solid", color: "neutral", class: "zen-bg-zen-neutral zen-text-zen-neutral-fg" },
      { variant: "solid", color: "info", class: "zen-bg-zen-info zen-text-zen-info-fg" },
      { variant: "solid", color: "success", class: "zen-bg-zen-success zen-text-zen-success-fg" },
      { variant: "solid", color: "warning", class: "zen-bg-zen-warning zen-text-zen-warning-fg" },
      { variant: "solid", color: "error", class: "zen-bg-zen-error zen-text-zen-error-fg" },
      { variant: "soft", color: "primary", class: "zen-bg-zen-primary-soft zen-text-zen-primary-soft-fg" },
      { variant: "soft", color: "neutral", class: "zen-bg-zen-neutral-soft zen-text-zen-neutral-soft-fg" },
      { variant: "soft", color: "info", class: "zen-bg-zen-info-soft zen-text-zen-info-soft-fg" },
      { variant: "soft", color: "success", class: "zen-bg-zen-success-soft zen-text-zen-success-soft-fg" },
      { variant: "soft", color: "warning", class: "zen-bg-zen-warning-soft zen-text-zen-warning-soft-fg" },
      { variant: "soft", color: "error", class: "zen-bg-zen-error-soft zen-text-zen-error-soft-fg" },
      { variant: "outline", color: "primary", class: "zen-border-zen-primary zen-text-zen-primary" },
      { variant: "outline", color: "neutral", class: "zen-border-zen-border zen-text-zen-foreground" },
      { variant: "outline", color: "info", class: "zen-border-zen-info zen-text-zen-info" },
      { variant: "outline", color: "success", class: "zen-border-zen-success zen-text-zen-success" },
      { variant: "outline", color: "warning", class: "zen-border-zen-warning zen-text-zen-warning" },
      { variant: "outline", color: "error", class: "zen-border-zen-error zen-text-zen-error" },
    ],
    defaultVariants: {
      variant: "soft",
      color: "primary",
    },
  },
);

type BadgeOwnProps = VariantProps<typeof badgeVariants> & {
  class?: string;
  children?: JSX.Element;
};

export type BadgeProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  BadgeOwnProps
>;

export const Badge = <T extends ValidComponent = "span">(rawProps: BadgeProps<T>) => {
  const props = mergeProps({ as: "span" as ValidComponent }, rawProps);
  const [local, rest] = splitProps(props as BadgeProps<"span"> & { as: ValidComponent }, [
    "as",
    "class",
    "variant",
    "color",
    "children",
  ]);
  return (
    <Dynamic
      component={local.as}
      class={cn(
        badgeVariants({ variant: local.variant, color: local.color }),
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export { badgeVariants };
