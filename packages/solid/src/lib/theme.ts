import { createSignal, onCleanup, onMount } from "solid-js";
import {
  THEMES,
  THEME_EVENT_NAME,
  applyTheme,
  getInitialTheme,
  isThemeName,
  type ThemeName,
} from "@algorisys/zen-ui-core/theme";

// Re-export the framework-agnostic primitives so consumers of
// @algorisys/zen-ui-solid can import them directly from the binding.
export { THEMES, applyTheme, getInitialTheme };
export type { ThemeName, ThemeDescriptor } from "@algorisys/zen-ui-core/theme";

/**
 * Solid hook layered on the core theme primitives. Mirrors the
 * persisted theme as a signal so UI like the theme switcher can
 * reflect the active value, and listens for `zen:theme-change` events
 * so multiple useTheme() consumers stay in sync.
 */
export function useTheme() {
  const [theme, setThemeSignal] = createSignal<ThemeName>(getInitialTheme());

  onMount(() => {
    document.documentElement.setAttribute("data-theme", theme());

    const handler = (e: Event) => {
      const next = (e as CustomEvent<ThemeName>).detail;
      if (isThemeName(next) && next !== theme()) {
        setThemeSignal(next);
        document.documentElement.setAttribute("data-theme", next);
      }
    };
    window.addEventListener(THEME_EVENT_NAME, handler);
    onCleanup(() => window.removeEventListener(THEME_EVENT_NAME, handler));
  });

  const setTheme = (next: ThemeName) => {
    setThemeSignal(next);
    applyTheme(next);
  };

  return { theme, setTheme, themes: THEMES };
}
