import { createSignal } from "solid-js";
import { NPS } from "./survey/nps";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewNpsDemo = () => {
  const [score, setScore] = createSignal<number | undefined>();
  return (
    <DemoPage
      title="NPS"
      description="0–10 Net Promoter Score strip with bucket colour cues."
    >
      <DemoSection title="Controlled">
        <NPS value={score()} onValueChange={setScore} />
      </DemoSection>

      <DemoSection title="Default uncontrolled">
        <NPS defaultValue={9} />
      </DemoSection>

      <DemoSection title="With custom anchors">
        <NPS
          defaultValue={3}
          lowLabel="Wouldn't use it"
          highLabel="Use it every day"
        />
      </DemoSection>

      <DemoSection title="Disabled / read-only">
        <NPS defaultValue={5} disabled />
        <NPS defaultValue={8} readOnly />
      </DemoSection>
    </DemoPage>
  );
};

export default NewNpsDemo;
