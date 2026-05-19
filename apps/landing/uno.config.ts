import { defineConfig, presetUno } from "unocss";
import { zenUnoPostprocess, zenUnoTheme } from "@algorisys/zen-ui-core/uno-preset";

// Shares the zen theme + rem rescale with both component bindings so
// the landing page reads as part of the same design system.
export default defineConfig({
  presets: [presetUno()],
  postprocess: zenUnoPostprocess,
  theme: zenUnoTheme,
});
