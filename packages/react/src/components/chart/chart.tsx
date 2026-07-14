/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Chart — thin wrapper over `recharts` (an OPTIONAL peer dependency). Lazy-loads
 * recharts on first render so it never weighs on consumers who don't chart.
 * Install `recharts` to use it.
 *
 *   <Chart
 *     type="line"
 *     data={rows}
 *     xKey="month"
 *     series={[{ key: "spend", label: "Spend" }, { key: "budget" }]}
 *   />
 */

export interface ChartSeries {
  /** key into each data row */
  key: string;
  /** legend / tooltip label (defaults to `key`) */
  label?: string;
  /** override colour (any CSS colour; defaults to the zen palette) */
  color?: string;
}

export interface ChartProps {
  type?: "line" | "area" | "bar";
  data: Array<Record<string, any>>;
  series: ChartSeries[];
  /** key on each row used for the x-axis */
  xKey: string;
  height?: number;
  className?: string;
}

const PALETTE = [
  "var(--zen-color-primary)",
  "var(--zen-color-info)",
  "var(--zen-color-success)",
  "var(--zen-color-warning)",
  "var(--zen-color-error)",
  "var(--zen-color-neutral)",
];

export const Chart = ({
  type = "line",
  data,
  series,
  xKey,
  height = 300,
  className,
}: ChartProps) => {
  const [rc, setRc] = React.useState<any>(null);

  React.useEffect(() => {
    let alive = true;
    import("recharts")
      .then((m) => {
        if (alive) setRc(m);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!rc) {
    return (
      <div
        className={cn(
          "zen-flex zen-items-center zen-justify-center zen-text-sm zen-text-zen-muted-fg",
          className,
        )}
        style={{ height }}
      >
        Loading chart…
      </div>
    );
  }

  const {
    ResponsiveContainer,
    LineChart,
    AreaChart,
    BarChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } = rc;

  const ChartRoot = type === "area" ? AreaChart : type === "bar" ? BarChart : LineChart;
  const Series = type === "area" ? Area : type === "bar" ? Bar : Line;

  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartRoot data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--zen-color-border)" />
          <XAxis dataKey={xKey} stroke="var(--zen-color-muted-fg)" fontSize={12} />
          <YAxis stroke="var(--zen-color-muted-fg)" fontSize={12} />
          <Tooltip />
          <Legend />
          {series.map((s, i) => {
            const color = s.color ?? PALETTE[i % PALETTE.length];
            return (
              <Series
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={color}
                fill={color}
                fillOpacity={type === "area" ? 0.2 : 1}
              />
            );
          })}
        </ChartRoot>
      </ResponsiveContainer>
    </div>
  );
};
Chart.displayName = "Chart";
