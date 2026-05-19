import { createSignal } from "solid-js";
import { DateRangePicker, type DateRange } from "./form/date-picker/date-range-picker";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewDateRangePickerDemo = () => {
  const [r, setR] = createSignal<DateRange | undefined>();
  return (
    <DemoPage
      title="DateRangePicker"
      description="From–To date range. Two-month calendar by default."
    >
      <DemoSection title="Controlled">
        <DateRangePicker value={r()} onValueChange={setR} />
      </DemoSection>
      <DemoSection title="Single month">
        <DateRangePicker numberOfMonths={1} />
      </DemoSection>
    </DemoPage>
  );
};

export default NewDateRangePickerDemo;
