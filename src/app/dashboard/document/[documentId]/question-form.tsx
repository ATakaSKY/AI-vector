"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import LoadingBtn from "@/src/components/loading-button";
import { Input } from "@/src/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  text: z.string().min(1).max(1050),
});

export function QuestionForm({ documentId }: { documentId: Id<"documents"> }) {
  const askQuestion = useAction(api.documents.askQuestionAction);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await askQuestion({ question: values.text, documentId });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 gap-2"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Ask any question over this document"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingBtn
          isLoading={form.formState.isSubmitting}
          loadingText="Submitting..."
        >
          Submit
        </LoadingBtn>
      </form>
    </Form>
  );
}
