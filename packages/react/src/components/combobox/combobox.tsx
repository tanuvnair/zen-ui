import * as React from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "./command";

/**
 * Combobox — searchable single-select with optional async option loading.
 * Built on cmdk (filtering + keyboard) + Radix Popover (positioning +
 * dismissal). Replaces Select when free-text search is needed across a
 * large or remote option set.
 *
 * Synchronous (in-memory):
 *
 *   <Combobox
 *     options={[{ value: "a", label: "Alpha" }, …]}
 *     value={picked}
 *     onValueChange={setPicked}
 *     placeholder="Pick one"
 *   />
 *
 * Async (server-driven):
 *
 *   <Combobox
 *     value={picked}
 *     onValueChange={setPicked}
 *     onSearch={async (query) => {
 *       const res = await fetch(`/api/options?q=${query}`);
 *       return res.json();
 *     }}
 *     debounceMs={250}
 *   />
 *
 * The async signature replaces `options`; the component handles
 * debounce, abort-on-stale, and loading / no-results states.
 */

export interface ComboboxOption {
  value: string;
  label: string;
  /** Optional extra text used by cmdk's fuzzy match. */
  keywords?: string[];
  disabled?: boolean;
}

export interface ComboboxProps {
  /** Static option list (synchronous mode). Ignored if `onSearch` is provided. */
  options?: ComboboxOption[];
  /** Async loader (server-driven). Called on every input change, debounced. */
  onSearch?: (query: string) => Promise<ComboboxOption[]>;
  /** Selected value. Pass "" / null to clear. */
  value?: string;
  /** Defaults to "". */
  defaultValue?: string;
  onValueChange?: (value: string, option: ComboboxOption | null) => void;
  /** Text shown when no value is selected. */
  placeholder?: string;
  /** Placeholder inside the search input. */
  searchPlaceholder?: string;
  /** Message when the result list is empty after filtering / search. */
  emptyMessage?: string;
  /** Async-mode: ms to wait after the last keystroke before calling onSearch. */
  debounceMs?: number;
  /** Trigger button's width. Defaults to 240. */
  width?: number | string;
  disabled?: boolean;
  className?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  onSearch,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results.",
  debounceMs = 250,
  width = 240,
  disabled,
  className,
}) => {
  const isAsync = typeof onSearch === "function";

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const selected = isControlled ? (value as string) : internalValue;

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // Async-mode state
  const [asyncResults, setAsyncResults] = React.useState<ComboboxOption[]>([]);
  const [asyncLoading, setAsyncLoading] = React.useState(false);
  const abortRef = React.useRef<AbortController | null>(null);
  const seqRef = React.useRef(0);

  // Trigger fresh fetch when input changes (async mode)
  React.useEffect(() => {
    if (!isAsync) return;
    if (!open) return;

    const seq = ++seqRef.current;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const t = setTimeout(async () => {
      setAsyncLoading(true);
      try {
        const results = await onSearch!(query);
        if (seq === seqRef.current && !ac.signal.aborted) {
          setAsyncResults(results);
        }
      } catch {
        if (seq === seqRef.current && !ac.signal.aborted) {
          setAsyncResults([]);
        }
      } finally {
        if (seq === seqRef.current && !ac.signal.aborted) {
          setAsyncLoading(false);
        }
      }
    }, debounceMs);

    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [query, open, isAsync, onSearch, debounceMs]);

  // Track the currently-selected option's label for the trigger
  const allOptions = isAsync ? asyncResults : options ?? [];
  const selectedOption = React.useMemo(
    () => allOptions.find((o) => o.value === selected) ?? null,
    [allOptions, selected],
  );
  // Keep last-known label for selected values that aren't in the current
  // async result page (so the trigger doesn't read "Select…" when the
  // dropdown re-renders with a fresh search).
  const lastLabelRef = React.useRef<string>("");
  if (selectedOption) lastLabelRef.current = selectedOption.label;

  const triggerLabel =
    selected && lastLabelRef.current
      ? lastLabelRef.current
      : placeholder;

  const update = (next: string, opt: ComboboxOption | null) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next, opt);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          color="neutral"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "zen-justify-between zen-font-normal",
            !selected && "zen-text-zen-muted-fg",
            className,
          )}
          style={{ width }}
          iconRight={<ChevronIcon />}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {triggerLabel}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="zen-p-0"
        style={{ width: typeof width === "number" ? width : undefined }}
        align="start"
      >
        <Command
          // In async mode we already filter server-side, so disable cmdk's
          // built-in filter (otherwise it re-filters the already-filtered list).
          shouldFilter={!isAsync}
        >
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder={searchPlaceholder}
          />
          <CommandList>
            {isAsync && asyncLoading ? (
              <CommandLoading>Searching…</CommandLoading>
            ) : null}
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {allOptions.map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.value}
                  keywords={[o.label, ...(o.keywords ?? [])]}
                  disabled={o.disabled}
                  onSelect={(v) => {
                    if (o.disabled) return;
                    const next = v === selected ? "" : v;
                    const nextOpt =
                      next === ""
                        ? null
                        : allOptions.find((x) => x.value === next) ?? null;
                    update(next, nextOpt);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    style={{
                      opacity: selected === o.value ? 1 : 0,
                      marginRight: 6,
                    }}
                  />
                  <span style={{ flex: 1 }}>{o.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export { Combobox };
