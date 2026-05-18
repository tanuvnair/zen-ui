import { useState, type ReactNode } from "react";
import "./demo-helpers.css";

/**
 * CodeExample — a card that shows a live component preview, the code that
 * produces it, and a copy-to-clipboard button. Used across the shadcn-style
 * demos (NewButtonDemo, NewTooltipDemo, …).
 */
export interface CodeExampleProps {
  title: string;
  description?: string;
  code: string;
  children: ReactNode;
  /** Override the preview area's layout (e.g. to use grid). */
  previewStyle?: React.CSSProperties;
}

export function CodeExample({
  title,
  description,
  code,
  children,
  previewStyle,
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="example">
      <div className="example-head">
        <div>
          <h3>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>
        <button
          type="button"
          className={`example-copy${copied ? " copied" : ""}`}
          onClick={handleCopy}
        >
          {copied ? "✓ Copied" : "Copy Code"}
        </button>
      </div>
      <div className="example-preview" style={previewStyle}>
        {children}
      </div>
      <pre className="example-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}
