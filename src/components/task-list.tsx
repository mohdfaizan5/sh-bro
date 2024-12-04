"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Task } from "@prisma/client";
// import AddNewTask from "./add-new-task";
import { changeTaskStatusAction } from "@/actions/task.action";
import dynamic from "next/dynamic";
const AddNewTaskDynamic = dynamic(() => import("./add-new-task"));

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  const handleToggle = async (id: Task["id"]) => {
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
    await changeTaskStatusAction(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <AddNewTaskDynamic />
        {/* <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button> */}
      </div>
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
              {/* <span className="text-sm text-muted-foreground">
              {task.duration} min
            </span> */}
            </div>
          ))}
      </div>
    </div>
  );
}
