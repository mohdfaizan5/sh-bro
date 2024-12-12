import { ChallengeTaskForm } from "@/components/challenge-task-form";
import { ChallengeTaskList } from "@/components/challenge-tasks-list";
import { Progress } from "@/components/ui/progress";
import prisma from "@/lib/db";
import React from "react";

const page = async ({ params }: { params: Promise<{ challenge: string }> }) => {
  const { challenge: id } = await params;
  if (!id || isNaN(Number(id))) return <div>Invalid Id</div>;
  const challenge = await prisma.challengeTask.findMany({
    where: { challengeId: Number(id) },
    orderBy: {
      isCompleted: "desc",
    },
  });
  if (!challenge) return <div>Challenge not found</div>;

  const totalChallengeTasks = challenge.length;
  const totalPendingTasks = challenge.filter((cha) => !cha.isCompleted).length;
  const percentage =
    ((totalChallengeTasks - totalPendingTasks) / totalChallengeTasks) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <ChallengeTaskForm challengeId={Number(id)} />
      </div>
      <div>
        <Progress value={percentage} aria-label="12% increase" />
        <div className="text-xs text-muted-foreground line-clamp-2">
          {Math.floor(percentage)}% completed
        </div>
      </div>
      {challenge.length > 0 && <ChallengeTaskList tasks={challenge} />}
    </div>
  );
};

export default page;
