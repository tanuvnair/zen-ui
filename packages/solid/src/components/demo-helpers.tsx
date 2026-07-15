import { type JSX, type ParentProps, children, createSignal, Show } from "solid-js";
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
  props: ParentProps<{
    title: string;
    description?: string;
    /**
     * Snippet that produced `children`. When given, the children render as the
     * live preview of a CodeExample card (heading + copyable code block) rather
     * than as a bare row — matching how the React demos pair every section with
     * its source. Omit it and the section keeps the plain-row layout the
     * pre-existing demos rely on.
     */
    code?: string;
    /** CodeExample heading. Defaults to the section title. */
    codeTitle?: string;
    /** CodeExample sub-caption, shown under the heading. */
    codeDescription?: string;
    /** Override the preview area's layout (e.g. to use grid). */
    previewStyle?: JSX.CSSProperties;
  }>,
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
    <Show
      when={props.code}
      fallback={
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
      }
    >
      {(code) => (
        <CodeExample
          title={props.codeTitle ?? props.title}
          description={props.codeDescription}
          code={code()}
          previewStyle={props.previewStyle}
        >
          {props.children}
        </CodeExample>
      )}
    </Show>
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
  // `props.children` is a getter: every read re-runs the caller's JSX and
  // builds a SECOND instance. Reading it once to test for presence and again
  // to render used to mount two of everything — invisible for a plain Button
  // (the spare is never inserted), but a child that portals mounts itself
  // regardless, so /select-dialog opened two stacked dialogs per click.
  const resolved = children(() => props.children);
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
      <Show when={resolved()}>
        <div class="example-preview" style={props.previewStyle}>
          {resolved()}
        </div>
      </Show>
      <pre class="example-code">
        <code>{props.code}</code>
      </pre>
    </div>
  );
};
