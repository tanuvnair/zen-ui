import { type JSX, splitProps, Show } from "solid-js";
import { Checkbox as KCheckbox } from "@kobalte/core/checkbox";
import { cn } from "../../../lib/cn";

/**
 * Checkbox — Solid port built on Kobalte's Checkbox primitive.
 *
 *   <Checkbox checked={value()} onChange={setValue} />
 *   <Checkbox indeterminate />
 *
 * Kobalte exposes both `checked` and `indeterminate` props natively (no
 * DOM ref-poking), keyboard activation (space), and ARIA. Themed via
 * --zen-* tokens.
 */

export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxProps = {
  size?: CheckboxSize;
  class?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  /** Optional inline label rendered to the right of the box. */
  label?: JSX.Element;
};

const BOX_SIZES: Record<CheckboxSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export const Checkbox = (props: CheckboxProps) => {
  const [local] = splitProps(props, [
    "class",
    "size",
    "checked",
    "defaultChecked",
    "indeterminate",
    "onChange",
    "disabled",
    "required",
    "name",
    "value",
    "label",
  ]);
  return (
    <KCheckbox
      checked={local.checked}
      defaultChecked={local.defaultChecked}
      indeterminate={local.indeterminate}
      onChange={local.onChange}
      disabled={local.disabled}
      required={local.required}
      name={local.name}
      value={local.value}
      class={cn("inline-flex items-center gap-2", local.class)}
    >
      <KCheckbox.Input class="sr-only" />
      <KCheckbox.Control
        class={cn(
          "peer shrink-0 rounded-zen-sm border border-zen-border bg-zen-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          "data-[checked]:bg-zen-primary data-[checked]:border-zen-primary data-[checked]:text-zen-primary-fg",
          "data-[indeterminate]:bg-zen-primary data-[indeterminate]:border-zen-primary data-[indeterminate]:text-zen-primary-fg",
          BOX_SIZES[local.size ?? "md"],
        )}
      >
        <KCheckbox.Indicator class="flex items-center justify-center text-current h-full w-full">
          <Show when={local.indeterminate} fallback={<CheckIcon />}>
            <DashIcon />
          </Show>
        </KCheckbox.Indicator>
      </KCheckbox.Control>
      {local.label ? <KCheckbox.Label class="text-sm">{local.label}</KCheckbox.Label> : null}
    </KCheckbox>
  );
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="100%" height="100%">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const DashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" width="100%" height="100%">
    <line x1="6" y1="12" x2="18" y2="12" />
  </svg>
);
