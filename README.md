# @algorisys/zen-ui

A React component library shipping **shadcn-style primitives on top of
Radix UI**, themed via CSS custom properties. Every component forwards
a ref, supports `asChild` where it makes sense, and exposes a flat
React-idiomatic prop API.

```bash
npm install @algorisys/zen-ui
```

```tsx
import {
  Button,
  Dialog,
  DataTable,
  Combobox,
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@algorisys/zen-ui";

import "@algorisys/zen-ui/styles";   // tokens + utility classes
```

See the demo at `/builder/` for live examples of every component.

---

## Status

- 21 primitive components on the shadcn / Radix-style API.
- Higher-level primitives shipped: `Form` (RHF + Zod), `DataTable`
  (TanStack Table + Virtual), `Combobox` (cmdk; sync + async), `Alert`,
  `Popover`, `VirtualizedItems`.
- 3 built-in themes: **default** (Algorisys brand), **zen-theme**
  (Algorisys Zen palette), **dark**. Theme switcher in the demo shell
  header.

See [todo.md](./todo.md) for the deferred-work list (column drag /
resize on DataTable, async-validated form fields, high-contrast theme,
release housekeeping, etc.).

---

## Theming

All visual properties — colours, radii, shadows, spacing — are CSS
custom properties prefixed `--zen-*`, declared in
[`src/styles/tokens.css`](./src/styles/tokens.css). Components reference
the tokens via UnoCSS utility classes like `bg-zen-primary`,
`rounded-zen-md`, `shadow-zen-sm`.

### Built-in themes

| Theme | `data-theme` value | Notes |
|---|---|---|
| Default | `default` (or unset) | Algorisys brand palette — blue `#1C43B9`, red `#CE1010` |
| Zen | `zen-theme` | Algorisys Zen palette — full 10-step shade scales per role |
| Dark | `dark` | Inverted surfaces; falls out of the same mechanism |

Switch the active theme at runtime:

```tsx
import { useTheme } from "@algorisys/zen-ui";

function MyHeader() {
  const { theme, setTheme, themes } = useTheme();
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
      {themes.map((t) => (
        <option key={t.name} value={t.name}>{t.label}</option>
      ))}
    </select>
  );
}
```

Or set the attribute directly on `<html>`:

```html
<html data-theme="zen-theme">
```

The choice is persisted to `localStorage` under the key `zen-ui-theme`.
For SSR-safe initial paint, apply the persisted theme **before** React
renders:

```tsx
// main.tsx
import { applyTheme, getInitialTheme } from "@algorisys/zen-ui";
applyTheme(getInitialTheme());

createRoot(document.getElementById("root")!).render(<App />);
```

### Creating a new theme

A theme is a single CSS block that re-binds the `--zen-*` variables on
a `:root[data-theme="<name>"]` selector. **No component code changes
are needed** — components only read the tokens.

#### Step 1 — pick a name

The name shows up in the URL-like attribute (`data-theme="..."`) and in
the `ThemeName` union type. Use a short, slug-style identifier.

```
sapphire    /* good */
my-new      /* good */
"Pretty"    /* avoid spaces and capitals */
```

#### Step 2 — add a CSS block to `src/styles/tokens.css`

Copy the structure of an existing theme (default or zen-theme) and override
every token. The full token list:

```css
:root[data-theme="sapphire"] {
  /* Brand & status palette ----------------------------------------- */
  --zen-color-primary:        #1E40AF;
  --zen-color-primary-fg:     #ffffff;
  --zen-color-primary-soft:   #DBEAFE;
  --zen-color-primary-soft-fg: #1E40AF;

  --zen-color-neutral:        #1F2937;
  --zen-color-neutral-fg:     #ffffff;
  --zen-color-neutral-soft:   #F3F4F6;
  --zen-color-neutral-soft-fg: #1F2937;

  --zen-color-info:           #0369A1;
  --zen-color-info-fg:        #ffffff;
  --zen-color-info-soft:      #E0F2FE;
  --zen-color-info-soft-fg:   #075985;

  --zen-color-success:        #16A34A;
  --zen-color-success-fg:     #ffffff;
  --zen-color-success-soft:   #DCFCE7;
  --zen-color-success-soft-fg: #166534;

  --zen-color-warning:        #D97706;
  --zen-color-warning-fg:     #1F2937;
  --zen-color-warning-soft:   #FEF3C7;
  --zen-color-warning-soft-fg: #92400E;

  --zen-color-error:          #DC2626;
  --zen-color-error-fg:       #ffffff;
  --zen-color-error-soft:     #FEE2E2;
  --zen-color-error-soft-fg:  #991B1B;

  /* Surface & border ------------------------------------------------ */
  --zen-color-background:     #ffffff;
  --zen-color-foreground:     #1F2937;
  --zen-color-muted:          #F9FAFB;
  --zen-color-muted-fg:       #6B7280;
  --zen-color-border:         #E5E7EB;
  --zen-color-ring:           #1E40AF;

  /* Status indicators (used by Avatar etc.) ------------------------ */
  --zen-status-online:        #16A34A;
  --zen-status-offline:       #6B7280;
  --zen-status-away:          #D97706;
  --zen-status-busy:          #DC2626;

  /* (Optional) full shade scales if you want to expose them ---------
   * The zen-theme exposes --zen-color-primary-{20,50,…,900} etc. so
   * consumers can pick a specific shade. The role-based aliases
   * above are the minimum required set. */
}
```

#### Step 3 — register the theme in `src/lib/theme.ts`

Add an entry to the `THEMES` array so it appears in the switcher and
becomes a valid value for `ThemeName`:

```ts
export type ThemeName = "default" | "zen-theme" | "dark" | "sapphire";

export const THEMES: ThemeDescriptor[] = [
  // ... existing themes
  {
    name: "sapphire",
    label: "Sapphire",
    description: "Deep blue + warm accents",
    preview: ["#1E40AF", "#DC2626", "#F3F4F6"],   // 3 swatch hexes
  },
];
```

That's it — the dropdown picks it up automatically.

#### Step 4 — verify contrast

Run the demo and switch to your new theme. Visit a handful of pages —
especially `/button-new`, `/alert`, `/data-table`, `/form-new` — and
check that:
- Text on every soft-bg variant is readable (aim for WCAG AA: 4.5:1
  for body text, 3:1 for ≥14 pt bold).
- Focus rings (`--zen-color-ring`) are visible on hover / keyboard
  focus.
- Status dots on Avatar look distinct from each other.

For a quick sanity check use a contrast-ratio tool like
[`whocanuse.com`](https://www.whocanuse.com).

#### Step 5 — (optional) override tokens at a sub-tree

`data-theme` doesn't have to live on `<html>`. Set it on any ancestor
to scope a theme to part of the tree:

```tsx
<main data-theme="default">…</main>
<aside data-theme="dark">…</aside>
```

Both panes use `--zen-*` tokens; CSS variable inheritance handles the
rest.

### Token reference

| Family | Tokens | Where it's used |
|---|---|---|
| Colour roles | `--zen-color-{primary, neutral, info, success, warning, error}` (+ `-fg`, `-soft`, `-soft-fg`) | Buttons, badges, alerts, switches, etc. |
| Surfaces | `--zen-color-{background, foreground, muted, muted-fg, border, ring}` | Cards, inputs, popovers, table rows |
| Status indicators | `--zen-status-{online, offline, away, busy}` | Avatar status dot |
| Radii | `--zen-radius-{sm, md, lg, full}` | `rounded-zen-*` utility |
| Shadows | `--zen-shadow-{xs, sm, md, lg, xl, 2xl}` | `shadow-zen-*` utility |
| Spacing | `--zen-space-{0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16}` | Reserved; not yet used by primitives |
| Zen-only scales | `--zen-color-<role>-{20, 50, 100, …, 900}` | Available for direct lookup when `data-theme="zen-theme"` |

---

## Component overview

See the demo app `/builder/` for live examples.

### Primitives

- Button · Tooltip · DropdownMenu · Separator · Switch · Checkbox
- RadioGroup · Progress · Avatar · Badge · Skeleton · Loading
- Select · Slider · ScrollArea · Input + Textarea · NumberField
- DatePicker · InputOTP · PhoneInput · FAB · Popover

### Higher-level primitives

- **Form** — react-hook-form + Zod with FormField / FormItem / FormLabel
  / FormControl / FormDescription / FormMessage. `/form-new` demo.
- **DataTable** — TanStack Table + Virtual. Toggleable sorting,
  pagination, filter, row selection, column visibility, virtualization,
  server-driven pagination. `/data-table` demo.
- **Combobox** — cmdk-backed; sync (`options`) or async (`onSearch`).
  `/combobox` demo.
- **VirtualizedItems** — drop-in windowing for huge option lists inside
  `SelectContent` / `DropdownMenuContent`. `/lazy-options` demo.
- **Alert** — Zen-theme-spec banner; compound API (Icon / Title /
  Description / Actions / Close). `/alert` demo.

### Theme + utility exports

- `useTheme()` / `applyTheme()` / `getInitialTheme()` / `THEMES`
- `cn(...)` — `clsx + tailwind-merge`

---

## Architecture references

- **`docs/rp-review-1.md`** — initial library review (pre-refactor).
- **`docs/rp-shadcn-radix-gap.md`** — the migration rubric: shadcn /
  Radix patterns + how each component maps.
- **`todo.md`** — deferred-work tracker (Phase 2 + release housekeeping).

---

## Local development

```bash
npm install
npm run dev          # demo app, served at /builder/
npm run build:lib    # build the library to dist/
npm run lint
```

Typecheck: `npx tsc -b`. Tests: not yet wired up — see `todo.md`.
