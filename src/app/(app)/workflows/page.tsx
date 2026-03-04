"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { workflowEntries } from "@/data/mock-data";
import type { TransferStatus, WorkflowEntry } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Download,
  RefreshCw,
  Globe,
} from "lucide-react";

// ── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TransferStatus }) {
  const config: Record<TransferStatus, { label: string; colorClass: string }> = {
    success: {
      label: "Success",
      colorClass: "text-[color:var(--success)] bg-[color:var(--success)]/10",
    },
    retry: {
      label: "Retried",
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
    },
    failed: {
      label: "Failed",
      colorClass: "text-destructive bg-destructive/10",
    },
    pending: {
      label: "Pending",
      colorClass: "text-muted-foreground bg-muted",
    },
  };
  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium border-0 rounded-full", c.colorClass)}
    >
      {c.label}
    </Badge>
  );
}

// ── Action label ─────────────────────────────────────────────────────────────

function actionLabel(action: WorkflowEntry["targetAction"]) {
  const map: Record<WorkflowEntry["targetAction"], string> = {
    "send-to-chatgpt": "→ ChatGPT",
    "send-to-prompt": "→ Prompt",
    "copy-with-context": "Copy + Context",
  };
  return map[action];
}

// ── Sort key type ─────────────────────────────────────────────────────────────

type SortKey = "timestamp" | "sourceDomain" | "status" | "responseTimeMs" | "retryCount";

function formatTimestamp(ts: string) {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return "< 1h ago";
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

function formatResponseTime(ms: number) {
  if (ms === 0) return "—";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WorkflowLogPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransferStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const displayed = useMemo(() => {
    return workflowEntries
      .filter((entry) => {
        const matchesStatus =
          statusFilter === "all" || entry.status === statusFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          q === "" ||
          entry.sourceDomain.toLowerCase().includes(q) ||
          entry.selectedText.toLowerCase().includes(q) ||
          (entry.promptTemplate ?? "").toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        let av: string | number = a[sortKey] ?? "";
        let bv: string | number = b[sortKey] ?? "";
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir]);

  const columns: { key: SortKey; label: string; sortable: boolean; className?: string }[] = [
    { key: "timestamp", label: "Time", sortable: true },
    { key: "sourceDomain", label: "Source Domain", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "retryCount", label: "Retries", sortable: true, className: "text-right" },
    { key: "responseTimeMs", label: "Response Time", sortable: true, className: "text-right" },
  ];

  return (
    <div className="p-[var(--content-padding,1.5rem)] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Workflow Log
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Full history of text transfers — source, template, status, and timing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-muted-foreground border-border/60"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-muted-foreground border-border/60"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by domain, text, or template..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border/60"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as TransferStatus | "all")}
        >
          <SelectTrigger className="w-40 bg-card border-border/60">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="retry">Retried</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} of {workflowEntries.length} transfers
        </span>
      </div>

      {/* Table */}
      <div className="aesthetic-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(
                      "bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide",
                      col.sortable &&
                        "cursor-pointer select-none hover:text-foreground transition-colors duration-100",
                      col.className
                    )}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <div className={cn("flex items-center gap-1", col.className?.includes("right") && "justify-end")}>
                      {col.label}
                      {col.sortable && sortKey === col.key && (
                        sortDir === "asc" ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No transfers match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((entry) => (
                  <>
                    <TableRow
                      key={entry.id}
                      className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors duration-100 border-border/30"
                      onClick={() =>
                        setExpandedId(expandedId === entry.id ? null : entry.id)
                      }
                    >
                      {/* Time */}
                      <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(entry.timestamp)}
                      </TableCell>
                      {/* Source */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3 text-muted-foreground shrink-0" />
                          <span className="text-sm font-mono text-foreground/80 truncate max-w-[160px]">
                            {entry.sourceDomain}
                          </span>
                        </div>
                        {entry.promptTemplate && (
                          <p className="text-xs text-muted-foreground mt-0.5 pl-5">
                            {entry.promptTemplate}
                          </p>
                        )}
                      </TableCell>
                      {/* Status */}
                      <TableCell>
                        <StatusBadge status={entry.status} />
                      </TableCell>
                      {/* Retries */}
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "font-mono text-sm tabular-nums",
                            entry.retryCount > 0
                              ? "text-[color:var(--warning)]"
                              : "text-muted-foreground"
                          )}
                        >
                          {entry.retryCount}
                        </span>
                      </TableCell>
                      {/* Response time */}
                      <TableCell className="text-right">
                        <span className="font-mono text-sm tabular-nums text-muted-foreground">
                          {formatResponseTime(entry.responseTimeMs)}
                        </span>
                      </TableCell>
                      {/* Expand indicator */}
                      <TableCell>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform duration-100",
                            expandedId === entry.id && "rotate-90"
                          )}
                        />
                      </TableCell>
                    </TableRow>

                    {/* Expanded row */}
                    {expandedId === entry.id && (
                      <TableRow key={`${entry.id}-expanded`} className="border-border/30">
                        <TableCell
                          colSpan={6}
                          className="bg-muted/20 px-4 py-3"
                        >
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                                Selected Text
                              </p>
                              <p className="text-sm text-foreground/90 leading-relaxed font-mono bg-card/60 rounded-md p-3 border border-border/40">
                                {entry.selectedText}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                              <div>
                                <p className="text-muted-foreground mb-0.5">Action</p>
                                <p className="text-foreground font-mono">
                                  {actionLabel(entry.targetAction)}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-0.5">Source URL</p>
                                <p className="text-primary font-mono truncate">
                                  {entry.sourceUrl}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-0.5">Timestamp</p>
                                <p className="text-foreground font-mono">
                                  {new Date(entry.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-0.5">Transfer ID</p>
                                <p className="text-muted-foreground font-mono">{entry.id}</p>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
