import { type JSX, splitProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Card — generic surface primitive. Compound API for the common
 * Header / Content / Footer layout, every part opt-in.
 *
 *   <Card>
 *     <CardHeader>
 *       <CardTitle>Account</CardTitle>
 *       <CardDescription>Your billing + contact info.</CardDescription>
 *     </CardHeader>
 *     <CardContent>…</CardContent>
 *     <CardFooter><Button>Save</Button></CardFooter>
 *   </Card>
 */

const cardVariants = cva(
  "rounded-zen-md border bg-zen-background text-zen-foreground",
  {
    variants: {
      variant: {
        elevated: "border-zen-border shadow-zen-sm",
        outlined: "border-zen-border",
        ghost: "border-transparent",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "outlined",
      padding: "none",
    },
  },
);

export type CardProps = VariantProps<typeof cardVariants> &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string;
    children?: JSX.Element;
  };

export const Card = (props: CardProps) => {
  const [local, rest] = splitProps(props, ["class", "variant", "padding", "children"]);
  return (
    <div
      class={cn(cardVariants({ variant: local.variant, padding: local.padding }), local.class)}
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

export const CardHeader = (props: SectionProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div class={cn("flex flex-col gap-1 p-5 pb-3", local.class)} {...rest}>
      {local.children}
    </div>
  );
};

type TitleProps = Omit<JSX.HTMLAttributes<HTMLHeadingElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};

export const CardTitle = (props: TitleProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <h3
      class={cn("text-base font-semibold leading-tight m-0 text-zen-foreground", local.class)}
      {...rest}
    >
      {local.children}
    </h3>
  );
};

type ParagraphProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "class"> & {
  class?: string;
  children?: JSX.Element;
};

export const CardDescription = (props: ParagraphProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <p class={cn("text-sm text-zen-muted-fg m-0", local.class)} {...rest}>
      {local.children}
    </p>
  );
};

export const CardContent = (props: SectionProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div class={cn("p-5 pt-0", local.class)} {...rest}>
      {local.children}
    </div>
  );
};

export const CardFooter = (props: SectionProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn("flex items-center gap-2 p-5 pt-3 border-t border-zen-border", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export { cardVariants };
