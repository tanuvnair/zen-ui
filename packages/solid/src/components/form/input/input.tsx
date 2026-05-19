import { type JSX, splitProps } from "solid-js";
import { cn } from "../../../lib/cn";

/**
 * Input — shadcn-style styled <input>. No built-in label / error /
 * icon scaffolding — compose those at the call site or via the Form
 * primitive.
 *
 *   <Input type="email" placeholder="you@algorisys.com" />
 */

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  const [local, rest] = splitProps(props, ["class", "type"]);
  return (
    <input
      type={local.type}
      class={cn(
        "flex h-10 w-full rounded-zen-md border border-zen-border bg-zen-background px-3 py-2 text-sm",
        "placeholder:text-zen-muted-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        local.class,
      )}
      {...rest}
    />
  );
};

export type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = (props: TextareaProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <textarea
      class={cn(
        "flex min-h-20 w-full rounded-zen-md border border-zen-border bg-zen-background px-3 py-2 text-sm",
        "placeholder:text-zen-muted-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
};
