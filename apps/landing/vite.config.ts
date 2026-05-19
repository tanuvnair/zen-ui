import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import UnoCSS from "unocss/vite";

// Landing app — served at the repo root path. When deployed to GH-Pages
// alongside the per-binding demos, this is the entry point at `/zen-ui/`,
// with `/zen-ui/builder/` and `/zen-ui/builder-solid/` linked from cards.
export default defineConfig({
  base: "/",
  plugins: [solid(), UnoCSS()],
  build: {
    copyPublicDir: true,
    outDir: "dist",
  },
});
