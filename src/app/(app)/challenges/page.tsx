import AddNewChallenge from "@/components/add-new-challenge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const page = async () => {
  const challenges = await prisma.challenge.findMany({
    include: {
      ChallengeTasks: {
        select: {
          isCompleted: true,
        },
      },
    },
  });

  return (
    <div className="">
      <div className="flex justify-between py-2">
        <h3>Challenges</h3>
        <AddNewChallenge />
      </div>
      <main className="space-y-2">
        {challenges.length > 0 &&
          challenges.map((challenge, i) => {
            const totalChallengeTasks = challenge.ChallengeTasks.length;
            const totalPendingTasks = challenge.ChallengeTasks.filter(
              (cha) => !cha.isCompleted
            ).length;
            const percentage =
              ((totalChallengeTasks - totalPendingTasks) /
                totalChallengeTasks) *
              100;

            return (
              <Card key={i}>
                <Link href={`/challenges/${challenge.id}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">
                      {challenge.title}
                    </CardTitle>
                    <CardDescription>
                      {totalChallengeTasks - totalPendingTasks}/
                      {totalChallengeTasks} tasks
                    </CardDescription>
                  </CardHeader>
                  {challenge.description && (
                    <CardContent>
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        To learn communication and get better at it.
                      </div>
                    </CardContent>
                  )}
                  <CardFooter className="flex items-center gap-1">
                    <Progress value={percentage} aria-label="12% increase" />
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {Math.floor(percentage)}%
                    </div>
                  </CardFooter>
                </Link>
              </Card>
            );
          })}
      </main>
    </div>
  );
};

export default page;
