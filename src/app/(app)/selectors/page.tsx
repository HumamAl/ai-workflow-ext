"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { selectorConfigs } from "@/data/mock-data";
import type { SelectorConfig } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Code,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Terminal,
  Info,
  BookOpen,
  Pencil,
} from "lucide-react";

// ── Status badge ──────────────────────────────────────────────────────────────

function SelectorStatusBadge({ status }: { status: SelectorConfig["status"] }) {
  const config: Record<SelectorConfig["status"], { label: string; colorClass: string; icon: React.ElementType }> = {
    active: {
      label: "Active",
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10",
      icon: CheckCircle2,
    },
    broken: {
      label: "Broken",
      colorClass: "text-destructive bg-destructive/10",
      icon: XCircle,
    },
    untested: {
      label: "Untested",
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
      icon: HelpCircle,
    },
  };
  const c = config[status];
  const Icon = c.icon;
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium border-0 rounded-full gap-1",
        c.colorClass
      )}
    >
      <Icon className="w-3 h-3" />
      {c.label}
    </Badge>
  );
}

// ── Selector test simulator ───────────────────────────────────────────────────

interface TestResult {
  siteId: string;
  status: "idle" | "running" | "found" | "not-found";
  message: string;
}

function SelectorTester({
  config,
  result,
  onTest,
}: {
  config: SelectorConfig;
  result: TestResult;
  onTest: (id: string) => void;
}) {
  const statusStyles: Record<TestResult["status"], string> = {
    idle: "text-muted-foreground",
    running: "text-[color:var(--warning)]",
    found: "text-[color:var(--success)]",
    "not-found": "text-destructive",
  };

  return (
    <div className="rounded-lg border border-border/40 bg-muted/20 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Simulate DOM query on {config.domain}
        </span>
        <Button
          size="sm"
          variant="outline"
          className="h-7 gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/5"
          onClick={() => onTest(config.id)}
          disabled={result.status === "running"}
        >
          <Play className="w-3 h-3" />
          {result.status === "running" ? "Testing..." : "Test Selector"}
        </Button>
      </div>
      <div className="font-mono text-[11px] space-y-1">
        <div className="flex gap-2 text-muted-foreground">
          <span className="text-primary/60">$</span>
          <span>document.querySelector(<span className="text-primary">&quot;{config.inputSelector}&quot;</span>)</span>
        </div>
        {result.status !== "idle" && (
          <div className={cn("flex gap-2", statusStyles[result.status])}>
            <span>{result.status === "running" ? "⟳" : result.status === "found" ? "✓" : "✗"}</span>
            <span>{result.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Expandable row ────────────────────────────────────────────────────────────

function SelectorRow({
  config,
  testResult,
  onTest,
}: {
  config: SelectorConfig;
  testResult: TestResult;
  onTest: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors duration-100 border-border/30"
        onClick={() => setExpanded((e) => !e)}
      >
        <TableCell>
          <div className="flex items-center gap-2">
            <ChevronRight
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform duration-100 shrink-0",
                expanded && "rotate-90"
              )}
            />
            <span className="text-sm font-medium text-foreground">{config.siteName}</span>
          </div>
        </TableCell>
        <TableCell>
          <span className="font-mono text-xs text-muted-foreground">{config.domain}</span>
        </TableCell>
        <TableCell>
          <code className="font-mono text-xs text-primary bg-primary/8 px-1.5 py-0.5 rounded">
            {config.inputSelector}
          </code>
        </TableCell>
        <TableCell>
          <code className="font-mono text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
            {config.submitSelector}
          </code>
        </TableCell>
        <TableCell>
          <SelectorStatusBadge status={config.status} />
        </TableCell>
        <TableCell>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {new Date(config.lastVerified).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </TableCell>
        <TableCell>
          <span className="font-mono text-xs text-muted-foreground">{config.version}</span>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow className="border-border/30">
          <TableCell colSpan={7} className="bg-muted/15 p-4">
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1 uppercase tracking-wide text-[10px] font-medium">Input Selector</p>
                  <code className="font-mono text-primary block">{config.inputSelector}</code>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1 uppercase tracking-wide text-[10px] font-medium">Submit Selector</p>
                  <code className="font-mono text-foreground/80 block">{config.submitSelector}</code>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1 uppercase tracking-wide text-[10px] font-medium">Loading Indicator</p>
                  <code className="font-mono text-muted-foreground block">{config.loadingIndicator}</code>
                </div>
              </div>
              <SelectorTester config={config} result={testResult} onTest={onTest} />
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const INITIAL_TEST_RESULTS: Record<string, TestResult> = Object.fromEntries(
  selectorConfigs.map((c) => [
    c.id,
    { siteId: c.id, status: "idle", message: "" },
  ])
);

const SIMULATED_RESPONSES: Record<string, { status: "found" | "not-found"; message: string }> = {
  "sc-001": { status: "found", message: '<textarea id="prompt-textarea" rows="1"> — element found' },
  "sc-002": { status: "not-found", message: "No element matches — selector may be outdated" },
  "sc-003": { status: "found", message: "[contenteditable='true'] — element found, 1 match" },
  "sc-004": { status: "not-found", message: "No element found — site may have updated its DOM" },
};

export default function SelectorGuidePage() {
  const [testResults, setTestResults] = useState<Record<string, TestResult>>(INITIAL_TEST_RESULTS);
  const [customSelector, setCustomSelector] = useState("");
  const [customTestState, setCustomTestState] = useState<"idle" | "running" | "found" | "not-found">("idle");

  function handleTest(id: string) {
    setTestResults((prev) => ({
      ...prev,
      [id]: { siteId: id, status: "running", message: "Querying DOM..." },
    }));
    setTimeout(() => {
      const result = SIMULATED_RESPONSES[id] ?? { status: "not-found" as const, message: "No element found" };
      setTestResults((prev) => ({
        ...prev,
        [id]: { siteId: id, ...result },
      }));
    }, 900);
  }

  function handleCustomTest() {
    if (!customSelector.trim()) return;
    setCustomTestState("running");
    setTimeout(() => {
      const found = customSelector.includes("#") || customSelector.includes("[");
      setCustomTestState(found ? "found" : "not-found");
    }, 700);
  }

  const activeCount = selectorConfigs.filter((c) => c.status === "active").length;
  const brokenCount = selectorConfigs.filter((c) => c.status === "broken").length;

  return (
    <div className="p-[var(--content-padding,1.5rem)] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Selector Guide
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            DOM selectors used to inject text into each AI platform. Update these when a site redesigns its UI.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)]" />
              <span className="font-mono font-semibold text-foreground">{activeCount}</span> active
            </span>
            <span className="flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-destructive" />
              <span className="font-mono font-semibold text-foreground">{brokenCount}</span> broken
            </span>
          </div>
          <Button size="sm" className="gap-1.5">
            <Pencil className="w-3.5 h-3.5" />
            Add Site
          </Button>
        </div>
      </div>

      {/* Broken selector warning */}
      {brokenCount > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-destructive/8 border border-destructive/20">
          <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
          <div className="text-sm">
            <span className="font-medium text-destructive">{brokenCount} broken selector{brokenCount > 1 ? "s" : ""} detected.</span>{" "}
            <span className="text-muted-foreground">
              ChatGPT (Legacy) selectors are outdated. Click a row to test and update.
            </span>
          </div>
        </div>
      )}

      {/* Selector table */}
      <div className="aesthetic-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40">
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Site
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Domain
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Input Selector
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Submit Selector
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Verified
                </TableHead>
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Version
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectorConfigs.map((config) => (
                <SelectorRow
                  key={config.id}
                  config={config}
                  testResult={testResults[config.id]}
                  onTest={handleTest}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Two-column info section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* How selectors work */}
        <div className="aesthetic-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">How Selectors Work</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            When you trigger a transfer, the content script runs{" "}
            <code className="font-mono text-primary text-[11px] bg-primary/8 px-1 rounded">
              document.querySelector(inputSelector)
            </code>{" "}
            on the target AI page to find the chat input field. If found, it injects your
            text using native DOM APIs and dispatches synthetic{" "}
            <code className="font-mono text-[11px] text-foreground/70">input</code> events so
            React-based UIs register the change.
          </p>
          <div className="rounded-lg border border-border/40 bg-muted/20 p-3 space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span className="font-mono">content-script.ts</span>
            </div>
            <pre className="font-mono text-[11px] text-foreground/80 leading-relaxed overflow-x-auto">
{`const el = document.querySelector(inputSelector);
if (!el) throw new SelectorError(domain);

el.value = wrappedText;
el.dispatchEvent(new Event("input", { bubbles: true }));

const btn = document.querySelector(submitSelector);
await waitForElement(loadingIndicator, 5000);
btn?.click();`}
            </pre>
          </div>
        </div>

        {/* How to update selectors */}
        <div className="aesthetic-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">How to Update Selectors</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            When a target site updates its UI and selectors break, follow these steps:
          </p>
          <ol className="space-y-2">
            {[
              { n: 1, text: "Open the target site (e.g. chatgpt.com) in Chrome" },
              { n: 2, text: "Right-click the chat input → Inspect Element" },
              { n: 3, text: "In DevTools, right-click the element → Copy → Copy selector" },
              { n: 4, text: "Paste the selector into the row's Input Selector field" },
              { n: 5, text: "Use the Test Selector button to verify the query resolves" },
              { n: 6, text: "Save and bump the version number" },
            ].map(({ n, text }) => (
              <li key={n} className="flex items-start gap-2 text-xs text-foreground/80">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {n}
                </span>
                {text}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Custom selector tester */}
      <div className="aesthetic-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Custom Selector Test</h3>
          <span className="text-xs text-muted-foreground">Test any CSS selector before saving</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <code className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
              $
            </code>
            <Input
              value={customSelector}
              onChange={(e) => {
                setCustomSelector(e.target.value);
                setCustomTestState("idle");
              }}
              placeholder='#prompt-textarea, [contenteditable="true"], .ql-editor'
              className="pl-7 font-mono text-xs bg-card border-border/60"
              onKeyDown={(e) => e.key === "Enter" && handleCustomTest()}
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
            onClick={handleCustomTest}
            disabled={!customSelector.trim() || customTestState === "running"}
          >
            <Play className="w-3.5 h-3.5" />
            {customTestState === "running" ? "Testing..." : "Run Query"}
          </Button>
        </div>
        {customTestState !== "idle" && customTestState !== "running" && (
          <div
            className={cn(
              "flex items-center gap-2 text-sm rounded-md px-3 py-2",
              customTestState === "found"
                ? "text-[color:var(--success)] bg-[color:var(--success)]/8"
                : "text-destructive bg-destructive/8"
            )}
          >
            {customTestState === "found" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 shrink-0" />
            )}
            <span className="font-mono text-xs">
              {customTestState === "found"
                ? `Element found — "${customSelector}" resolves in simulated DOM`
                : `No element found — check the selector syntax or try a different query`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
