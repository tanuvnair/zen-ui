import { useState } from "react";
import { Likert } from "./survey/likert";
import { CodeExample } from "./demo-helpers";

const FREQUENCY = [
  { value: "never", label: "Never" },
  { value: "rarely", label: "Rarely" },
  { value: "sometimes", label: "Sometimes" },
  { value: "often", label: "Often" },
  { value: "always", label: "Always" },
];

const IMPORTANCE = [
  { value: "not", label: "Not important" },
  { value: "slightly", label: "Slightly important" },
  { value: "moderately", label: "Moderately important" },
  { value: "very", label: "Very important" },
  { value: "critical", label: "Critical" },
];

const SHORT = [
  { value: "no", label: "No" },
  { value: "maybe", label: "Maybe" },
  { value: "yes", label: "Yes" },
];

const NewLikertDemo: React.FC = () => {
  const [answer, setAnswer] = useState<string | undefined>();

  return (
    <div className="demo-page">
      <h1>Likert</h1>
      <p className="lede">
        n-point attitudinal scale — the canonical "Strongly disagree →
        Strongly agree" question shape. Third leg of the survey
        triplet alongside <a href="#/rating">Rating</a> and{" "}
        <a href="#/nps">NPS</a>. Two layouts ship out of the box: a
        compact <code>segmented</code> pill strip and a more readable{" "}
        <code>stacked</code> radio list.
      </p>

      <section className="demo-section">
        <h2>1. Default — 5-point agree/disagree</h2>
        <CodeExample
          title="Segmented layout with the standard scale"
          code={`<Likert
  question="The onboarding was easy to follow."
  onValueChange={(v) => console.log(v)}
/>`}
        >
          <Likert question="The onboarding was easy to follow." />
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>2. Controlled</h2>
        <CodeExample
          title="value + onValueChange"
          code={`const [answer, setAnswer] = useState<string | undefined>();
<Likert
  value={answer}
  onValueChange={setAnswer}
  question="Our support response time meets your expectations."
/>`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Likert
              value={answer}
              onValueChange={setAnswer}
              question="Our support response time meets your expectations."
            />
            <p className="zen-text-xs zen-text-zen-muted-fg zen-m-0">
              Answer: <code>{answer ?? "(none)"}</code>
            </p>
          </div>
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>3. Stacked layout</h2>
        <CodeExample
          title='layout="stacked" — vertical radios with full labels'
          description="Better for accessibility in narrow viewports and for long option labels that don't fit in a pill."
          code={`<Likert
  layout="stacked"
  question="How often do you use the mobile app?"
  options={FREQUENCY_OPTIONS}
/>`}
        >
          <Likert
            layout="stacked"
            question="How often do you use the mobile app?"
            options={FREQUENCY}
          />
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>4. Custom scale — importance</h2>
        <CodeExample
          title="Importance scale — Not important → Critical"
          description="Pass your own options array for any attitudinal scale: agreement, frequency, importance, ease, satisfaction, comfort."
          code={`const IMPORTANCE = [
  { value: "not",         label: "Not important" },
  { value: "slightly",    label: "Slightly important" },
  { value: "moderately",  label: "Moderately important" },
  { value: "very",        label: "Very important" },
  { value: "critical",    label: "Critical" },
];

<Likert
  question="How important is end-to-end encryption to you?"
  options={IMPORTANCE}
  layout="stacked"
/>`}
        >
          <Likert
            question="How important is end-to-end encryption to you?"
            options={IMPORTANCE}
            layout="stacked"
          />
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>5. 3-point variant</h2>
        <CodeExample
          title="Custom 3-option scale"
          description="Shorter scales reduce cognitive load when the spectrum doesn't have meaningful in-between gradations."
          code={`<Likert
  question="Would you do this again?"
  options={[
    { value: "no",    label: "No" },
    { value: "maybe", label: "Maybe" },
    { value: "yes",   label: "Yes" },
  ]}
/>`}
        >
          <Likert
            question="Would you do this again?"
            options={SHORT}
          />
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>6. Read-only / disabled</h2>
        <CodeExample
          title="Display existing answers or lock the control"
          code={`<Likert value="agree" readOnly question="…" />
<Likert value="disagree" disabled question="…" />`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Likert
              value="agree"
              readOnly
              question="Q1 — Read-only display"
            />
            <Likert
              value="disagree"
              disabled
              question="Q2 — Disabled"
            />
          </div>
        </CodeExample>
      </section>
    </div>
  );
};

export default NewLikertDemo;
