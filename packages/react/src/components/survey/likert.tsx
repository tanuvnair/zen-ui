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
        className={cn("zen-flex zen-flex-col zen-gap-2 zen-max-w-full", className)}
      >
        {question ? (
          <p className="zen-text-sm zen-font-medium zen-text-zen-foreground zen-m-0">
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
                "zen-flex zen-max-w-full zen-items-stretch zen-rounded-zen-md zen-border zen-border-zen-border zen-overflow-x-auto zen-overflow-y-hidden zen-bg-zen-background"
              : "zen-flex zen-flex-col zen-gap-1",
            disabled && "zen-opacity-50",
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
                    "zen-flex zen-items-center zen-gap-2 zen-px-2 zen-py-1.5 zen-rounded-zen-sm",
                    "zen-bg-transparent zen-border-0 zen-text-left zen-text-sm zen-cursor-pointer",
                    "zen-transition-colors",
                    interactive && "hover:zen-bg-zen-muted",
                    selected && "zen-bg-zen-primary-soft zen-text-zen-primary-soft-fg",
                    "focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring",
                    (disabled || readOnly) && "zen-cursor-default",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "zen-inline-flex zen-items-center zen-justify-center",
                      "zen-h-4 zen-w-4 zen-rounded-zen-full zen-border",
                      selected
                        ? "zen-border-zen-primary zen-bg-zen-primary"
                        : "zen-border-zen-border zen-bg-zen-background",
                    )}
                  >
                    {selected ? (
                      <span className="zen-h-1.5 zen-w-1.5 zen-rounded-zen-full zen-bg-zen-primary-fg" />
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
                  "zen-flex-1 zen-min-w-[3.5rem] zen-px-3 zen-py-2",
                  "zen-inline-flex zen-items-center zen-justify-center",
                  "zen-text-xs zen-font-medium",
                  "zen-bg-transparent zen-border-0 zen-cursor-pointer zen-transition-colors",
                  !isFirst && "zen-border-l zen-border-zen-border",
                  "zen-text-zen-muted-fg",
                  interactive && "hover:zen-bg-zen-muted hover:zen-text-zen-foreground",
                  selected &&
                    "zen-bg-zen-primary zen-text-zen-primary-fg hover:zen-bg-zen-primary hover:zen-text-zen-primary-fg",
                  "focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring focus-visible:zen-ring-inset",
                  (disabled || readOnly) && "zen-cursor-default",
                  isFirst && "zen-rounded-l-zen-md",
                  isLast && "zen-rounded-r-zen-md",
                )}
              >
                <span className="zen-hidden md:zen-inline">{opt.label}</span>
                <span className="md:zen-hidden">
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
