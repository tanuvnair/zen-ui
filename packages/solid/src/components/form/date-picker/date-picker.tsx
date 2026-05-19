import { For, Show, createMemo, createSignal, splitProps } from "solid-js";
import { cn } from "../../../lib/cn";
import { Button } from "../../button/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover/popover";

/**
 * Calendar — custom month-grid built for the Solid binding (no
 * react-day-picker port exists). Single, multiple, and range selection
 * supported via `mode`. Keyboard nav: arrows move focus, Enter selects.
 *
 * For inline use, render <Calendar> directly. For the typical
 * popover-anchored picker, use <DatePicker>.
 */

export type CalendarMode = "single" | "multiple" | "range";
export type DateRange = { from?: Date; to?: Date };

export type CalendarProps =
  | (CommonCalendarProps & {
      mode?: "single";
      selected?: Date;
      onSelect?: (date: Date | undefined) => void;
    })
  | (CommonCalendarProps & {
      mode: "multiple";
      selected?: Date[];
      onSelect?: (dates: Date[]) => void;
    })
  | (CommonCalendarProps & {
      mode: "range";
      selected?: DateRange;
      onSelect?: (range: DateRange | undefined) => void;
      numberOfMonths?: number;
    });

interface CommonCalendarProps {
  /** Disable specific dates (or all when boolean true). */
  disabled?: boolean | ((d: Date) => boolean);
  class?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const sameDay = (a: Date | undefined, b: Date | undefined): boolean =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const inRange = (d: Date, r: DateRange | undefined): boolean => {
  if (!r?.from) return false;
  if (!r.to) return sameDay(d, r.from);
  return d >= startOfDay(r.from) && d <= startOfDay(r.to);
};

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const monthStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);

const monthMatrix = (anchor: Date): Date[][] => {
  const first = monthStart(anchor);
  const offset = first.getDay();
  const start = new Date(first);
  start.setDate(first.getDate() - offset);
  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) {
      row.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d));
    }
    weeks.push(row);
  }
  return weeks;
};

export const Calendar = (props: CalendarProps) => {
  const [viewMonth, setViewMonth] = createSignal<Date>(
    props.mode === "range"
      ? props.selected?.from ?? new Date()
      : props.mode === "multiple"
        ? props.selected?.[0] ?? new Date()
        : props.selected ?? new Date(),
  );

  const numberOfMonths = () =>
    props.mode === "range" ? (props as { numberOfMonths?: number }).numberOfMonths ?? 1 : 1;

  const disabledFn = (d: Date): boolean => {
    const fn = props.disabled;
    if (typeof fn === "function") return fn(d);
    if (fn === true) return true;
    return false;
  };

  const handleSelect = (d: Date) => {
    if (disabledFn(d)) return;
    if (props.mode === "multiple") {
      const sel = props.selected ?? [];
      const exists = sel.some((s) => sameDay(s, d));
      const next = exists ? sel.filter((s) => !sameDay(s, d)) : [...sel, d];
      props.onSelect?.(next);
    } else if (props.mode === "range") {
      const sel = props.selected;
      if (!sel?.from || sel.to) {
        props.onSelect?.({ from: d, to: undefined });
      } else if (d < sel.from) {
        props.onSelect?.({ from: d, to: sel.from });
      } else {
        props.onSelect?.({ from: sel.from, to: d });
      }
    } else {
      const sameAsSelected = sameDay(d, props.selected);
      props.onSelect?.(sameAsSelected ? undefined : d);
    }
  };

  const isSelected = (d: Date): boolean => {
    if (props.mode === "multiple") {
      return (props.selected ?? []).some((s) => sameDay(s, d));
    }
    if (props.mode === "range") {
      return inRange(d, props.selected);
    }
    return sameDay(d, props.selected);
  };

  const isRangeEdge = (d: Date): "from" | "to" | false => {
    if (props.mode !== "range" || !props.selected) return false;
    if (sameDay(d, props.selected.from)) return "from";
    if (sameDay(d, props.selected.to)) return "to";
    return false;
  };

  return (
    <div class={cn("p-3 inline-block", props.class)}>
      <div class="flex gap-4">
        <For each={Array.from({ length: numberOfMonths() }, (_, i) => i)}>
          {(monthOffset) => {
            const month = createMemo(() => addMonths(viewMonth(), monthOffset));
            const weeks = createMemo(() => monthMatrix(month()));
            const monthLabel = createMemo(() =>
              month().toLocaleDateString(undefined, { month: "long", year: "numeric" }),
            );
            return (
              <div>
                <Show when={monthOffset === 0}>
                  <div class="flex items-center justify-between mb-2">
                    <button
                      type="button"
                      onClick={() => setViewMonth(addMonths(viewMonth(), -1))}
                      class="h-7 w-7 inline-flex items-center justify-center rounded-zen-sm bg-transparent border-0 cursor-pointer hover:bg-zen-muted"
                      aria-label="Previous month"
                    >
                      ‹
                    </button>
                    <div class="text-sm font-medium" aria-live="polite">
                      {monthLabel()}
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMonth(addMonths(viewMonth(), 1))}
                      class="h-7 w-7 inline-flex items-center justify-center rounded-zen-sm bg-transparent border-0 cursor-pointer hover:bg-zen-muted"
                      aria-label="Next month"
                    >
                      ›
                    </button>
                  </div>
                </Show>
                <Show when={monthOffset > 0}>
                  <div class="text-sm font-medium mb-2 text-center">{monthLabel()}</div>
                </Show>
                <table class="border-collapse text-sm">
                  <thead>
                    <tr>
                      <For each={WEEKDAYS}>
                        {(d) => (
                          <th class="h-8 w-8 text-xs font-normal text-zen-muted-fg">{d}</th>
                        )}
                      </For>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={weeks()}>
                      {(week) => (
                        <tr>
                          <For each={week}>
                            {(d) => {
                              const isOutside = () => d.getMonth() !== month().getMonth();
                              const isSel = () => isSelected(d);
                              const isToday = () => sameDay(d, new Date());
                              const edge = () => isRangeEdge(d);
                              const isDisabled = () => disabledFn(d);
                              return (
                                <td class="p-0">
                                  <button
                                    type="button"
                                    disabled={isDisabled()}
                                    aria-label={d.toDateString()}
                                    aria-pressed={isSel()}
                                    onClick={() => handleSelect(d)}
                                    class={cn(
                                      "h-8 w-8 inline-flex items-center justify-center rounded-zen-sm",
                                      "bg-transparent border-0 cursor-pointer text-sm transition-colors",
                                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
                                      isOutside() && "text-zen-muted-fg opacity-60",
                                      !isSel() && !isOutside() && "hover:bg-zen-muted",
                                      isSel() && props.mode !== "range" && "bg-zen-primary text-zen-primary-fg",
                                      isSel() && props.mode === "range" && !edge() && "bg-zen-primary-soft",
                                      edge() && "bg-zen-primary text-zen-primary-fg",
                                      isToday() && !isSel() && "border border-zen-border",
                                      isDisabled() && "opacity-30 cursor-not-allowed",
                                    )}
                                  >
                                    {d.getDate()}
                                  </button>
                                </td>
                              );
                            }}
                          </For>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

/* ---------------------------- DatePicker ---------------------------- */

export type DatePickerProps = {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean | ((d: Date) => boolean);
  class?: string;
  formatDate?: (date: Date) => string;
};

export const DatePicker = (rawProps: DatePickerProps) => {
  const [props] = splitProps(rawProps, [
    "value",
    "defaultValue",
    "onValueChange",
    "placeholder",
    "disabled",
    "class",
    "formatDate",
  ]);
  const isControlled = () => props.value !== undefined;
  const [inner, setInner] = createSignal<Date | undefined>(props.defaultValue);
  const date = createMemo<Date | undefined>(() =>
    isControlled() ? props.value : inner(),
  );
  const update = (d: Date | undefined) => {
    if (!isControlled()) setInner(d);
    props.onValueChange?.(d);
  };
  const fmt = (d: Date) => (props.formatDate ?? ((x: Date) => x.toLocaleDateString()))(d);

  return (
    <Popover>
      <PopoverTrigger
        as={Button}
        variant="outline"
        color="neutral"
        disabled={props.disabled === true}
        iconLeft={<CalendarIcon />}
        class={cn(
          "w-60 justify-between font-normal",
          !date() && "text-zen-muted-fg",
          props.class,
        )}
      >
        {date() ? fmt(date()!) : (props.placeholder ?? "Pick a date")}
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar
          mode="single"
          selected={date()}
          onSelect={update}
          disabled={typeof props.disabled === "function" ? props.disabled : undefined}
        />
      </PopoverContent>
    </Popover>
  );
};

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
