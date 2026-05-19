import { createMemo, createSignal, For, Show } from "solid-js";
import { cn } from "../../lib/cn";

/**
 * Likert — n-point agree/disagree scale. The third leg of the survey
 * triplet (Rating · NPS · Likert), used for attitudinal questions.
 *
 *   const [answer, setAnswer] = createSignal<string | undefined>();
 *   <Likert
 *     value={answer()}
 *     onValueChange={setAnswer}
 *     question="The onboarding was easy to follow."
 *   />
 *
 * Defaults to a 5-point Strongly disagree → Strongly agree scale.
 * Override `options` for variants (frequency, importance, etc.).
 *
 * Two layouts:
 *   - "segmented" (default) — horizontal connected pill strip.
 *   - "stacked"  — vertical list, radio button + label per row.
 */

export interface LikertOption {
  value: string;
  label: string;
  /** Short label used by segmented layout when full label is too long. */
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
  question?: string;
  options?: LikertOption[];
  layout?: "segmented" | "stacked";
  disabled?: boolean;
  readOnly?: boolean;
  class?: string;
  name?: string;
}

export const Likert = (props: LikertProps) => {
  const options = createMemo(() => props.options ?? DEFAULT_OPTIONS);
  const layout = createMemo(() => props.layout ?? "segmented");
  const isControlled = () => props.value !== undefined;
  const [inner, setInner] = createSignal<string | undefined>(props.defaultValue);
  const value = createMemo<string | undefined>(() =>
    isControlled() ? props.value : inner(),
  );
  const interactive = createMemo(() => !props.disabled && !props.readOnly);
  const currentIndex = createMemo(() =>
    options().findIndex((o) => o.value === value()),
  );

  const update = (next: string) => {
    if (!isControlled()) setInner(next);
    props.onValueChange?.(next);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!interactive()) return;
    const idx = currentIndex();
    if (idx < 0) return;
    const forward = layout() === "stacked" ? "ArrowDown" : "ArrowRight";
    const back = layout() === "stacked" ? "ArrowUp" : "ArrowLeft";
    const opts = options();
    if (e.key === forward) {
      e.preventDefault();
      const next = opts[Math.min(opts.length - 1, idx + 1)];
      update(next.value);
    } else if (e.key === back) {
      e.preventDefault();
      const next = opts[Math.max(0, idx - 1)];
      update(next.value);
    } else if (e.key === "Home") {
      e.preventDefault();
      update(opts[0].value);
    } else if (e.key === "End") {
      e.preventDefault();
      update(opts[opts.length - 1].value);
    }
  };

  return (
    <div class={cn("inline-flex flex-col gap-2", props.class)}>
      <Show when={props.question}>
        <p class="text-sm font-medium text-zen-foreground m-0">{props.question}</p>
      </Show>
      <div
        role="radiogroup"
        aria-label={props.question}
        aria-disabled={props.disabled || undefined}
        aria-readonly={props.readOnly || undefined}
        onKeyDown={onKeyDown}
        class={cn(
          layout() === "segmented"
            ? "inline-flex items-stretch rounded-zen-md border border-zen-border overflow-hidden bg-zen-background"
            : "flex flex-col gap-1",
          props.disabled && "opacity-50",
        )}
      >
        <For each={options()}>
          {(opt, i) => {
            const selected = createMemo(() => value() === opt.value);
            const isFirst = createMemo(() => i() === 0);
            const isLast = createMemo(() => i() === options().length - 1);

            return (
              <Show
                when={layout() === "stacked"}
                fallback={
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected()}
                    aria-label={opt.label}
                    disabled={props.disabled}
                    tabIndex={
                      selected() || (currentIndex() < 0 && i() === 0) ? 0 : -1
                    }
                    onClick={() => interactive() && update(opt.value)}
                    title={opt.label}
                    class={cn(
                      "flex-1 min-w-[3.5rem] px-3 py-2",
                      "inline-flex items-center justify-center",
                      "text-xs font-medium",
                      "bg-transparent border-0 cursor-pointer transition-colors",
                      !isFirst() && "border-l border-zen-border",
                      "text-zen-muted-fg",
                      interactive() && "hover:bg-zen-muted hover:text-zen-foreground",
                      selected() &&
                        "bg-zen-primary text-zen-primary-fg hover:bg-zen-primary hover:text-zen-primary-fg",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-inset",
                      (props.disabled || props.readOnly) && "cursor-default",
                      isFirst() && "rounded-l-zen-md",
                      isLast() && "rounded-r-zen-md",
                    )}
                  >
                    <span class="hidden md:inline">{opt.label}</span>
                    <span class="md:hidden">{opt.shortLabel ?? opt.label}</span>
                  </button>
                }
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected()}
                  disabled={props.disabled}
                  tabIndex={
                    selected() || (currentIndex() < 0 && i() === 0) ? 0 : -1
                  }
                  onClick={() => interactive() && update(opt.value)}
                  class={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded-zen-sm",
                    "bg-transparent border-0 text-left text-sm cursor-pointer",
                    "transition-colors",
                    interactive() && "hover:bg-zen-muted",
                    selected() && "bg-zen-primary-soft text-zen-primary-soft-fg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
                    (props.disabled || props.readOnly) && "cursor-default",
                  )}
                >
                  <span
                    aria-hidden
                    class={cn(
                      "inline-flex items-center justify-center",
                      "h-4 w-4 rounded-zen-full border",
                      selected()
                        ? "border-zen-primary bg-zen-primary"
                        : "border-zen-border bg-zen-background",
                    )}
                  >
                    <Show when={selected()}>
                      <span class="h-1.5 w-1.5 rounded-zen-full bg-zen-primary-fg" />
                    </Show>
                  </span>
                  <span>{opt.label}</span>
                </button>
              </Show>
            );
          }}
        </For>
      </div>
      <Show when={props.name && value() !== undefined}>
        <input type="hidden" name={props.name} value={value()} />
      </Show>
    </div>
  );
};
