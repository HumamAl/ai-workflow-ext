"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { promptTemplates } from "@/data/mock-data";
import type { PromptTemplate } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquareText,
  Eye,
  EyeOff,
  Plus,
  Check,
  Star,
  Zap,
  TrendingUp,
} from "lucide-react";

type Category = PromptTemplate["category"] | "all";

// ── Category badge ────────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: PromptTemplate["category"] }) {
  const config: Record<PromptTemplate["category"], { label: string; colorClass: string }> = {
    summarize: {
      label: "Summarize",
      colorClass: "text-[color:var(--chart-2)] bg-[color:var(--chart-2)]/10",
    },
    translate: {
      label: "Translate",
      colorClass: "text-[color:var(--chart-3)] bg-[color:var(--chart-3)]/10",
    },
    analyze: {
      label: "Analyze",
      colorClass: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
    },
    explain: {
      label: "Explain",
      colorClass: "text-[color:var(--primary)] bg-[color:var(--primary)]/10",
    },
    custom: {
      label: "Custom",
      colorClass: "text-muted-foreground bg-muted",
    },
  };
  const c = config[category];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium border-0 rounded-full", c.colorClass)}
    >
      {c.label}
    </Badge>
  );
}

// ── Template card ─────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  onEdit,
  editingId,
  editedText,
  onTextChange,
  onSave,
}: {
  template: PromptTemplate;
  onEdit: (id: string) => void;
  editingId: string | null;
  editedText: string;
  onTextChange: (t: string) => void;
  onSave: (id: string) => void;
}) {
  const [previewing, setPreviewing] = useState(false);
  const isEditing = editingId === template.id;

  return (
    <div className="aesthetic-card p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-semibold text-foreground">{template.name}</h3>
          {template.isDefault && (
            <Badge
              variant="outline"
              className="text-[10px] border-primary/30 text-primary bg-primary/5 rounded-full px-1.5"
            >
              <Star className="w-2.5 h-2.5 mr-0.5" />
              Default
            </Badge>
          )}
        </div>
        <CategoryBadge category={template.category} />
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        {template.description}
      </p>

      {/* Preview toggle */}
      {previewing && !isEditing && (
        <div className="rounded-md border border-border/40 bg-muted/20 p-3">
          <p className="font-mono text-xs text-foreground/80 whitespace-pre-wrap leading-relaxed">
            {template.template}
          </p>
        </div>
      )}

      {/* Editor */}
      {isEditing && (
        <div className="space-y-2">
          <textarea
            className="w-full font-mono text-xs bg-muted/20 border border-primary/30 rounded-md p-3 text-foreground/90 leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors duration-100"
            rows={5}
            value={editedText}
            onChange={(e) => onTextChange(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="gap-1.5 h-7 text-xs"
              onClick={() => onSave(template.id)}
            >
              <Check className="w-3 h-3" />
              Save Template
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs border-border/60"
              onClick={() => onEdit("")}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span className="font-mono tabular-nums">{template.usageCount}</span> uses
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {new Date(template.lastUsed).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {!isEditing && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setPreviewing((p) => !p)}
              >
                {previewing ? (
                  <>
                    <EyeOff className="w-3 h-3" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    Preview
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs border-border/60"
                onClick={() => {
                  onEdit(template.id);
                  setPreviewing(false);
                }}
              >
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PromptTemplatesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [localTemplates, setLocalTemplates] = useState(promptTemplates);
  const [savedId, setSavedId] = useState<string | null>(null);

  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All" },
    { value: "explain", label: "Explain" },
    { value: "summarize", label: "Summarize" },
    { value: "analyze", label: "Analyze" },
    { value: "translate", label: "Translate" },
    { value: "custom", label: "Custom" },
  ];

  const displayed = useMemo(() => {
    return localTemplates.filter((t) => {
      const matchesCat = activeCategory === "all" || t.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        q === "" ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.template.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [localTemplates, activeCategory, search]);

  function handleEdit(id: string) {
    if (!id) {
      setEditingId(null);
      setEditedText("");
      return;
    }
    const t = localTemplates.find((t) => t.id === id);
    if (t) {
      setEditingId(id);
      setEditedText(t.template);
    }
  }

  function handleSave(id: string) {
    setLocalTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, template: editedText } : t))
    );
    setEditingId(null);
    setEditedText("");
    setSavedId(id);
    setTimeout(() => setSavedId(null), 2000);
  }

  const totalUsage = localTemplates.reduce((sum, t) => sum + t.usageCount, 0);
  const defaultCount = localTemplates.filter((t) => t.isDefault).length;

  return (
    <div className="p-[var(--content-padding,1.5rem)] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Prompt Templates
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage the prompt wrappers sent with your highlighted text.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mr-2">
            <span>
              <span className="font-mono font-semibold text-foreground">{localTemplates.length}</span> templates
            </span>
            <span>
              <span className="font-mono font-semibold text-foreground">{defaultCount}</span> defaults
            </span>
            <span>
              <span className="font-mono font-semibold text-foreground">{totalUsage.toLocaleString()}</span> total uses
            </span>
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            New Template
          </Button>
        </div>
      </div>

      {/* Save toast */}
      {savedId && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[color:var(--success)]/10 border border-[color:var(--success)]/20 text-[color:var(--success)] text-sm">
          <Check className="w-4 h-4" />
          Template saved successfully.
        </div>
      )}

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <MessageSquareText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border/60"
          />
        </div>
        <Tabs
          value={activeCategory}
          onValueChange={(v) => setActiveCategory(v as Category)}
        >
          <TabsList className="h-9 bg-muted/40">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="text-xs px-3 data-[state=active]:bg-card"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "template" : "templates"}
        </span>
      </div>

      {/* Grid */}
      {displayed.length === 0 ? (
        <div className="aesthetic-card p-12 text-center">
          <MessageSquareText className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No templates match this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((template, index) => (
            <div
              key={template.id}
              style={{
                animationDelay: `${index * 50}ms`,
                animationDuration: "150ms",
                animationFillMode: "both",
              }}
            >
              <TemplateCard
                template={template}
                onEdit={handleEdit}
                editingId={editingId}
                editedText={editedText}
                onTextChange={setEditedText}
                onSave={handleSave}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
