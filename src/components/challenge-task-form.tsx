"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";

const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
});

const formSchema = z.object({
  tasks: z.array(taskSchema).min(1, "At least one task is required"),
});

type FormData = z.infer<typeof formSchema>;

interface ChallengeTaskFormProps {
  challengeId: number;
}

export function ChallengeTaskForm({ challengeId }: ChallengeTaskFormProps) {
  const [taskCount, setTaskCount] = useState(1);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasks: [{ name: "" }],
    },
  });

  const addTask = () => {
    setTaskCount(taskCount + 1);
    form.setValue("tasks", [...form.getValues().tasks, { name: "" }]);
  };

  const removeTask = (index: number) => {
    if (taskCount > 1) {
      setTaskCount(taskCount - 1);
      const tasks = form.getValues().tasks;
      tasks.splice(index, 1);
      form.setValue("tasks", tasks);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold">
          Add Tasks to Challenge {challengeId}
        </h2>
        {[...Array(taskCount)].map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`tasks.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task {index + 1}</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Input {...field} placeholder="Enter task name" />
                    {taskCount > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeTask(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex justify-between">
          <Button type="button" onClick={addTask} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
          <Button type="submit">Save Tasks</Button>
        </div>
      </form>
    </Form>
  );
}
