"use client";

import type { ReactNode } from "react";
import { ChallengeCard } from "./challenge-card";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome?: string;
}

interface ChallengeListProps {
  challenges: Challenge[];
  visualizations?: Record<string, ReactNode>;
}

export function ChallengeList({
  challenges,
  visualizations = {},
}: ChallengeListProps) {
  return (
    <div className="flex flex-col gap-4">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          title={challenge.title}
          description={challenge.description}
          outcome={challenge.outcome}
          index={index}
        >
          {visualizations[challenge.id] ?? null}
        </ChallengeCard>
      ))}
    </div>
  );
}
