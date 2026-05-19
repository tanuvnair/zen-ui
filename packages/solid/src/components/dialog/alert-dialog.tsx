import { type JSX, splitProps } from "solid-js";
import { AlertDialog as KAlertDialog } from "@kobalte/core/alert-dialog";
import { cn } from "../../lib/cn";

/**
 * AlertDialog — destructive-confirm modal built on Kobalte AlertDialog.
 *
 *   <AlertDialog>
 *     <AlertDialogTrigger as={Button} color="error">Delete</AlertDialogTrigger>
 *     <AlertDialogContent>
 *       <AlertDialogHeader>
 *         <AlertDialogTitle>Delete account?</AlertDialogTitle>
 *         <AlertDialogDescription>Removes all data permanently.</AlertDialogDescription>
 *       </AlertDialogHeader>
 *       <AlertDialogFooter>
 *         <AlertDialogCancel as={Button} variant="ghost">Cancel</AlertDialogCancel>
 *         <Button color="error" onClick={onConfirm}>Delete</Button>
 *       </AlertDialogFooter>
 *     </AlertDialogContent>
 *   </AlertDialog>
 *
 * Differs from Dialog: click-outside is blocked. Escape still closes
 * for keyboard a11y. role="alertdialog" announces immediately.
 *
 * API delta from React binding: Kobalte unifies AlertDialog.Action and
 * AlertDialog.Cancel under CloseButton — use the Action label visually
 * but wire the destructive callback via your own onClick (the Cancel
 * affordance is what we expose as <AlertDialogCancel>).
 */

export const AlertDialog = KAlertDialog;
export const AlertDialogTrigger = KAlertDialog.Trigger;
export const AlertDialogPortal = KAlertDialog.Portal;
export const AlertDialogCancel = KAlertDialog.CloseButton;
export const AlertDialogAction = KAlertDialog.CloseButton;

type DivProps = {
  class?: string;
  children?: JSX.Element;
};

export const AlertDialogOverlay = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KAlertDialog.Overlay class={cn("fixed inset-0 z-50 bg-black/50", local.class)}>
      {local.children}
    </KAlertDialog.Overlay>
  );
};

export type AlertDialogContentProps = {
  class?: string;
  children?: JSX.Element;
};

export const AlertDialogContent = (props: AlertDialogContentProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KAlertDialog.Portal>
      <AlertDialogOverlay />
      <KAlertDialog.Content
        class={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg max-h-[85vh] overflow-y-auto",
          "rounded-zen-md border border-zen-border bg-zen-background p-6 shadow-zen-lg",
          "focus:outline-none",
          local.class,
        )}
      >
        {local.children}
      </KAlertDialog.Content>
    </KAlertDialog.Portal>
  );
};

export const AlertDialogHeader = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <div class={cn("flex flex-col gap-1 text-left mb-3", local.class)}>
      {local.children}
    </div>
  );
};

export const AlertDialogFooter = (props: DivProps) => {
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

export const AlertDialogTitle = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KAlertDialog.Title
      class={cn(
        "text-lg font-semibold leading-tight text-zen-foreground",
        local.class,
      )}
    >
      {local.children}
    </KAlertDialog.Title>
  );
};

export const AlertDialogDescription = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KAlertDialog.Description
      class={cn("text-sm text-zen-muted-fg leading-snug", local.class)}
    >
      {local.children}
    </KAlertDialog.Description>
  );
};
