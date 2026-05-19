import { createSignal } from "solid-js";
import {
  Stepper,
  StepperList,
  StepperPanel,
  StepperNavigation,
  type StepperStep,
} from "./stepper/stepper";
import { Card, CardContent } from "./card/card";
import { DemoPage, DemoSection } from "./demo-helpers";

const steps: StepperStep[] = [
  { value: "basic", label: "Basics", description: "Name, email" },
  { value: "address", label: "Address", description: "Where do we ship?" },
  { value: "review", label: "Review", description: "Confirm + submit" },
];

const NewStepperDemo = () => {
  const [step, setStep] = createSignal("basic");
  const [submitted, setSubmitted] = createSignal(false);

  return (
    <DemoPage
      title="Stepper / Wizard"
      description="Multi-step navigation with linear progression. Compose with @modular-forms/solid via onBeforeNext for per-step validation."
    >
      <DemoSection title="Horizontal · linear">
        <div class="w-full max-w-2xl">
          <Stepper steps={steps} value={step()} onValueChange={setStep}>
            <StepperList />
            <Card padding="md">
              <CardContent>
                <StepperPanel value="basic">
                  <p class="text-sm">Step 1 — collect name + email here.</p>
                  <StepperNavigation />
                </StepperPanel>
                <StepperPanel value="address">
                  <p class="text-sm">Step 2 — collect a shipping address here.</p>
                  <StepperNavigation />
                </StepperPanel>
                <StepperPanel value="review">
                  <p class="text-sm">
                    Step 3 — show a summary and let the user confirm.
                  </p>
                  <StepperNavigation
                    submitLabel="Submit application"
                    onSubmit={() => {
                      setSubmitted(true);
                    }}
                  />
                </StepperPanel>
              </CardContent>
            </Card>
          </Stepper>
          {submitted() ? (
            <p class="text-sm text-zen-success mt-3">Submitted — thanks!</p>
          ) : null}
        </div>
      </DemoSection>
    </DemoPage>
  );
};

export default NewStepperDemo;
