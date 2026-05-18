import * as React from "react";
import { cn } from "../../../lib/cn";

/**
 * Input — shadcn-style. A styled <input> with forwardRef.
 *
 *   <Input type="email" placeholder="you@algorisys.com" />
 *
 * No built-in label / error / icon scaffolding — compose those at the call
 * site (or via the Form primitive).
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-zen-md border border-zen-border bg-zen-background px-3 py-2 text-sm",
        "placeholder:text-zen-muted-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
