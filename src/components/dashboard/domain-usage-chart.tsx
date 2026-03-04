"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import type { DomainUsage } from "@/lib/types";

interface TooltipEntry {
  color?: string;
  value?: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-border/60 bg-card p-3 text-sm shadow-lg">
      <p className="font-medium text-foreground mb-1">{label}</p>
      <p className="text-muted-foreground flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: entry?.color }}
        />
        Transfers:{" "}
        <span className="font-mono font-medium text-foreground">
          {entry?.value}
        </span>
      </p>
    </div>
  );
}

export function DomainUsageChart({ data }: { data: DomainUsage[] }) {
  const top8 = data.slice(0, 8);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={top8}
        layout="vertical"
        margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
      >
        <XAxis
          type="number"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="domain"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={130}
        />
        <Tooltip content={(props) => <CustomTooltip {...(props as unknown as CustomTooltipProps)} />} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20}>
          {top8.map((_, i) => (
            <Cell
              key={i}
              fill={`var(--chart-${Math.min(i + 1, 5)})`}
              fillOpacity={1 - i * 0.07}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
