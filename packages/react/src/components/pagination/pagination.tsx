import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Pagination — standalone, controlled page navigator. zen-ui's DataTable has
 * its own built-in pager; this is the primitive for the many places that
 * paginate without a DataTable (lists, cards, server-driven feeds).
 *
 *   <Pagination page={page} pageCount={totalPages} onPageChange={setPage} />
 *
 * Renders Prev / numbered pages (with ellipses) / Next. Fully controlled:
 * `page` is 1-based. Use `usePaginationRange` directly if you want to render
 * your own markup.
 */

const DOTS = "dots" as const;

/** Build the list of page numbers + ellipsis markers to render. */
export function usePaginationRange({
  page,
  pageCount,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  page: number;
  pageCount: number;
  siblingCount?: number;
  boundaryCount?: number;
}): Array<number | typeof DOTS> {
  return React.useMemo(() => {
    const range = (start: number, end: number) =>
      Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => start + i);

    // Few enough pages: show them all.
    const totalToShow = boundaryCount * 2 + siblingCount * 2 + 3;
    if (pageCount <= totalToShow) return range(1, pageCount);

    const startPages = range(1, boundaryCount);
    const endPages = range(pageCount - boundaryCount + 1, pageCount);

    const siblingsStart = Math.max(
      Math.min(page - siblingCount, pageCount - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2,
    );
    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : pageCount - 1,
    );

    return [
      ...startPages,
      siblingsStart > boundaryCount + 2 ? DOTS : boundaryCount + 1,
      ...range(siblingsStart, siblingsEnd),
      siblingsEnd < pageCount - boundaryCount - 1 ? DOTS : pageCount - boundaryCount,
      ...endPages,
    ];
  }, [page, pageCount, siblingCount, boundaryCount]);
}

const itemBase =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-zen-md border border-zen-border px-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** current page, 1-based */
  page: number;
  /** total number of pages */
  pageCount: number;
  /** called with the next 1-based page */
  onPageChange: (page: number) => void;
  /** pages shown either side of the current page (default 1) */
  siblingCount?: number;
  /** pages pinned at each end (default 1) */
  boundaryCount?: number;
  /** hide the Prev / Next controls */
  hidePrevNext?: boolean;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      pageCount,
      onPageChange,
      siblingCount = 1,
      boundaryCount = 1,
      hidePrevNext = false,
      className,
      ...props
    },
    ref,
  ) => {
    const items = usePaginationRange({ page, pageCount, siblingCount, boundaryCount });
    const go = (p: number) => {
      const next = Math.min(Math.max(p, 1), pageCount);
      if (next !== page) onPageChange(next);
    };

    if (pageCount <= 1) return null;

    return (
      <nav
        ref={ref}
        aria-label="pagination"
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {!hidePrevNext && (
          <button
            type="button"
            className={cn(itemBase, "hover:bg-zen-muted")}
            onClick={() => go(page - 1)}
            disabled={page <= 1}
            aria-label="Go to previous page"
          >
            &#8249;
          </button>
        )}
        {items.map((item, i) =>
          item === DOTS ? (
            <span
              key={`dots-${i}`}
              aria-hidden="true"
              className="inline-flex h-9 min-w-9 items-center justify-center px-1 text-zen-muted-fg"
            >
              &#8230;
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={item === page ? "page" : undefined}
              className={cn(
                itemBase,
                item === page
                  ? "border-zen-primary bg-zen-primary text-zen-primary-fg"
                  : "hover:bg-zen-muted",
              )}
              onClick={() => go(item)}
            >
              {item}
            </button>
          ),
        )}
        {!hidePrevNext && (
          <button
            type="button"
            className={cn(itemBase, "hover:bg-zen-muted")}
            onClick={() => go(page + 1)}
            disabled={page >= pageCount}
            aria-label="Go to next page"
          >
            &#8250;
          </button>
        )}
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";
