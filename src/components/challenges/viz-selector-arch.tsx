import { Settings, RefreshCw, Shield, Zap, AlertCircle } from "lucide-react";

interface ArchLayer {
  label: string;
  tech: string;
  detail: string;
  icon: typeof Settings;
  type: "config" | "runtime" | "fallback" | "alert";
}

const layers: ArchLayer[] = [
  {
    label: "Remote Config",
    tech: "versioned JSON endpoint",
    detail: "Selector registry fetched on install + daily. No code change needed.",
    icon: RefreshCw,
    type: "config",
  },
  {
    label: "Primary Selector",
    tech: "#prompt-textarea (ChatGPT)",
    detail: "Current confirmed selector. Active until registry version bumps.",
    icon: Zap,
    type: "runtime",
  },
  {
    label: "Fallback Chain",
    tech: "[data-id='root-outlet'] textarea, [contenteditable=true]",
    detail: "Ordered fallbacks tried in sequence when primary fails.",
    icon: Shield,
    type: "fallback",
  },
  {
    label: "Break Detection",
    tech: "0 matches → send alert",
    detail: "Content script fires an alert to extension popup when all selectors fail.",
    icon: AlertCircle,
    type: "alert",
  },
];

const typeStyles: Record<ArchLayer["type"], { bg: string; border: string; text: string }> = {
  config: {
    bg: "color-mix(in oklch, var(--primary) 8%, transparent)",
    border: "color-mix(in oklch, var(--primary) 20%, transparent)",
    text: "var(--primary)",
  },
  runtime: {
    bg: "color-mix(in oklch, var(--success) 6%, transparent)",
    border: "color-mix(in oklch, var(--success) 15%, transparent)",
    text: "var(--success)",
  },
  fallback: {
    bg: "color-mix(in oklch, var(--warning) 6%, transparent)",
    border: "color-mix(in oklch, var(--warning) 15%, transparent)",
    text: "var(--warning)",
  },
  alert: {
    bg: "color-mix(in oklch, var(--destructive) 5%, transparent)",
    border: "color-mix(in oklch, var(--destructive) 12%, transparent)",
    text: "var(--destructive)",
  },
};

export function VizSelectorArch() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
        Selector registry architecture
      </p>
      <div className="space-y-2">
        {layers.map((layer) => {
          const Icon = layer.icon;
          const style = typeStyles[layer.type];

          return (
            <div
              key={layer.label}
              className="flex items-start gap-3 rounded-md px-3 py-2.5"
              style={{
                backgroundColor: style.bg,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: style.border,
              }}
            >
              <div
                className="mt-0.5 w-6 h-6 rounded flex items-center justify-center shrink-0"
                style={{ backgroundColor: style.border }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: style.text }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold" style={{ color: style.text }}>
                    {layer.label}
                  </span>
                  <code
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: style.bg,
                      color: "var(--muted-foreground)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: style.border,
                    }}
                  >
                    {layer.tech}
                  </code>
                </div>
                <p className="text-xs text-muted-foreground/80 mt-0.5">{layer.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="rounded-md px-3 py-2 flex items-start gap-2"
        style={{
          backgroundColor: "color-mix(in oklch, var(--primary) 4%, transparent)",
          borderWidth: "1px",
          borderStyle: "dashed",
          borderColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
        }}
      >
        <Settings className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/60" />
        <p className="text-xs text-muted-foreground/70 font-mono">
          Selector fix = update config JSON + bump version number. No Chrome Web Store submission needed.
        </p>
      </div>
    </div>
  );
}
