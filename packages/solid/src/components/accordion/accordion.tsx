import { type JSX, splitProps } from "solid-js";
import { Accordion as KAccordion } from "@kobalte/core/accordion";
import { cn } from "../../lib/cn";

/**
 * Accordion — Solid port built on Kobalte Accordion.
 *
 *   <Accordion collapsible defaultValue={["basic"]}>
 *     <AccordionItem value="basic">
 *       <AccordionTrigger>Basic info</AccordionTrigger>
 *       <AccordionContent>…</AccordionContent>
 *     </AccordionItem>
 *   </Accordion>
 *
 * API delta from Radix: Kobalte uses `collapsible` + `multiple` flags
 * (instead of Radix's `type="single" | "multiple"`). `value` /
 * `defaultValue` are always string[] under Kobalte. Animations use the
 * `data-expanded` / `data-closed` attributes Kobalte sets on the
 * Content element.
 */

export type AccordionProps = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** When true, allows multiple items to be open at the same time. */
  multiple?: boolean;
  /** When true (single mode), the active item can be collapsed. */
  collapsible?: boolean;
  class?: string;
  children?: JSX.Element;
};

export const Accordion = (props: AccordionProps) => {
  const [local] = splitProps(props, [
    "value",
    "defaultValue",
    "onChange",
    "multiple",
    "collapsible",
    "class",
    "children",
  ]);
  return (
    <KAccordion
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      multiple={local.multiple}
      collapsible={local.collapsible}
      class={local.class}
    >
      {local.children}
    </KAccordion>
  );
};

export type AccordionItemProps = {
  value: string;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
};

export const AccordionItem = (props: AccordionItemProps) => {
  const [local] = splitProps(props, ["value", "disabled", "class", "children"]);
  return (
    <KAccordion.Item
      value={local.value}
      disabled={local.disabled}
      class={cn("border-b border-zen-border last:border-b-0", local.class)}
    >
      {local.children}
    </KAccordion.Item>
  );
};

export type AccordionTriggerProps = {
  class?: string;
  children?: JSX.Element;
};

export const AccordionTrigger = (props: AccordionTriggerProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KAccordion.Header class="flex">
      <KAccordion.Trigger
        class={cn(
          "flex flex-1 items-center justify-between gap-2",
          "py-3 px-1 text-sm font-medium text-left",
          "bg-transparent border-0 cursor-pointer",
          "transition-colors hover:text-zen-foreground",
          "text-zen-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring focus-visible:ring-inset rounded-zen-sm",
          // Rotate the trailing chevron when expanded.
          "[&[data-expanded]>svg.zen-acc-chevron]:rotate-180",
          local.class,
        )}
      >
        {local.children}
        <svg
          class="zen-acc-chevron transition-transform duration-200 text-zen-muted-fg flex-shrink-0"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </KAccordion.Trigger>
    </KAccordion.Header>
  );
};

export type AccordionContentProps = {
  class?: string;
  children?: JSX.Element;
};

export const AccordionContent = (props: AccordionContentProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KAccordion.Content class="overflow-hidden text-sm data-[closed]:animate-accordion-up data-[expanded]:animate-accordion-down">
      <div class={cn("pb-3 px-1 pt-0 text-zen-foreground", local.class)}>
        {local.children}
      </div>
    </KAccordion.Content>
  );
};
