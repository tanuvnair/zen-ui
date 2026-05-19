import { For } from "solid-js";
import { useTheme } from "../lib/theme";

const Welcome = () => {
  const { themes } = useTheme();
  return (
    <div>
      <h1 class="text-2xl font-semibold m-0">Zen UI — Solid binding</h1>
      <p class="text-zen-muted-fg mt-2 max-w-xl">
        SolidJS port of <code>@algorisys/zen-ui-react</code>. Components share
        design tokens, the UnoCSS preset and theme primitives with the React
        binding via <code>@algorisys/zen-ui-core</code>. Pick a component from
        the sidebar to see its demo.
      </p>

      <section class="mt-8">
        <div class="text-xs uppercase tracking-wide text-zen-muted-fg mb-2">
          Available themes
        </div>
        <div class="grid grid-cols-3 gap-3 max-w-3xl">
          <For each={themes}>
            {(t) => (
              <div
                class="rounded-zen-md border border-zen-border p-3 shadow-zen-sm"
                data-theme={t.name}
              >
                <div class="font-medium text-sm">{t.label}</div>
                <div class="flex gap-2 my-2">
                  <span class="w-5 h-5 rounded-zen-full" style={{ "background-color": t.preview[0] }} />
                  <span class="w-5 h-5 rounded-zen-full" style={{ "background-color": t.preview[1] }} />
                  <span class="w-5 h-5 rounded-zen-full" style={{ "background-color": t.preview[2] }} />
                </div>
                <div class="text-xs text-zen-muted-fg">{t.description}</div>
              </div>
            )}
          </For>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
