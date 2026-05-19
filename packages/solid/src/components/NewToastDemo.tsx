import { Toaster, toast } from "./toast/toaster";
import { Button } from "./button/button";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewToastDemo = () => (
  <DemoPage
    title="Toast"
    description="Transient notifications via solid-toast (port of react-hot-toast)."
  >
    <Toaster />
    <DemoSection title="Variants">
      <Button onClick={() => toast("Saved")}>Default</Button>
      <Button color="success" onClick={() => toast.success("Profile updated")}>Success</Button>
      <Button color="error" onClick={() => toast.error("Couldn't save")}>Error</Button>
      <Button variant="outline" onClick={() => toast.loading("Working on it…", { duration: 2500 })}>
        Loading
      </Button>
    </DemoSection>
  </DemoPage>
);

export default NewToastDemo;
