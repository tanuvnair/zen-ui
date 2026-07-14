import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs/tabs";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewTabsDemo = () => (
  <DemoPage
    title="Tabs"
    description="Switch between related sections inside the same page. Built on Kobalte Tabs."
  >
    <DemoSection title="Underline (default)">
      <div class="zen-w-full zen-max-w-xl">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p class="zen-text-sm">Overview content goes here.</p>
          </TabsContent>
          <TabsContent value="activity">
            <p class="zen-text-sm">Activity content goes here.</p>
          </TabsContent>
          <TabsContent value="notes">
            <p class="zen-text-sm">Notes content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </DemoSection>

    <DemoSection title="Pills">
      <div class="zen-w-full zen-max-w-xl">
        <Tabs defaultValue="overview">
          <TabsList variant="pills">
            <TabsTrigger variant="pills" value="overview">Overview</TabsTrigger>
            <TabsTrigger variant="pills" value="activity">Activity</TabsTrigger>
            <TabsTrigger variant="pills" value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p class="zen-text-sm">Overview content goes here.</p>
          </TabsContent>
          <TabsContent value="activity">
            <p class="zen-text-sm">Activity content goes here.</p>
          </TabsContent>
          <TabsContent value="notes">
            <p class="zen-text-sm">Notes content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </DemoSection>
  </DemoPage>
);

export default NewTabsDemo;
