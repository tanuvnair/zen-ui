import { createSignal } from "solid-js";
import { TagInput } from "./form/tag-input/tag-input";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewTagInputDemo = () => {
  const [tags, setTags] = createSignal<string[]>(["solid", "kobalte"]);
  return (
    <DemoPage
      title="TagInput"
      description="Chip input. Enter / Tab / comma commits; Backspace removes."
    >
      <DemoSection title="Controlled">
        <div class="zen-w-96">
          <TagInput value={tags()} onValueChange={setTags} placeholder="Add a skill…" />
        </div>
      </DemoSection>
      <DemoSection title="Max 3 + unique">
        <div class="zen-w-96">
          <TagInput defaultValue={["a"]} max={3} placeholder="Up to 3 unique tags" />
        </div>
      </DemoSection>
    </DemoPage>
  );
};

export default NewTagInputDemo;
