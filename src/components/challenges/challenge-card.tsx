import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  description: string;
  outcome?: string;
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function ChallengeCard({
  title,
  description,
  outcome,
  children,
  className,
  index = 0,
}: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn(
        "bg-card border border-primary/10 rounded-xl p-6 space-y-4 transition-all",
        className
      )}
      style={{ boxShadow: "var(--card-shadow, none)" }}
    >
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-medium text-primary/70 w-6 shrink-0 tabular-nums">
            {stepNumber}
          </span>
          <h2 className="text-lg font-semibold leading-snug">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground pl-[calc(1.5rem+0.75rem)] leading-relaxed">
          {description}
        </p>
      </div>
      <div className="pl-[calc(1.5rem+0.75rem)]">{children}</div>
      {outcome && (
        <div
          className="flex items-start gap-2 rounded-md px-3 py-2 ml-[calc(1.5rem+0.75rem)]"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
            borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <TrendingUp className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--success)]" />
          <p className="text-sm font-medium text-[color:var(--success)]">{outcome}</p>
        </div>
      )}
    </div>
  );
}
