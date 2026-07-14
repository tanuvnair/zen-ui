import { Input, Textarea } from "./form/input/input";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewInputDemo = () => (
  <DemoPage title="Input + Textarea" description="Styled native <input> and <textarea>.">
    <DemoSection title="Input variants">
      <div class="zen-w-64 zen-flex zen-flex-col zen-gap-2">
        <Input type="text" placeholder="Type something" />
        <Input type="email" placeholder="you@algorisys.com" />
        <Input type="password" placeholder="Password" />
        <Input type="text" placeholder="Disabled" disabled />
      </div>
    </DemoSection>
    <DemoSection title="Textarea">
      <div class="zen-w-64">
        <Textarea placeholder="Tell us about your project…" rows={4} />
      </div>
    </DemoSection>
  </DemoPage>
);

export default NewInputDemo;
