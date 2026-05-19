import { splitProps, Show } from "solid-js";
import { Select as KSelect } from "@kobalte/core/select";
import { cn } from "../../../lib/cn";

/**
 * Select — Solid port built on Kobalte Select.
 *
 *   <Select
 *     options={[
 *       { value: "a", label: "Option A" },
 *       { value: "b", label: "Option B" },
 *     ]}
 *     value={v()}
 *     onChange={setV}
 *     placeholder="Pick one"
 *   />
 *
 * API delta from the React (Radix) binding: Kobalte Select is
 * data-driven — pass an `options` array instead of composing
 * <SelectItem> children manually. For the rare case where you need
 * the full compound API (groups, custom item rendering), Kobalte's
 * own Select.Item / Section primitives are re-exported as
 * SelectGroup, SelectItemPrimitive, etc. (advanced users).
 */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  class?: string;
  /** Optional accessible label rendered above the trigger. */
  label?: string;
  /** Optional error message shown below the trigger. */
  errorMessage?: string;
};

export const Select = (props: SelectProps) => {
  const [local] = splitProps(props, [
    "options",
    "value",
    "defaultValue",
    "onChange",
    "placeholder",
    "disabled",
    "required",
    "name",
    "class",
    "label",
    "errorMessage",
  ]);

  return (
    <KSelect<SelectOption>
      options={local.options}
      optionValue="value"
      optionTextValue="label"
      optionDisabled="disabled"
      value={local.options.find((o) => o.value === local.value) ?? null}
      defaultValue={local.options.find((o) => o.value === local.defaultValue) ?? undefined}
      onChange={(opt) => local.onChange?.(opt?.value ?? null)}
      placeholder={local.placeholder}
      disabled={local.disabled}
      required={local.required}
      name={local.name}
      validationState={local.errorMessage ? "invalid" : "valid"}
      itemComponent={(itemProps) => (
        <KSelect.Item
          item={itemProps.item}
          class={cn(
            "relative flex cursor-default select-none items-center rounded-zen-sm py-1.5 pl-8 pr-2 text-sm outline-none",
            "data-[highlighted]:bg-zen-muted",
            "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          )}
        >
          <KSelect.ItemIndicator class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <CheckIcon />
          </KSelect.ItemIndicator>
          <KSelect.ItemLabel>{itemProps.item.rawValue.label}</KSelect.ItemLabel>
        </KSelect.Item>
      )}
      class={local.class}
    >
      <Show when={local.label}>
        <KSelect.Label class="text-sm font-medium text-zen-foreground block mb-1">
          {local.label}
        </KSelect.Label>
      </Show>
      <KSelect.HiddenSelect />
      <KSelect.Trigger
        class={cn(
          "flex items-center justify-between gap-2 h-10 px-3 w-full",
          "rounded-zen-md border border-zen-border bg-zen-background text-sm text-zen-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          "data-[invalid]:border-zen-error",
        )}
      >
        <KSelect.Value<SelectOption> class="truncate">
          {(state) => state.selectedOption()?.label ?? null}
        </KSelect.Value>
        <KSelect.Icon class="text-zen-muted-fg">
          <ChevronDown />
        </KSelect.Icon>
      </KSelect.Trigger>
      <Show when={local.errorMessage}>
        <KSelect.ErrorMessage class="text-xs text-zen-error mt-1">
          {local.errorMessage}
        </KSelect.ErrorMessage>
      </Show>
      <KSelect.Portal>
        <KSelect.Content
          class={cn(
            "z-50 min-w-32 overflow-hidden",
            "rounded-zen-md border bg-zen-background p-1 text-zen-foreground shadow-md",
          )}
        >
          <KSelect.Listbox class="overflow-y-auto max-h-72" />
        </KSelect.Content>
      </KSelect.Portal>
    </KSelect>
  );
};

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
