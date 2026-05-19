import * as React from "react";
import {
  THEMES,
  THEME_EVENT_NAME,
  applyTheme,
  getInitialTheme,
  isThemeName,
  type ThemeName,
} from "@algorisys/zen-ui-core/theme";

// Re-export the framework-agnostic primitives so consumers of
// @algorisys/zen-ui-react can import them from the binding directly.
export { THEMES, applyTheme, getInitialTheme };
export type { ThemeName, ThemeDescriptor } from "@algorisys/zen-ui-core/theme";

/**
 * React hook layered on top of the core theme primitives. Mirrors the
 * persisted theme as React state so UI like the theme switcher can
 * reflect the active value, and listens for `zen:theme-change` events
 * so multiple useTheme() consumers stay in sync.
 */
export function useTheme() {
  const [theme, setThemeState] = React.useState<ThemeName>(() => getInitialTheme());

  // On mount / when state changes, ensure the DOM matches.
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Listen for theme changes triggered elsewhere (other hook instances).
  React.useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent<ThemeName>).detail;
      if (isThemeName(next) && next !== theme) {
        setThemeState(next);
      }
    };
    window.addEventListener(THEME_EVENT_NAME, handler);
    return () => window.removeEventListener(THEME_EVENT_NAME, handler);
  }, [theme]);

  const setTheme = React.useCallback((next: ThemeName) => {
    setThemeState(next);
    applyTheme(next);
  }, []);

  return { theme, setTheme, themes: THEMES };
}
