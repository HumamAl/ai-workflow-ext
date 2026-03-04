"use client";

import { useState } from "react";
import { X, Check, RefreshCw, Database, Wifi, WifiOff } from "lucide-react";

export function VizServiceWorker() {
  const [showSolution, setShowSolution] = useState(false);

  const beforeItems = [
    { icon: WifiOff, text: "Service worker terminated after 5-min idle" },
    { icon: X, text: "In-flight transfer state lost permanently" },
    { icon: X, text: "User sees silent failure — text never arrives" },
    { icon: X, text: "Background page keeps memory alive (MV2 only)" },
  ];

  const afterItems = [
    { icon: Database, text: "Queue persisted to chrome.storage.session before send" },
    { icon: RefreshCw, text: "Worker re-hydrates queue on next wake cycle" },
    { icon: Check, text: "Content script holds message channel as durable runtime" },
    { icon: Wifi, text: "Zero missed transfers across worker restarts" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSolution(false)}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
          style={{
            backgroundColor: !showSolution
              ? "color-mix(in oklch, var(--destructive) 12%, transparent)"
              : "transparent",
            color: !showSolution ? "var(--destructive)" : "var(--muted-foreground)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: !showSolution
              ? "color-mix(in oklch, var(--destructive) 25%, transparent)"
              : "color-mix(in oklch, var(--border), transparent 30%)",
            transitionDuration: "120ms",
          }}
        >
          MV3 Problem
        </button>
        <button
          onClick={() => setShowSolution(true)}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
          style={{
            backgroundColor: showSolution
              ? "color-mix(in oklch, var(--success) 10%, transparent)"
              : "transparent",
            color: showSolution ? "var(--success)" : "var(--muted-foreground)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: showSolution
              ? "color-mix(in oklch, var(--success) 20%, transparent)"
              : "color-mix(in oklch, var(--border), transparent 30%)",
            transitionDuration: "120ms",
          }}
        >
          My Solution
        </button>
      </div>

      <div
        className="rounded-lg p-4 space-y-2 transition-all"
        style={{
          backgroundColor: showSolution
            ? "color-mix(in oklch, var(--success) 5%, transparent)"
            : "color-mix(in oklch, var(--destructive) 5%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: showSolution
            ? "color-mix(in oklch, var(--success) 12%, transparent)"
            : "color-mix(in oklch, var(--destructive) 12%, transparent)",
          transitionDuration: "120ms",
        }}
      >
        <p
          className="text-xs font-mono uppercase tracking-wide font-medium mb-3"
          style={{ color: showSolution ? "var(--success)" : "var(--destructive)" }}
        >
          {showSolution ? "With session persistence + content script relay" : "Default MV3 behavior"}
        </p>
        <ul className="space-y-2">
          {(showSolution ? afterItems : beforeItems).map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Icon
                  className="w-3.5 h-3.5 mt-0.5 shrink-0"
                  style={{ color: showSolution ? "var(--success)" : "var(--destructive)" }}
                />
                <span className="text-foreground/80">{item.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
