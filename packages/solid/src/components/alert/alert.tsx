import { type JSX, splitProps, mergeProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Alert — feedback / message banner. Compound API:
 *
 *   <Alert color="info" variant="soft">
 *     <AlertIcon><InfoIcon /></AlertIcon>
 *     <AlertContent>
 *       <AlertTitle>Heads up</AlertTitle>
 *       <AlertDescription>Your trial expires in 3 days.</AlertDescription>
 *     </AlertContent>
 *     <AlertActions>
 *       <button type="button">Action</button>
 *     </AlertActions>
 *     <AlertClose onClick={dismiss} />
 *   </Alert>
 *
 * Variants:
 *   color   — destructive | info | neutral | primary | success | warning
 *   variant — soft (default) | outline
 *
 * Role="alert" announces immediately to screen readers; pass
 * `role="status"` for less-urgent messages.
 */

const alertVariants = cva(
  "relative w-full rounded-zen-md p-3 flex items-start gap-2",
  {
    variants: {
      color: {
        neutral: "",
        primary: "",
        info: "",
        success: "",
        warning: "",
        destructive: "",
      },
      variant: {
        soft: "",
        outline: "bg-zen-background",
      },
    },
    compoundVariants: [
      { variant: "soft", color: "neutral", class: "bg-zen-muted text-zen-foreground border border-zen-border" },
      { variant: "soft", color: "primary", class: "bg-zen-primary-soft text-zen-primary-soft-fg border border-zen-primary-soft" },
      { variant: "soft", color: "info", class: "bg-zen-info-soft text-zen-info-soft-fg border border-zen-info-soft" },
      { variant: "soft", color: "success", class: "bg-zen-success-soft text-zen-success-soft-fg border border-zen-success-soft" },
      { variant: "soft", color: "warning", class: "bg-zen-warning-soft text-zen-warning-soft-fg border border-zen-warning-soft" },
      { variant: "soft", color: "destructive", class: "bg-zen-error-soft text-zen-error-soft-fg border border-zen-error-soft" },
      { variant: "outline", color: "neutral", class: "border border-zen-border text-zen-foreground" },
      { variant: "outline", color: "primary", class: "border border-zen-primary text-zen-foreground" },
      { variant: "outline", color: "info", class: "border border-zen-info text-zen-foreground" },
      { variant: "outline", color: "success", class: "border border-zen-success text-zen-foreground" },
      { variant: "outline", color: "warning", class: "border border-zen-warning text-zen-foreground" },
      { variant: "outline", color: "destructive", class: "border border-zen-error text-zen-foreground" },
    ],
    defaultVariants: {
      variant: "soft",
      color: "info",
    },
  },
);

export type AlertProps = VariantProps<typeof alertVariants> &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "color" | "class"> & {
    class?: string;
    children?: JSX.Element;
  };

export const Alert = (rawProps: AlertProps) => {
  const props = mergeProps({ role: "alert" as const }, rawProps);
  const [local, rest] = splitProps(props, ["class", "color", "variant", "children"]);
  return (
    <div
      class={cn(alertVariants({ color: local.color, variant: local.variant }), local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

type SectionProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};
type ParagraphProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};
type SpanProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};

export const AlertIcon = (props: SpanProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <span
      aria-hidden
      class={cn("shrink-0 inline-flex items-center justify-center mt-0.5", local.class)}
      {...rest}
    >
      {local.children}
    </span>
  );
};

export const AlertContent = (props: SectionProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div class={cn("min-w-0 flex-1 flex flex-col gap-1", local.class)} {...rest}>
      {local.children}
    </div>
  );
};

export const AlertTitle = (props: ParagraphProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <p class={cn("font-semibold leading-tight text-sm", local.class)} {...rest}>
      {local.children}
    </p>
  );
};

export const AlertDescription = (props: ParagraphProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <p class={cn("text-sm opacity-90 leading-snug", local.class)} {...rest}>
      {local.children}
    </p>
  );
};

export const AlertActions = (props: SectionProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn("ml-auto shrink-0 flex items-center gap-4 self-center", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export type AlertCloseProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class"> & {
  class?: string;
};

export const AlertClose = (props: AlertCloseProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <button
      type="button"
      aria-label="Dismiss"
      class={cn(
        "shrink-0 inline-flex items-center justify-center h-6 w-6 rounded-zen-sm",
        "bg-transparent border-0 cursor-pointer text-current opacity-70",
        "hover:opacity-100 hover:bg-current/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
        local.class,
      )}
      {...rest}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};

export { alertVariants };
