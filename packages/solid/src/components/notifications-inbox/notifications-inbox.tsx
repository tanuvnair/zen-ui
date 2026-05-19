import { type JSX, For, Show, createMemo } from "solid-js";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { cn } from "../../lib/cn";

/**
 * NotificationsInbox — Solid port. Bell trigger that opens a Popover
 * panel with notifications grouped by day, unread-count badge,
 * read/unread visual states, optional per-item actions.
 */

export interface Notification {
  id: string;
  title: JSX.Element;
  description?: JSX.Element;
  timestamp: Date | string | number;
  read?: boolean;
  icon?: JSX.Element;
  actions?: JSX.Element;
  href?: string;
}

export type NotificationsInboxProps = {
  notifications: Notification[];
  unreadCount?: number;
  onMarkAllRead?: () => void;
  onItemSelect?: (notification: Notification) => void;
  onViewAll?: () => void;
  emptyMessage?: JSX.Element;
  triggerLabel?: string;
  maxHeight?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: number;
  badgeMax?: number;
  class?: string;
};

const toDate = (t: Date | string | number): Date => (t instanceof Date ? t : new Date(t));

const startOfDay = (d: Date): Date => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const daysBetween = (a: Date, b: Date): number =>
  Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / 86400000);

const dayLabel = (d: Date, now: Date): string => {
  const diff = daysBetween(d, now);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return d.toLocaleDateString(undefined, { weekday: "long" });
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

export const NotificationsInbox = (props: NotificationsInboxProps) => {
  const now = createMemo(() => {
    void props.notifications;
    return new Date();
  });
  const groups = createMemo(() => groupByDay(props.notifications, now()));
  const computedUnread = () =>
    props.unreadCount ?? props.notifications.filter((n) => !n.read).length;
  const hasUnread = () => computedUnread() > 0;
  const badgeMax = () => props.badgeMax ?? 99;
  const badgeText = () =>
    computedUnread() > badgeMax() ? `${badgeMax()}+` : String(computedUnread());
  const triggerLabel = () => props.triggerLabel ?? "Notifications";

  return (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      <PopoverTrigger
        aria-label={
          hasUnread()
            ? `${triggerLabel()}, ${computedUnread()} unread`
            : triggerLabel()
        }
        class={cn(
          "relative inline-flex h-10 w-10 items-center justify-center rounded-zen-full",
          "text-zen-foreground bg-transparent border-0 cursor-pointer",
          "hover:bg-zen-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
          "transition-colors",
          props.class,
        )}
      >
        <BellIcon size={18} />
        <Show when={hasUnread()}>
          <span
            aria-hidden
            class={cn(
              "absolute -top-0.5 -right-0.5 inline-flex items-center justify-center",
              "min-w-[1.25rem] h-5 px-1 rounded-zen-full",
              "text-[0.65rem] font-semibold leading-none",
              "bg-zen-error text-zen-error-fg",
              "ring-2 ring-zen-background",
            )}
          >
            {badgeText()}
          </span>
        </Show>
      </PopoverTrigger>
      <PopoverContent class="p-0 overflow-hidden">
        <div
          class="flex items-center justify-between px-4 py-2.5 border-b border-zen-border"
          style={{ width: `${props.width ?? 360}px` }}
        >
          <h3 class="text-sm font-semibold text-zen-foreground m-0">
            {triggerLabel()}
            <Show when={hasUnread()}>
              <span class="ml-1.5 text-xs font-normal text-zen-muted-fg">
                ({computedUnread()})
              </span>
            </Show>
          </h3>
          <Show when={hasUnread() && props.onMarkAllRead}>
            <button
              type="button"
              onClick={props.onMarkAllRead}
              class={cn(
                "text-xs font-medium text-zen-primary",
                "hover:underline focus-visible:outline-none focus-visible:underline",
                "bg-transparent border-0 cursor-pointer p-0",
              )}
            >
              Mark all as read
            </button>
          </Show>
        </div>
        <div
          role="list"
          aria-label={triggerLabel()}
          style={{ "max-height": `${props.maxHeight ?? 420}px`, "overflow-y": "auto", width: `${props.width ?? 360}px` }}
        >
          <Show
            when={groups().length > 0}
            fallback={
              <EmptyState
                message={props.emptyMessage ?? "You're all caught up."}
              />
            }
          >
            <For each={groups()}>
              {(g) => (
                <section aria-label={g.label}>
                  <h4 class="px-4 pt-3 pb-1 text-[0.65rem] font-semibold uppercase tracking-wide text-zen-muted-fg m-0">
                    {g.label}
                  </h4>
                  <ul class="list-none p-0 m-0">
                    <For each={g.items}>
                      {(n) => <Row notification={n} now={now()} onSelect={props.onItemSelect} />}
                    </For>
                  </ul>
                </section>
              )}
            </For>
          </Show>
        </div>
        <Show when={props.onViewAll}>
          <div class="border-t border-zen-border">
            <button
              type="button"
              onClick={props.onViewAll}
              class={cn(
                "block w-full px-4 py-2.5 text-center text-sm font-medium text-zen-primary",
                "hover:bg-zen-muted focus-visible:outline-none focus-visible:bg-zen-muted",
                "bg-transparent border-0 cursor-pointer",
              )}
            >
              View all
            </button>
          </div>
        </Show>
      </PopoverContent>
    </Popover>
  );
};

const Row = (props: {
  notification: Notification;
  now: Date;
  onSelect?: (n: Notification) => void;
}) => {
  const n = () => props.notification;
  const interactive = () => !!props.onSelect || !!n().href;
  const activate = () => props.onSelect?.(n());
  const rowContent = (
    <>
      <span
        aria-hidden
        class={cn(
          "mt-1.5 shrink-0 flex items-center justify-center",
          n().icon ? "h-5 w-5 text-zen-muted-fg" : "h-2 w-2 rounded-zen-full",
          !n().icon && !n().read && "bg-zen-primary",
          !n().icon && n().read && "bg-transparent",
        )}
      >
        {n().icon}
      </span>
      <div class="min-w-0 flex-1">
        <div
          class={cn(
            "text-sm leading-snug",
            n().read ? "text-zen-muted-fg" : "font-medium text-zen-foreground",
          )}
        >
          {n().title}
        </div>
        <Show when={n().description}>
          <div class="mt-0.5 text-xs text-zen-muted-fg leading-snug">
            {n().description}
          </div>
        </Show>
        <div class="mt-1 flex items-center justify-between gap-2">
          <span class="text-[0.65rem] uppercase tracking-wide text-zen-muted-fg">
            {relativeTime(toDate(n().timestamp), props.now)}
          </span>
          <Show when={n().actions}>
            <div class="flex items-center gap-1.5">{n().actions}</div>
          </Show>
        </div>
      </div>
    </>
  );
  const baseClass = () =>
    cn(
      "flex items-start gap-3 px-4 py-2.5 text-left w-full",
      "border-l-2",
      n().read ? "border-transparent" : "border-zen-primary bg-zen-primary-soft/30",
      interactive() &&
        "cursor-pointer hover:bg-zen-muted focus-visible:bg-zen-muted focus-visible:outline-none",
    );
  return (
    <li
      role="listitem"
      aria-current={!n().read ? "true" : undefined}
      class="border-b border-zen-border last:border-b-0"
    >
      <Show
        when={n().href}
        fallback={
          <Show
            when={interactive()}
            fallback={<div class={baseClass()}>{rowContent}</div>}
          >
            <button type="button" onClick={activate} class={cn(baseClass(), "bg-transparent border-0")}>
              {rowContent}
            </button>
          </Show>
        }
      >
        <a
          href={n().href}
          onClick={(e) => {
            if (props.onSelect) {
              e.preventDefault();
              activate();
            }
          }}
          class={cn(baseClass(), "no-underline text-inherit")}
        >
          {rowContent}
        </a>
      </Show>
    </li>
  );
};

const EmptyState = (props: { message: JSX.Element }) => (
  <div class="flex flex-col items-center justify-center px-6 py-10 text-center">
    <span class="text-zen-muted-fg/60 mb-2">
      <BellIcon size={28} />
    </span>
    <p class="text-sm text-zen-muted-fg m-0">{props.message}</p>
  </div>
);

const BellIcon = (props: { size?: number }) => (
  <svg
    width={props.size ?? 18}
    height={props.size ?? 18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
