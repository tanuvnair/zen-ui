import { DemoPage } from "./demo-helpers";
import NewFormDemo from "./NewFormDemo";

/**
 * BoundFields shares its UI with the Form demo — every Bound* adapter
 * is exercised there. This route re-renders the same demo so the
 * sidebar's "BoundFields" entry has a target.
 */
const NewBoundFieldsDemo = () => (
  <DemoPage
    title="BoundFields"
    description="See the Form demo below — every Bound* adapter (BoundInput, BoundSelect, BoundCheckbox, BoundSwitch, BoundRadioGroup, BoundTextarea) is exercised."
  >
    <NewFormDemo />
  </DemoPage>
);

export default NewBoundFieldsDemo;
