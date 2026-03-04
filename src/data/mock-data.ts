import type {
  WorkflowEntry,
  PromptTemplate,
  SelectorConfig,
  ExtensionStats,
  DailyUsage,
  DomainUsage,
  HourlyDistribution,
} from "@/lib/types";

// ── Extension Stats ──────────────────────────────────────────────────

export const extensionStats: ExtensionStats = {
  totalTransfers: 1_847,
  successRate: 96.8,
  avgResponseTime: 1_240,
  activeTemplates: 8,
  transfersToday: 23,
  transfersThisWeek: 142,
};

// ── Workflow History ─────────────────────────────────────────────────

export const workflowEntries: WorkflowEntry[] = [
  {
    id: "wf-001",
    timestamp: "2026-03-04T09:15:32Z",
    sourceUrl: "https://docs.python.org/3/library/asyncio.html",
    sourceDomain: "docs.python.org",
    selectedText: "The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations...",
    targetAction: "send-to-chatgpt",
    status: "success",
    retryCount: 0,
    responseTimeMs: 890,
    promptTemplate: "Explain This Code",
  },
  {
    id: "wf-002",
    timestamp: "2026-03-04T08:42:17Z",
    sourceUrl: "https://arxiv.org/abs/2401.12345",
    sourceDomain: "arxiv.org",
    selectedText: "We propose a novel attention mechanism that reduces computational complexity from O(n²) to O(n log n) while maintaining...",
    targetAction: "send-to-chatgpt",
    status: "success",
    retryCount: 0,
    responseTimeMs: 1_120,
    promptTemplate: "Summarize",
  },
  {
    id: "wf-003",
    timestamp: "2026-03-04T08:15:04Z",
    sourceUrl: "https://developer.chrome.com/docs/extensions/mv3/manifest/",
    sourceDomain: "developer.chrome.com",
    selectedText: "The permissions field in manifest.json declares which Chrome APIs the extension needs access to...",
    targetAction: "send-to-prompt",
    status: "success",
    retryCount: 1,
    responseTimeMs: 2_340,
    promptTemplate: "Explain Like I'm 5",
  },
  {
    id: "wf-004",
    timestamp: "2026-03-04T07:55:41Z",
    sourceUrl: "https://github.com/microsoft/TypeScript/issues/48234",
    sourceDomain: "github.com",
    selectedText: "Type inference for conditional types doesn't propagate correctly when the condition involves...",
    targetAction: "send-to-chatgpt",
    status: "retry",
    retryCount: 2,
    responseTimeMs: 4_560,
  },
  {
    id: "wf-005",
    timestamp: "2026-03-04T07:32:19Z",
    sourceUrl: "https://www.postgresql.org/docs/16/queries-with.html",
    sourceDomain: "postgresql.org",
    selectedText: "WITH provides a way to write auxiliary statements for use in a larger query. These statements...",
    targetAction: "send-to-chatgpt",
    status: "success",
    retryCount: 0,
    responseTimeMs: 950,
    promptTemplate: "Explain This Code",
  },
  {
    id: "wf-006",
    timestamp: "2026-03-03T16:45:22Z",
    sourceUrl: "https://react.dev/reference/react/useEffect",
    sourceDomain: "react.dev",
    selectedText: "useEffect is a React Hook that lets you synchronize a component with an external system...",
    targetAction: "send-to-chatgpt",
    status: "success",
    retryCount: 0,
    responseTimeMs: 780,
    promptTemplate: "Explain This Code",
  },
  {
    id: "wf-007",
    timestamp: "2026-03-03T15:20:08Z",
    sourceUrl: "https://news.ycombinator.com/item?id=39456789",
    sourceDomain: "news.ycombinator.com",
    selectedText: "The fundamental problem with current LLM architectures is that attention scales quadratically with context length...",
    targetAction: "send-to-chatgpt",
    status: "failed",
    retryCount: 3,
    responseTimeMs: 8_900,
  },
  {
    id: "wf-008",
    timestamp: "2026-03-03T14:08:33Z",
    sourceUrl: "https://kubernetes.io/docs/concepts/workloads/pods/",
    sourceDomain: "kubernetes.io",
    selectedText: "Pods are the smallest deployable units of computing that you can create and manage in Kubernetes...",
    targetAction: "send-to-prompt",
    status: "success",
    retryCount: 0,
    responseTimeMs: 1_050,
    promptTemplate: "Summarize",
  },
  {
    id: "wf-009",
    timestamp: "2026-03-03T12:55:17Z",
    sourceUrl: "https://web.dev/articles/vitals",
    sourceDomain: "web.dev",
    selectedText: "Core Web Vitals are the subset of Web Vitals that apply to all web pages, should be measured by all site owners...",
    targetAction: "copy-with-context",
    status: "success",
    retryCount: 0,
    responseTimeMs: 320,
  },
  {
    id: "wf-010",
    timestamp: "2026-03-03T11:30:44Z",
    sourceUrl: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
    sourceDomain: "docs.aws.amazon.com",
    selectedText: "AWS Lambda is a compute service that lets you run code without provisioning or managing servers...",
    targetAction: "send-to-chatgpt",
    status: "success",
    retryCount: 0,
    responseTimeMs: 1_180,
    promptTemplate: "Analyze",
  },
  {
    id: "wf-011",
    timestamp: "2026-03-03T10:15:29Z",
    sourceUrl: "https://stackoverflow.com/questions/67234567",
    sourceDomain: "stackoverflow.com",
    selectedText: "The error occurs because the service worker in Manifest V3 has a different lifecycle than...",
    targetAction: "send-to-chatgpt",
    status: "success",
    retryCount: 1,
    responseTimeMs: 1_890,
    promptTemplate: "Explain This Code",
  },
  {
    id: "wf-012",
    timestamp: "2026-03-02T18:42:11Z",
    sourceUrl: "https://openai.com/blog/gpt-4-turbo",
    sourceDomain: "openai.com",
    selectedText: "GPT-4 Turbo has a 128K context window, and we've optimized its performance so it's significantly cheaper...",
    targetAction: "send-to-chatgpt",
    status: "success",
    retryCount: 0,
    responseTimeMs: 920,
    promptTemplate: "Summarize",
  },
  {
    id: "wf-013",
    timestamp: "2026-03-02T17:20:55Z",
    sourceUrl: "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver",
    sourceDomain: "developer.mozilla.org",
    selectedText: "The MutationObserver interface provides the ability to watch for changes being made to the DOM tree...",
    targetAction: "send-to-chatgpt",
    status: "success",
    retryCount: 0,
    responseTimeMs: 840,
    promptTemplate: "Explain This Code",
  },
  {
    id: "wf-014",
    timestamp: "2026-03-02T15:08:38Z",
    sourceUrl: "https://medium.com/@techwriter/chrome-extension-patterns",
    sourceDomain: "medium.com",
    selectedText: "Content scripts can access the DOM of the host page but run in an isolated world with its own JavaScript environment...",
    targetAction: "send-to-chatgpt",
    status: "pending",
    retryCount: 0,
    responseTimeMs: 0,
  },
  {
    id: "wf-015",
    timestamp: "2026-03-02T13:45:02Z",
    sourceUrl: "https://tailwindcss.com/docs/responsive-design",
    sourceDomain: "tailwindcss.com",
    selectedText: "Every utility class in Tailwind can be applied conditionally at different breakpoints...",
    targetAction: "send-to-chatgpt",
    status: "success",
    retryCount: 0,
    responseTimeMs: 760,
    promptTemplate: "Explain Like I'm 5",
  },
];

// ── Prompt Templates ─────────────────────────────────────────────────

export const promptTemplates: PromptTemplate[] = [
  {
    id: "pt-001",
    name: "Explain This Code",
    description: "Break down code snippets with clear explanations of what each part does",
    template: "Explain the following code in detail. Break down what each part does and why:\n\n{text}",
    category: "explain",
    usageCount: 423,
    lastUsed: "2026-03-04T09:15:32Z",
    isDefault: true,
  },
  {
    id: "pt-002",
    name: "Summarize",
    description: "Get a concise summary of selected text — articles, docs, or discussions",
    template: "Summarize the following text in 2-3 sentences, highlighting the key points:\n\n{text}",
    category: "summarize",
    usageCount: 312,
    lastUsed: "2026-03-04T08:42:17Z",
    isDefault: true,
  },
  {
    id: "pt-003",
    name: "Explain Like I'm 5",
    description: "Simplify complex concepts into plain language anyone can understand",
    template: "Explain the following concept in simple terms that anyone could understand. Avoid jargon:\n\n{text}",
    category: "explain",
    usageCount: 187,
    lastUsed: "2026-03-04T08:15:04Z",
    isDefault: false,
  },
  {
    id: "pt-004",
    name: "Find Bugs",
    description: "Analyze code for potential bugs, edge cases, and improvements",
    template: "Review the following code for bugs, edge cases, and potential improvements. Be specific:\n\n{text}",
    category: "analyze",
    usageCount: 156,
    lastUsed: "2026-03-03T14:22:10Z",
    isDefault: false,
  },
  {
    id: "pt-005",
    name: "Translate to Python",
    description: "Convert code from any language to idiomatic Python",
    template: "Translate the following code to idiomatic Python 3. Keep the same logic but use Python conventions:\n\n{text}",
    category: "translate",
    usageCount: 98,
    lastUsed: "2026-03-02T16:30:00Z",
    isDefault: false,
  },
  {
    id: "pt-006",
    name: "Write Tests",
    description: "Generate unit tests for the selected code",
    template: "Write comprehensive unit tests for the following code. Cover edge cases and error conditions:\n\n{text}",
    category: "analyze",
    usageCount: 89,
    lastUsed: "2026-03-03T10:45:00Z",
    isDefault: false,
  },
  {
    id: "pt-007",
    name: "Analyze",
    description: "Deep analysis of text, arguments, or technical content",
    template: "Analyze the following text in depth. Identify key arguments, assumptions, and potential counterpoints:\n\n{text}",
    category: "analyze",
    usageCount: 134,
    lastUsed: "2026-03-03T11:30:44Z",
    isDefault: true,
  },
  {
    id: "pt-008",
    name: "Refactor",
    description: "Suggest refactoring improvements for cleaner, more maintainable code",
    template: "Suggest refactoring improvements for the following code. Focus on readability and maintainability:\n\n{text}",
    category: "custom",
    usageCount: 72,
    lastUsed: "2026-03-01T15:20:00Z",
    isDefault: false,
  },
];

// ── Selector Configurations ──────────────────────────────────────────

export const selectorConfigs: SelectorConfig[] = [
  {
    id: "sc-001",
    siteName: "ChatGPT",
    domain: "chatgpt.com",
    inputSelector: "#prompt-textarea",
    submitSelector: "button[data-testid='send-button']",
    loadingIndicator: "[data-testid='thinking-indicator']",
    status: "active",
    lastVerified: "2026-03-04T00:00:00Z",
    version: "2.1.0",
  },
  {
    id: "sc-002",
    siteName: "ChatGPT (Legacy)",
    domain: "chat.openai.com",
    inputSelector: "textarea[data-id='root']",
    submitSelector: "button.absolute.rounded-md",
    loadingIndicator: ".result-streaming",
    status: "broken",
    lastVerified: "2026-02-15T00:00:00Z",
    version: "1.0.0",
  },
  {
    id: "sc-003",
    siteName: "Claude",
    domain: "claude.ai",
    inputSelector: "[contenteditable='true']",
    submitSelector: "button[aria-label='Send message']",
    loadingIndicator: "[data-testid='spinner']",
    status: "active",
    lastVerified: "2026-03-03T00:00:00Z",
    version: "1.2.0",
  },
  {
    id: "sc-004",
    siteName: "Gemini",
    domain: "gemini.google.com",
    inputSelector: "rich-textarea .ql-editor",
    submitSelector: "button[aria-label='Submit']",
    loadingIndicator: ".loading-spinner",
    status: "untested",
    lastVerified: "2026-02-20T00:00:00Z",
    version: "1.0.0",
  },
];

// ── Daily Usage Data (Last 30 Days) ──────────────────────────────────

export const dailyUsage: DailyUsage[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date("2026-03-04");
  date.setDate(date.getDate() - (29 - i));
  const base = 35 + Math.floor(Math.random() * 25);
  const failures = Math.floor(base * (0.02 + Math.random() * 0.04));
  return {
    date: date.toISOString().split("T")[0],
    transfers: base,
    successes: base - failures,
    failures,
  };
});

// ── Domain Usage Breakdown ───────────────────────────────────────────

export const domainUsage: DomainUsage[] = [
  { domain: "github.com", count: 412, percentage: 22.3 },
  { domain: "stackoverflow.com", count: 298, percentage: 16.1 },
  { domain: "developer.mozilla.org", count: 187, percentage: 10.1 },
  { domain: "docs.python.org", count: 156, percentage: 8.4 },
  { domain: "react.dev", count: 134, percentage: 7.3 },
  { domain: "arxiv.org", count: 98, percentage: 5.3 },
  { domain: "kubernetes.io", count: 87, percentage: 4.7 },
  { domain: "medium.com", count: 76, percentage: 4.1 },
  { domain: "news.ycombinator.com", count: 65, percentage: 3.5 },
  { domain: "Other", count: 334, percentage: 18.1 },
];

// ── Hourly Distribution ──────────────────────────────────────────────

export const hourlyDistribution: HourlyDistribution[] = [
  { hour: 0, count: 2 }, { hour: 1, count: 1 }, { hour: 2, count: 0 },
  { hour: 3, count: 0 }, { hour: 4, count: 1 }, { hour: 5, count: 3 },
  { hour: 6, count: 5 }, { hour: 7, count: 12 }, { hour: 8, count: 28 },
  { hour: 9, count: 45 }, { hour: 10, count: 52 }, { hour: 11, count: 38 },
  { hour: 12, count: 15 }, { hour: 13, count: 32 }, { hour: 14, count: 48 },
  { hour: 15, count: 42 }, { hour: 16, count: 35 }, { hour: 17, count: 22 },
  { hour: 18, count: 14 }, { hour: 19, count: 18 }, { hour: 20, count: 25 },
  { hour: 21, count: 20 }, { hour: 22, count: 12 }, { hour: 23, count: 5 },
];

// ── Recent Activity Feed ─────────────────────────────────────────────

export interface ActivityEvent {
  id: string;
  type: "transfer" | "template_used" | "selector_update" | "error";
  message: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export const recentActivity: ActivityEvent[] = [
  {
    id: "act-001",
    type: "transfer",
    message: "Text sent to ChatGPT from docs.python.org",
    timestamp: "2026-03-04T09:15:32Z",
    metadata: { template: "Explain This Code" },
  },
  {
    id: "act-002",
    type: "transfer",
    message: "Text sent to ChatGPT from arxiv.org",
    timestamp: "2026-03-04T08:42:17Z",
    metadata: { template: "Summarize" },
  },
  {
    id: "act-003",
    type: "error",
    message: "Retry limit reached for github.com transfer",
    timestamp: "2026-03-04T07:55:41Z",
    metadata: { retries: "3" },
  },
  {
    id: "act-004",
    type: "template_used",
    message: "\"Explain Like I'm 5\" template applied",
    timestamp: "2026-03-04T08:15:04Z",
  },
  {
    id: "act-005",
    type: "selector_update",
    message: "ChatGPT selectors verified — all passing",
    timestamp: "2026-03-04T00:00:00Z",
  },
  {
    id: "act-006",
    type: "transfer",
    message: "Text sent to ChatGPT from react.dev",
    timestamp: "2026-03-03T16:45:22Z",
    metadata: { template: "Explain This Code" },
  },
  {
    id: "act-007",
    type: "error",
    message: "ChatGPT interface loading timeout — retrying",
    timestamp: "2026-03-03T15:20:08Z",
  },
  {
    id: "act-008",
    type: "selector_update",
    message: "chat.openai.com selectors marked as broken",
    timestamp: "2026-03-01T12:00:00Z",
  },
];
