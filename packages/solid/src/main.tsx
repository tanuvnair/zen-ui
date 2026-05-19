/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
// Design tokens (defines --zen-color-* / --zen-radius-* / --zen-shadow-* per
// data-theme). MUST load before any UnoCSS utility (bg-zen-*, text-zen-*, …)
// is evaluated, otherwise those classes resolve to var(--zen-color-…) → empty.
import "@algorisys/zen-ui-core/tokens.css";
import "@algorisys/zen-ui-core/preflight.css";
import "virtual:uno.css";

import App from "./App";
import { applyTheme, getInitialTheme } from "./lib/theme";

// Apply the persisted theme BEFORE Solid renders to avoid a flash of
// default styling on first paint when the user has previously picked
// Zen or Dark. @solidjs/router will be wired in once there are multiple
// demo routes — mirroring the React side's BrowserRouter setup.
applyTheme(getInitialTheme());

const root = document.getElementById("root");
if (!root) throw new Error("#root not found");

render(() => <App />, root);
