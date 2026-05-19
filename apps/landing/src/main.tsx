/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "@algorisys/zen-ui-core/tokens.css";
import "@algorisys/zen-ui-core/preflight.css";
import "virtual:uno.css";

import App from "./App";
import { applyTheme, getInitialTheme } from "@algorisys/zen-ui-core/theme";

applyTheme(getInitialTheme());

const root = document.getElementById("root");
if (!root) throw new Error("#root not found");
render(() => <App />, root);
