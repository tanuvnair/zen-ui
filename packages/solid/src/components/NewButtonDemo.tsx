import { Button } from "./button/button";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewButtonDemo = () => (
  <DemoPage
    title="Button"
    description="Solid port of the React Button. Polymorphic via `as` instead of `asChild`."
  >
    <DemoSection title="Variants" description="solid · outline · soft · ghost · link">
      <Button>Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </DemoSection>

    <DemoSection title="Colours">
      <Button color="primary">Primary</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </DemoSection>

    <DemoSection title="Sizes">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </DemoSection>

    <DemoSection title="States">
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button
        iconLeft={<span aria-hidden="true">+</span>}
      >
        With icon
      </Button>
    </DemoSection>

    <DemoSection title="Polymorphic (`as`)" description="Render the button styles on an <a> element.">
      <Button as="a" href="#" variant="outline">
        Anchor link
      </Button>
    </DemoSection>
  </DemoPage>
);

export default NewButtonDemo;
