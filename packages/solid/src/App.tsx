import type { Component } from "solid-js";
import { For } from "solid-js";
import { useTheme } from "./lib/theme";

/**
 * Bootstrap demo for @algorisys/zen-ui-solid.
 * Verifies that:
 *   - solid-js + vite-plugin-solid + UnoCSS toolchain works,
 *   - core's tokens.css / preflight.css load and resolve --zen-* vars,
 *   - the useTheme signal-based hook switches data-theme on <html>,
 *   - shared design tokens render identically to the React binding.
 *
 * Components are added below as they are ported (Tier 1 → Tier 2 → Tier 3).
 */
const App: Component = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div class="min-h-full p-8 bg-zen-background text-zen-foreground">
      <header class="flex items-baseline justify-between mb-6 pb-4 border-b border-zen-border">
        <div>
          <h1 class="text-2xl font-semibold m-0">Zen UI · Solid</h1>
          <p class="text-zen-muted-fg text-sm mt-1">
            Bootstrap demo. Components arrive as they are ported.
          </p>
        </div>
        <label class="text-sm flex items-center gap-2">
          Theme
          <select
            class="rounded-zen-md border border-zen-border px-2 py-1 bg-zen-background"
            value={theme()}
            onChange={(e) => setTheme(e.currentTarget.value as never)}
          >
            <For each={themes}>
              {(t) => <option value={t.name}>{t.label}</option>}
            </For>
          </select>
        </label>
      </header>

      <section class="grid grid-cols-3 gap-4 max-w-3xl">
        <For each={themes}>
          {(t) => (
            <div
              class="rounded-zen-md border border-zen-border p-3 shadow-zen-sm"
              data-theme={t.name}
            >
              <div class="text-xs uppercase tracking-wide text-zen-muted-fg mb-2">
                {t.name}
              </div>
              <div class="flex gap-2 mb-2">
                <span
                  class="w-6 h-6 rounded-zen-full"
                  style={{ "background-color": t.preview[0] }}
                />
                <span
                  class="w-6 h-6 rounded-zen-full"
                  style={{ "background-color": t.preview[1] }}
                />
                <span
                  class="w-6 h-6 rounded-zen-full"
                  style={{ "background-color": t.preview[2] }}
                />
              </div>
              <div class="text-sm">{t.description}</div>
            </div>
          )}
        </For>
      </section>
    </div>
  );
};

export default App;
