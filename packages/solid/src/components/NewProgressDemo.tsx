import { createSignal, onCleanup, onMount } from "solid-js";
import { Progress } from "./progress/progress";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewProgressDemo = () => {
  const [v, setV] = createSignal(0);
  onMount(() => {
    const id = setInterval(() => {
      setV((p) => (p >= 100 ? 0 : p + 5));
    }, 500);
    onCleanup(() => clearInterval(id));
  });

  return (
    <DemoPage
      title="Progress"
      description="Determinate / indeterminate progress bar built on Kobalte Progress."
    >
      <DemoSection title="Animated · primary">
        <div class="zen-w-80">
          <Progress value={v()} />
        </div>
      </DemoSection>

      <DemoSection title="Sizes">
        <div class="zen-flex zen-flex-col zen-gap-2 zen-w-80">
          <Progress size="sm" value={45} />
          <Progress size="md" value={65} />
          <Progress size="lg" value={85} />
        </div>
      </DemoSection>

      <DemoSection title="Colours">
        <div class="zen-flex zen-flex-col zen-gap-2 zen-w-80">
          <Progress value={60} color="primary" />
          <Progress value={60} color="success" />
          <Progress value={60} color="warning" />
          <Progress value={60} color="error" />
          <Progress value={60} color="info" />
          <Progress value={60} color="neutral" />
        </div>
      </DemoSection>

      <DemoSection title="Indeterminate">
        <div class="zen-w-80">
          <Progress indeterminate />
        </div>
      </DemoSection>
    </DemoPage>
  );
};

export default NewProgressDemo;
