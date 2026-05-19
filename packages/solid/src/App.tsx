import { type Component, type ParentProps, ErrorBoundary, For, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useTheme } from "./lib/theme";
import "./App.css";

/**
 * App shell — sticky header + collapsible sidebar + content area.
 * Mirrors the React demo's structure and CSS classes (see App.css,
 * copied verbatim from packages/react/src/App.css) so the two demos
 * read identically.
 *
 * Routes render inside an ErrorBoundary so a render-time crash in one
 * demo surfaces inline instead of silently leaving the content area
 * blank.
 */

type NavGroup = {
  group: string;
  items: { label: string; path: string }[];
};

const NAV: NavGroup[] = [
  {
    group: "Primitives",
    items: [
      { label: "Button", path: "/button" },
      { label: "Badge", path: "/badge" },
      { label: "Card", path: "/card" },
      { label: "Skeleton", path: "/skeleton" },
      { label: "Loading", path: "/loading" },
      { label: "FAB", path: "/fab" },
      { label: "Separator", path: "/separator" },
    ],
  },
  {
    group: "Surfaces",
    items: [
      { label: "Alert", path: "/alert" },
      { label: "Banner", path: "/banner" },
      { label: "EmptyState", path: "/empty-state" },
    ],
  },
  {
    group: "Flows",
    items: [{ label: "Stepper", path: "/stepper" }],
  },
  {
    group: "Survey",
    items: [
      { label: "Rating", path: "/rating" },
      { label: "NPS", path: "/nps" },
      { label: "Likert", path: "/likert" },
    ],
  },
  {
    group: "Display (Kobalte)",
    items: [
      { label: "Avatar", path: "/avatar" },
      { label: "Progress", path: "/progress" },
      { label: "Tooltip", path: "/tooltip" },
    ],
  },
  {
    group: "Form (Kobalte)",
    items: [
      { label: "Switch", path: "/switch" },
      { label: "Checkbox", path: "/checkbox" },
      { label: "RadioGroup", path: "/radio-group" },
      { label: "Slider", path: "/slider" },
      { label: "Select", path: "/select" },
    ],
  },
  {
    group: "Disclosure (Kobalte)",
    items: [
      { label: "Tabs", path: "/tabs" },
      { label: "Accordion", path: "/accordion" },
    ],
  },
  {
    group: "Overlays (Kobalte)",
    items: [
      { label: "Popover", path: "/popover" },
      { label: "Dialog", path: "/dialog" },
      { label: "Sheet", path: "/sheet" },
      { label: "DropdownMenu", path: "/dropdown-menu" },
      { label: "Toast", path: "/toast" },
    ],
  },
  {
    group: "Layout",
    items: [{ label: "ScrollArea", path: "/scroll-area" }],
  },
  {
    group: "Form (custom)",
    items: [
      { label: "Input", path: "/input" },
      { label: "NumberField", path: "/number-field" },
      { label: "TagInput", path: "/tag-input" },
      { label: "PhoneInput", path: "/phone-input" },
      { label: "InputOTP", path: "/otp" },
      { label: "FileUpload", path: "/file-upload" },
    ],
  },
  {
    group: "Data",
    items: [
      { label: "DataTable", path: "/data-table" },
      { label: "Combobox", path: "/combobox" },
      { label: "MultiCombobox", path: "/multi-combobox" },
      { label: "VirtualizedItems", path: "/lazy-options" },
    ],
  },
  {
    group: "Forms",
    items: [
      { label: "Form", path: "/form-new" },
      { label: "BoundFields", path: "/bound-fields" },
    ],
  },
  {
    group: "Date & time",
    items: [
      { label: "DatePicker", path: "/date-picker" },
      { label: "DateRangePicker", path: "/date-range-picker" },
      { label: "TimePicker", path: "/time-picker" },
      { label: "DateTimePicker", path: "/date-time-picker" },
    ],
  },
  {
    group: "Composite",
    items: [
      { label: "QRScanner", path: "/qr-scanner" },
      { label: "NotificationsInbox", path: "/notifications-inbox" },
    ],
  },
];

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const RouteError = (props: { err: unknown; reset: () => void }) => (
  <div style={{ padding: "2.4rem", "max-width": "80rem", margin: "0 auto" }}>
    <div
      style={{
        background: "var(--zen-color-error-soft)",
        color: "var(--zen-color-error-soft-fg)",
        border: "1px solid var(--zen-color-error)",
        "border-radius": "0.6rem",
        padding: "1.6rem",
      }}
    >
      <h2 style={{ margin: "0 0 0.8rem", "font-size": "1.6rem" }}>
        Demo failed to render
      </h2>
      <p style={{ margin: "0 0 1rem", "font-size": "1.3rem" }}>
        {props.err instanceof Error ? props.err.message : String(props.err)}
      </p>
      <button
        onClick={props.reset}
        style={{
          padding: "0.6rem 1.2rem",
          "border-radius": "0.4rem",
          border: "1px solid var(--zen-color-error)",
          background: "transparent",
          color: "inherit",
          cursor: "pointer",
          "font-size": "1.3rem",
        }}
      >
        Retry
      </button>
      <details style={{ "margin-top": "1rem", "font-size": "1.2rem" }}>
        <summary style={{ cursor: "pointer" }}>Stack</summary>
        <pre style={{ overflow: "auto", "font-size": "1.1rem", "white-space": "pre-wrap" }}>
          {props.err instanceof Error ? props.err.stack : ""}
        </pre>
      </details>
    </div>
  </div>
);

const App: Component<ParentProps> = (props) => {
  const { theme, setTheme, themes } = useTheme();
  const [collapsed, setCollapsed] = createSignal(false);

  return (
    <div class="app-shell">
      <header class="app-header">
        <div class="app-header-left">
          <button
            type="button"
            class="sidebar-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed() ? "Open sidebar" : "Close sidebar"}
          >
            <MenuIcon />
          </button>
          <div class="app-header-text">
            <h1 class="app-title">Zen UI · Solid</h1>
            <p class="app-subtitle">@algorisys/zen-ui-solid · component demo</p>
          </div>
        </div>
        <div class="app-header-actions">
          <label style={{
            display: "inline-flex",
            "align-items": "center",
            gap: "0.8rem",
            "font-size": "1.3rem",
            color: "var(--zen-color-muted-fg)",
          }}>
            Theme
            <select
              value={theme()}
              onChange={(e) => setTheme(e.currentTarget.value as never)}
              style={{
                padding: "0.5rem 0.8rem",
                "border-radius": "0.4rem",
                border: "1px solid var(--zen-color-border)",
                background: "var(--zen-color-background)",
                color: "var(--zen-color-foreground)",
                "font-size": "1.3rem",
                cursor: "pointer",
              }}
            >
              <For each={themes}>{(t) => <option value={t.name}>{t.label}</option>}</For>
            </select>
          </label>
        </div>
      </header>

      <div class="app-body">
        <aside class={`sidebar ${collapsed() ? "is-collapsed" : ""}`}>
          <nav>
            <For each={NAV}>
              {(group) => (
                <div class="sidebar-group">
                  <h3 class="sidebar-group-title">{group.group}</h3>
                  <ul class="sidebar-list">
                    <For each={group.items}>
                      {(item) => (
                        <li>
                          <A
                            href={item.path}
                            class="sidebar-link sidebar-link-inactive"
                            activeClass="sidebar-link sidebar-link-active"
                            inactiveClass="sidebar-link-inactive"
                            end
                          >
                            {item.label}
                          </A>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              )}
            </For>
          </nav>
        </aside>
        <main class="app-content">
          <ErrorBoundary fallback={(err, reset) => <RouteError err={err} reset={reset} />}>
            {props.children}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default App;
