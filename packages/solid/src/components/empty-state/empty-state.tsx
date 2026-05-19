import { type JSX, splitProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * EmptyState — surface shown when a list / table / dashboard has no
 * data yet. Compound: Icon / Title / Description / Actions.
 *
 *   <EmptyState>
 *     <EmptyStateIcon><InboxIcon /></EmptyStateIcon>
 *     <EmptyStateTitle>No invoices yet</EmptyStateTitle>
 *     <EmptyStateDescription>
 *       Create your first invoice to track revenue.
 *     </EmptyStateDescription>
 *     <EmptyStateActions>
 *       <Button>Create invoice</Button>
 *     </EmptyStateActions>
 *   </EmptyState>
 */

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center text-zen-foreground",
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

export type EmptyStateProps = VariantProps<typeof emptyStateVariants> &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string;
    children?: JSX.Element;
  };

export const EmptyState = (props: EmptyStateProps) => {
  const [local, rest] = splitProps(props, ["class", "size", "bordered", "children"]);
  return (
    <div
      role="status"
      class={cn(
        emptyStateVariants({ size: local.size, bordered: local.bordered }),
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

type DivProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};
type ParagraphProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};
type HeadingProps = Omit<JSX.HTMLAttributes<HTMLHeadingElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};

export const EmptyStateIcon = (props: DivProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      aria-hidden
      class={cn(
        "inline-flex items-center justify-center",
        "h-12 w-12 rounded-zen-full bg-zen-muted text-zen-muted-fg",
        "mb-1",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export const EmptyStateTitle = (props: HeadingProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <h3 class={cn("text-base font-semibold m-0", local.class)} {...rest}>
      {local.children}
    </h3>
  );
};

export const EmptyStateDescription = (props: ParagraphProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <p
      class={cn(
        "text-sm text-zen-muted-fg max-w-[40ch] m-0 leading-relaxed",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </p>
  );
};

export const EmptyStateActions = (props: DivProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn(
        "flex flex-wrap items-center justify-center gap-2 mt-2",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export { emptyStateVariants };
