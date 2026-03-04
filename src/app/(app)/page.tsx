"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import {
  extensionStats,
  dailyUsage,
  domainUsage,
  recentActivity,
  workflowEntries,
} from "@/data/mock-data";
import type { ActivityEvent } from "@/data/mock-data";
import { DemoBanner } from "@/components/layout/conversion-elements";
import {
  Send,
  CheckCircle2,
  Clock,
  Layers,
  AlertCircle,
  RefreshCw,
  MousePointerClick,
  ArrowRight,
  Zap,
  ChevronRight,
} from "lucide-react";

// SSR-safe chart imports
const TransferActivityChart = dynamic(
  () =>
    import("@/components/dashboard/transfer-activity-chart").then(
      (m) => m.TransferActivityChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] bg-muted/20 rounded-lg animate-pulse" />
    ),
  }
);

const DomainUsageChart = dynamic(
  () =>
    import("@/components/dashboard/domain-usage-chart").then(
      (m) => m.DomainUsageChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] bg-muted/20 rounded-lg animate-pulse" />
    ),
  }
);

// ── Count-up hook ──────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number = 1100) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Stat card ──────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: number;
  displayValue: (n: number) => string;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  index: number;
}

function StatCard({
  title,
  value,
  displayValue,
  description,
  icon,
  index,
}: StatCardProps) {
  const { count, ref } = useCountUp(value);

  return (
    <div
      ref={ref}
      className="aesthetic-card p-5 animate-fade-up-in"
      style={{
        animationDelay: `${index * 50}ms`,
        animationDuration: "150ms",
        animationFillMode: "both",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        <span className="text-primary/70">{icon}</span>
      </div>
      <p className="text-3xl font-bold font-mono tabular-nums text-primary">
        {displayValue(count)}
      </p>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ── Status badge ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === "success") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded bg-success/15 text-success">
        <CheckCircle2 className="w-3 h-3" />
        Success
      </span>
    );
  }
  if (status === "retry") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded bg-warning/15 text-warning">
        <RefreshCw className="w-3 h-3" />
        Retried
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded bg-destructive/15 text-destructive">
        <AlertCircle className="w-3 h-3" />
        Failed
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
        <Clock className="w-3 h-3" />
        Pending
      </span>
    );
  }
  return null;
}

function activityIcon(type: ActivityEvent["type"]) {
  if (type === "transfer") return <Send className="w-3.5 h-3.5 text-primary" />;
  if (type === "error")
    return <AlertCircle className="w-3.5 h-3.5 text-destructive" />;
  if (type === "template_used")
    return <Layers className="w-3.5 h-3.5 text-chart-2" />;
  return <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ── Workflow step visualizer ───────────────────────────────────────────────

const WORKFLOW_STEPS = [
  {
    id: "select",
    icon: MousePointerClick,
    label: "Highlight Text",
    detail: "User selects text on any website",
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  {
    id: "menu",
    icon: ChevronRight,
    label: "Context Menu",
    detail: "Right-click triggers extension popup",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    id: "inject",
    icon: Zap,
    label: "DOM Injection",
    detail: "Content script injects text into ChatGPT input",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "send",
    icon: Send,
    label: "Auto-Submit",
    detail: "Extension triggers submit button via selector config",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
  {
    id: "done",
    icon: CheckCircle2,
    label: "Response Ready",
    detail: "ChatGPT responds — avg 1.24s round-trip",
    color: "text-success",
    bg: "bg-success/10",
  },
] as const;

function WorkflowVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= WORKFLOW_STEPS.length) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }
      setActiveStep(step);
    }, 600);
  };

  useEffect(() => {
    const timer = setTimeout(() => runAnimation(), 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-stretch gap-0 overflow-x-auto pb-2">
        {WORKFLOW_STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;
          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <button
                onClick={() => setActiveStep(i)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-lg w-full min-w-[80px] transition-all",
                  isActive
                    ? "opacity-100"
                    : "opacity-30",
                  isCurrent && "ring-1 ring-primary/30"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all",
                    isActive ? step.bg : "bg-muted/30",
                    isCurrent && "scale-110"
                  )}
                  style={{ transitionDuration: "var(--dur-fast)" }}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      isActive ? step.color : "text-muted-foreground"
                    )}
                  />
                </div>
                <span className="text-[11px] font-medium text-center leading-tight text-foreground">
                  {step.label}
                </span>
              </button>
              {i < WORKFLOW_STEPS.length - 1 && (
                <ArrowRight
                  className={cn(
                    "w-3 h-3 shrink-0 mx-0.5 transition-colors",
                    i < activeStep ? "text-primary/60" : "text-border/60"
                  )}
                  style={{ transitionDuration: "var(--dur-fast)" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step detail */}
      <div
        className="mt-3 p-3 rounded-lg bg-muted/20 border border-border/40 transition-all min-h-[52px]"
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            Step {activeStep + 1}:
          </span>{" "}
          {WORKFLOW_STEPS[activeStep].detail}
        </p>
      </div>

      <button
        onClick={runAnimation}
        disabled={isAnimating}
        className="mt-3 text-xs text-primary hover:text-primary/80 transition-colors disabled:opacity-40 flex items-center gap-1"
        style={{ transitionDuration: "var(--dur-fast)" }}
      >
        <RefreshCw className={cn("w-3 h-3", isAnimating && "animate-spin")} />
        {isAnimating ? "Running..." : "Replay workflow"}
      </button>
    </div>
  );
}

// ── Main dashboard page ────────────────────────────────────────────────────

export default function ExtensionOverviewPage() {
  const [period, setPeriod] = useState<"7d" | "14d" | "30d">("30d");

  const chartData = useMemo(() => {
    if (period === "7d") return dailyUsage.slice(-7);
    if (period === "14d") return dailyUsage.slice(-14);
    return dailyUsage;
  }, [period]);

  const stats = [
    {
      title: "Total Transfers",
      value: extensionStats.totalTransfers,
      displayValue: (n: number) => n.toLocaleString(),
      description: `+${extensionStats.transfersToday} today · ${extensionStats.transfersThisWeek} this week`,
      icon: <Send className="w-4 h-4" />,
      index: 0,
    },
    {
      title: "Success Rate",
      value: Math.round(extensionStats.successRate * 10),
      displayValue: (n: number) => `${(n / 10).toFixed(1)}%`,
      description: "3.2% failures · mostly ChatGPT selector timeouts",
      icon: <CheckCircle2 className="w-4 h-4" />,
      index: 1,
    },
    {
      title: "Avg Response Time",
      value: extensionStats.avgResponseTime,
      displayValue: (n: number) => `${(n / 1000).toFixed(2)}s`,
      description: "Inject → ChatGPT reply · p95 under 3.8s",
      icon: <Clock className="w-4 h-4" />,
      index: 2,
    },
    {
      title: "Active Templates",
      value: extensionStats.activeTemplates,
      displayValue: (n: number) => String(n),
      description: `3 default · 5 custom · "Explain This Code" used 423×`,
      icon: <Layers className="w-4 h-4" />,
      index: 3,
    },
  ];

  return (
    <div className="page-container space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Extension Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manifest V3 · DOM injection pipeline · Live transfer analytics
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Transfer activity chart + period filter */}
      <div className="aesthetic-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Transfer Activity
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Daily successes vs. failures over selected window
            </p>
          </div>
          <div className="flex gap-1.5">
            {(["7d", "14d", "30d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-2.5 py-1 text-xs rounded border transition-colors",
                  period === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-muted-foreground hover:bg-muted/40"
                )}
                style={{ transitionDuration: "var(--dur-fast)" }}
              >
                {p === "7d" ? "7 days" : p === "14d" ? "14 days" : "30 days"}
              </button>
            ))}
          </div>
        </div>
        <TransferActivityChart data={chartData} />
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block w-3 h-0.5 bg-chart-1 rounded" />
            Successes
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block w-3 h-0.5 bg-destructive rounded" />
            Failures
          </span>
        </div>
      </div>

      {/* Workflow visualizer + recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Workflow pipeline */}
        <div className="aesthetic-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-1">
            Injection Pipeline
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            End-to-end flow: text selection → ChatGPT DOM injection
          </p>
          <WorkflowVisualizer />
        </div>

        {/* Recent transfers */}
        <div className="aesthetic-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-1">
            Recent Transfers
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Last 8 workflow events — source domain + status
          </p>
          <div className="space-y-0">
            {workflowEntries.slice(0, 8).map((entry, i) => (
              <div
                key={entry.id}
                className={cn(
                  "flex items-start justify-between gap-3 py-2.5 aesthetic-hover px-2 rounded-md -mx-2",
                  i < workflowEntries.slice(0, 8).length - 1 &&
                    "border-b border-border/30"
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {entry.sourceDomain}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {entry.promptTemplate ?? entry.targetAction}
                    {entry.retryCount > 0 && (
                      <span className="ml-1 text-warning">
                        · {entry.retryCount} retr{entry.retryCount === 1 ? "y" : "ies"}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <StatusBadge status={entry.status} />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {formatTime(entry.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Domain usage chart + activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Domain breakdown chart */}
        <div className="aesthetic-card p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground mb-1">
            Source Domain Breakdown
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Transfer volume by originating site — top 8 domains
          </p>
          <DomainUsageChart data={domainUsage} />
        </div>

        {/* Activity feed */}
        <div className="aesthetic-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-1">
            Event Log
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Transfers, selector checks, and error events
          </p>
          <div className="space-y-3">
            {recentActivity.map((event) => (
              <div key={event.id} className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0">{activityIcon(event.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-snug">
                    {event.message}
                  </p>
                  {event.metadata?.template && (
                    <span className="inline-block mt-0.5 text-[10px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                      {event.metadata.template}
                    </span>
                  )}
                  <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                    {formatTime(event.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proposal banner */}
      <DemoBanner />
    </div>
  );
}
