import { For } from "solid-js";
import { ScrollArea } from "./scroll-area/scroll-area";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewScrollAreaDemo = () => (
  <DemoPage
    title="ScrollArea"
    description="Native-scroll wrapper with styled thin scrollbar. Lighter than the Radix/React version (no custom rendered thumb) — pulls in zero JS for scroll handling."
  >
    <DemoSection title="Tag list">
      <ScrollArea class="h-72 w-48 rounded-zen-md border border-zen-border p-3">
        <div class="space-y-2">
          <For each={Array.from({ length: 40 }, (_, i) => `Tag #${i + 1}`)}>
            {(label) => (
              <div class="text-sm rounded-zen-sm px-2 py-1 bg-zen-muted">
                {label}
              </div>
            )}
          </For>
        </div>
      </ScrollArea>
    </DemoSection>
  </DemoPage>
);

export default NewScrollAreaDemo;
