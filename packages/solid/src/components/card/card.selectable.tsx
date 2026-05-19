import { type JSX, splitProps } from "solid-js";
import { RadioGroup as KRadioGroup } from "@kobalte/core/radio-group";
import { cn } from "../../lib/cn";

/**
 * SelectableCard — radio-as-a-card pattern for onboarding "pick one"
 * questions (goal picker, plan picker, use-case picker). Solid port
 * built on Kobalte's RadioGroup.
 *
 *   <SelectableCardGroup value={goal()} onValueChange={setGoal}>
 *     <SelectableCard value="invoice" title="Send invoices" icon={<I />}>
 *       Bill customers and track payments.
 *     </SelectableCard>
 *     <SelectableCard value="track" title="Track expenses" icon={<E />}>
 *       Log receipts and categorize spending.
 *     </SelectableCard>
 *   </SelectableCardGroup>
 *
 * Kobalte handles exactly-one selection, full keyboard nav (arrows +
 * Home/End), and form submission semantics via a hidden radio input.
 *
 * API delta from the React (Radix) binding: the prop is `onValueChange`
 * on the React side; in Solid we use `onChange` to match Kobalte's
 * idiom across the rest of the binding. Both forms are accepted.
 */

export type SelectableCardGroupProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Alias for onChange, for parity with the React `onValueChange` name. */
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  orientation?: "horizontal" | "vertical";
  class?: string;
  children?: JSX.Element;
};

export const SelectableCardGroup = (props: SelectableCardGroupProps) => {
  const [local] = splitProps(props, [
    "value",
    "defaultValue",
    "onChange",
    "onValueChange",
    "name",
    "disabled",
    "required",
    "orientation",
    "class",
    "children",
  ]);
  return (
    <KRadioGroup
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={(v) => {
        local.onChange?.(v);
        local.onValueChange?.(v);
      }}
      name={local.name}
      disabled={local.disabled}
      required={local.required}
      orientation={local.orientation}
      class={cn("grid gap-3", local.class)}
    >
      {local.children}
    </KRadioGroup>
  );
};

export type SelectableCardProps = {
  value: string;
  title?: JSX.Element;
  icon?: JSX.Element;
  /** Trailing badge slot (top-right) — typically a Badge component with
   *  "Most popular" / "Best value" / "5+ users" style copy. */
  badge?: JSX.Element;
  children?: JSX.Element;
  disabled?: boolean;
  class?: string;
};

export const SelectableCard = (props: SelectableCardProps) => {
  const [local] = splitProps(props, [
    "value",
    "title",
    "icon",
    "badge",
    "children",
    "disabled",
    "class",
  ]);
  return (
    <KRadioGroup.Item
      value={local.value}
      disabled={local.disabled}
      class={cn(
        "group relative w-full text-left",
        "rounded-zen-md border-2 border-zen-border bg-zen-background",
        "p-4 cursor-pointer transition-colors",
        // hover (only when not selected and not disabled)
        "hover:border-zen-muted-fg",
        // selected — primary ring + soft tint (Kobalte uses data-checked)
        "data-[checked]:border-zen-primary data-[checked]:bg-zen-primary-soft",
        // disabled
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[disabled]:hover:border-zen-border",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-zen-ring focus-within:ring-offset-2",
        local.class,
      )}
    >
      <KRadioGroup.ItemInput class="sr-only" />
      <KRadioGroup.ItemControl class="contents">
        {/* Top row: icon + title (+ optional badge) */}
        <div class="flex items-start gap-3">
          {local.icon ? (
            <span
              aria-hidden
              class={cn(
                "inline-flex items-center justify-center flex-shrink-0",
                "h-8 w-8 rounded-zen-sm",
                "bg-zen-muted text-zen-muted-fg",
                "group-data-[checked]:bg-zen-primary group-data-[checked]:text-zen-primary-fg",
              )}
            >
              {local.icon}
            </span>
          ) : null}
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              {local.title ? (
                <KRadioGroup.ItemLabel class="text-sm font-semibold text-zen-foreground">
                  {local.title}
                </KRadioGroup.ItemLabel>
              ) : null}
              {local.badge ? <span class="ml-auto">{local.badge}</span> : null}
            </div>
            {local.children ? (
              <div class="text-xs text-zen-muted-fg mt-1 leading-relaxed">
                {local.children}
              </div>
            ) : null}
          </div>
        </div>

        {/* Top-right check indicator — only visible when selected. */}
        <KRadioGroup.ItemIndicator
          class={cn(
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
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </KRadioGroup.ItemIndicator>
      </KRadioGroup.ItemControl>
    </KRadioGroup.Item>
  );
};
