"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const formSchema = z.object({
  challenge: z.string(),
});

export default function AddNewChallengeTasks() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          New Challenge <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Challenge</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. 'Communication course', '100 days challenge'"
                      type=""
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter the name of challenge</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
