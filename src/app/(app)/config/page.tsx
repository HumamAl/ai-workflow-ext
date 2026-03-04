"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Check,
  Keyboard,
  Bell,
  MousePointerClick,
  RefreshCw,
  Shield,
  AlertTriangle,
  Save,
  Loader2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ExtensionConfig {
  // Context menu
  contextMenuEnabled: boolean;
  contextMenuLabel: string;
  toolbarIconEnabled: boolean;
  toolbarIconAction: "open-popup" | "quick-send";

  // Retry
  maxRetries: number;
  retryDelayMs: number;
  exponentialBackoff: boolean;

  // Notifications
  notifyOnSuccess: boolean;
  notifyOnFailure: boolean;
  notifyOnRetry: boolean;
  notificationDuration: number;

  // Behavior
  autoFocusInput: boolean;
  includePageTitle: boolean;
  includePageUrl: boolean;
  clearAfterSend: boolean;
}

const defaultConfig: ExtensionConfig = {
  contextMenuEnabled: true,
  contextMenuLabel: "Send to ChatGPT",
  toolbarIconEnabled: true,
  toolbarIconAction: "open-popup",
  maxRetries: 3,
  retryDelayMs: 1500,
  exponentialBackoff: true,
  notifyOnSuccess: false,
  notifyOnFailure: true,
  notifyOnRetry: true,
  notificationDuration: 3,
  autoFocusInput: true,
  includePageTitle: true,
  includePageUrl: false,
  clearAfterSend: true,
};

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="aesthetic-card p-5 space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <div className="space-y-4 pl-11">{children}</div>
    </div>
  );
}

// ── Toggle row ────────────────────────────────────────────────────────────────

function ToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="shrink-0"
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ExtensionConfigPage() {
  const [config, setConfig] = useState<ExtensionConfig>(defaultConfig);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [resetConfirm, setResetConfirm] = useState(false);

  function update<K extends keyof ExtensionConfig>(key: K, value: ExtensionConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSaveState("idle");
  }

  function handleSave() {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    }, 800);
  }

  function handleReset() {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
      return;
    }
    setConfig(defaultConfig);
    setResetConfirm(false);
    setSaveState("idle");
  }

  return (
    <div className="p-[var(--content-padding,1.5rem)] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Extension Config
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Control how the extension intercepts text and communicates with AI targets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-muted-foreground border-border/60"
            onClick={handleReset}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {resetConfirm ? "Click again to confirm" : "Reset to Defaults"}
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={handleSave}
            disabled={saveState === "saving"}
          >
            {saveState === "saving" ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Saving...
              </>
            ) : saveState === "saved" ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Context menu */}
        <Section
          icon={MousePointerClick}
          title="Context Menu"
          description="Right-click menu behavior when text is selected on any page."
        >
          <ToggleRow
            label="Enable context menu item"
            description="Shows &quot;Send to ChatGPT&quot; in the right-click menu on text selection"
            checked={config.contextMenuEnabled}
            onCheckedChange={(v) => update("contextMenuEnabled", v)}
          />
          <div className={cn("space-y-1.5", !config.contextMenuEnabled && "opacity-40 pointer-events-none")}>
            <label className="text-xs text-muted-foreground">Menu item label</label>
            <Input
              value={config.contextMenuLabel}
              onChange={(e) => update("contextMenuLabel", e.target.value)}
              className="h-8 text-sm bg-card border-border/60 font-mono"
              placeholder="Send to ChatGPT"
            />
          </div>
          <ToggleRow
            label="Enable toolbar icon"
            description="Show the TextBridge icon in the Chrome toolbar"
            checked={config.toolbarIconEnabled}
            onCheckedChange={(v) => update("toolbarIconEnabled", v)}
          />
        </Section>

        {/* Retry config */}
        <Section
          icon={RefreshCw}
          title="Retry Mechanism"
          description="How the extension handles ChatGPT loading delays and failures."
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">
                Max retries
              </label>
              <span className="font-mono text-sm text-primary font-semibold tabular-nums w-5 text-right">
                {config.maxRetries}
              </span>
            </div>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[config.maxRetries]}
              onValueChange={([v]) => update("maxRetries", v)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>5</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">
              Retry delay (ms)
            </label>
            <Input
              type="number"
              value={config.retryDelayMs}
              onChange={(e) => update("retryDelayMs", parseInt(e.target.value) || 500)}
              min={500}
              max={10000}
              step={100}
              className="h-8 text-sm bg-card border-border/60 font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Base wait between retries: {(config.retryDelayMs / 1000).toFixed(1)}s
            </p>
          </div>

          <ToggleRow
            label="Exponential backoff"
            description="Double the delay on each subsequent retry attempt"
            checked={config.exponentialBackoff}
            onCheckedChange={(v) => update("exponentialBackoff", v)}
          />
        </Section>

        {/* Notifications */}
        <Section
          icon={Bell}
          title="Notifications"
          description="Chrome notification preferences for transfer events."
        >
          <ToggleRow
            label="Notify on success"
            description="Show a notification when text is sent successfully"
            checked={config.notifyOnSuccess}
            onCheckedChange={(v) => update("notifyOnSuccess", v)}
          />
          <ToggleRow
            label="Notify on failure"
            description="Alert when a transfer fails after all retries are exhausted"
            checked={config.notifyOnFailure}
            onCheckedChange={(v) => update("notifyOnFailure", v)}
          />
          <ToggleRow
            label="Notify on retry"
            description="Show a notification each time a retry attempt is made"
            checked={config.notifyOnRetry}
            onCheckedChange={(v) => update("notifyOnRetry", v)}
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">
                Notification duration
              </label>
              <span className="font-mono text-sm text-primary font-semibold tabular-nums">
                {config.notificationDuration}s
              </span>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[config.notificationDuration]}
              onValueChange={([v]) => update("notificationDuration", v)}
              className="w-full"
            />
          </div>
        </Section>

        {/* Behavior */}
        <Section
          icon={Shield}
          title="Transfer Behavior"
          description="Fine-grained control over what gets included with each transfer."
        >
          <ToggleRow
            label="Auto-focus input field"
            description="Move keyboard focus to ChatGPT's input after injection"
            checked={config.autoFocusInput}
            onCheckedChange={(v) => update("autoFocusInput", v)}
          />
          <ToggleRow
            label="Include page title"
            description="Prepend the source page title to the prompt context"
            checked={config.includePageTitle}
            onCheckedChange={(v) => update("includePageTitle", v)}
          />
          <ToggleRow
            label="Include page URL"
            description="Append the source URL to provide citation context"
            checked={config.includePageUrl}
            onCheckedChange={(v) => update("includePageUrl", v)}
          />
          <ToggleRow
            label="Clear input after send"
            description="Wipe the injected text from the input field on success"
            checked={config.clearAfterSend}
            onCheckedChange={(v) => update("clearAfterSend", v)}
          />
        </Section>
      </div>

      {/* Keyboard shortcut */}
      <div className="aesthetic-card p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Keyboard className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground">Keyboard Shortcut</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Trigger text transfer without using the context menu.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {["Ctrl", "Shift", "G"].map((key) => (
                  <kbd
                    key={key}
                    className="px-2 py-1 text-xs font-mono font-semibold bg-muted border border-border/60 rounded text-foreground/80"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                Send selected text to ChatGPT
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              To change this shortcut, visit{" "}
              <code className="font-mono text-primary text-[11px]">
                chrome://extensions/shortcuts
              </code>
            </p>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="aesthetic-card p-5 border-destructive/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Irreversible actions. These cannot be undone.
            </p>
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="border-destructive/30 text-destructive hover:bg-destructive/5 hover:border-destructive/50"
                onClick={handleReset}
              >
                {resetConfirm ? "Confirm reset?" : "Reset All Settings"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-destructive/30 text-destructive hover:bg-destructive/5 hover:border-destructive/50"
              >
                Clear Workflow Log
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
