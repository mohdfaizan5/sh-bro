"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { TagsInput } from "./ui/tags-input";
import { toast } from "sonner";

const formSchema = z.object({
  // works: z.array(z.string()).nonempty("Please at least one item"),
  works: z.string(),
  value: z.string(),
  isHardWorked: z.boolean().optional(),
});

export default function UpdateStatusForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ${values.works.map((work) => " - " + work).join("\n")}
    // const data = `https://wa.me/?text=#daily update
    const data = `#daily update 
${values.works}

*How did I add value to the company;*
${values.value}

*Am I satisfied with my input today?*
${values.isHardWorked ? "Yes" : "No"}

`;

    // const url = `https://api.whatsapp.com/send/?text=${data}`;
    const url = ` https://wa.me/?text=${encodeURIComponent(data)}`;

    // console.log(data);
    // await navigator.clipboard.writeText(data)}
    if ("clipboard" in navigator) {
      const res = await navigator.clipboard.writeText(data);
      console.log(res);
      toast("copied ✔");
    }
    router.push(url);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        {/* <FormField
          control={form.control}
          name="works"
          render={({ field }) => (
            <FormItem>
              <TagsInput
                className="w-full"
                value={field.value}
                onValueChange={field.onChange}
                placeholder="enter your used tech"
              />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="works"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What work did you do today?</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you add value to the company</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                Write all the tasks you did which added value to the company
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isHardWorked"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Are you satisfied with our input today?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  // disabled
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full max-w-xl">
          Update on Whatsapp{" "}
        </Button>
      </form>
    </Form>
  );
}
