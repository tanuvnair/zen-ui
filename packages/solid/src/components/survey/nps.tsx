import { createMemo, createSignal, For, Show } from "solid-js";
import { cn } from "../../lib/cn";

/**
 * NPS — Net Promoter Score input. The canonical 0–10 "would you
 * recommend us?" strip with promoter / detractor cues.
 *
 *   const [score, setScore] = createSignal<number | undefined>();
 *   <NPS value={score()} onValueChange={setScore} />
 *
 * Score buckets follow the standard NPS definition:
 *   - 0–6 detractors  → tinted with error-soft
 *   - 7–8 passives    → tinted with warning-soft
 *   - 9–10 promoters  → tinted with success-soft
 *
 * Semantically a radiogroup — keyboard nav (arrows + Home/End) for free.
 */

export interface NPSProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  label?: string;
  lowLabel?: string;
  highLabel?: string;
  disabled?: boolean;
  readOnly?: boolean;
  class?: string;
  name?: string;
  showBucket?: boolean;
}

type Bucket = "detractor" | "passive" | "promoter";

const bucketOf = (n: number): Bucket =>
  n <= 6 ? "detractor" : n <= 8 ? "passive" : "promoter";

const bucketLabel: Record<Bucket, string> = {
  detractor: "Detractor",
  passive: "Passive",
  promoter: "Promoter",
};

export const NPS = (props: NPSProps) => {
  const isControlled = () => props.value !== undefined;
  const [inner, setInner] = createSignal<number | undefined>(props.defaultValue);
  const value = createMemo<number | undefined>(() =>
    isControlled() ? props.value : inner(),
  );
  const interactive = createMemo(() => !props.disabled && !props.readOnly);
  const showBucket = createMemo(() => props.showBucket ?? true);

  const update = (next: number) => {
    if (!isControlled()) setInner(next);
    props.onValueChange?.(next);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!interactive()) return;
    const v = value();
    if (v === undefined) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      update(Math.min(10, v + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      update(Math.max(0, v - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      update(0);
    } else if (e.key === "End") {
      e.preventDefault();
      update(10);
    }
  };

  const scores = Array.from({ length: 11 }, (_, i) => i);
  const lowLabel = () => props.lowLabel ?? "Not at all likely";
  const highLabel = () => props.highLabel ?? "Extremely likely";

  return (
    <div
      role="radiogroup"
      aria-label={props.label ?? "How likely are you to recommend us?"}
      aria-disabled={props.disabled || undefined}
      aria-readonly={props.readOnly || undefined}
      onKeyDown={onKeyDown}
      class={cn(
        "inline-flex flex-col gap-2",
        props.disabled && "opacity-50",
        props.class,
      )}
    >
      <div class="flex items-center gap-1">
        <For each={scores}>
          {(n) => {
            const selected = createMemo(() => value() === n);
            const bucket = bucketOf(n);
            return (
              <button
                type="button"
                role="radio"
                aria-checked={selected()}
                aria-label={`${n}${
                  n === 0
                    ? " — " + lowLabel()
                    : n === 10
                      ? " — " + highLabel()
                      : ""
                }`}
                disabled={props.disabled}
                tabIndex={selected() || (value() === undefined && n === 0) ? 0 : -1}
                onClick={() => interactive() && update(n)}
                class={cn(
                  "h-9 min-w-9 px-2",
                  "inline-flex items-center justify-center",
                  "text-sm font-medium tabular-nums",
                  "rounded-zen-sm border cursor-pointer transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
                  // unselected — soft bucket tint
                  !selected() && "bg-zen-background",
                  !selected() &&
                    bucket === "detractor" &&
                    "border-zen-error-soft text-zen-error-soft-fg hover:bg-zen-error-soft",
                  !selected() &&
                    bucket === "passive" &&
                    "border-zen-warning-soft text-zen-warning-soft-fg hover:bg-zen-warning-soft",
                  !selected() &&
                    bucket === "promoter" &&
                    "border-zen-success-soft text-zen-success-soft-fg hover:bg-zen-success-soft",
                  // selected — saturated bucket fill
                  selected() && bucket === "detractor" &&
                    "bg-zen-error text-zen-error-fg border-zen-error",
                  selected() && bucket === "passive" &&
                    "bg-zen-warning text-zen-warning-fg border-zen-warning",
                  selected() && bucket === "promoter" &&
                    "bg-zen-success text-zen-success-fg border-zen-success",
                  (props.disabled || props.readOnly) && "cursor-default",
                  props.disabled && "hover:!bg-zen-background",
                )}
              >
                {n}
              </button>
            );
          }}
        </For>
      </div>
      <div class="flex justify-between text-xs text-zen-muted-fg px-1">
        <span>{lowLabel()}</span>
        <span>{highLabel()}</span>
      </div>
      <Show when={showBucket() && value() !== undefined}>
        {(_) => {
          const v = value() as number;
          return (
            <p
              class={cn(
                "text-xs mt-1 m-0 font-medium",
                bucketOf(v) === "detractor" && "text-zen-error",
                bucketOf(v) === "passive" && "text-zen-warning-soft-fg",
                bucketOf(v) === "promoter" && "text-zen-success",
              )}
              aria-live="polite"
            >
              {v} · {bucketLabel[bucketOf(v)]}
            </p>
          );
        }}
      </Show>
      <Show when={props.name && value() !== undefined}>
        <input type="hidden" name={props.name} value={value()} />
      </Show>
    </div>
  );
};
