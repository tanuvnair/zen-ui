import { useState } from "react";
import { Slider } from "./form/slider/slider";
import { CodeExample } from "./demo-helpers";

const NewSliderDemo: React.FC = () => {
  const [volume, setVolume] = useState([50]);
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="demo-page">
      <h1>Slider (new — Radix-backed)</h1>
      <p className="lede">
        Single-thumb or multi-thumb range slider on{" "}
        <code>@radix-ui/react-slider</code>. Radix provides keyboard control
        (Arrow / PgUp / PgDn / Home / End), ARIA, RTL, vertical orientation,
        and form submission.
      </p>

      <section className="demo-section">
        <h2>1. Basic (single-thumb, controlled)</h2>
        <CodeExample
          title="value as a [number] tuple"
          code={`const [v, setV] = useState([50]);

<Slider value={v} onValueChange={setV} max={100} step={1} />`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
            <div style={{ marginTop: 8, fontSize: "0.8125rem", color: "var(--zen-color-muted-fg)" }}>
              volume: {volume[0]}
            </div>
          </div>
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>2. Uncontrolled</h2>
        <CodeExample
          title="defaultValue"
          code={`<Slider defaultValue={[33]} max={100} step={1} />`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Slider defaultValue={[33]} max={100} step={1} />
          </div>
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>3. Range (multi-thumb)</h2>
        <CodeExample
          title="defaultValue with two numbers becomes a range"
          code={`const [r, setR] = useState([20, 80]);

<Slider value={r} onValueChange={setR} min={0} max={100} step={5} />`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Slider value={range} onValueChange={setRange} min={0} max={100} step={5} />
            <div style={{ marginTop: 8, fontSize: "0.8125rem", color: "var(--zen-color-muted-fg)" }}>
              range: {range[0]} – {range[1]}
            </div>
          </div>
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>4. Custom step</h2>
        <CodeExample
          title="step=10 snaps to multiples of 10"
          code={`<Slider defaultValue={[40]} min={0} max={100} step={10} />`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Slider defaultValue={[40]} min={0} max={100} step={10} />
          </div>
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>5. Disabled</h2>
        <CodeExample
          title="disabled prop"
          code={`<Slider defaultValue={[60]} disabled />`}
        >
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Slider defaultValue={[60]} disabled />
          </div>
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>6. Custom colors via className</h2>
        <CodeExample
          title="Override the range fill"
          code={`<Slider defaultValue={[60]} className="[&_[data-orientation=horizontal]>span]:bg-zen-success" />`}
        >
          <div style={{ width: "100%", maxWidth: 360, display: "grid", gap: "0.75rem" }}>
            <Slider
              defaultValue={[60]}
              className="[&_[data-orientation=horizontal]>span]:zen-bg-zen-success [&_[role=slider]]:zen-border-zen-success"
            />
            <Slider
              defaultValue={[40]}
              className="[&_[data-orientation=horizontal]>span]:zen-bg-zen-warning [&_[role=slider]]:zen-border-zen-warning"
            />
            <Slider
              defaultValue={[80]}
              className="[&_[data-orientation=horizontal]>span]:zen-bg-zen-error [&_[role=slider]]:zen-border-zen-error"
            />
          </div>
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>7. Vertical orientation</h2>
        <CodeExample
          title={`orientation="vertical"`}
          description="Container must give the slider an explicit height."
          code={`<div style={{ height: 200 }}>
  <Slider orientation="vertical" defaultValue={[40]} />
</div>`}
        >
          <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 0.75rem" }}>
            <Slider orientation="vertical" defaultValue={[40]} />
          </div>
        </CodeExample>
      </section>
    </div>
  );
};

export default NewSliderDemo;
