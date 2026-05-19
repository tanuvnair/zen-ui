import { createSignal } from "solid-js";
import { Likert, type LikertOption } from "./survey/likert";
import { DemoPage, DemoSection } from "./demo-helpers";

const frequencyOptions: LikertOption[] = [
  { value: "never", label: "Never", shortLabel: "N" },
  { value: "rarely", label: "Rarely", shortLabel: "R" },
  { value: "sometimes", label: "Sometimes", shortLabel: "S" },
  { value: "often", label: "Often", shortLabel: "O" },
  { value: "always", label: "Always", shortLabel: "A" },
];

const NewLikertDemo = () => {
  const [a1, setA1] = createSignal<string | undefined>();
  const [a2, setA2] = createSignal<string | undefined>();

  return (
    <DemoPage
      title="Likert"
      description="Attitudinal scale. Two layouts: segmented (default) and stacked."
    >
      <DemoSection title="5-point · segmented">
        <Likert
          value={a1()}
          onValueChange={setA1}
          question="The onboarding was easy to follow."
        />
      </DemoSection>

      <DemoSection title="5-point · stacked">
        <Likert
          value={a2()}
          onValueChange={setA2}
          question="How often do you use the dashboard?"
          options={frequencyOptions}
          layout="stacked"
        />
      </DemoSection>

      <DemoSection title="States">
        <Likert defaultValue="agree" disabled question="Disabled" />
        <Likert defaultValue="strongly_agree" readOnly question="Read-only" />
      </DemoSection>
    </DemoPage>
  );
};

export default NewLikertDemo;
