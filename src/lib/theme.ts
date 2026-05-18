import * as React from "react";

/**
 * Theme registry + useTheme hook.
 *
 * Themes are CSS-driven: each entry in THEMES corresponds to a
 * `:root[data-theme="<name>"]` block in src/styles/tokens.css.
 * Switching is just toggling the `data-theme` attribute on <html>; no
 * React tree re-renders are required (CSS variables cascade), but
 * useTheme exposes the current value as state so UI like the switcher
 * can show which one is active.
 *
 * Persistence: the chosen theme is saved to localStorage under
 * `zen-ui-theme` and restored on mount. A custom event (`zen:theme-change`)
 * is dispatched so multiple useTheme() consumers stay in sync.
 */

export type ThemeName = "default" | "zen-theme" | "dark";

export interface ThemeDescriptor {
  name: ThemeName;
  label: string;
  /** Short blurb shown in the switcher for context. */
  description: string;
  /** Three colour swatches for the switcher preview. */
  preview: [string, string, string];
}

export const THEMES: ThemeDescriptor[] = [
  {
    name: "default",
    label: "Default",
    description: "Algorisys brand palette — blue + red",
    preview: ["#1C43B9", "#CE1010", "#F5F5F5"],
  },
  {
    name: "zen-theme",
    label: "Zen",
    description: "Algorisys Zen theme — classic blue + full 10-step shade scale",
    preview: ["#214698", "#E23318", "#F3F3F4"],
  },
  {
    name: "dark",
    label: "Dark",
    description: "Inverted surfaces for low-light environments",
    preview: ["#6B8FE8", "#F26464", "#0F172A"],
  },
];

const STORAGE_KEY = "zen-ui-theme";
const EVENT_NAME = "zen:theme-change";

const isThemeName = (v: unknown): v is ThemeName =>
  v === "default" || v === "zen-theme" || v === "dark";

export function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") return "default";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isThemeName(stored) ? stored : "default";
}

export function applyTheme(name: ThemeName) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", name);
  try {
    window.localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // ignore quota / private-mode errors
  }
  window.dispatchEvent(new CustomEvent<ThemeName>(EVENT_NAME, { detail: name }));
}

export function useTheme() {
  const [theme, setThemeState] = React.useState<ThemeName>(() => getInitialTheme());

  // On mount, ensure the DOM matches state (handles SSR / first paint).
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Listen for theme changes triggered elsewhere (other component instances).
  React.useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent<ThemeName>).detail;
      if (isThemeName(next) && next !== theme) {
        setThemeState(next);
      }
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, [theme]);

  const setTheme = React.useCallback((next: ThemeName) => {
    setThemeState(next);
    applyTheme(next);
  }, []);

  return { theme, setTheme, themes: THEMES };
}
