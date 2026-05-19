/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
// Design tokens (defines --zen-color-* / --zen-radius-* / --zen-shadow-* per
// data-theme). MUST load before any UnoCSS utility (bg-zen-*, text-zen-*, …)
// is evaluated, otherwise those classes resolve to var(--zen-color-…) → empty.
import "@algorisys/zen-ui-core/tokens.css";
import "@algorisys/zen-ui-core/preflight.css";
import "virtual:uno.css";

import App from "./App";
import Welcome from "./components/Welcome";
import { applyTheme, getInitialTheme } from "./lib/theme";

import NewButtonDemo from "./components/NewButtonDemo";
import NewBadgeDemo from "./components/NewBadgeDemo";
import NewCardDemo from "./components/NewCardDemo";
import NewSkeletonDemo from "./components/NewSkeletonDemo";
import NewLoadingDemo from "./components/NewLoadingDemo";
import NewFABDemo from "./components/NewFABDemo";
import NewSeparatorDemo from "./components/NewSeparatorDemo";
import NewAlertDemo from "./components/NewAlertDemo";
import NewBannerDemo from "./components/NewBannerDemo";
import NewEmptyStateDemo from "./components/NewEmptyStateDemo";
import NewStepperDemo from "./components/NewStepperDemo";
import NewRatingDemo from "./components/NewRatingDemo";
import NewNpsDemo from "./components/NewNpsDemo";
import NewLikertDemo from "./components/NewLikertDemo";

applyTheme(getInitialTheme());

const root = document.getElementById("root");
if (!root) throw new Error("#root not found");

render(
  () => (
    <Router base="/builder-solid" root={App}>
      <Route path="/" component={Welcome} />
      <Route path="/button" component={NewButtonDemo} />
      <Route path="/badge" component={NewBadgeDemo} />
      <Route path="/card" component={NewCardDemo} />
      <Route path="/skeleton" component={NewSkeletonDemo} />
      <Route path="/loading" component={NewLoadingDemo} />
      <Route path="/fab" component={NewFABDemo} />
      <Route path="/separator" component={NewSeparatorDemo} />
      <Route path="/alert" component={NewAlertDemo} />
      <Route path="/banner" component={NewBannerDemo} />
      <Route path="/empty-state" component={NewEmptyStateDemo} />
      <Route path="/stepper" component={NewStepperDemo} />
      <Route path="/rating" component={NewRatingDemo} />
      <Route path="/nps" component={NewNpsDemo} />
      <Route path="/likert" component={NewLikertDemo} />
    </Router>
  ),
  root,
);
