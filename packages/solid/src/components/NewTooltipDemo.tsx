import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip/tooltip";
import { Button } from "./button/button";
import { DemoPage, DemoSection } from "./demo-helpers";

const NewTooltipDemo = () => (
  <DemoPage
    title="Tooltip"
    description="Hover / focus hint built on Kobalte Tooltip. No <TooltipProvider> needed — Kobalte uses per-instance roots."
  >
    <DemoSection title="Default">
      <Tooltip>
        <TooltipTrigger as={Button} variant="outline">Hover me</TooltipTrigger>
        <TooltipContent>This is a tooltip.</TooltipContent>
      </Tooltip>
    </DemoSection>

    <DemoSection title="With arrow">
      <Tooltip>
        <TooltipTrigger as={Button} variant="outline">Arrow tooltip</TooltipTrigger>
        <TooltipContent arrow>Pointed at the trigger.</TooltipContent>
      </Tooltip>
    </DemoSection>

    <DemoSection title="With delay">
      <Tooltip openDelay={700}>
        <TooltipTrigger as={Button} variant="outline">700 ms open delay</TooltipTrigger>
        <TooltipContent>Took a moment to show.</TooltipContent>
      </Tooltip>
    </DemoSection>
  </DemoPage>
);

export default NewTooltipDemo;
