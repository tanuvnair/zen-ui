import { type JSX, createMemo, createSignal, For, Show } from "solid-js";
import { cn } from "../../lib/cn";

/**
 * Rating — N-star rating input (default 5). Used for feedback
 * collection: "Rate your experience".
 *
 *   const [stars, setStars] = createSignal(0);
 *   <Rating value={stars()} onValueChange={setStars} label="Rate the support agent" />
 *
 * Semantically a radiogroup so screen readers announce "1 of 5",
 * "2 of 5", etc. on arrow-key nav. Hover preview tints stars up to the
 * pointed-at index but doesn't commit until click. Click an
 * already-selected star to clear (disable via `allowClear={false}`).
 */

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Number of stars rendered. Default 5. */
  max?: number;
  /** Accessible name for the radiogroup. Required for a11y. */
  label?: string;
  /** Show "n / max" caption next to the stars. */
  showValue?: boolean;
  /** Star size. Default md (24px). */
  size?: "sm" | "md" | "lg";
  /** Click on the currently-selected star clears it. Default true. */
  allowClear?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  class?: string;
  /** Hidden input for native form submission. */
  name?: string;
}

const SIZES = { sm: 16, md: 24, lg: 32 } as const;
const GAPS = { sm: "gap-0.5", md: "gap-1", lg: "gap-1.5" } as const;

export const Rating = (props: RatingProps) => {
  const max = createMemo(() => props.max ?? 5);
  const size = createMemo(() => props.size ?? "md");
  const allowClear = createMemo(() => props.allowClear ?? true);
  const isControlled = () => props.value !== undefined;

  const [inner, setInner] = createSignal<number>(props.defaultValue ?? 0);
  const value = createMemo(() => (isControlled() ? (props.value as number) : inner()));
  const [hover, setHover] = createSignal<number>(0);

  const display = createMemo(() => hover() || value());
  const interactive = createMemo(() => !props.disabled && !props.readOnly);

  const update = (next: number) => {
    const clamped = Math.max(0, Math.min(max(), next));
    if (!isControlled()) setInner(clamped);
    props.onValueChange?.(clamped);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!interactive()) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      update(Math.min(max(), value() + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      update(Math.max(0, value() - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      update(1);
    } else if (e.key === "End") {
      e.preventDefault();
      update(max());
    }
  };

  const stars = createMemo(() => Array.from({ length: max() }, (_, i) => i + 1));

  return (
    <div
      role="radiogroup"
      aria-label={props.label}
      aria-disabled={props.disabled || undefined}
      aria-readonly={props.readOnly || undefined}
      onKeyDown={onKeyDown}
      class={cn(
        "inline-flex items-center",
        GAPS[size()],
        props.disabled && "opacity-50 cursor-not-allowed",
        props.class,
      )}
    >
      <For each={stars()}>
        {(n) => {
          const filled = createMemo(() => n <= display());
          return (
            <button
              type="button"
              role="radio"
              aria-checked={value() === n}
              aria-label={`${n} ${n === 1 ? "star" : "stars"}`}
              disabled={props.disabled}
              tabIndex={value() === n || (value() === 0 && n === 1) ? 0 : -1}
              onClick={() => {
                if (!interactive()) return;
                if (allowClear() && value() === n) update(0);
                else update(n);
              }}
              onMouseEnter={() => interactive() && setHover(n)}
              onMouseLeave={() => interactive() && setHover(0)}
              onFocus={() => interactive() && setHover(0)}
              class={cn(
                "bg-transparent border-0 p-0.5 cursor-pointer",
                "rounded-zen-sm transition-colors",
                "text-zen-border",
                filled() && "text-zen-warning",
                interactive() && "hover:text-zen-warning",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
                (props.disabled || props.readOnly) && "cursor-default",
                props.disabled && "hover:text-zen-border",
              )}
            >
              <StarIcon size={SIZES[size()]} filled={filled()} />
            </button>
          );
        }}
      </For>
      <Show when={props.showValue}>
        <span
          class={cn(
            "ml-1 text-sm font-medium tabular-nums",
            value() > 0 ? "text-zen-foreground" : "text-zen-muted-fg",
          )}
          aria-hidden
        >
          {value() > 0 ? `${value()} / ${max()}` : "—"}
        </span>
      </Show>
      <Show when={props.name}>
        <input type="hidden" name={props.name} value={value()} />
      </Show>
    </div>
  );
};

const StarIcon = (props: { size: number; filled: boolean }): JSX.Element => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill={props.filled ? "currentColor" : "none"}
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
