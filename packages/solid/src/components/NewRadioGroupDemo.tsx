import { createSignal } from "solid-js";
import { RadioGroup, RadioGroupItem } from "./form/radio/radio-group";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewRadioGroupDemo = () => {
  const [plan, setPlan] = createSignal("pro");
  return (
    <DemoPage
      title="RadioGroup"
      description="Mutually exclusive options, full keyboard nav. Built on Kobalte RadioGroup."
    >
      <DemoSection title="Vertical (default)">
        <RadioGroup value={plan()} onChange={setPlan}>
          <RadioGroupItem value="free">Free</RadioGroupItem>
          <RadioGroupItem value="pro">Pro</RadioGroupItem>
          <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
        </RadioGroup>
      </DemoSection>

      <DemoSection title="Horizontal">
        <RadioGroup defaultValue="medium" orientation="horizontal">
          <RadioGroupItem value="small">Small</RadioGroupItem>
          <RadioGroupItem value="medium">Medium</RadioGroupItem>
          <RadioGroupItem value="large">Large</RadioGroupItem>
        </RadioGroup>
      </DemoSection>

      <DemoSection title="Sizes">
        <RadioGroup defaultValue="md" orientation="horizontal">
          <RadioGroupItem size="sm" value="sm">SM</RadioGroupItem>
          <RadioGroupItem size="md" value="md">MD</RadioGroupItem>
          <RadioGroupItem size="lg" value="lg">LG</RadioGroupItem>
        </RadioGroup>
      </DemoSection>

      <DemoSection title="Disabled">
        <RadioGroup defaultValue="b" disabled orientation="horizontal">
          <RadioGroupItem value="a">A</RadioGroupItem>
          <RadioGroupItem value="b">B</RadioGroupItem>
          <RadioGroupItem value="c">C</RadioGroupItem>
        </RadioGroup>
      </DemoSection>
    </DemoPage>
  );
};

export default NewRadioGroupDemo;
