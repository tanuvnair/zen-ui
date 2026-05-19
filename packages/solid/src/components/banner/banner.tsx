import { type JSX, splitProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Banner — page-top persistent callout. Compound API mirroring the
 * React binding: BannerIcon · BannerContent (Title + Description) ·
 * BannerActions · BannerClose. Differs from Alert in three ways:
 *  - Full container width (no rounded corners).
 *  - Optional `sticky` pins to top of the scroll viewport.
 *  - Inner row centers content within a max-width for wide screens.
 */

const bannerVariants = cva(
  "w-full flex items-center gap-3 px-4 py-3 text-sm border-y",
  {
    variants: {
      color: {
        neutral: "bg-zen-muted text-zen-foreground border-zen-border",
        primary: "bg-zen-primary-soft text-zen-primary-soft-fg border-zen-primary-soft",
        info: "bg-zen-info-soft text-zen-info-soft-fg border-zen-info-soft",
        success: "bg-zen-success-soft text-zen-success-soft-fg border-zen-success-soft",
        warning: "bg-zen-warning-soft text-zen-warning-soft-fg border-zen-warning-soft",
        destructive: "bg-zen-error-soft text-zen-error-soft-fg border-zen-error-soft",
      },
      sticky: {
        true: "sticky top-0 z-30",
        false: "",
      },
    },
    defaultVariants: {
      color: "info",
      sticky: false,
    },
  },
);

export type BannerProps = VariantProps<typeof bannerVariants> &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "color" | "class"> & {
    class?: string;
    children?: JSX.Element;
  };

export const Banner = (props: BannerProps) => {
  const [local, rest] = splitProps(props, ["class", "color", "sticky", "children"]);
  return (
    <div
      role="status"
      aria-live="polite"
      class={cn(bannerVariants({ color: local.color, sticky: local.sticky }), local.class)}
      {...rest}
    >
      <div class="flex items-center gap-3 w-full max-w-[100rem] mx-auto">
        {local.children}
      </div>
    </div>
  );
};

type DivProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};
type SpanProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};

export const BannerIcon = (props: SpanProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <span
      aria-hidden
      class={cn("flex-shrink-0 inline-flex items-center", local.class)}
      {...rest}
    >
      {local.children}
    </span>
  );
};

export const BannerContent = (props: DivProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn("flex-1 min-w-0 inline-flex flex-wrap items-baseline gap-x-2", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export const BannerTitle = (props: SpanProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <span class={cn("font-semibold", local.class)} {...rest}>
      {local.children}
    </span>
  );
};

export const BannerDescription = (props: SpanProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <span class={cn("opacity-90", local.class)} {...rest}>
      {local.children}
    </span>
  );
};

export const BannerActions = (props: DivProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn("flex-shrink-0 flex items-center gap-2", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export type BannerCloseProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class"> & {
  class?: string;
};

export const BannerClose = (props: BannerCloseProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <button
      type="button"
      aria-label="Dismiss banner"
      class={cn(
        "flex-shrink-0 inline-flex items-center justify-center",
        "h-6 w-6 rounded-zen-sm bg-transparent border-0 cursor-pointer",
        "text-current opacity-70 hover:opacity-100 hover:bg-black/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
        local.class,
      )}
      {...rest}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};

export { bannerVariants };
