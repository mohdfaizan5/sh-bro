import { Card } from "@/components/ui/card";
import { TaskList } from "@/components/task-list";
import { ArrowRight, Zap } from "lucide-react";
import { daysRemaining } from "@/lib/utils";
import prisma from "@/lib/db";
import { Progress } from "@/components/ui/progress";
import RadialChart from "@/components/radial-chart";
import Link from "next/link";

// Dummy data for UI demonstration
const dummyTasks = [
  {
    id: "1",
    title: "Exercise",
    duration: 25,
    status: "pending",
    type: "routine",
  },
  {
    id: "2",
    title: "Read book",
    duration: 25,
    status: "completed",
    type: "routine",
  },
  {
    id: "3",
    title: "Communication",
    duration: 25,
    status: "pending",
    type: "routine",
  },
  {
    id: "4",
    title: "Complete assignment",
    duration: 25,
    status: "pending",
    type: "task",
  },
  {
    id: "5",
    title: "Arrange books",
    duration: 25,
    status: "completed",
    type: "task",
  },
];

export default async function HomePage() {
  const tasks = await prisma.task.findMany({
    where: {
      userId: 1,
    },
  });

  const totalTasks = tasks.length;
  // const completedTasks = dummyTasks.filter(
  //   (task) => task.status === "completed"
  // ).length;
  // const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  // const routineTasks = dummyTasks.filter((task) => task.type === "routine");
  // const otherTasks = dummyTasks.filter((task) => task.type === "task");

  console.log(tasks);

  const focusedHours = Math.round(
    dummyTasks.reduce((acc, task) => acc + task.duration, 0) / 60
  );
  // const remainingTasks = dummyTasks.filter(
  //   (task) => task.status === "pending"
  // ).length;

  const days_remaining = daysRemaining("2024-12-30");

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold">Hey Champion</h1>
        <Zap className="w-6 h-6 text-yellow-400" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center">
          <div className="text-7xl font-bold">{days_remaining}</div>
          <div className=" text-muted-foreground">days remaining</div>
        </Card>
        <div className="grid grid-rows-2 gap-2">
          <Card className="p-4 ">
            <div className="text-4xl font-bold">{totalTasks}</div>
            <div className="text-xs text-muted-foreground">tasks remaining</div>
          </Card>
          <Card className="p-4">
            <div className="text-4xl font-bold">{focusedHours}hr</div>
            <div className="text-xs text-muted-foreground">focused</div>
          </Card>
        </div>
      </div>

      {/* Quote */}
      <Card className="p-4 bg-black/80 text-white">
        <p className="text-lg text-center font-medium">
          {`"The Magic you're looking for is in the work you're avoiding"`}
        </p>
      </Card>
      <Link
        href={"/daily-update"}
        className="flex items-center gap-2 opacity-80"
      >
        Daily Update <ArrowRight size={16} />
      </Link>
      {/* <RadialChart /> */}

      {/* Progress */}
      {/* <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">60%</div>
          <div>
            <div className="font-medium">Routine completed</div>
            <div className="text-sm text-muted-foreground">
              only 15 are remaining
            </div>
          </div>
        </div>
        <Progress value={15} className="h-2" />
      </div> */}

      {/* Task Lists */}
      {/* <TaskList tasks={routineTasks} /> */}

      <TaskList tasks={tasks} />
    </div>
  );
}
