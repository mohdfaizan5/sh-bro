import { ChallengeTaskForm } from "@/components/challenge-task-form";
import { Progress } from "@/components/ui/progress";
import prisma from "@/lib/db";
import React from "react";

const page = async ({ params }: { params: Promise<{ challenge: string }> }) => {
  const { challenge: id } = await params;
  // if (!id || Number(id)) return <div>Challenge not found</div>;
  const challenge = await prisma.challengeTask.findMany({
    where: { challengeId: 2 },
  });
  // if (!challenge) return <div>Challenge not found</div>;

  return (
    <div>
      <div>
        <Progress value={12} aria-label="12% increase" />
        <div className="text-xs text-muted-foreground line-clamp-2">70%</div>
      </div>
      {challenge.length > 0 &&
        challenge.map((c, i) => (
          <div key={i}>
            <h2>{c.name}</h2>
          </div>
        ))}
      <ChallengeTaskForm challengeId={2} />
    </div>
  );
};

export default page;
