"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { DailyUsage } from "@/lib/types";

interface TooltipEntry {
  color?: string;
  name?: string;
  value?: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-card p-3 text-sm shadow-lg">
      <p className="font-medium text-foreground mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2 text-muted-foreground">
          <span
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}:</span>
          <span className="font-mono font-medium text-foreground">
            {entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}

export function TransferActivityChart({ data }: { data: DailyUsage[] }) {
  const formatted = data.map((d) => ({
    date: d.date.slice(5),
    Successes: d.successes,
    Failures: d.failures,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart
        data={formatted}
        margin={{ top: 4, right: 12, bottom: 0, left: -8 }}
      >
        <defs>
          <linearGradient id="fillSuccess" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillFailure" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.4}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          interval={4}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={(props) => <CustomTooltip {...(props as unknown as CustomTooltipProps)} />} />
        <Area
          type="monotone"
          dataKey="Successes"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fillSuccess)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="Failures"
          stroke="var(--destructive)"
          strokeWidth={1.5}
          fill="url(#fillFailure)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
