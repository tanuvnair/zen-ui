import { Loading } from "./loading/loading";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewLoadingDemo = () => (
  <DemoPage
    title="Loading"
    description="Animated spinner with sr-only label. Use inline or in disabled buttons."
  >
    <DemoSection title="Sizes">
      <Loading size="sm" />
      <Loading size="md" />
      <Loading size="lg" />
      <Loading size="xl" />
    </DemoSection>

    <DemoSection title="Colours">
      <Loading color="primary" />
      <Loading color="neutral" />
      <Loading color="info" />
      <Loading color="success" />
      <Loading color="warning" />
      <Loading color="error" />
    </DemoSection>

    <DemoSection title="Custom label">
      <Loading size="lg" label="Saving changes" />
    </DemoSection>
  </DemoPage>
);

export default NewLoadingDemo;
