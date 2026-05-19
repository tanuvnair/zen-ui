// ============================================================================
// @algorisys/zen-ui-solid — public exports
// ============================================================================
// Side-effect CSS imports. Tokens must load before any UnoCSS utility
// (bg-zen-*, text-zen-*, …) is evaluated, otherwise those classes
// resolve to var(--zen-color-…) → empty.
import "@algorisys/zen-ui-core/tokens.css";
import "@algorisys/zen-ui-core/preflight.css";
import "virtual:uno.css";

// Theming
export { useTheme, applyTheme, getInitialTheme, THEMES } from "./lib/theme";
export type { ThemeName, ThemeDescriptor } from "./lib/theme";

// Utility
export { cn } from "./lib/cn";

// Components are added as they are ported. See todo.md and the README
// "Repository layout" section for the porting plan.
