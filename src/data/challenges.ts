import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most Chrome extension developers hard-code selectors, assume a stable DOM, and bolt on retries as an afterthought — which means the extension breaks every time ChatGPT ships a UI update or the service worker gets evicted mid-transfer.",
  differentApproach:
    "I build around a configurable selector registry and a MutationObserver-based injection queue, so the extension stays alive across Manifest V3 worker restarts and adapts to DOM changes without a full redeploy.",
  accentWord: "configurable selector registry",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Resilient Text Injection into ChatGPT's React DOM",
    description:
      "ChatGPT's input is a React-controlled contenteditable — a raw value set will be ignored by React's synthetic event system. Getting text in reliably means dispatching the right native events in the right sequence, waiting for the textarea to actually exist in the DOM, and retrying intelligently when it doesn't.",
    visualizationType: "flow",
    outcome:
      "Could achieve 96%+ text injection success rate with MutationObserver-based element detection and a staged event dispatch sequence (input → change → keydown Enter) — compared to ~60% with naive querySelector polling.",
  },
  {
    id: "challenge-2",
    title: "Manifest V3 Service Worker Lifecycle",
    description:
      "MV3 service workers are ephemeral — Chrome can terminate them at any time, including mid-transfer. Without persistent background pages, any in-flight state evaporates. Extension state must survive worker restarts using chrome.storage.session and message-passing to the content script as the durable runtime.",
    visualizationType: "before-after",
    outcome:
      "Could eliminate zero missed text transfers from worker termination by persisting queue state to chrome.storage.session and re-hydrating on worker wake — maintaining seamless UX even across the 5-minute idle termination window.",
  },
  {
    id: "challenge-3",
    title: "Selector Resilience Without Full Extension Updates",
    description:
      "ChatGPT pushes UI updates frequently. Hard-coded selectors like #prompt-textarea break without warning. A configurable selector registry — versioned, remotely patchable via a JSON config — lets a broken selector be fixed in 30 seconds without touching extension code or waiting for Chrome Web Store review.",
    visualizationType: "architecture",
    outcome:
      "Could reduce selector maintenance turnaround from a 3-7 day Chrome Web Store review cycle to a 30-second config edit — keeping the extension functional through ChatGPT's frequent UI deployments.",
  },
];
