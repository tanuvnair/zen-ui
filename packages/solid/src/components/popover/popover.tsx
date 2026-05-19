import { type JSX, splitProps } from "solid-js";
import { Popover as KPopover } from "@kobalte/core/popover";
import { cn } from "../../lib/cn";

/**
 * Popover — Solid port built on Kobalte Popover.
 *
 *   <Popover>
 *     <PopoverTrigger as={Button}>Open</PopoverTrigger>
 *     <PopoverContent>…</PopoverContent>
 *   </Popover>
 *
 * Kobalte supplies positioning (via @floating-ui), collision detection,
 * focus trap, click-outside dismissal, Escape-to-close, and ARIA.
 */

export const Popover = KPopover;
export const PopoverTrigger = KPopover.Trigger;
export const PopoverAnchor = KPopover.Anchor;
export const PopoverClose = KPopover.CloseButton;
export const PopoverPortal = KPopover.Portal;

export type PopoverContentProps = {
  class?: string;
  children?: JSX.Element;
};

export const PopoverContent = (props: PopoverContentProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KPopover.Portal>
      <KPopover.Content
        class={cn(
          "z-50 w-72 rounded-zen-md border border-zen-border bg-zen-background p-4 text-zen-foreground shadow-md outline-none",
          local.class,
        )}
      >
        {local.children}
      </KPopover.Content>
    </KPopover.Portal>
  );
};
