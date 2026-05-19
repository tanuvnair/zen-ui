import { type JSX, splitProps, Show } from "solid-js";
import { Tooltip as KTooltip } from "@kobalte/core/tooltip";
import { cn } from "../../lib/cn";

/**
 * Tooltip — Solid port built on Kobalte's Tooltip primitive.
 *
 *   <Tooltip>
 *     <TooltipTrigger>?</TooltipTrigger>
 *     <TooltipContent>Helpful hint</TooltipContent>
 *   </Tooltip>
 *
 * Kobalte handles positioning (via @floating-ui), collision detection,
 * keyboard dismissal (Esc), focus/hover triggers, and a11y
 * (aria-describedby). Theming flows through --zen-* tokens.
 *
 * No equivalent of Radix's <TooltipProvider> is needed — Kobalte uses a
 * `Tooltip` root per instance and per-tooltip delay props.
 */

export const Tooltip = KTooltip;
export const TooltipTrigger = KTooltip.Trigger;
export const TooltipPortal = KTooltip.Portal;

export type TooltipContentProps = {
  /** Render an arrow pointing at the trigger. Default false. */
  arrow?: boolean;
  class?: string;
  children?: JSX.Element;
};

export const TooltipContent = (props: TooltipContentProps) => {
  const [local] = splitProps(props, ["class", "arrow", "children"]);
  return (
    <KTooltip.Portal>
      <KTooltip.Content
        class={cn(
          "z-50 max-w-xs px-2.5 py-1.5",
          "rounded-zen-md bg-zen-neutral text-xs text-zen-neutral-fg",
          "shadow-md",
          // Kobalte sets data-expanded / data-closed on the content.
          "transition-opacity duration-100 data-[closed]:opacity-0",
          local.class,
        )}
      >
        {local.children}
        <Show when={local.arrow}>
          <KTooltip.Arrow class="fill-zen-neutral" />
        </Show>
      </KTooltip.Content>
    </KTooltip.Portal>
  );
};
