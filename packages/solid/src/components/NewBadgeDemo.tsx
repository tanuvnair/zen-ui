import { Badge } from "./badge/badge";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewBadgeDemo = () => (
  <DemoPage title="Badge" description="Status pill. Defaults to soft + primary.">
    <DemoSection title="Variants">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outline">Outline</Badge>
    </DemoSection>

    <DemoSection title="Colours · solid">
      <Badge variant="solid" color="primary">Primary</Badge>
      <Badge variant="solid" color="neutral">Neutral</Badge>
      <Badge variant="solid" color="info">Info</Badge>
      <Badge variant="solid" color="success">Success</Badge>
      <Badge variant="solid" color="warning">Warning</Badge>
      <Badge variant="solid" color="error">Error</Badge>
    </DemoSection>

    <DemoSection title="Colours · soft">
      <Badge color="primary">Primary</Badge>
      <Badge color="neutral">Neutral</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
    </DemoSection>

    <DemoSection title="With leading dot">
      <Badge color="success">
        <span class="zen-inline-block zen-w-1.5 zen-h-1.5 zen-rounded-zen-full zen-bg-zen-success" />
        Online
      </Badge>
      <Badge color="warning">
        <span class="zen-inline-block zen-w-1.5 zen-h-1.5 zen-rounded-zen-full zen-bg-zen-warning" />
        Pending
      </Badge>
    </DemoSection>

    <DemoSection title="Polymorphic (`as`)">
      <Badge as="a" href="#" color="info">
        Linkable badge
      </Badge>
    </DemoSection>
  </DemoPage>
);

export default NewBadgeDemo;
