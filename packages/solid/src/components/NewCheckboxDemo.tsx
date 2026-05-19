import { createSignal } from "solid-js";
import { Checkbox } from "./form/checkbox/checkbox";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewCheckboxDemo = () => {
  const [a, setA] = createSignal(false);
  return (
    <DemoPage
      title="Checkbox"
      description="Three-state checkbox (off / on / indeterminate) built on Kobalte Checkbox."
    >
      <DemoSection title="Sizes">
        <Checkbox size="sm" defaultChecked label="Small" />
        <Checkbox size="md" defaultChecked label="Medium" />
        <Checkbox size="lg" defaultChecked label="Large" />
      </DemoSection>

      <DemoSection title="Controlled">
        <Checkbox checked={a()} onChange={setA} label={a() ? "Checked" : "Unchecked"} />
      </DemoSection>

      <DemoSection title="Indeterminate">
        <Checkbox indeterminate label="Select all" />
      </DemoSection>

      <DemoSection title="Disabled">
        <Checkbox disabled label="Off (disabled)" />
        <Checkbox defaultChecked disabled label="On (disabled)" />
      </DemoSection>
    </DemoPage>
  );
};

export default NewCheckboxDemo;
