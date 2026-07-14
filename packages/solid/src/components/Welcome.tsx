import { For } from "solid-js";
import { useTheme } from "../lib/theme";

const Welcome = () => {
  const { themes } = useTheme();
  return (
    <div>
      <h1 class="zen-text-2xl zen-font-semibold zen-m-0">Zen UI — Solid binding</h1>
      <p class="zen-text-zen-muted-fg zen-mt-2 zen-max-w-xl">
        SolidJS port of <code>@algorisys/zen-ui-react</code>. Components share
        design tokens, the UnoCSS preset and theme primitives with the React
        binding via <code>@algorisys/zen-ui-core</code>. Pick a component from
        the sidebar to see its demo.
      </p>

      <section class="zen-mt-8">
        <div class="zen-text-xs zen-uppercase zen-tracking-wide zen-text-zen-muted-fg zen-mb-2">
          Available themes
        </div>
        <div class="zen-grid zen-grid-cols-3 zen-gap-3 zen-max-w-3xl">
          <For each={themes}>
            {(t) => (
              <div
                class="zen-rounded-zen-md zen-border zen-border-zen-border zen-p-3 zen-shadow-zen-sm"
                data-theme={t.name}
              >
                <div class="zen-font-medium zen-text-sm">{t.label}</div>
                <div class="zen-flex zen-gap-2 zen-my-2">
                  <span class="zen-w-5 zen-h-5 zen-rounded-zen-full" style={{ "background-color": t.preview[0] }} />
                  <span class="zen-w-5 zen-h-5 zen-rounded-zen-full" style={{ "background-color": t.preview[1] }} />
                  <span class="zen-w-5 zen-h-5 zen-rounded-zen-full" style={{ "background-color": t.preview[2] }} />
                </div>
                <div class="zen-text-xs zen-text-zen-muted-fg">{t.description}</div>
              </div>
            )}
          </For>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
