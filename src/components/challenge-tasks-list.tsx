"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ChallengeTask, Task } from "@prisma/client";
// import AddNewTask from "./add-new-task";
import { changeTaskStatusAction } from "@/actions/task.action";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { changeChallengeTaskStatusAction } from "@/actions/challenge.action";
import { ChallengeTaskForm } from "./challenge-task-form";
const AddNewTaskDynamic = dynamic(() => import("./add-new-task"));

export function ChallengeTaskList({ tasks }: { tasks: ChallengeTask[] }) {
  const [localTasks, setLocalTasks] = useState<ChallengeTask[]>(tasks);

  const handleToggle = async (id: ChallengeTask["id"]) => {
    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
            }
          : task
      )
    );
    await changeChallengeTaskStatusAction(id);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {localTasks &&
          localTasks.length > 0 &&
          localTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${task.id}`}
                  checked={task.isCompleted}
                  onCheckedChange={() => handleToggle(task.id)}
                />
                <label
                  htmlFor={`${task.id}`}
                  className={`text-sm ${
                    task.isCompleted ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.name}
                </label>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
