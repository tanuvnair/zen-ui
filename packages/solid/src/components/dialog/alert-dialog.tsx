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
    <KAlertDialog.Overlay class={cn("zen-fixed zen-inset-0 zen-z-50 zen-bg-black/50", local.class)}>
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
          "zen-fixed zen-left-1/2 zen-top-1/2 zen-z-50 -zen-translate-x-1/2 -zen-translate-y-1/2",
          "zen-w-full zen-max-w-lg zen-max-h-[85vh] zen-overflow-y-auto",
          "zen-rounded-zen-md zen-border zen-border-zen-border zen-bg-zen-background zen-p-6 zen-shadow-zen-lg",
          "focus:zen-outline-none",
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
    <div class={cn("zen-flex zen-flex-col zen-gap-1 zen-text-left zen-mb-3", local.class)}>
      {local.children}
    </div>
  );
};

export const AlertDialogFooter = (props: DivProps) => {
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

export const AlertDialogTitle = (props: DivProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  return (
    <KAlertDialog.Title
      class={cn(
        "zen-text-lg zen-font-semibold zen-leading-tight zen-text-zen-foreground",
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
      class={cn("zen-text-sm zen-text-zen-muted-fg zen-leading-snug", local.class)}
    >
      {local.children}
    </KAlertDialog.Description>
  );
};
