import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "./dialog/alert-dialog";
import { Button } from "./button/button";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewDialogDemo = () => (
  <DemoPage
    title="Dialog + AlertDialog"
    description="Modal overlays built on Kobalte. Use AlertDialog for destructive confirmations (no click-outside dismiss)."
  >
    <DemoSection title="Dialog (generic modal)">
      <Dialog>
        <DialogTrigger as={Button}>Edit profile</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Update your account details. Changes apply immediately.
            </DialogDescription>
          </DialogHeader>
          <p class="text-sm text-zen-muted-fg">
            Form fields would render here.
          </p>
          <DialogFooter>
            <DialogClose as={Button} variant="ghost">Cancel</DialogClose>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DemoSection>

    <DemoSection title="AlertDialog (destructive confirm)">
      <AlertDialog>
        <AlertDialogTrigger as={Button} color="error">Delete account</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this account?</AlertDialogTitle>
            <AlertDialogDescription>
              Removes all data permanently. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel as={Button} variant="ghost">Cancel</AlertDialogCancel>
            <Button color="error">Delete</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DemoSection>
  </DemoPage>
);

export default NewDialogDemo;
