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
      <DemoSection title="Controlled · showValue">
        <Rating
          value={stars()}
          onValueChange={setStars}
          label="Rate your experience"
          showValue
        />
      </DemoSection>

      <DemoSection title="Sizes">
        <Rating size="sm" defaultValue={3} label="Small" />
        <Rating size="md" defaultValue={4} label="Medium" />
        <Rating size="lg" defaultValue={5} label="Large" />
      </DemoSection>

      <DemoSection title="States">
        <Rating defaultValue={3} disabled label="Disabled" />
        <Rating defaultValue={4} readOnly label="Read-only" />
      </DemoSection>

      <DemoSection title="7 stars">
        <Rating max={7} defaultValue={5} showValue label="7-star scale" />
      </DemoSection>
    </DemoPage>
  );
};

export default NewRatingDemo;
