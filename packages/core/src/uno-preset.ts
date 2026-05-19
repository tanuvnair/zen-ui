/**
 * UnoCSS theme + postprocess used by every zen-ui binding.
 *
 * Why this lives in core: the shared design tokens (--zen-color-*,
 * --zen-radius-*, --zen-shadow-*) and the 62.5% rem-rescale compensation
 * apply identically regardless of which framework the components are
 * authored in. Each binding's uno.config.ts assembles a defineConfig
 * with these pieces + `presetUno()`, so the binding (not core) owns the
 * unocss dependency.
 */

// Compensation factor for the project-wide `html { font-size: 62.5% }` rule
// in the consuming app's index.css. That makes 1rem = 10px so legacy SCSS
// can write `1.4rem` to mean 14px. UnoCSS preset-uno ships Tailwind's
// defaults assuming the browser default 1rem = 16px, so every rem-based
// utility (h-*, text-*, p-*, gap-*, …) would otherwise render at 62.5% of
// its intended size. We rescale every rem value UnoCSS emits by 16/10 = 1.6,
// leaving raw rem CSS untouched.
const REM_SCALE = 1.6;

type UnoUtilEntries = { entries: Array<[string, unknown]> };

export const zenUnoPostprocess = (util: UnoUtilEntries): void => {
  util.entries.forEach((entry) => {
    const value = entry[1];
    if (typeof value === "string" && value.includes("rem")) {
      entry[1] = value.replace(/(-?[\d.]+)rem/g, (_, n) => {
        const scaled = parseFloat(n) * REM_SCALE;
        // Round to 4 decimals to avoid float artefacts like 4.000000001rem.
        return `${Number(scaled.toFixed(4))}rem`;
      });
    }
  });
};

/**
 * UnoCSS `theme` block — wires the design tokens declared in
 * `@algorisys/zen-ui-core/tokens.css` into the utility theme so classes
 * like `bg-zen-primary`, `text-zen-primary-fg`, `ring-zen-ring` resolve
 * to `var(--zen-color-*)` and consumers can retheme by overriding those
 * vars.
 */
export const zenUnoTheme = {
  colors: {
    zen: {
      primary: "var(--zen-color-primary)",
      "primary-fg": "var(--zen-color-primary-fg)",
      "primary-soft": "var(--zen-color-primary-soft)",
      "primary-soft-fg": "var(--zen-color-primary-soft-fg)",
      neutral: "var(--zen-color-neutral)",
      "neutral-fg": "var(--zen-color-neutral-fg)",
      "neutral-soft": "var(--zen-color-neutral-soft)",
      "neutral-soft-fg": "var(--zen-color-neutral-soft-fg)",
      info: "var(--zen-color-info)",
      "info-fg": "var(--zen-color-info-fg)",
      "info-soft": "var(--zen-color-info-soft)",
      "info-soft-fg": "var(--zen-color-info-soft-fg)",
      success: "var(--zen-color-success)",
      "success-fg": "var(--zen-color-success-fg)",
      "success-soft": "var(--zen-color-success-soft)",
      "success-soft-fg": "var(--zen-color-success-soft-fg)",
      warning: "var(--zen-color-warning)",
      "warning-fg": "var(--zen-color-warning-fg)",
      "warning-soft": "var(--zen-color-warning-soft)",
      "warning-soft-fg": "var(--zen-color-warning-soft-fg)",
      error: "var(--zen-color-error)",
      "error-fg": "var(--zen-color-error-fg)",
      "error-soft": "var(--zen-color-error-soft)",
      "error-soft-fg": "var(--zen-color-error-soft-fg)",
      background: "var(--zen-color-background)",
      foreground: "var(--zen-color-foreground)",
      muted: "var(--zen-color-muted)",
      "muted-fg": "var(--zen-color-muted-fg)",
      border: "var(--zen-color-border)",
      ring: "var(--zen-color-ring)",
      // Named accents — surface ad-hoc brand colours (badges, decorative
      // highlights). Defined in tokens.css; alias here so utility classes
      // like bg-zen-accent-magenta / text-zen-accent-purple resolve.
      "accent-orange": "var(--zen-color-accent-orange)",
      "accent-purple": "var(--zen-color-accent-purple)",
      "accent-magenta": "var(--zen-color-accent-magenta)",
      "accent-cream": "var(--zen-color-accent-cream)",
      "accent-light-blue": "var(--zen-color-accent-light-blue)",
    },
  },
  borderRadius: {
    "zen-sm": "var(--zen-radius-sm)",
    "zen-md": "var(--zen-radius-md)",
    "zen-lg": "var(--zen-radius-lg)",
    "zen-full": "var(--zen-radius-full)",
  },
  boxShadow: {
    "zen-xs": "var(--zen-shadow-xs)",
    "zen-sm": "var(--zen-shadow-sm)",
    "zen-md": "var(--zen-shadow-md)",
    "zen-lg": "var(--zen-shadow-lg)",
    "zen-xl": "var(--zen-shadow-xl)",
    "zen-2xl": "var(--zen-shadow-2xl)",
  },
} as const;
