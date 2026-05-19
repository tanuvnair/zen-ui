import { createSignal } from "solid-js";
import { DateTimePicker } from "./form/date-picker/date-time-picker";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewDateTimePickerDemo = () => {
  const [when, setWhen] = createSignal<Date | undefined>();
  return (
    <DemoPage
      title="DateTimePicker"
      description="Calendar + TimePicker combo in one popover."
    >
      <DemoSection title="24h">
        <DateTimePicker value={when()} onValueChange={setWhen} />
        <span class="text-xs text-zen-muted-fg">{when()?.toLocaleString() ?? "—"}</span>
      </DemoSection>
      <DemoSection title="12h with seconds">
        <DateTimePicker defaultValue={new Date()} format="12h" showSeconds />
      </DemoSection>
    </DemoPage>
  );
};

export default NewDateTimePickerDemo;
