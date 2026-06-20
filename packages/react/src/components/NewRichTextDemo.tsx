import { useState } from "react";
import { RichText } from "./rich-text/rich-text";
import { CodeExample } from "./demo-helpers";

const NewRichTextDemo: React.FC = () => {
  const [html, setHtml] = useState("<p>Hello from <strong>zen-ui</strong> 👋</p>");

  return (
    <div className="demo-page">
      <h1>RichText</h1>
      <p className="lede">
        WYSIWYG editor wrapping <code>jodit-pro-react</code> (an{" "}
        <strong>optional</strong> peer dependency, lazy-loaded on first render).
        <code>onChange</code> fires on blur (Jodit's recommended commit point).
        Install <code>jodit-pro-react</code> to use it.
      </p>

      <section className="demo-section">
        <h2>1. Controlled editor</h2>
        <CodeExample
          title="value / onChange"
          code={`const [html, setHtml] = useState("<p>Hello…</p>");

<RichText value={html} onChange={setHtml} placeholder="Write something…" />`}
        >
          <div style={{ width: "100%" }}>
            <RichText value={html} onChange={setHtml} placeholder="Write something…" />
          </div>
        </CodeExample>
      </section>

      <section className="demo-section">
        <h2>2. Current HTML</h2>
        <CodeExample title="onChange output (updates on blur)" code={`// html state`}>
          <pre
            style={{
              margin: 0,
              padding: 12,
              width: "100%",
              overflowX: "auto",
              fontSize: "1.2rem",
              background: "var(--zen-color-muted)",
              borderRadius: 6,
              color: "var(--zen-color-foreground)",
            }}
          >
            {html}
          </pre>
        </CodeExample>
      </section>
    </div>
  );
};

export default NewRichTextDemo;
