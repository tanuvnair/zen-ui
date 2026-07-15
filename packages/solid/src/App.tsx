import { type Component, type ParentProps, ErrorBoundary, For, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { useTheme } from "./lib/theme";
import { NAV } from "./nav";
import ReleaseNotes from "./components/ReleaseNotes";

/**
 * Derived from NAV, never hand-counted: nav.ts is already the single source of
 * truth for the sidebar and the landing catalogue, and a hard-coded number here
 * would drift the moment a component is added. `catalogue: false` groups
 * (Getting started) are routes, not components, so they do not count.
 */
const COMPONENT_COUNT = NAV.filter((g) => g.catalogue !== false).reduce(
  (n, g) => n + g.items.length,
  0,
);

/**
 * The root site, one level up from this demo's own base — derived, not "/".
 * The demo is mounted at /builder-solid/ under `dev:all` and at
 * /zen-ui/builder-solid/ on GH-Pages, and the way out has to land on the right
 * root in both. Hardcoding "/" would walk out of the deployment entirely.
 */
const ROOT_URL = new URL("..", new URL(import.meta.env.BASE_URL, window.location.origin))
  .pathname;
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



const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const RouteError = (props: { err: unknown; reset: () => void }) => (
  <div style={{ padding: "1.5rem", "max-width": "50rem", margin: "0 auto" }}>
    <div
      style={{
        background: "var(--zen-color-error-soft)",
        color: "var(--zen-color-error-soft-fg)",
        border: "1px solid var(--zen-color-error)",
        "border-radius": "0.375rem",
        padding: "1rem",
      }}
    >
      <h2 style={{ margin: "0 0 0.5rem", "font-size": "1rem" }}>
        Demo failed to render
      </h2>
      <p style={{ margin: "0 0 0.625rem", "font-size": "0.8125rem" }}>
        {props.err instanceof Error ? props.err.message : String(props.err)}
      </p>
      <button
        onClick={props.reset}
        style={{
          padding: "0.375rem 0.75rem",
          "border-radius": "0.25rem",
          border: "1px solid var(--zen-color-error)",
          background: "transparent",
          color: "inherit",
          cursor: "pointer",
          "font-size": "0.8125rem",
        }}
      >
        Retry
      </button>
      <details style={{ "margin-top": "0.625rem", "font-size": "0.75rem" }}>
        <summary style={{ cursor: "pointer" }}>Stack</summary>
        <pre style={{ overflow: "auto", "font-size": "0.6875rem", "white-space": "pre-wrap" }}>
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
            <p class="app-subtitle">@algorisys/zen-ui-solid · component demo · {COMPONENT_COUNT} components</p>
          </div>
        </div>
        <div class="app-header-actions">
          {/* A real anchor, not the router's <A>: this leaves the SPA for the
              root site, so the router must not intercept it. */}
          <a class="app-home-link" href={ROOT_URL}>
            <span aria-hidden="true">←</span> All demos
          </a>
          <label style={{
            display: "inline-flex",
            "align-items": "center",
            gap: "0.5rem",
            "font-size": "0.8125rem",
            color: "var(--zen-color-muted-fg)",
          }}>
            Theme
            <select
              value={theme()}
              onChange={(e) => setTheme(e.currentTarget.value as never)}
              style={{
                padding: "0.3125rem 0.5rem",
                "border-radius": "0.25rem",
                border: "1px solid var(--zen-color-border)",
                background: "var(--zen-color-background)",
                color: "var(--zen-color-foreground)",
                "font-size": "0.8125rem",
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
                          {/*
                            `sidebar-link` must appear ONLY in `class`. Router
                            puts activeClass/inactiveClass into a classList, and
                            listing `sidebar-link` there too meant that when a
                            link went active -> inactive the whole activeClass
                            token set was removed — stripping `sidebar-link`
                            itself. Links you had navigated away from rendered
                            unstyled.
                          */}
                          <A
                            href={item.path}
                            class="sidebar-link"
                            activeClass="sidebar-link-active"
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
      <footer class="app-footer">
        <span>
          © {new Date().getFullYear()}{" "}
          <a href="https://www.algorisys.com" target="_blank" rel="noreferrer noopener">
            Algorisys Technologies Pvt. Ltd
          </a>
          <span class="app-footer-sep">·</span>
          zen-ui · Kobalte-backed components
        </span>
        <ReleaseNotes />
      </footer>
    </div>
  );
};

export default App;
