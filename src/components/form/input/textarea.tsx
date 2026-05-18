import * as React from "react";
import { cn } from "../../../lib/cn";

/**
 * Textarea — shadcn-style. A styled <textarea> with forwardRef.
 *
 *   <Textarea placeholder="Tell us more…" rows={4} />
 */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-20 w-full rounded-zen-md border border-zen-border bg-zen-background px-3 py-2 text-sm",
        "placeholder:text-zen-muted-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
