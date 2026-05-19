import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * NPS — Net Promoter Score input. The canonical "How likely are you to
 * recommend us to a friend?" question rendered as an 0–10 strip with
 * promoter / detractor cues.
 *
 *   const [score, setScore] = useState<number | undefined>();
 *   <NPS value={score} onValueChange={setScore} />
 *
 * Score buckets follow the standard NPS definition:
 *   - 0–6 detractors  → tinted with destructive-soft
 *   - 7–8 passives    → tinted with warning-soft
 *   - 9–10 promoters  → tinted with success-soft
 *
 * The selected score gets the saturated equivalent of its bucket.
 * Below the strip, low/high anchor labels surface the meaning of the
 * extremes (override via `lowLabel` / `highLabel`).
 *
 * Semantically a radiogroup with one radio per integer — full
 * keyboard nav (arrows + Home/End) comes for free.
 */

export interface NPSProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Accessible name for the radiogroup. Default question copy. */
  label?: string;
  /** Anchor label under the leftmost button. Default "Not at all likely". */
  lowLabel?: string;
  /** Anchor label under the rightmost button. Default "Extremely likely". */
  highLabel?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  /** Optional hidden input name for native form submission. */
  name?: string;
  /** Show the score-bucket caption ("You're a Promoter") under the
   *  selection. Default true. */
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

export const NPS = React.forwardRef<HTMLDivElement, NPSProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      label = "How likely are you to recommend us?",
      lowLabel = "Not at all likely",
      highLabel = "Extremely likely",
      disabled,
      readOnly,
      className,
      name,
      showBucket = true,
    },
    ref,
  ) => {
    const [inner, setInner] = React.useState<number | undefined>(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : inner;
    const interactive = !disabled && !readOnly;

    const update = (next: number) => {
      if (!isControlled) setInner(next);
      onValueChange?.(next);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!interactive) return;
      if (value === undefined) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        update(Math.min(10, value + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        update(Math.max(0, value - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        update(0);
      } else if (e.key === "End") {
        e.preventDefault();
        update(10);
      }
    };

    const scores = Array.from({ length: 11 }, (_, i) => i);

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={label}
        aria-disabled={disabled || undefined}
        aria-readonly={readOnly || undefined}
        onKeyDown={onKeyDown}
        className={cn(
          "inline-flex flex-col gap-2",
          disabled && "opacity-50",
          className,
        )}
      >
        <div className="flex items-center gap-1">
          {scores.map((n) => {
            const selected = value === n;
            const bucket = bucketOf(n);
            return (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${n}${
                  n === 0 ? " — " + lowLabel : n === 10 ? " — " + highLabel : ""
                }`}
                disabled={disabled}
                tabIndex={selected || (value === undefined && n === 0) ? 0 : -1}
                onClick={() => interactive && update(n)}
                className={cn(
                  "h-9 min-w-9 px-2",
                  "inline-flex items-center justify-center",
                  "text-sm font-medium tabular-nums",
                  "rounded-zen-sm border cursor-pointer transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
                  /* unselected — soft bucket tint */
                  !selected && [
                    "bg-zen-background",
                    bucket === "detractor" &&
                      "border-zen-error-soft text-zen-error-soft-fg hover:bg-zen-error-soft",
                    bucket === "passive" &&
                      "border-zen-warning-soft text-zen-warning-soft-fg hover:bg-zen-warning-soft",
                    bucket === "promoter" &&
                      "border-zen-success-soft text-zen-success-soft-fg hover:bg-zen-success-soft",
                  ],
                  /* selected — saturated bucket fill */
                  selected && [
                    bucket === "detractor" &&
                      "bg-zen-error text-zen-error-fg border-zen-error",
                    bucket === "passive" &&
                      "bg-zen-warning text-zen-warning-fg border-zen-warning",
                    bucket === "promoter" &&
                      "bg-zen-success text-zen-success-fg border-zen-success",
                  ],
                  (disabled || readOnly) && "cursor-default",
                  disabled && "hover:!bg-zen-background",
                )}
              >
                {n}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-zen-muted-fg px-1">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
        {showBucket && value !== undefined ? (
          <p
            className={cn(
              "text-xs mt-1 m-0 font-medium",
              bucketOf(value) === "detractor" && "text-zen-error",
              bucketOf(value) === "passive" && "text-zen-warning-soft-fg",
              bucketOf(value) === "promoter" && "text-zen-success",
            )}
            aria-live="polite"
          >
            {value} · {bucketLabel[bucketOf(value)]}
          </p>
        ) : null}
        {name && value !== undefined ? (
          <input type="hidden" name={name} value={value} />
        ) : null}
      </div>
    );
  },
);
NPS.displayName = "NPS";
