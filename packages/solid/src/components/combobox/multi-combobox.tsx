import { For, Show, createMemo, createSignal, splitProps } from "solid-js";
import { Combobox as KCombobox } from "@kobalte/core/combobox";
import { cn } from "../../lib/cn";
import type { ComboboxOption } from "./combobox";

/**
 * MultiCombobox — searchable multi-select built on Kobalte Combobox
 * with `multiple`. Selected values render as removable chips inside the
 * trigger.
 *
 *   const [picks, setPicks] = createSignal<string[]>([]);
 *   <MultiCombobox
 *     options={…}
 *     value={picks()}
 *     onValueChange={setPicks}
 *     placeholder="Pick some"
 *   />
 */

export type MultiComboboxProps = {
  options?: ComboboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  width?: number | string;
  disabled?: boolean;
  class?: string;
};

export const MultiCombobox = (rawProps: MultiComboboxProps) => {
  const [props] = splitProps(rawProps, [
    "options",
    "value",
    "defaultValue",
    "onValueChange",
    "placeholder",
    "searchPlaceholder",
    "emptyMessage",
    "width",
    "disabled",
    "class",
  ]);

  const isControlled = () => props.value !== undefined;
  const [internalValues, setInternalValues] = createSignal<string[]>(
    props.defaultValue ?? [],
  );
  const selectedValues = createMemo<string[]>(() =>
    isControlled() ? (props.value as string[]) : internalValues(),
  );
  const selectedOptions = createMemo<ComboboxOption[]>(() => {
    const set = new Set(selectedValues());
    return (props.options ?? []).filter((o) => set.has(o.value));
  });

  const setValues = (next: string[]) => {
    if (!isControlled()) setInternalValues(next);
    props.onValueChange?.(next);
  };

  const remove = (v: string) => setValues(selectedValues().filter((x) => x !== v));

  return (
    <KCombobox<ComboboxOption, ComboboxOption>
      multiple
      options={props.options ?? []}
      optionValue="value"
      optionTextValue="label"
      optionLabel="label"
      optionDisabled="disabled"
      value={selectedOptions()}
      onChange={(opts) => setValues((opts ?? []).map((o) => o.value))}
      disabled={props.disabled}
      placeholder={props.placeholder ?? "Select…"}
      itemComponent={(itemProps) => (
        <KCombobox.Item
          item={itemProps.item}
          class={cn(
            "zen-relative zen-flex zen-cursor-default zen-select-none zen-items-center zen-rounded-zen-sm zen-py-1.5 zen-pl-8 zen-pr-2 zen-text-sm zen-outline-none",
            "data-[highlighted]:zen-bg-zen-muted",
            "data-[disabled]:zen-pointer-events-none data-[disabled]:zen-opacity-50",
          )}
        >
          <KCombobox.ItemIndicator class="zen-absolute zen-left-2 zen-flex zen-h-3.5 zen-w-3.5 zen-items-center zen-justify-center">
            <CheckIcon />
          </KCombobox.ItemIndicator>
          <KCombobox.ItemLabel>{itemProps.item.rawValue.label}</KCombobox.ItemLabel>
        </KCombobox.Item>
      )}
      class={props.class}
    >
      <KCombobox.Control<ComboboxOption>
        class={cn(
          "zen-inline-flex zen-flex-wrap zen-items-center zen-gap-1 zen-min-h-10 zen-px-2 zen-py-1",
          "zen-rounded-zen-md zen-border zen-border-zen-border zen-bg-zen-background",
          "focus-within:zen-outline-none focus-within:zen-ring-2 focus-within:zen-ring-zen-ring focus-within:zen-ring-offset-2",
        )}
        style={{ width: typeof props.width === "number" ? `${props.width}px` : (props.width ?? "320px") }}
      >
        <For each={selectedOptions()}>
          {(opt) => (
            <span
              class={cn(
                "zen-inline-flex zen-items-center zen-gap-1 zen-px-2 zen-py-0.5 zen-text-xs zen-font-medium",
                "zen-rounded-zen-full zen-bg-zen-primary-soft zen-text-zen-primary-soft-fg",
              )}
            >
              <span>{opt.label}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(opt.value);
                }}
                aria-label={`Remove ${opt.label}`}
                class="zen-inline-flex zen-items-center zen-justify-center zen-h-4 zen-w-4 zen-rounded-zen-full zen-bg-transparent zen-border-0 zen-cursor-pointer zen-opacity-70 hover:zen-opacity-100"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          )}
        </For>
        <KCombobox.Input
          class="zen-flex-1 zen-min-w-[6rem] zen-bg-transparent zen-border-0 zen-outline-none zen-text-sm placeholder:zen-text-zen-muted-fg"
          placeholder={
            selectedValues().length === 0
              ? (props.searchPlaceholder ?? "Search…")
              : ""
          }
        />
        <KCombobox.Trigger class="zen-bg-transparent zen-border-0 zen-cursor-pointer zen-text-zen-muted-fg">
          <KCombobox.Icon>
            <ChevronDown />
          </KCombobox.Icon>
        </KCombobox.Trigger>
      </KCombobox.Control>
      <KCombobox.Portal>
        <KCombobox.Content
          class={cn(
            "zen-z-50 zen-min-w-44 zen-overflow-hidden zen-rounded-zen-md zen-border zen-bg-zen-background zen-p-1 zen-text-zen-foreground zen-shadow-md",
          )}
        >
          <KCombobox.Listbox class="zen-max-h-72 zen-overflow-y-auto" />
          <Show when={(props.options ?? []).length === 0}>
            <div class="zen-py-1.5 zen-px-2 zen-text-sm zen-text-zen-muted-fg">
              {props.emptyMessage ?? "No results."}
            </div>
          </Show>
        </KCombobox.Content>
      </KCombobox.Portal>
    </KCombobox>
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
