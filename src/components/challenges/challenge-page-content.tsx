"use client";

import type { ReactNode } from "react";
import { ChallengeList } from "./challenge-list";
import { VizInjectionFlow } from "./viz-injection-flow";
import { VizServiceWorker } from "./viz-service-worker";
import { VizSelectorArch } from "./viz-selector-arch";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome?: string;
}

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <VizInjectionFlow />,
    "challenge-2": <VizServiceWorker />,
    "challenge-3": <VizSelectorArch />,
  };

  return <ChallengeList challenges={challenges} visualizations={visualizations} />;
}
