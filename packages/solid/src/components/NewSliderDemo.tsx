import { createSignal } from "solid-js";
import { Slider } from "./form/slider/slider";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewSliderDemo = () => {
  const [single, setSingle] = createSignal([40]);
  const [range, setRange] = createSignal([20, 80]);

  return (
    <DemoPage
      title="Slider"
      description="Single + range sliders built on Kobalte Slider. Full keyboard control."
    >
      <DemoSection
        title="Single (controlled)"
        codeTitle="value is a number[] — call the signal to read it"
        code={`const [single, setSingle] = createSignal([40]);

<Slider value={single()} onChange={setSingle} maxValue={100} step={1} />
<div class="zen-text-xs zen-text-zen-muted-fg">Value: {single()[0]}</div>`}
      >
        <div class="zen-w-80 zen-flex zen-flex-col zen-gap-2">
          <Slider value={single()} onChange={setSingle} maxValue={100} step={1} />
          <div class="zen-text-xs zen-text-zen-muted-fg">Value: {single()[0]}</div>
        </div>
      </DemoSection>

      <DemoSection
        title="Range (controlled)"
        codeTitle="Two values make it a multi-thumb range"
        code={`const [range, setRange] = createSignal([20, 80]);

<Slider value={range()} onChange={setRange} maxValue={100} step={5} />
<div class="zen-text-xs zen-text-zen-muted-fg">
  Range: {range()[0]} – {range()[1]}
</div>`}
      >
        <div class="zen-w-80 zen-flex zen-flex-col zen-gap-2">
          <Slider value={range()} onChange={setRange} maxValue={100} step={5} />
          <div class="zen-text-xs zen-text-zen-muted-fg">
            Range: {range()[0]} – {range()[1]}
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Disabled"
        codeTitle="disabled prop"
        code={`<Slider defaultValue={[60]} disabled />`}
      >
        <div class="zen-w-80">
          <Slider defaultValue={[60]} disabled />
        </div>
      </DemoSection>
    </DemoPage>
  );
};

export default NewSliderDemo;
