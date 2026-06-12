import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Likert — n-point agree/disagree scale. The third leg of the survey
 * triplet (Rating · NPS · Likert), used for attitudinal questions:
 *
 *   "The onboarding was easy to follow."
 *     ◉ Strongly disagree   ○ Disagree   ○ Neutral   ○ Agree   ○ Strongly agree
 *
 *   const [answer, setAnswer] = useState<string | undefined>();
 *   <Likert
 *     value={answer}
 *     onValueChange={setAnswer}
 *     question="The onboarding was easy to follow."
 *   />
 *
 * Defaults to the standard 5-point Strongly disagree → Strongly agree
 * scale. Override `options` for variants (3-point, 7-point, frequency
 * scales like Never → Always, importance scales like Not important →
 * Critical, etc.).
 *
 * Two layouts:
 *   - "segmented" (default) — horizontal connected pill strip with
 *     short labels. Compact; fits inline questionnaires.
 *   - "stacked" — vertical list with radio button + label per row.
 *     More readable; better for long option labels and accessibility
 *     in narrow viewports.
 *
 * Semantically a radiogroup. Optional `question` prop renders the
 * question itself above the scale and becomes the radiogroup's
 * accessible name.
 */

export interface LikertOption {
  value: string;
  label: string;
  /** Short label used by the segmented layout when the full label is
   *  too long. Falls back to label. */
  shortLabel?: string;
}

const DEFAULT_OPTIONS: LikertOption[] = [
  { value: "strongly_disagree", label: "Strongly disagree", shortLabel: "SD" },
  { value: "disagree", label: "Disagree", shortLabel: "D" },
  { value: "neutral", label: "Neutral", shortLabel: "N" },
  { value: "agree", label: "Agree", shortLabel: "A" },
  { value: "strongly_agree", label: "Strongly agree", shortLabel: "SA" },
];

export interface LikertProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Renders above the scale + becomes the accessible name. */
  question?: string;
  /** Custom option set. Defaults to the 5-point Strongly disagree →
   *  Strongly agree scale. */
  options?: LikertOption[];
  /** "segmented" (default) — connected pill strip, short labels.
   *  "stacked"  — vertical list, full radio + label per row. */
  layout?: "segmented" | "stacked";
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  /** Hidden input name for native form submission. */
  name?: string;
}

export const Likert = React.forwardRef<HTMLDivElement, LikertProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      question,
      options = DEFAULT_OPTIONS,
      layout = "segmented",
      disabled,
      readOnly,
      className,
      name,
    },
    ref,
  ) => {
    const [inner, setInner] = React.useState<string | undefined>(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : inner;
    const interactive = !disabled && !readOnly;

    const update = (next: string) => {
      if (!isControlled) setInner(next);
      onValueChange?.(next);
    };

    const currentIndex = options.findIndex((o) => o.value === value);
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!interactive) return;
      if (currentIndex < 0) return;
      const forward = layout === "stacked" ? "ArrowDown" : "ArrowRight";
      const back = layout === "stacked" ? "ArrowUp" : "ArrowLeft";
      if (e.key === forward) {
        e.preventDefault();
        const next = options[Math.min(options.length - 1, currentIndex + 1)];
        update(next.value);
      } else if (e.key === back) {
        e.preventDefault();
        const next = options[Math.max(0, currentIndex - 1)];
        update(next.value);
      } else if (e.key === "Home") {
        e.preventDefault();
        update(options[0].value);
      } else if (e.key === "End") {
        e.preventDefault();
        update(options[options.length - 1].value);
      }
    };

    const inputName = name;

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2 max-w-full", className)}
      >
        {question ? (
          <p className="text-sm font-medium text-zen-foreground m-0">
            {question}
          </p>
        ) : null}
        <div
          role="radiogroup"
          aria-label={question}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          onKeyDown={onKeyDown}
          className={cn(
            layout === "segmented"
              ? // scroll the scale horizontally on narrow widths (keep corner clip vertically)
                "flex max-w-full items-stretch rounded-zen-md border border-zen-border overflow-x-auto overflow-y-hidden bg-zen-background"
              : "flex flex-col gap-1",
            disabled && "opacity-50",
          )}
        >
          {options.map((opt, i) => {
            const selected = value === opt.value;
            const isFirst = i === 0;
            const isLast = i === options.length - 1;
            if (layout === "stacked") {
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={disabled}
                  tabIndex={
                    selected || (currentIndex < 0 && i === 0) ? 0 : -1
                  }
                  onClick={() => interactive && update(opt.value)}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded-zen-sm",
                    "bg-transparent border-0 text-left text-sm cursor-pointer",
                    "transition-colors",
                    interactive && "hover:bg-zen-muted",
                    selected && "bg-zen-primary-soft text-zen-primary-soft-fg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
                    (disabled || readOnly) && "cursor-default",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "inline-flex items-center justify-center",
                      "h-4 w-4 rounded-zen-full border",
                      selected
                        ? "border-zen-primary bg-zen-primary"
                        : "border-zen-border bg-zen-background",
                    )}
                  >
                    {selected ? (
                      <span className="h-1.5 w-1.5 rounded-zen-full bg-zen-primary-fg" />
                    ) : null}
                  </span>
                  <span>{opt.label}</span>
                </button>
              );
            }
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={opt.label}
                disabled={disabled}
                tabIndex={
                  selected || (currentIndex < 0 && i === 0) ? 0 : -1
                }
                onClick={() => interactive && update(opt.value)}
                title={opt.label}
                className={cn(
                  "flex-1 min-w-[3.5rem] px-3 py-2",
                  "inline-flex items-center justify-center",
                  "text-xs font-medium",
                  "bg-transparent border-0 cursor-pointer transition-colors",
                  !isFirst && "border-l border-zen-border",
                  "text-zen-muted-fg",
                  interactive && "hover:bg-zen-muted hover:text-zen-foreground",
                  selected &&
                    "bg-zen-primary text-zen-primary-fg hover:bg-zen-primary hover:text-zen-primary-fg",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-inset",
                  (disabled || readOnly) && "cursor-default",
                  isFirst && "rounded-l-zen-md",
                  isLast && "rounded-r-zen-md",
                )}
              >
                <span className="hidden md:inline">{opt.label}</span>
                <span className="md:hidden">
                  {opt.shortLabel ?? opt.label}
                </span>
              </button>
            );
          })}
        </div>
        {inputName && value !== undefined ? (
          <input type="hidden" name={inputName} value={value} />
        ) : null}
      </div>
    );
  },
);
Likert.displayName = "Likert";
