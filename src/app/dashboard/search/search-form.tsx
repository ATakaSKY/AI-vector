"use client";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/form";
import LoadingBtn from "@/components/loading-button";
import { api } from "../../../../convex/_generated/api";

const formSchema = z.object({
  search: z.string().min(1).max(250),
});

export function SearchForm({
  setResults,
}: {
  setResults: (notes: typeof api.search.searchAction._returnType) => void;
}) {
  const searchAction = useAction(api.search.searchAction);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setResults([]);
    await searchAction({ search: values.search }).then(setResults);
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
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Search over all your notes and documents using vector searching"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingBtn
          isLoading={form.formState.isSubmitting}
          loadingText="Searching..."
        >
          Search
        </LoadingBtn>
      </form>
    </Form>
  );
}
