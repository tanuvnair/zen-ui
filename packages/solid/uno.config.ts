import { defineConfig, presetUno } from "unocss";
import { ZEN_PREFIX, zenUnoTheme } from "@algorisys/zen-ui-core/uno-preset";

// Mirror of packages/react/uno.config.ts — see the rationale for `prefix`
// there. Both bindings must emit the same `.zen-*` namespace so an app can
// load either (or both) alongside its own CSS without collisions.
export default defineConfig({
  presets: [presetUno({ prefix: ZEN_PREFIX })],
  theme: zenUnoTheme,
});
