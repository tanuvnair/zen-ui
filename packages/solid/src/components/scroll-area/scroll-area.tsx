import { type JSX, splitProps } from "solid-js";
import { cn } from "../../lib/cn";

/**
 * ScrollArea — Solid binding. Kobalte does not ship a ScrollArea
 * primitive, so this is a native-scroll wrapper with styled scrollbars
 * (via UnoCSS `scrollbar-*` utilities where supported). The trade-off
 * vs. the React/Radix version: scrollbars use the platform's native
 * appearance instead of a custom rendered thumb. For most app contexts
 * this is acceptable; a richer custom-scrollbar port can replace this
 * later if needed (likely via @corvu/scroll-area or solid-presence).
 */

export type ScrollAreaProps = {
  class?: string;
  children?: JSX.Element;
};

export const ScrollArea = (props: ScrollAreaProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn(
        "relative overflow-auto",
        // Subtle Webkit/Firefox scrollbar styling, falling back to native.
        "[scrollbar-width:thin] [scrollbar-color:var(--zen-color-border)_transparent]",
        local.class,
      )}
    >
      {local.children}
    </div>
  );
};

/** No-op kept for API parity with the React binding. */
export const ScrollBar = () => null;
