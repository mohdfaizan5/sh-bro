import AddNewChallenge from "@/components/add-new-challenge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import prisma from "@/lib/db";
import React from "react";

const page = async () => {
  const challenges = await prisma.challenge.findMany();
  return (
    <div className="">
      <h2>Challenges</h2>
      <AddNewChallenge />
      <main>
        {challenges.length > 0 &&
          challenges.map((challenge, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                {/* <CardDescription>This Month</CardDescription> */}
                <CardTitle className="text-2xl">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  To learn communication and get better at it.
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-1">
                <Progress value={12} aria-label="12% increase" />
                <div className="text-xs text-muted-foreground line-clamp-2">
                  70%
                </div>
              </CardFooter>
            </Card>
          ))}
      </main>
    </div>
  );
};

export default page;
