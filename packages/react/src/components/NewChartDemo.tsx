import { Chart } from "./chart/chart";
import { CodeExample } from "./demo-helpers";

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

const NewChartDemo: React.FC = () => (
  <div className="demo-page">
    <h1>Chart</h1>
    <p className="lede">
      Thin wrapper over <code>recharts</code> (an <strong>optional</strong> peer
      dependency, lazy-loaded on first render). Series colours default to the
      zen palette. Install <code>recharts</code> to use it.
    </p>

    <section className="demo-section">
      <h2>1. Line</h2>
      <CodeExample
        title={`type="line"`}
        code={`<Chart type="line" data={data} xKey="month"
  series={[{ key: "spend", label: "Spend" }, { key: "budget", label: "Budget" }]} />`}
      >
        <div style={{ width: "100%" }}>
          <Chart type="line" data={DATA} xKey="month" series={SERIES} height={280} />
        </div>
      </CodeExample>
    </section>

    <section className="demo-section">
      <h2>2. Area</h2>
      <CodeExample title={`type="area"`} code={`<Chart type="area" data={data} xKey="month" series={series} />`}>
        <div style={{ width: "100%" }}>
          <Chart type="area" data={DATA} xKey="month" series={SERIES} height={280} />
        </div>
      </CodeExample>
    </section>

    <section className="demo-section">
      <h2>3. Bar</h2>
      <CodeExample title={`type="bar"`} code={`<Chart type="bar" data={data} xKey="month" series={series} />`}>
        <div style={{ width: "100%" }}>
          <Chart type="bar" data={DATA} xKey="month" series={SERIES} height={280} />
        </div>
      </CodeExample>
    </section>
  </div>
);

export default NewChartDemo;
