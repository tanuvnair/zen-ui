/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

/**
 * RichText — WYSIWYG editor wrapping `jodit-pro-react` (an OPTIONAL peer
 * dependency). Lazy-loaded so it never weighs on consumers who don't edit rich
 * text. Install `jodit-pro-react` to use it.
 *
 *   <RichText value={html} onChange={setHtml} placeholder="Write…" />
 *
 * `onChange` fires on blur (Jodit's recommended commit point — its per-keystroke
 * event is noisy and can fight controlled state).
 */

export interface RichTextProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  /** raw Jodit config, merged over the defaults */
  config?: Record<string, any>;
  className?: string;
}

const JoditEditor = React.lazy(() => import("jodit-pro-react"));

export const RichText = ({
  value = "",
  onChange,
  placeholder,
  config,
  className,
}: RichTextProps) => {
  const editorConfig = React.useMemo(
    () => ({ readonly: false, placeholder: placeholder ?? "", ...config }),
    [placeholder, config],
  );

  return (
    <div className={className}>
      <React.Suspense
        fallback={<div className="text-sm text-zen-muted-fg">Loading editor…</div>}
      >
        <JoditEditor
          value={value}
          config={editorConfig}
          onBlur={(html: string) => onChange?.(html)}
        />
      </React.Suspense>
    </div>
  );
};
RichText.displayName = "RichText";
