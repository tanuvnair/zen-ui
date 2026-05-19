import { defineConfig, presetUno } from "unocss";
import { zenUnoPostprocess, zenUnoTheme } from "@algorisys/zen-ui-core/uno-preset";

// The theme (--zen-color-* → bg-zen-*, etc.) and the 62.5% rem rescale
// are shared with every other zen-ui binding via @algorisys/zen-ui-core.
// Only the unocss wiring (presetUno + defineConfig) lives here.
export default defineConfig({
  presets: [presetUno()],
  postprocess: zenUnoPostprocess,
  theme: zenUnoTheme,
});
