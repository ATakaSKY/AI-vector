"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.createTask);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, title }) => <div key={_id}>{title}</div>)}

      <button onClick={() => createTask({ title: "New Task" })}>
        Create task
      </button>

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  );
}
