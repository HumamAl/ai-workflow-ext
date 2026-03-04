import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// Screen definition for frame-based demo formats
export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

// Conversion element variant types
export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ── Extension-specific types ────────────────────────────────────────

export type TransferStatus = "success" | "retry" | "failed" | "pending";

export interface WorkflowEntry {
  id: string;
  timestamp: string;
  sourceUrl: string;
  sourceDomain: string;
  selectedText: string;
  targetAction: "send-to-chatgpt" | "send-to-prompt" | "copy-with-context";
  status: TransferStatus;
  retryCount: number;
  responseTimeMs: number;
  promptTemplate?: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  category: "summarize" | "translate" | "analyze" | "explain" | "custom";
  usageCount: number;
  lastUsed: string;
  isDefault: boolean;
}

export interface SelectorConfig {
  id: string;
  siteName: string;
  domain: string;
  inputSelector: string;
  submitSelector: string;
  loadingIndicator: string;
  status: "active" | "broken" | "untested";
  lastVerified: string;
  version: string;
}

export interface ExtensionStats {
  totalTransfers: number;
  successRate: number;
  avgResponseTime: number;
  activeTemplates: number;
  transfersToday: number;
  transfersThisWeek: number;
}

export interface DailyUsage {
  date: string;
  transfers: number;
  successes: number;
  failures: number;
}

export interface DomainUsage {
  domain: string;
  count: number;
  percentage: number;
}

export interface HourlyDistribution {
  hour: number;
  count: number;
}
