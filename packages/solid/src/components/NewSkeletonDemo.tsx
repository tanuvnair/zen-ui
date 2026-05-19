import { Skeleton } from "./skeleton/skeleton";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewSkeletonDemo = () => (
  <DemoPage
    title="Skeleton"
    description="Animated placeholder boxes for loading states. Size with utility classes."
  >
    <DemoSection title="Block shapes">
      <Skeleton class="h-4 w-32" />
      <Skeleton class="h-6 w-64" />
      <Skeleton class="h-10 w-48" />
    </DemoSection>

    <DemoSection title="Avatar">
      <Skeleton class="h-12 w-12 rounded-zen-full" />
      <Skeleton class="h-16 w-16 rounded-zen-full" />
    </DemoSection>

    <DemoSection title="Card placeholder">
      <div class="flex items-center gap-3 w-80">
        <Skeleton class="h-12 w-12 rounded-zen-full" />
        <div class="flex-1 flex flex-col gap-2">
          <Skeleton class="h-4 w-3/4" />
          <Skeleton class="h-3 w-1/2" />
        </div>
      </div>
    </DemoSection>
  </DemoPage>
);

export default NewSkeletonDemo;
