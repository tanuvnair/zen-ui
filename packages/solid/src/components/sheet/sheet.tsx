import { type JSX, splitProps } from "solid-js";
import { Dialog as KDialog } from "@kobalte/core/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Sheet — slide-in side panel built on Kobalte Dialog. Use when a Dialog
 * is too modal: long-form filter panels, edit screens that need the
 * underlying list visible, KYC document review, help / onboarding tour.
 *
 *   <Sheet>
 *     <SheetTrigger as={Button}>Filters</SheetTrigger>
 *     <SheetContent side="right">
 *       <SheetHeader>
 *         <SheetTitle>Filters</SheetTitle>
 *         <SheetDescription>Narrow the dashboard.</SheetDescription>
 *       </SheetHeader>
 *       …
 *       <SheetFooter>
 *         <Button>Apply</Button>
 *         <SheetClose as={Button} variant="outline">Cancel</SheetClose>
 *       </SheetFooter>
 *     </SheetContent>
 *   </Sheet>
 */

export const Sheet = KDialog;
export const SheetTrigger = KDialog.Trigger;
export const SheetClose = KDialog.CloseButton;
export const SheetPortal = KDialog.Portal;

type DivProps = {
  class?: string;
  children?: JSX.Element;
};

export const SheetOverlay = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KDialog.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-black/40",
        "data-[expanded]:animate-zen-fade-in",
        "data-[closed]:animate-zen-fade-out",
        local.class,
      )}
    >
      {local.children}
    </KDialog.Overlay>
  );
};

const sheetContentVariants = cva(
  [
    "fixed z-50 flex flex-col gap-4 bg-zen-background p-6 shadow-zen-lg",
    "transition ease-in-out",
    "focus-visible:outline-none",
  ].join(" "),
  {
    variants: {
      side: {
        right: [
          "inset-y-0 right-0 h-full w-3/4 max-w-md border-l border-zen-border",
          "data-[expanded]:animate-zen-slide-in-right",
          "data-[closed]:animate-zen-slide-out-right",
        ].join(" "),
        left: [
          "inset-y-0 left-0 h-full w-3/4 max-w-md border-r border-zen-border",
          "data-[expanded]:animate-zen-slide-in-left",
          "data-[closed]:animate-zen-slide-out-left",
        ].join(" "),
        top: [
          "inset-x-0 top-0 w-full max-h-[80vh] border-b border-zen-border",
          "data-[expanded]:animate-zen-slide-in-top",
          "data-[closed]:animate-zen-slide-out-top",
        ].join(" "),
        bottom: [
          "inset-x-0 bottom-0 w-full max-h-[80vh] border-t border-zen-border",
          "rounded-t-zen-lg",
          "data-[expanded]:animate-zen-slide-in-bottom",
          "data-[closed]:animate-zen-slide-out-bottom",
        ].join(" "),
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export type SheetContentProps = VariantProps<typeof sheetContentVariants> & {
  class?: string;
  children?: JSX.Element;
  /** Show a built-in close ✕ in the top-right. Default true. */
  showCloseButton?: boolean;
};

export const SheetContent = (props: SheetContentProps) => {
  const [local] = splitProps(props, ["class", "side", "showCloseButton", "children"]);
  const showClose = () => local.showCloseButton ?? true;
  return (
    <KDialog.Portal>
      <SheetOverlay />
      <KDialog.Content class={cn(sheetContentVariants({ side: local.side }), local.class)}>
        {local.children}
        {showClose() ? (
          <KDialog.CloseButton
            aria-label="Close sheet"
            class={cn(
              "absolute top-3 right-3 inline-flex items-center justify-center",
              "h-7 w-7 rounded-zen-sm bg-transparent border-0 cursor-pointer",
              "text-zen-muted-fg hover:text-zen-foreground hover:bg-zen-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
            )}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </KDialog.CloseButton>
        ) : null}
      </KDialog.Content>
    </KDialog.Portal>
  );
};

export const SheetHeader = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <div class={cn("flex flex-col gap-1.5", local.class)}>{local.children}</div>
  );
};

export const SheetFooter = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn(
        "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        local.class,
      )}
    >
      {local.children}
    </div>
  );
};

export const SheetTitle = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KDialog.Title
      class={cn(
        "text-base font-semibold leading-tight text-zen-foreground m-0",
        local.class,
      )}
    >
      {local.children}
    </KDialog.Title>
  );
};

export const SheetDescription = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KDialog.Description class={cn("text-sm text-zen-muted-fg m-0", local.class)}>
      {local.children}
    </KDialog.Description>
  );
};

export { sheetContentVariants };
