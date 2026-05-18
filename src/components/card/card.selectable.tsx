import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/cn";

/**
 * SelectableCard — radio-as-a-card pattern for onboarding "pick one"
 * questions (goal picker, plan picker, use-case picker). Selectable
 * cards consistently outperform classic radio lists for these
 * questions: bigger tap targets, room for icon + description,
 * decision-feel rather than option-feel.
 *
 *   <SelectableCardGroup value={goal} onValueChange={setGoal}>
 *     <SelectableCard value="invoice" title="Send invoices" icon={<I />}>
 *       Bill customers and track payments.
 *     </SelectableCard>
 *     <SelectableCard value="track" title="Track expenses" icon={<E />}>
 *       Log receipts and categorize spending.
 *     </SelectableCard>
 *   </SelectableCardGroup>
 *
 * Built on Radix RadioGroup so:
 *   - exactly-one selection, native radio-group keyboard nav (arrows +
 *     Home/End), proper form submission semantics,
 *   - controlled (`value` + `onValueChange`) or uncontrolled
 *     (`defaultValue`) state,
 *   - `disabled` works per-item or at the group level.
 *
 * The underlying `<input type="radio">` is visually hidden (Radix's
 * RadioGroupItem renders a button — we wrap its label so the whole
 * card surface is the click target).
 */

const SelectableCardGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-3", className)}
    {...props}
  />
));
SelectableCardGroup.displayName = "SelectableCardGroup";

export interface SelectableCardProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    "children" | "title"
  > {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  /** Trailing badge slot (top-right) — typically a Badge with
   *  "Most popular" / "Best value" / "5+ users" style copy. */
  badge?: React.ReactNode;
  children?: React.ReactNode;
}

const SelectableCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  SelectableCardProps
>(({ className, title, icon, badge, children, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "group relative w-full text-left",
      "rounded-zen-md border-2 border-zen-border bg-zen-background",
      "p-4 cursor-pointer transition-colors",
      /* hover (only when not selected and not disabled) */
      "hover:border-zen-muted-fg",
      /* selected state — primary ring + soft tint */
      "data-[state=checked]:border-zen-primary data-[state=checked]:bg-zen-primary-soft",
      /* disabled */
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-zen-border",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  >
    {/* Top row: icon + title (+ optional badge) + check indicator */}
    <div className="flex items-start gap-3">
      {icon ? (
        <span
          aria-hidden
          className={cn(
            "inline-flex items-center justify-center flex-shrink-0",
            "h-8 w-8 rounded-zen-sm",
            "bg-zen-muted text-zen-muted-fg",
            "group-data-[state=checked]:bg-zen-primary group-data-[state=checked]:text-zen-primary-fg",
          )}
        >
          {icon}
        </span>
      ) : null}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {title ? (
            <span className="text-sm font-semibold text-zen-foreground">
              {title}
            </span>
          ) : null}
          {badge ? <span className="ml-auto">{badge}</span> : null}
        </div>
        {children ? (
          <div className="text-xs text-zen-muted-fg mt-1 leading-relaxed">
            {children}
          </div>
        ) : null}
      </div>
    </div>

    {/* Top-right check indicator — only visible when selected. */}
    <RadioGroupPrimitive.Indicator
      className={cn(
        "absolute top-2.5 right-2.5",
        "inline-flex items-center justify-center",
        "h-5 w-5 rounded-zen-full",
        "bg-zen-primary text-zen-primary-fg",
      )}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
SelectableCard.displayName = "SelectableCard";

export { SelectableCard, SelectableCardGroup };
