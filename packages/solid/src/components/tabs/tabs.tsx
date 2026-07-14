import { type JSX, splitProps } from "solid-js";
import { Tabs as KTabs } from "@kobalte/core/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Tabs — Solid port built on Kobalte Tabs.
 *
 *   <Tabs defaultValue="overview">
 *     <TabsList>
 *       <TabsTrigger value="overview">Overview</TabsTrigger>
 *       <TabsTrigger value="activity">Activity</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="overview">…</TabsContent>
 *     <TabsContent value="activity">…</TabsContent>
 *   </Tabs>
 *
 * Two visual styles via `variant` on TabsList — "underline" (default,
 * document-style) or "pills" (segmented switcher).
 */

export type TabsProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
};

export const Tabs = (props: TabsProps) => {
  const [local] = splitProps(props, [
    "value",
    "defaultValue",
    "onChange",
    "orientation",
    "activationMode",
    "disabled",
    "class",
    "children",
  ]);
  return (
    <KTabs
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      orientation={local.orientation}
      activationMode={local.activationMode}
      disabled={local.disabled}
      class={local.class}
    >
      {local.children}
    </KTabs>
  );
};

const tabsListVariants = cva("zen-inline-flex zen-items-stretch", {
  variants: {
    variant: {
      underline: "zen-border-b zen-border-zen-border zen-w-full zen-gap-1",
      pills: "zen-rounded-zen-md zen-bg-zen-muted zen-p-1 zen-gap-1",
    },
    orientation: {
      // flex-wrap so a horizontal tab list with many tabs wraps to multiple
      // rows instead of overflowing/clipping its container.
      horizontal: "zen-flex-row zen-flex-wrap",
      vertical: "zen-flex-col zen-items-start",
    },
  },
  compoundVariants: [
    {
      variant: "underline",
      orientation: "vertical",
      class: "zen-border-b-0 zen-border-r zen-border-zen-border",
    },
    {
      variant: "pills",
      orientation: "vertical",
      class: "zen-items-stretch",
    },
  ],
  defaultVariants: {
    variant: "underline",
    orientation: "horizontal",
  },
});

export type TabsListProps = VariantProps<typeof tabsListVariants> & {
  class?: string;
  children?: JSX.Element;
};

export const TabsList = (props: TabsListProps) => {
  const [local] = splitProps(props, ["variant", "orientation", "class", "children"]);
  return (
    <KTabs.List
      data-variant={local.variant ?? "underline"}
      class={cn(
        tabsListVariants({ variant: local.variant, orientation: local.orientation }),
        local.class,
      )}
    >
      {local.children}
    </KTabs.List>
  );
};

const tabsTriggerVariants = cva(
  [
    "zen-inline-flex zen-items-center zen-justify-center zen-whitespace-nowrap",
    "zen-text-sm zen-font-medium",
    "zen-border-0 zen-bg-transparent zen-cursor-pointer",
    "zen-transition-colors",
    "disabled:zen-opacity-50 disabled:zen-cursor-not-allowed",
    "focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring focus-visible:zen-ring-inset",
  ].join(" "),
  {
    variants: {
      variant: {
        underline: [
          "zen-px-3 zen-py-2 -zen-mb-px zen-text-zen-muted-fg",
          "zen-border-b-2 zen-border-transparent",
          "hover:zen-text-zen-foreground",
          "data-[selected]:zen-text-zen-primary data-[selected]:zen-border-zen-primary",
        ].join(" "),
        pills: [
          "zen-px-3 zen-py-1.5 zen-rounded-zen-sm zen-text-zen-muted-fg",
          "hover:zen-text-zen-foreground",
          "data-[selected]:zen-bg-zen-background data-[selected]:zen-text-zen-foreground data-[selected]:zen-shadow-zen-xs",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

export type TabsTriggerProps = VariantProps<typeof tabsTriggerVariants> & {
  value: string;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
};

export const TabsTrigger = (props: TabsTriggerProps) => {
  const [local] = splitProps(props, ["variant", "value", "disabled", "class", "children"]);
  return (
    <KTabs.Trigger
      value={local.value}
      disabled={local.disabled}
      class={cn(tabsTriggerVariants({ variant: local.variant }), local.class)}
    >
      {local.children}
    </KTabs.Trigger>
  );
};

export type TabsContentProps = {
  value: string;
  class?: string;
  children?: JSX.Element;
};

export const TabsContent = (props: TabsContentProps) => {
  const [local] = splitProps(props, ["value", "class", "children"]);
  return (
    <KTabs.Content
      value={local.value}
      class={cn(
        "zen-mt-3 focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring zen-rounded-zen-sm",
        local.class,
      )}
    >
      {local.children}
    </KTabs.Content>
  );
};

export { tabsListVariants, tabsTriggerVariants };
