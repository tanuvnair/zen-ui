import { type JSX, splitProps } from "solid-js";
import { Dialog as KDialog } from "@kobalte/core/dialog";
import { cn } from "../../lib/cn";

/**
 * Dialog — Solid port of the modal overlay primitive, built on
 * Kobalte Dialog.
 *
 *   <Dialog>
 *     <DialogTrigger as={Button}>Open</DialogTrigger>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Confirm delete</DialogTitle>
 *         <DialogDescription>This cannot be undone.</DialogDescription>
 *       </DialogHeader>
 *       <DialogFooter>
 *         <DialogClose as={Button} variant="ghost">Cancel</DialogClose>
 *         <Button color="error" onClick={onConfirm}>Delete</Button>
 *       </DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 *
 * Kobalte supplies focus trap, scroll lock, Esc-to-close, click-outside
 * dismissal, portal rendering, and a11y. For confirm-style dialogs that
 * should block all dismissal until the user answers, use AlertDialog.
 */

export const Dialog = KDialog;
export const DialogTrigger = KDialog.Trigger;
export const DialogPortal = KDialog.Portal;
export const DialogClose = KDialog.CloseButton;

type DivProps = {
  class?: string;
  children?: JSX.Element;
};

export const DialogOverlay = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KDialog.Overlay
      class={cn("zen-fixed zen-inset-0 zen-z-50 zen-bg-black/50", local.class)}
    >
      {local.children}
    </KDialog.Overlay>
  );
};

export type DialogContentProps = {
  class?: string;
  children?: JSX.Element;
  /** Render the ✕ close affordance in the top-right corner. Default true. */
  showCloseButton?: boolean;
};

export const DialogContent = (props: DialogContentProps) => {
  const [local] = splitProps(props, ["class", "children", "showCloseButton"]);
  const showClose = () => local.showCloseButton ?? true;
  return (
    <KDialog.Portal>
      <DialogOverlay />
      <KDialog.Content
        class={cn(
          "zen-fixed zen-left-1/2 zen-top-1/2 zen-z-50 -zen-translate-x-1/2 -zen-translate-y-1/2",
          "zen-w-full zen-max-w-lg zen-max-h-[85vh] zen-overflow-y-auto",
          "zen-rounded-zen-md zen-border zen-border-zen-border zen-bg-zen-background zen-p-6 zen-shadow-zen-lg",
          "focus:zen-outline-none",
          local.class,
        )}
      >
        {local.children}
        {showClose() ? (
          <KDialog.CloseButton
            aria-label="Close"
            class={cn(
              "zen-absolute zen-right-3 zen-top-3 zen-h-7 zen-w-7 zen-inline-flex zen-items-center zen-justify-center",
              "zen-rounded-zen-sm zen-bg-transparent zen-border-0 zen-cursor-pointer zen-text-zen-muted-fg",
              "hover:zen-text-zen-foreground hover:zen-bg-zen-muted",
              "focus-visible:zen-outline-none focus-visible:zen-ring-2 focus-visible:zen-ring-zen-ring",
            )}
          >
            <XIcon />
          </KDialog.CloseButton>
        ) : null}
      </KDialog.Content>
    </KDialog.Portal>
  );
};

export const DialogHeader = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <div class={cn("zen-flex zen-flex-col zen-gap-1 zen-text-left zen-mb-3 zen-pr-8", local.class)}>
      {local.children}
    </div>
  );
};

export const DialogFooter = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn(
        "zen-flex zen-flex-col-reverse sm:zen-flex-row sm:zen-justify-end zen-gap-2 zen-mt-5",
        local.class,
      )}
    >
      {local.children}
    </div>
  );
};

export const DialogTitle = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KDialog.Title
      class={cn(
        "zen-text-lg zen-font-semibold zen-leading-tight zen-text-zen-foreground",
        local.class,
      )}
    >
      {local.children}
    </KDialog.Title>
  );
};

export const DialogDescription = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KDialog.Description
      class={cn("zen-text-sm zen-text-zen-muted-fg zen-leading-snug", local.class)}
    >
      {local.children}
    </KDialog.Description>
  );
};

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
