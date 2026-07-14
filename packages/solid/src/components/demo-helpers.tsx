import { type JSX, type ParentProps, createSignal, Show } from "solid-js";
import "./demo-helpers.css";

/**
 * Shared chrome for the shadcn-style demo pages — Solid port of the
 * React binding's demo-helpers.tsx. Uses the same `.demo-page`,
 * `.demo-section`, `.example` class names (see demo-helpers.css,
 * copied verbatim from the React side) so the two demos render
 * visually identically.
 */

export const DemoPage = (props: ParentProps<{ title: string; description?: string }>) => (
  <div class="demo-page">
    <h1>{props.title}</h1>
    <Show when={props.description}>
      <p class="lede">{props.description}</p>
    </Show>
    {props.children}
  </div>
);

export const DemoSection = (
  props: ParentProps<{ title: string; description?: string }>,
) => (
  <section class="demo-section">
    <h2>{props.title}</h2>
    <Show when={props.description}>
      <p
        style={{
          "font-size": "0.875rem",
          color: "var(--zen-color-muted-fg)",
          margin: "0 0 0.75rem",
        }}
      >
        {props.description}
      </p>
    </Show>
    <div
      style={{
        display: "flex",
        "flex-wrap": "wrap",
        gap: "0.5rem",
        "align-items": "center",
      }}
    >
      {props.children}
    </div>
  </section>
);

export const Row = (props: { children: JSX.Element }) => (
  <div
    style={{
      display: "flex",
      "flex-wrap": "wrap",
      gap: "0.5rem",
      "align-items": "center",
    }}
  >
    {props.children}
  </div>
);

/**
 * CodeExample — card showing a live preview + the code that produced
 * it, with a copy-to-clipboard button. Matches the React binding's
 * CodeExample one-for-one (.example / .example-head / .example-preview
 * / .example-code).
 */
export const CodeExample = (props: {
  title: string;
  description?: string;
  code: string;
  children?: JSX.Element;
  previewStyle?: JSX.CSSProperties;
}) => {
  const [copied, setCopied] = createSignal(false);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(props.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  return (
    <div class="example">
      <div class="example-head">
        <div>
          <h3>{props.title}</h3>
          <Show when={props.description}>
            <p>{props.description}</p>
          </Show>
        </div>
        <button
          type="button"
          class={`example-copy${copied() ? " copied" : ""}`}
          onClick={handleCopy}
        >
          {copied() ? "✓ Copied" : "Copy Code"}
        </button>
      </div>
      <Show when={props.children}>
        <div class="example-preview" style={props.previewStyle}>
          {props.children}
        </div>
      </Show>
      <pre class="example-code">
        <code>{props.code}</code>
      </pre>
    </div>
  );
};
