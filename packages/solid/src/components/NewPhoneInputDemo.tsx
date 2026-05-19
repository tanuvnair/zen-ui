import { createSignal } from "solid-js";
import { PhoneInput, type PhoneValue } from "./form/phone-input/phone-input";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewPhoneInputDemo = () => {
  const [phone, setPhone] = createSignal<PhoneValue>({ country: "+91", number: "" });
  return (
    <DemoPage
      title="PhoneInput"
      description="Country dial-code Select composed with a tel Input."
    >
      <DemoSection title="Controlled">
        <div class="w-full max-w-md">
          <PhoneInput value={phone()} onValueChange={setPhone} />
          <div class="text-xs text-zen-muted-fg mt-2">
            Value: {phone().country} {phone().number || "—"}
          </div>
        </div>
      </DemoSection>
    </DemoPage>
  );
};

export default NewPhoneInputDemo;
