import { createSignal } from "solid-js";
import { Switch } from "./form/switch/switch";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewSwitchDemo = () => {
  const [v, setV] = createSignal(false);
  return (
    <DemoPage
      title="Switch"
      description="Two-state toggle built on Kobalte Switch. Supports controlled + uncontrolled."
    >
      <DemoSection title="Sizes">
        <Switch size="sm" defaultChecked label="Small" />
        <Switch size="md" defaultChecked label="Medium" />
        <Switch size="lg" defaultChecked label="Large" />
      </DemoSection>

      <DemoSection title="Controlled">
        <Switch checked={v()} onChange={setV} label={v() ? "On" : "Off"} />
      </DemoSection>

      <DemoSection title="Disabled">
        <Switch disabled label="Off (disabled)" />
        <Switch defaultChecked disabled label="On (disabled)" />
      </DemoSection>
    </DemoPage>
  );
};

export default NewSwitchDemo;
