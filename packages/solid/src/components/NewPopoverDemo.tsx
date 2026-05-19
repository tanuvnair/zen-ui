import { Popover, PopoverTrigger, PopoverContent } from "./popover/popover";
import { Button } from "./button/button";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewPopoverDemo = () => (
  <DemoPage title="Popover" description="Anchored panel built on Kobalte Popover.">
    <DemoSection title="Basic">
      <Popover>
        <PopoverTrigger as={Button} variant="outline">Open popover</PopoverTrigger>
        <PopoverContent>
          <div class="space-y-2">
            <h4 class="font-semibold text-sm m-0">Profile</h4>
            <p class="text-sm text-zen-muted-fg m-0">
              Sign in to see your account details.
            </p>
            <Button size="sm">Sign in</Button>
          </div>
        </PopoverContent>
      </Popover>
    </DemoSection>
  </DemoPage>
);

export default NewPopoverDemo;
