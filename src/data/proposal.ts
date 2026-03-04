import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Full-stack developer who builds browser integrations and AI workflow tools — from DOM manipulation to API pipelines.",
  bio: "I ship working tools that bridge user workflows with AI. This demo was built specifically for your project — you can click through it right now in Tab 1.",
  approach: [
    {
      title: "Study the Target Interface",
      description:
        "Before writing a line of code, I'll map ChatGPT's DOM structure, identify the right selectors, and document the loading states. This prevents wasted iterations.",
    },
    {
      title: "Build the Core Pipeline",
      description:
        "Context menu handler to tab management to text injection. Get the happy path working first, then handle edge cases. Working code from day one.",
    },
    {
      title: "Add the Resilience Layer",
      description:
        "MutationObserver for dynamic DOM, exponential backoff retries, configurable selectors. The extension should work reliably even when ChatGPT updates.",
    },
    {
      title: "Ship Clean and Document",
      description:
        "Well-organized vanilla JS, clear README, and a selector update guide so you're never dependent on me for maintenance.",
    },
  ],
  skillCategories: [
    {
      name: "Browser Extension APIs",
      skills: [
        "Manifest V3",
        "Content Scripts",
        "Service Workers",
        "Context Menu API",
        "Tabs API",
        "chrome.storage",
      ],
    },
    {
      name: "JavaScript & DOM",
      skills: [
        "JavaScript (ES6+)",
        "DOM Manipulation",
        "MutationObserver",
        "Web APIs",
        "Async/Await",
        "Error Handling",
      ],
    },
    {
      name: "AI & Workflow",
      skills: [
        "Claude API",
        "OpenAI API",
        "n8n Automation",
        "Webhook Integrations",
        "Prompt Engineering",
      ],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "wmf-agent",
    title: "WMF Agent Dashboard",
    description:
      "AI-powered customer service agent for Windsor Metal Finishing. Automated email classification, RFQ data extraction with confidence scoring, and human-in-the-loop approval workflow.",
    outcome:
      "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
    tech: ["Next.js", "Claude API", "n8n", "Microsoft Graph"],
    liveUrl: "https://wmf-agent-dashboard.vercel.app",
    relevance:
      "AI workflow automation — same domain of bridging user actions to structured AI processing",
  },
  {
    id: "ebay-monitor",
    title: "eBay Pokemon Monitor",
    description:
      "eBay Browse API monitoring tool for Pokemon card listings with instant Discord alerts and price tracking. Polls an external API, detects new listings, and fires webhooks automatically.",
    outcome:
      "Real-time listing monitor with webhook-based Discord alerts and price trend tracking",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    liveUrl: "https://ebay-pokemon-monitor.vercel.app",
    relevance:
      "API integration and real-time event handling — same pattern as browser extension polling and alert dispatch",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "Custom lead intake and automation system with public intake form, CRM dashboard, lead scoring, pipeline management, and a configurable automation rules engine.",
    outcome:
      "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    liveUrl: undefined,
    relevance:
      "Complex state management and automation workflows — comparable to extension rule configuration and trigger handling",
  },
];
