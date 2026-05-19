import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import UnoCSS from "unocss/vite";

// Demo app configuration for the SolidJS binding. Mirrors packages/react/
// vite.config.demo.ts. Served on its own port; base path differs from the
// React demo so the two can deploy side-by-side without route collisions.
export default defineConfig({
  base: "/builder-solid/",
  plugins: [solid(), UnoCSS()],
  build: {
    copyPublicDir: true,
    outDir: "dist",
  },
});
