"use server";

import prisma from "@/lib/db";
import { Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const changeTaskStatusAction = async (id: Task["id"]) => {
  await prisma.task.update({
    where: {
      id,
    },
    data: {
      isCompleted: true,
    },
  });
};

export const addNewTaskAction = async (task: { name: string }) => {
  await prisma.task.create({
    data: {
      name: task.name,
      userId: 1,
      challengeId: 1,
    },
  });
  revalidatePath("/");
};
