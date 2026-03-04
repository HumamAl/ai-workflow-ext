"use client";

import { useState } from "react";
import {
  MousePointer2,
  Search,
  Timer,
  Zap,
  CheckCircle2,
  ArrowRight,
  Eye,
} from "lucide-react";

interface FlowStep {
  id: string;
  label: string;
  detail: string;
  icon: typeof MousePointer2;
  highlight?: boolean;
}

const steps: FlowStep[] = [
  {
    id: "select",
    label: "Text Selected",
    detail: "User highlights text on any page, triggers context menu or toolbar icon",
    icon: MousePointer2,
  },
  {
    id: "observe",
    label: "MutationObserver",
    detail: "Extension attaches observer to ChatGPT's root — fires when textarea appears",
    icon: Eye,
    highlight: true,
  },
  {
    id: "detect",
    label: "Element Detected",
    detail: "Selector registry resolves #prompt-textarea or fallback candidates",
    icon: Search,
    highlight: true,
  },
  {
    id: "wait",
    label: "React Hydration",
    detail: "Waits for React synthetic event system to be bound (50–150ms polling)",
    icon: Timer,
  },
  {
    id: "inject",
    label: "Event Dispatch",
    detail: "Fires nativeInputValueSetter + input event + change event to satisfy React",
    icon: Zap,
    highlight: true,
  },
  {
    id: "confirm",
    label: "Confirmed",
    detail: "Content script verifies textarea value, triggers Enter keydown",
    icon: CheckCircle2,
  },
];

export function VizInjectionFlow() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
        Text injection pipeline
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-1.5">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;

          return (
            <div key={step.id} className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveStep(isActive ? null : step.id)}
                className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all"
                style={{
                  borderColor: step.highlight
                    ? isActive
                      ? "var(--primary)"
                      : "color-mix(in oklch, var(--primary) 35%, transparent)"
                    : isActive
                    ? "color-mix(in oklch, var(--border), transparent 20%)"
                    : "color-mix(in oklch, var(--border), transparent 40%)",
                  backgroundColor: step.highlight
                    ? isActive
                      ? "color-mix(in oklch, var(--primary) 12%, transparent)"
                      : "color-mix(in oklch, var(--primary) 5%, transparent)"
                    : isActive
                    ? "color-mix(in oklch, var(--muted), transparent 20%)"
                    : "var(--card)",
                  transitionDuration: "120ms",
                }}
              >
                <Icon
                  className="w-3.5 h-3.5 shrink-0"
                  style={{
                    color: step.highlight ? "var(--primary)" : "var(--muted-foreground)",
                  }}
                />
                <span
                  className="text-xs font-medium whitespace-nowrap"
                  style={{
                    color: step.highlight ? "var(--foreground)" : "var(--muted-foreground)",
                  }}
                >
                  {step.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <ArrowRight className="w-3 h-3 text-muted-foreground/40 shrink-0 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>
      {activeStep && (
        <div
          className="rounded-md px-3 py-2 text-xs leading-relaxed transition-all"
          style={{
            backgroundColor: "color-mix(in oklch, var(--primary) 5%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
            color: "var(--foreground)",
            animationDuration: "120ms",
          }}
        >
          <span className="font-mono font-medium text-primary">
            {steps.find((s) => s.id === activeStep)?.label}:{" "}
          </span>
          {steps.find((s) => s.id === activeStep)?.detail}
        </div>
      )}
      {!activeStep && (
        <p className="text-[11px] text-muted-foreground/60 font-mono">
          Click any step to see details
        </p>
      )}
    </div>
  );
}
