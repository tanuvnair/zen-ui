import { createMemo, createSignal, createUniqueId, createEffect, For, Show } from "solid-js";
import { cn } from "../../lib/cn";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../dialog/dialog";
import { Button } from "../button/button";
import { Input } from "../form/input/input";
import { Checkbox } from "../form/checkbox/checkbox";
import { Icon, type IconName } from "../icon/icon";

/**
 * SelectDialog — Fiori's list picker: a modal with a search field, a scrollable
 * list, and a footer. Mirrors the React binding's API exactly.
 *
 * Two modes, and they behave differently on purpose, matching Fiori:
 *
 * - **Single** — picking a row IS the confirmation. The dialog closes on click
 *   and there is no OK button, because an OK would be a second click that says
 *   nothing new.
 * - **Multiple** — rows are checkboxes and nothing is committed until OK, so a
 *   mis-click is recoverable. Cancel restores whatever was selected on open.
 *
 * Selection is drafted internally and only handed back via `onConfirm`, so the
 * caller's state never sees an intermediate tick. `selectedIds` is read when
 * `open` flips true — this is a picker, not a live-bound field.
 *
 * Filtering is client-side over label + description. Pass `onSearch` to take it
 * over (server-driven / fuzzy): the dialog then renders `items` verbatim and
 * filtering becomes the caller's job.
 */
export interface SelectDialogItem {
  id: string;
  /** Secondary line under the label. */
  label: string;
  description?: string;
  /** Right-aligned trailing text — Fiori's "info", e.g. a status or amount. */
  info?: string;
  icon?: IconName;
  disabled?: boolean;
}

export interface SelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Optional subtitle. Also the dialog's accessible description. */
  description?: string;
  items: SelectDialogItem[];
  /** Checkbox rows + an OK/Cancel commit step. Default: single-select. */
  multiple?: boolean;
  /** The selection the dialog opens with. Read when `open` becomes true. */
  selectedIds?: string[];
  /** The only way selection escapes. Single mode passes exactly one id. */
  onConfirm: (ids: string[]) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Take over filtering. When set, `items` is rendered as given. */
  onSearch?: (query: string) => void;
  emptyText?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  clearLabel?: string;
  /** Multi-select only: a "Clear" action in the footer. Default: true. */
  showClearAll?: boolean;
  class?: string;
}

const matches = (item: SelectDialogItem, q: string) =>
  item.label.toLowerCase().includes(q) ||
  (item.description?.toLowerCase().includes(q) ?? false);

const ROW_CLASS =
  "zen-flex zen-w-full zen-items-center zen-gap-3 zen-rounded-zen-sm zen-px-4 zen-py-2.5 zen-text-left";

export const SelectDialog = (props: SelectDialogProps) => {
  const [query, setQuery] = createSignal("");
  // Seeded by the effect below rather than here: `selectedIds` is read when the
  // dialog opens, so an initial read would be a second, contradictory source of
  // that rule (and the draft of a closed dialog is never shown anyway).
  const [draft, setDraft] = createSignal<string[]>([]);
  const descriptionId = createUniqueId();

  // A picker is a fresh question each time it opens: re-seed the draft and drop
  // the previous search. Tracks `props.open` only — reading selectedIds inside
  // an untracked read keeps a caller's inline array from re-running this
  // mid-interaction and wiping the user's ticks.
  createEffect(() => {
    if (!props.open) return;
    setDraft(props.selectedIds ? [...props.selectedIds] : []);
    setQuery("");
  });

  const visible = createMemo(() => {
    const q = query().trim().toLowerCase();
    if (props.onSearch || !q) return props.items;
    return props.items.filter((i) => matches(i, q));
  });

  const commit = (ids: string[]) => {
    props.onConfirm(ids);
    props.onOpenChange(false);
  };

  const toggle = (id: string) =>
    setDraft((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // OK reports the selection in list order, not tick order — which rows the user
  // happened to click first is not information the caller should have to
  // untangle, and Fiori's SelectDialog reports selectedContexts in list order
  // too. Ids `items` no longer holds (a rotated `onSearch` page) keep their
  // draft order on the end instead of being dropped.
  const inListOrder = (ids: string[]) => {
    const picked = new Set(ids);
    const known = props.items.filter((i) => picked.has(i.id)).map((i) => i.id);
    const seen = new Set(known);
    return [...known, ...ids.filter((id) => !seen.has(id))];
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    props.onSearch?.(value);
  };

  const searchPlaceholder = () => props.searchPlaceholder ?? "Search";
  const showClearAll = () => props.showClearAll ?? true;

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent
        // The list is full-bleed and scrolls on its own, so the dialog's own
        // padding and scroller would double up: a scrollbar inside a scrollbar,
        // and a search field that scrolls away from the list it filters.
        class={cn(
          "zen-flex zen-max-h-[85vh] zen-flex-col zen-overflow-hidden zen-p-0",
          props.class,
        )}
        aria-describedby={props.description ? descriptionId : undefined}
      >
        <div class="zen-flex zen-flex-col zen-gap-2 zen-border-b zen-border-zen-border zen-px-6 zen-py-4">
          <DialogTitle class="zen-pr-8">{props.title}</DialogTitle>
          <Show when={props.description}>
            <DialogDescription id={descriptionId}>{props.description}</DialogDescription>
          </Show>
          <Show when={props.searchable ?? true}>
            <div class="zen-relative zen-mt-1">
              <Icon
                name="search"
                size={14}
                class="zen-pointer-events-none zen-absolute zen-left-3 zen-top-1/2 -zen-translate-y-1/2 zen-text-zen-muted-fg"
              />
              <Input
                value={query()}
                onInput={(e) => handleSearch(e.currentTarget.value)}
                placeholder={searchPlaceholder()}
                aria-label={searchPlaceholder()}
                class="zen-pl-9"
              />
            </div>
          </Show>
        </div>

        <div class="zen-min-h-0 zen-flex-1 zen-overflow-y-auto zen-px-2 zen-py-2">
          <Show
            when={visible().length > 0}
            fallback={
              <p class="zen-m-0 zen-px-4 zen-py-8 zen-text-center zen-text-sm zen-text-zen-muted-fg">
                {props.emptyText ?? "No matching items"}
              </p>
            }
          >
            <ul class="zen-m-0 zen-flex zen-list-none zen-flex-col zen-p-0">
              <For each={visible()}>
                {(item) => (
                  <li>
                    <Show
                      when={props.multiple}
                      fallback={
                        <SingleRow
                          item={item}
                          current={draft().includes(item.id)}
                          onPick={() => commit([item.id])}
                        />
                      }
                    >
                      <MultiRow
                        item={item}
                        checked={draft().includes(item.id)}
                        onToggle={() => toggle(item.id)}
                      />
                    </Show>
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>

        <div class="zen-flex zen-items-center zen-justify-end zen-gap-2 zen-border-t zen-border-zen-border zen-px-6 zen-py-3">
          <Show when={props.multiple && showClearAll()}>
            <Button
              type="button"
              variant="ghost"
              color="neutral"
              size="sm"
              // Clearing an empty selection is a no-op dressed as an action.
              disabled={draft().length === 0}
              onClick={() => setDraft([])}
              class="zen-mr-auto"
            >
              {props.clearLabel ?? "Clear"}
            </Button>
          </Show>
          <Button
            type="button"
            variant="outline"
            color="neutral"
            size="sm"
            onClick={() => props.onOpenChange(false)}
          >
            {props.cancelLabel ?? "Cancel"}
          </Button>
          <Show when={props.multiple}>
            <Button type="button" size="sm" onClick={() => commit(inListOrder(draft()))}>
              {props.confirmLabel ?? "OK"}
            </Button>
          </Show>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RowBody = (props: { item: SelectDialogItem }) => (
  <>
    <Show when={props.item.icon}>
      {(icon) => <Icon name={icon()} size={16} class="zen-shrink-0 zen-text-zen-muted-fg" />}
    </Show>
    <span class="zen-flex zen-min-w-0 zen-flex-1 zen-flex-col">
      <span class="zen-truncate zen-text-sm">{props.item.label}</span>
      <Show when={props.item.description}>
        <span class="zen-truncate zen-text-xs zen-text-zen-muted-fg">
          {props.item.description}
        </span>
      </Show>
    </span>
    <Show when={props.item.info}>
      <span class="zen-shrink-0 zen-text-xs zen-text-zen-muted-fg">{props.item.info}</span>
    </Show>
  </>
);

/**
 * A real <button>, not a role="option": picking commits, so this is an action.
 * It also buys Enter/Space and tab order without a roving-tabindex manager.
 * `aria-current` marks the incoming selection without claiming listbox
 * semantics the surrounding markup does not have.
 */
const SingleRow = (props: { item: SelectDialogItem; current: boolean; onPick: () => void }) => (
  <button
    type="button"
    disabled={props.item.disabled}
    aria-current={props.current || undefined}
    onClick={() => props.onPick()}
    class={cn(
      ROW_CLASS,
      "zen-border-0 zen-bg-transparent zen-cursor-pointer",
      "hover:zen-bg-zen-muted focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring",
      "disabled:zen-cursor-not-allowed disabled:zen-opacity-50",
      props.current && "zen-bg-zen-muted",
    )}
  >
    <RowBody item={props.item} />
    <Show when={props.current}>
      <Icon name="check" size={16} class="zen-shrink-0 zen-text-zen-primary" />
    </Show>
  </button>
);

/** A <label> so the whole row is the checkbox's hit target, not just the box. */
const MultiRow = (props: { item: SelectDialogItem; checked: boolean; onToggle: () => void }) => (
  <label
    class={cn(
      ROW_CLASS,
      "zen-cursor-pointer hover:zen-bg-zen-muted",
      props.item.disabled && "zen-cursor-not-allowed zen-opacity-50",
    )}
  >
    <Checkbox checked={props.checked} disabled={props.item.disabled} onChange={() => props.onToggle()} />
    <RowBody item={props.item} />
  </label>
);
