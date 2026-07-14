import { createSignal } from "solid-js";
import { Rating } from "./survey/rating";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewRatingDemo = () => {
  const [stars, setStars] = createSignal(0);

  return (
    <DemoPage
      title="Rating"
      description="N-star feedback input. Radiogroup semantics — arrow keys navigate."
    >
      <DemoSection
        title="Controlled · showValue"
        codeTitle="value + onValueChange; showValue adds the n / max caption"
        code={`const [stars, setStars] = createSignal(0);

<Rating
  value={stars()}
  onValueChange={setStars}
  label="Rate your experience"
  showValue
/>`}
      >
        <Rating
          value={stars()}
          onValueChange={setStars}
          label="Rate your experience"
          showValue
        />
      </DemoSection>

      <DemoSection
        title="Sizes"
        codeTitle={'size="sm" | "md" | "lg" — 16 / 24 / 32px stars'}
        code={`<Rating size="sm" defaultValue={3} label="Small" />
<Rating size="md" defaultValue={4} label="Medium" />
<Rating size="lg" defaultValue={5} label="Large" />`}
      >
        <Rating size="sm" defaultValue={3} label="Small" />
        <Rating size="md" defaultValue={4} label="Medium" />
        <Rating size="lg" defaultValue={5} label="Large" />
      </DemoSection>

      <DemoSection
        title="States"
        codeTitle="disabled fades the stars; readOnly stays full opacity"
        code={`<Rating defaultValue={3} disabled label="Disabled" />
<Rating defaultValue={4} readOnly label="Read-only" />`}
      >
        <Rating defaultValue={3} disabled label="Disabled" />
        <Rating defaultValue={4} readOnly label="Read-only" />
      </DemoSection>

      <DemoSection
        title="7 stars"
        codeTitle="max changes the star count"
        code={`<Rating max={7} defaultValue={5} showValue label="7-star scale" />`}
      >
        <Rating max={7} defaultValue={5} showValue label="7-star scale" />
      </DemoSection>
    </DemoPage>
  );
};

export default NewRatingDemo;
