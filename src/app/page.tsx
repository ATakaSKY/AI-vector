"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.createTask);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, title }) => <div key={_id}>{title}</div>)}

      <Button onClick={() => createTask({ title: "New Task" })}>
        Create task
      </Button>
    </main>
  );
}
