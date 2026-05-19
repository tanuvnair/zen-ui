import { type JSX, createMemo, createSignal, splitProps } from "solid-js";
import { cn } from "../../../lib/cn";

/**
 * NumberField — shadcn-style number input with optional stepper buttons.
 *
 *   <NumberField value={n()} onValueChange={setN} min={0} max={100} />
 *
 * Buttons clamp to min/max, disabled state propagates, native keyboard
 * arrows still work. Pass `step="any"` to disable stepper logic.
 */

export type NumberFieldProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "type" | "onChange" | "onInput"
> & {
  value?: number | null;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Called with the new numeric value (null when input is cleared). */
  onValueChange?: (value: number | null) => void;
};

export const NumberField = (props: NumberFieldProps) => {
  const [local, rest] = splitProps(props, [
    "class",
    "value",
    "defaultValue",
    "min",
    "max",
    "step",
    "onValueChange",
    "disabled",
  ]);
  const step = () => local.step ?? 1;
  const isControlled = () => local.value !== undefined;

  const [inner, setInner] = createSignal<number | null>(local.defaultValue ?? null);
  const current = createMemo<number | null>(() =>
    isControlled() ? (local.value as number | null) : inner(),
  );

  const update = (next: number | null) => {
    if (!isControlled()) setInner(next);
    local.onValueChange?.(next);
  };

  const clamp = (n: number) => {
    if (typeof local.min === "number" && n < local.min) return local.min;
    if (typeof local.max === "number" && n > local.max) return local.max;
    return n;
  };

  const dec = () => {
    const base = current() ?? local.min ?? 0;
    update(clamp(base - step()));
  };
  const inc = () => {
    const base = current() ?? local.min ?? 0;
    update(clamp(base + step()));
  };

  const atMin = () =>
    typeof local.min === "number" && current() !== null && (current() as number) <= local.min;
  const atMax = () =>
    typeof local.max === "number" && current() !== null && (current() as number) >= local.max;

  return (
    <div
      class={cn(
        "inline-flex h-10 items-stretch rounded-zen-md border border-zen-border bg-zen-background overflow-hidden",
        local.disabled && "opacity-50 cursor-not-allowed",
        local.class,
      )}
    >
      <button
        type="button"
        aria-label="Decrement"
        onClick={dec}
        disabled={local.disabled || atMin()}
        class={cn(
          "px-3 text-base text-zen-foreground bg-transparent",
          "hover:bg-zen-muted disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:bg-zen-muted",
        )}
      >
        −
      </button>
      <input
        type="number"
        inputMode="decimal"
        value={current() ?? ""}
        min={local.min}
        max={local.max}
        step={step()}
        disabled={local.disabled}
        onInput={(e) => {
          const v = e.currentTarget.value;
          if (v === "") {
            update(null);
            return;
          }
          const n = Number(v);
          if (Number.isFinite(n)) update(clamp(n));
        }}
        class={cn(
          "min-w-0 flex-1 text-center text-sm bg-transparent",
          "border-x border-zen-border",
          "focus:outline-none focus-visible:bg-zen-primary-soft",
          "disabled:cursor-not-allowed",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        )}
        {...rest}
      />
      <button
        type="button"
        aria-label="Increment"
        onClick={inc}
        disabled={local.disabled || atMax()}
        class={cn(
          "px-3 text-base text-zen-foreground bg-transparent",
          "hover:bg-zen-muted disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:bg-zen-muted",
        )}
      >
        +
      </button>
    </div>
  );
};
