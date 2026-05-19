import { Separator } from "./divider/divider";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewSeparatorDemo = () => (
  <DemoPage
    title="Separator"
    description="Horizontal or vertical divider. Decorative by default; pass decorative={false} when the separation is semantically meaningful."
  >
    <DemoSection title="Horizontal">
      <div class="w-80">
        <div class="text-sm">Profile</div>
        <Separator class="my-3" />
        <div class="text-sm">Billing</div>
        <Separator class="my-3" />
        <div class="text-sm">Notifications</div>
      </div>
    </DemoSection>

    <DemoSection title="Vertical">
      <div class="flex items-center gap-3 h-8 text-sm">
        <span>Edit</span>
        <Separator orientation="vertical" />
        <span>Duplicate</span>
        <Separator orientation="vertical" />
        <span>Delete</span>
      </div>
    </DemoSection>
  </DemoPage>
);

export default NewSeparatorDemo;
