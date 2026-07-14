import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "../../lib/cn";

/**
 * VirtualizedItems — drop-in scrolling viewport that renders only the
 * visible window of a long item list. Use inside any popover-style
 * surface (SelectContent, DropdownMenuContent, PopoverContent) where the
 * full list would blow up the DOM.
 *
 *   <SelectContent>
 *     <VirtualizedItems items={hugeList} estimateSize={() => 36}>
 *       {({ item }) => <SelectItem value={item.value}>{item.label}</SelectItem>}
 *     </VirtualizedItems>
 *   </SelectContent>
 *
 * Powered by @tanstack/react-virtual.
 *
 * Caveat: Radix's keyboard typeahead can only jump to items currently
 * mounted in the DOM. Within the visible window arrow / Home / End / hover
 * all work correctly; jumping to letters that haven't been scrolled into
 * view won't. For "search across 50,000 options" use <Combobox> (next
 * commit) instead — it filters first, then renders.
 *
 * For the SelectContent and DropdownMenuContent you'll typically want to
 * pass `className="max-h-none"` to disable Radix's own viewport scroll;
 * this helper owns the scroll container.
 */

export interface VirtualizedItemsProps<T> {
  items: T[];
  /** Estimated height of a row, in px. Defaults to 36. */
  estimateSize?: number | ((index: number) => number);
  /** Max height of the scrolling viewport in px. Defaults to 280. */
  maxHeight?: number;
  /** Number of rows to render above / below the viewport for smoother scroll. */
  overscan?: number;
  className?: string;
  children: (args: { item: T; index: number }) => React.ReactNode;
  /** Optional key extractor; defaults to index. */
  getKey?: (item: T, index: number) => string | number;
}

export function VirtualizedItems<T>({
  items,
  estimateSize = 36,
  maxHeight = 280,
  overscan = 6,
  className,
  children,
  getKey,
}: VirtualizedItemsProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize:
      typeof estimateSize === "function"
        ? estimateSize
        : () => estimateSize as number,
    overscan,
  });

  return (
    <div
      ref={parentRef}
      className={cn("zen-overflow-y-auto", className)}
      style={{ maxHeight }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: "relative",
          width: "100%",
        }}
      >
        {virtualizer.getVirtualItems().map((v) => {
          const item = items[v.index];
          return (
            <div
              key={getKey ? getKey(item, v.index) : v.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${v.start}px)`,
                height: v.size,
              }}
            >
              {children({ item, index: v.index })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
