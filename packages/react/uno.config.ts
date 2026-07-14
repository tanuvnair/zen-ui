import { defineConfig, presetUno } from "unocss";
import { ZEN_PREFIX, zenUnoTheme } from "@algorisys/zen-ui-core/uno-preset";

// The theme (--zen-color-* → zen-bg-zen-*, etc.) and the `zen-` utility prefix
// are shared with every other zen-ui binding via @algorisys/zen-ui-core.
// Only the unocss wiring (presetUno + defineConfig) lives here.
//
// `prefix` is what keeps the published stylesheet from colliding with the
// consuming app's own CSS: every class emits as `.zen-*`, so zen-ui's
// `.zen-p-4` can never fight Bootstrap's `.p-4` (1.5rem) or a custom Tailwind
// theme's. Variants are authored OUTSIDE the prefix (`hover:zen-bg-zen-primary`)
// — that is the form UnoCSS matches. `cn()` mirrors this prefix via
// extendTailwindMerge; the two must not drift apart.
export default defineConfig({
  presets: [presetUno({ prefix: ZEN_PREFIX })],
  theme: zenUnoTheme,
});
