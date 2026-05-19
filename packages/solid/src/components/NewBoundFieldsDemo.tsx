import { lazy } from "solid-js";
import { DemoPage } from "./demo-helpers";

// BoundFields demos share UI with the Form demo. This route exists so
// the sidebar's "BoundFields" entry has a target — it re-uses the form
// demo as a single source of truth.
const FormDemo = lazy(() => import("./NewFormDemo"));

const NewBoundFieldsDemo = () => (
  <DemoPage
    title="BoundFields"
    description="See the Form demo — BoundInput / BoundSelect / BoundCheckbox / BoundSwitch / BoundRadioGroup / BoundTextarea + Compound primitives are all demonstrated there."
  >
    <FormDemo />
  </DemoPage>
);

export default NewBoundFieldsDemo;
