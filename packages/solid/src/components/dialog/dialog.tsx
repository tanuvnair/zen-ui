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
      class={cn("fixed inset-0 z-50 bg-black/50", local.class)}
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
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg max-h-[85vh] overflow-y-auto",
          "rounded-zen-md border border-zen-border bg-zen-background p-6 shadow-zen-lg",
          "focus:outline-none",
          local.class,
        )}
      >
        {local.children}
        {showClose() ? (
          <KDialog.CloseButton
            aria-label="Close"
            class={cn(
              "absolute right-3 top-3 h-7 w-7 inline-flex items-center justify-center",
              "rounded-zen-sm bg-transparent border-0 cursor-pointer text-zen-muted-fg",
              "hover:text-zen-foreground hover:bg-zen-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-ring",
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
    <div class={cn("flex flex-col gap-1 text-left mb-3 pr-8", local.class)}>
      {local.children}
    </div>
  );
};

export const DialogFooter = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-5",
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
        "text-lg font-semibold leading-tight text-zen-foreground",
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
      class={cn("text-sm text-zen-muted-fg leading-snug", local.class)}
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
