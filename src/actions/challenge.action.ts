"use server";

import prisma from "@/lib/db";
import { ChallengeTask } from "@prisma/client";
import { revalidatePath } from "next/cache";

const changeChallengeTaskStatusAction = async (id: ChallengeTask["id"]) => {
  await prisma.challengeTask.update({
    where: {
      id,
    },
    // TODO, how do we deal for making isComplete false.
    data: {
      isCompleted: true,
    },
  });
};

const AddNewChallengeTasksAction = async (
  tasks: string[],
  challengeId: ChallengeTask["id"]
) => {
  try {
    tasks.forEach(async (task) => {
      console.log(task);
      await prisma.challengeTask.createMany({
        data: {
          challengeId: challengeId,
          name: task,
        },
      });
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  } finally {
    revalidatePath("/challenges/3");
  }
};

export { changeChallengeTaskStatusAction, AddNewChallengeTasksAction };
