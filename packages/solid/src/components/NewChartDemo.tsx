import { Chart } from "./chart/chart";
import { DemoPage, DemoSection } from "./demo-helpers";

const DATA = [
  { month: "Jan", spend: 4200, budget: 5000 },
  { month: "Feb", spend: 3800, budget: 5000 },
  { month: "Mar", spend: 5100, budget: 5000 },
  { month: "Apr", spend: 4600, budget: 5200 },
  { month: "May", spend: 6100, budget: 5200 },
  { month: "Jun", spend: 5400, budget: 5500 },
];

const SERIES = [
  { key: "spend", label: "Spend" },
  { key: "budget", label: "Budget" },
];

const NewChartDemo = () => (
  <DemoPage
    title="Chart"
    description="Line / area / bar chart rendered as plain SVG — no dependency to install. The React binding wraps recharts, which is React-only; rather than pull a React runtime into the Solid binding, this renders the same three chart types from the same public props. Series colours default to the zen palette."
  >
    <DemoSection
      title="1. Line"
      codeTitle={`type="line"`}
      code={`<Chart type="line" data={data} xKey="month"
  series={[{ key: "spend", label: "Spend" }, { key: "budget", label: "Budget" }]} />`}
    >
      <div class="zen-w-full">
        <Chart type="line" data={DATA} xKey="month" series={SERIES} height={280} />
      </div>
    </DemoSection>

    <DemoSection
      title="2. Area"
      codeTitle={`type="area"`}
      code={`<Chart type="area" data={data} xKey="month" series={series} />`}
    >
      <div class="zen-w-full">
        <Chart type="area" data={DATA} xKey="month" series={SERIES} height={280} />
      </div>
    </DemoSection>

    <DemoSection
      title="3. Bar"
      codeTitle={`type="bar"`}
      code={`<Chart type="bar" data={data} xKey="month" series={series} />`}
    >
      <div class="zen-w-full">
        <Chart type="bar" data={DATA} xKey="month" series={SERIES} height={280} />
      </div>
    </DemoSection>
  </DemoPage>
);

export default NewChartDemo;
