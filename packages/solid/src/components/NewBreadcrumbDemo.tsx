import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb/breadcrumb";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewBreadcrumbDemo = () => (
  <DemoPage
    title="Breadcrumb"
    description="Navigation trail. Accessible compound built on semantic <nav>/<ol>/<li>, themed via --zen-* tokens. BreadcrumbLink is polymorphic via `as`, so it can render a router Link."
  >
    <DemoSection title="1. Basic" codeTitle="Trail ending on the current page" code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Profile</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </DemoSection>

    <DemoSection
      title="2. Collapsed with ellipsis"
      codeTitle="Use BreadcrumbEllipsis for long trails"
      code={`<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Final page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </DemoSection>

    <DemoSection
      title="3. Custom separator"
      codeTitle="Pass children to BreadcrumbSeparator"
      code={`<BreadcrumbSeparator>&rsaquo;</BreadcrumbSeparator>`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>&rsaquo;</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </DemoSection>
  </DemoPage>
);

export default NewBreadcrumbDemo;
