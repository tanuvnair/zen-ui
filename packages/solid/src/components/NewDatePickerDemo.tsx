import { createSignal } from "solid-js";
import { DatePicker, Calendar } from "./form/date-picker/date-picker";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewDatePickerDemo = () => {
  const [d, setD] = createSignal<Date | undefined>();
  return (
    <DemoPage
      title="DatePicker"
      description="Date input button that opens a custom Calendar in a Popover. Calendar is also exported standalone for inline use."
    >
      <DemoSection title="Controlled">
        <DatePicker value={d()} onValueChange={setD} />
        <span class="zen-text-xs zen-text-zen-muted-fg">
          {d() ? d()!.toLocaleDateString() : "—"}
        </span>
      </DemoSection>
      <DemoSection title="Inline Calendar (single)">
        <Calendar mode="single" />
      </DemoSection>
    </DemoPage>
  );
};

export default NewDatePickerDemo;
