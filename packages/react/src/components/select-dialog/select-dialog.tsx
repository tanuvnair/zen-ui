import * as React from "react";
import { cn } from "@algorisys/zen-ui-core";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../dialog/dialog";
import { Button } from "../button/button";
import { Input } from "../form/input/input";
import { Checkbox } from "../form/checkbox/checkbox";
import { Icon, type IconName } from "../icon/icon";

/**
 * SelectDialog — Fiori's list picker: a modal with a search field, a scrollable
 * list, and a footer.
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
  label: string;
  /** Secondary line under the label. */
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
  className?: string;
}

const matches = (item: SelectDialogItem, q: string) =>
  item.label.toLowerCase().includes(q) ||
  (item.description?.toLowerCase().includes(q) ?? false);

export const SelectDialog = ({
  open,
  onOpenChange,
  title,
  description,
  items,
  multiple = false,
  selectedIds,
  onConfirm,
  searchable = true,
  searchPlaceholder = "Search",
  onSearch,
  emptyText = "No matching items",
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  clearLabel = "Clear",
  showClearAll = true,
  className,
}: SelectDialogProps) => {
  const [query, setQuery] = React.useState("");
  // Seeded by the reset effect below rather than here: `selectedIds` is read when
  // the dialog opens, so an initial read would be a second, contradictory source
  // of that rule (and the draft of a closed dialog is never shown anyway).
  const [draft, setDraft] = React.useState<string[]>([]);

  // Held in a ref so the reset effect below can depend on `open` alone. A
  // caller passing `selectedIds={[]}` inline hands us a new array identity every
  // render; depending on it would re-run the reset mid-interaction and wipe the
  // user's ticks. Same class of bug as FlexibleColumnLayout's render loop.
  const selectedRef = React.useRef(selectedIds);
  React.useEffect(() => {
    selectedRef.current = selectedIds;
  });

  // A picker is a fresh question each time it opens: re-seed the draft and drop
  // the previous search. Resetting on close instead would animate the list
  // rebuilding while the dialog fades out.
  React.useEffect(() => {
    if (!open) return;
    setDraft(selectedRef.current ?? []);
    setQuery("");
  }, [open]);

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (onSearch || !q) return items;
    return items.filter((i) => matches(i, q));
  }, [items, query, onSearch]);

  const commit = (ids: string[]) => {
    onConfirm(ids);
    onOpenChange(false);
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
    const known = items.filter((i) => picked.has(i.id)).map((i) => i.id);
    const seen = new Set(known);
    return [...known, ...ids.filter((id) => !seen.has(id))];
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  const descriptionId = React.useId();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        // The list is full-bleed and scrolls on its own, so the dialog's own
        // padding and scroller would double up: a scrollbar inside a scrollbar,
        // and a search field that scrolls away from the list it filters.
        className={cn("zen-flex zen-max-h-[85vh] zen-flex-col zen-overflow-hidden zen-p-0", className)}
        aria-describedby={description ? descriptionId : undefined}
      >
        <div className="zen-flex zen-flex-col zen-gap-2 zen-border-b zen-border-zen-border zen-px-6 zen-py-4">
          <DialogTitle className="zen-pr-8">{title}</DialogTitle>
          {description ? (
            <DialogDescription id={descriptionId}>{description}</DialogDescription>
          ) : null}
          {searchable ? (
            <div className="zen-relative zen-mt-1">
              <Icon
                name="search"
                size={14}
                className="zen-pointer-events-none zen-absolute zen-left-3 zen-top-1/2 -zen-translate-y-1/2 zen-text-zen-muted-fg"
              />
              <Input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="zen-pl-9"
              />
            </div>
          ) : null}
        </div>

        <div className="zen-min-h-0 zen-flex-1 zen-overflow-y-auto zen-px-2 zen-py-2">
          {visible.length === 0 ? (
            <p className="zen-m-0 zen-px-4 zen-py-8 zen-text-center zen-text-sm zen-text-zen-muted-fg">
              {emptyText}
            </p>
          ) : (
            <ul className="zen-m-0 zen-flex zen-list-none zen-flex-col zen-p-0">
              {visible.map((item) => (
                <li key={item.id}>
                  {multiple ? (
                    <MultiRow
                      item={item}
                      checked={draft.includes(item.id)}
                      onToggle={() => toggle(item.id)}
                    />
                  ) : (
                    <SingleRow
                      item={item}
                      current={draft.includes(item.id)}
                      onPick={() => commit([item.id])}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="zen-flex zen-items-center zen-justify-end zen-gap-2 zen-border-t zen-border-zen-border zen-px-6 zen-py-3">
          {multiple && showClearAll ? (
            <Button
              type="button"
              variant="ghost"
              color="neutral"
              size="sm"
              // Clearing an empty selection is a no-op dressed as an action.
              disabled={draft.length === 0}
              onClick={() => setDraft([])}
              className="zen-mr-auto"
            >
              {clearLabel}
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            color="neutral"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          {multiple ? (
            <Button type="button" size="sm" onClick={() => commit(inListOrder(draft))}>
              {confirmLabel}
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
SelectDialog.displayName = "SelectDialog";

const ROW_CLASS =
  "zen-flex zen-w-full zen-items-center zen-gap-3 zen-rounded-zen-sm zen-px-4 zen-py-2.5 zen-text-left";

const RowBody = ({ item }: { item: SelectDialogItem }) => (
  <>
    {item.icon ? (
      <Icon name={item.icon} size={16} className="zen-shrink-0 zen-text-zen-muted-fg" />
    ) : null}
    <span className="zen-flex zen-min-w-0 zen-flex-1 zen-flex-col">
      <span className="zen-truncate zen-text-sm">{item.label}</span>
      {item.description ? (
        <span className="zen-truncate zen-text-xs zen-text-zen-muted-fg">{item.description}</span>
      ) : null}
    </span>
    {item.info ? (
      <span className="zen-shrink-0 zen-text-xs zen-text-zen-muted-fg">{item.info}</span>
    ) : null}
  </>
);

/**
 * A real <button>, not a role="option": picking commits, so this is an action.
 * It also buys Enter/Space and tab order without a roving-tabindex manager.
 * `aria-current` marks the incoming selection without claiming listbox
 * semantics the surrounding markup does not have.
 */
const SingleRow = ({
  item,
  current,
  onPick,
}: {
  item: SelectDialogItem;
  current: boolean;
  onPick: () => void;
}) => (
  <button
    type="button"
    disabled={item.disabled}
    aria-current={current || undefined}
    onClick={onPick}
    className={cn(
      ROW_CLASS,
      "zen-border-0 zen-bg-transparent zen-cursor-pointer",
      "hover:zen-bg-zen-muted focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring",
      "disabled:zen-cursor-not-allowed disabled:zen-opacity-50",
      current && "zen-bg-zen-muted",
    )}
  >
    <RowBody item={item} />
    {current ? <Icon name="check" size={16} className="zen-shrink-0 zen-text-zen-primary" /> : null}
  </button>
);

/** A <label> so the whole row is the checkbox's hit target, not just the box. */
const MultiRow = ({
  item,
  checked,
  onToggle,
}: {
  item: SelectDialogItem;
  checked: boolean;
  onToggle: () => void;
}) => (
  <label
    className={cn(
      ROW_CLASS,
      "zen-cursor-pointer hover:zen-bg-zen-muted",
      item.disabled && "zen-cursor-not-allowed zen-opacity-50",
    )}
  >
    <Checkbox checked={checked} disabled={item.disabled} onCheckedChange={onToggle} />
    <RowBody item={item} />
  </label>
);
