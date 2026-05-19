import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover/popover";
import { cn } from "../../lib/cn";

/**
 * NotificationsInbox — bell icon trigger that opens a Popover panel of
 * notifications grouped by day, with an unread-count badge, read/
 * unread visual states, and per-item actions.
 *
 *   <NotificationsInbox
 *     notifications={feed}
 *     onItemSelect={(n) => router.push(n.href ?? "/")}
 *     onMarkAllRead={markAll}
 *   />
 *
 * Caller owns the data + mutations (mark read, dismiss, fetch more);
 * the component is a pure presentation surface over a normalised
 * Notification[] shape. Use `unreadCount` to override the badge if
 * total unread > what's loaded in `notifications` (e.g. server says
 * 42 but the panel only shows the latest 10).
 */

export interface Notification {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Accepted as Date | ISO-string | epoch-ms. */
  timestamp: Date | string | number;
  /** Treated as unread when falsy. */
  read?: boolean;
  /** Leading icon (overrides the default unread dot when present). */
  icon?: React.ReactNode;
  /** Optional row of action buttons rendered below the description. */
  actions?: React.ReactNode;
  /** Renders the row as an <a> with this href. */
  href?: string;
}

export interface NotificationsInboxProps {
  notifications: Notification[];
  /**
   * Override the unread count badge. Defaults to the count of
   * notifications whose `read` is falsy.
   */
  unreadCount?: number;
  /** Header "Mark all as read" action. Shown when there are unread items. */
  onMarkAllRead?: () => void;
  /** Called when an individual notification row is activated (click / Enter). */
  onItemSelect?: (notification: Notification) => void;
  /** Footer "View all" link. Rendered when set. */
  onViewAll?: () => void;
  /** Body when notifications is empty. */
  emptyMessage?: React.ReactNode;
  /** aria-label for the bell trigger. Default "Notifications". */
  triggerLabel?: string;
  /** Max scrollable body height. Default 420. */
  maxHeight?: number;
  /** Popover alignment. Default "end" (anchors to the right of the trigger). */
  align?: "start" | "center" | "end";
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Panel width in px. Default 360. */
  width?: number;
  /** Cap for the badge — anything above renders as `${badgeMax}+`. Default 99. */
  badgeMax?: number;
  className?: string;
}

const toDate = (t: Date | string | number): Date =>
  t instanceof Date ? t : new Date(t);

const startOfDay = (d: Date): Date => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const daysBetween = (a: Date, b: Date): number =>
  Math.round(
    (startOfDay(b).getTime() - startOfDay(a).getTime()) / 86400000,
  );

const dayLabel = (d: Date, now: Date): string => {
  const diff = daysBetween(d, now);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) {
    return d.toLocaleDateString(undefined, { weekday: "long" });
  }
  const sameYear = d.getFullYear() === now.getFullYear();
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  });
};

const relativeTime = (d: Date, now: Date): string => {
  const sec = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (sec < 45) return "just now";
  if (sec < 60 * 60) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 60 * 60 * 24) return `${Math.floor(sec / 3600)}h ago`;
  if (sec < 60 * 60 * 24 * 7) return `${Math.floor(sec / 86400)}d ago`;
  return d.toLocaleDateString();
};

interface Group {
  label: string;
  items: Notification[];
}

const groupByDay = (notifications: Notification[], now: Date): Group[] => {
  const groups: Group[] = [];
  for (const n of notifications) {
    const label = dayLabel(toDate(n.timestamp), now);
    const tail = groups[groups.length - 1];
    if (tail && tail.label === label) tail.items.push(n);
    else groups.push({ label, items: [n] });
  }
  return groups;
};

const NotificationsInbox = React.forwardRef<
  HTMLButtonElement,
  NotificationsInboxProps
>(
  (
    {
      notifications,
      unreadCount,
      onMarkAllRead,
      onItemSelect,
      onViewAll,
      emptyMessage = "You're all caught up.",
      triggerLabel = "Notifications",
      maxHeight = 420,
      align = "end",
      open,
      onOpenChange,
      width = 360,
      badgeMax = 99,
      className,
    },
    ref,
  ) => {
    /* Bucket the feed into day-groups once per render. `now` is captured
     * at render time so all relative-time calcs in this pass agree. */
    const now = React.useMemo(() => new Date(), [notifications]);
    const groups = React.useMemo(
      () => groupByDay(notifications, now),
      [notifications, now],
    );

    const computedUnread =
      unreadCount ?? notifications.filter((n) => !n.read).length;
    const hasUnread = computedUnread > 0;
    const badgeText =
      computedUnread > badgeMax ? `${badgeMax}+` : String(computedUnread);

    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            aria-label={
              hasUnread
                ? `${triggerLabel}, ${computedUnread} unread`
                : triggerLabel
            }
            className={cn(
              "relative inline-flex h-10 w-10 items-center justify-center rounded-zen-full",
              "text-zen-foreground bg-transparent",
              "hover:bg-zen-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
              "transition-colors",
              className,
            )}
          >
            <BellIcon />
            {hasUnread && (
              <span
                aria-hidden
                className={cn(
                  "absolute -top-0.5 -right-0.5 inline-flex items-center justify-center",
                  "min-w-[1.25rem] h-5 px-1 rounded-zen-full",
                  "text-[0.65rem] font-semibold leading-none",
                  "bg-zen-error text-zen-error-fg",
                  "ring-2 ring-zen-background",
                )}
              >
                {badgeText}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          sideOffset={8}
          className="p-0 overflow-hidden"
          style={{ width }}
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zen-border">
            <h3 className="text-sm font-semibold text-zen-foreground m-0">
              {triggerLabel}
              {hasUnread && (
                <span className="ml-1.5 text-xs font-normal text-zen-muted-fg">
                  ({computedUnread})
                </span>
              )}
            </h3>
            {hasUnread && onMarkAllRead && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className={cn(
                  "text-xs font-medium text-zen-primary",
                  "hover:underline focus-visible:outline-none focus-visible:underline",
                  "bg-transparent border-0 cursor-pointer p-0",
                )}
              >
                Mark all as read
              </button>
            )}
          </div>

          <div
            role="list"
            aria-label={triggerLabel}
            style={{ maxHeight, overflowY: "auto" }}
          >
            {groups.length === 0 ? (
              <EmptyState message={emptyMessage} />
            ) : (
              groups.map((g) => (
                <section key={g.label} aria-label={g.label}>
                  <h4 className="px-4 pt-3 pb-1 text-[0.65rem] font-semibold uppercase tracking-wide text-zen-muted-fg m-0">
                    {g.label}
                  </h4>
                  <ul className="list-none p-0 m-0">
                    {g.items.map((n) => (
                      <Row
                        key={n.id}
                        notification={n}
                        now={now}
                        onSelect={onItemSelect}
                      />
                    ))}
                  </ul>
                </section>
              ))
            )}
          </div>

          {onViewAll && (
            <div className="border-t border-zen-border">
              <button
                type="button"
                onClick={onViewAll}
                className={cn(
                  "block w-full px-4 py-2.5 text-center text-sm font-medium text-zen-primary",
                  "hover:bg-zen-muted focus-visible:outline-none focus-visible:bg-zen-muted",
                  "bg-transparent border-0 cursor-pointer",
                )}
              >
                View all
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  },
);
NotificationsInbox.displayName = "NotificationsInbox";

const Row: React.FC<{
  notification: Notification;
  now: Date;
  onSelect?: (n: Notification) => void;
}> = ({ notification, now, onSelect }) => {
  const { title, description, timestamp, read, icon, actions, href } =
    notification;

  const activate = () => onSelect?.(notification);
  const interactive = !!onSelect || !!href;

  const rowContent = (
    <>
      <span
        aria-hidden
        className={cn(
          "mt-1.5 shrink-0 flex items-center justify-center",
          icon ? "h-5 w-5 text-zen-muted-fg" : "h-2 w-2 rounded-zen-full",
          !icon && !read && "bg-zen-primary",
          !icon && read && "bg-transparent",
        )}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            "text-sm leading-snug",
            read ? "text-zen-muted-fg" : "font-medium text-zen-foreground",
          )}
        >
          {title}
        </div>
        {description && (
          <div className="mt-0.5 text-xs text-zen-muted-fg leading-snug">
            {description}
          </div>
        )}
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-[0.65rem] uppercase tracking-wide text-zen-muted-fg">
            {relativeTime(toDate(timestamp), now)}
          </span>
          {actions && (
            <div className="flex items-center gap-1.5">{actions}</div>
          )}
        </div>
      </div>
    </>
  );

  const baseClass = cn(
    "flex items-start gap-3 px-4 py-2.5 text-left w-full",
    "border-l-2",
    read ? "border-transparent" : "border-zen-primary bg-zen-primary-soft/30",
    interactive &&
      "cursor-pointer hover:bg-zen-muted focus-visible:bg-zen-muted focus-visible:outline-none",
  );

  return (
    <li
      role="listitem"
      aria-current={!read ? "true" : undefined}
      className="border-b border-zen-border last:border-b-0"
    >
      {href ? (
        <a
          href={href}
          onClick={(e) => {
            // Let onSelect own navigation (e.g. router push); fall through
            // to the native href if no handler is wired.
            if (onSelect) {
              e.preventDefault();
              activate();
            }
          }}
          className={cn(baseClass, "no-underline text-inherit")}
        >
          {rowContent}
        </a>
      ) : interactive ? (
        <button
          type="button"
          onClick={activate}
          className={cn(baseClass, "bg-transparent")}
        >
          {rowContent}
        </button>
      ) : (
        <div className={baseClass}>{rowContent}</div>
      )}
    </li>
  );
};

const EmptyState: React.FC<{ message: React.ReactNode }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
    <span className="text-zen-muted-fg/60 mb-2">
      <BellIcon size={28} />
    </span>
    <p className="text-sm text-zen-muted-fg m-0">{message}</p>
  </div>
);

const BellIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export { NotificationsInbox };
