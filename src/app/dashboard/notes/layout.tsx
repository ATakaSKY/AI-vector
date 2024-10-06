"use client";

import { useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotesLayout({ children }: { children: ReactNode }) {
  const notes = useQuery(api.notes.getNotes);
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>

      {!notes && (
        <div className="flex gap-12 w-full">
          <div className="w-[300px] flex flex-col gap-3">
            <Skeleton className="h-[20px]  rounded" />
            <Skeleton className="h-[20px]  rounded" />
            <Skeleton className="h-[20px]  rounded" />
          </div>
          <div className="h-[100px]flex-2 w-full">
            <Skeleton className="h-[400px]  rounded" />
          </div>
        </div>
      )}

      {notes && notes.length === 0 && (
        <>
          <div className="py-12 flex flex-col justify-center items-center gap-8">
            <Image
              src="/logo.png"
              width="200"
              height="200"
              alt="a picture of a girl holding documents"
            />
            <h2 className="text-2xl">You have no notes</h2>
            <CreateNoteButton />
          </div>
        </>
      )}

      {notes?.length && (
        <div className="flex gap-12">
          <ul className="space-y-2 w-[300px]">
            {notes?.map((note) => (
              <li
                key={note._id}
                className={cn("text-base hover:text-cyan-100", {
                  "text-cyan-300": note._id === noteId,
                })}
              >
                <Link href={`/dashboard/notes/${note._id}`}>
                  {note.text.substring(0, 24) + "..."}
                </Link>
              </li>
            ))}
          </ul>
          <div className="w-full">{children}</div>
        </div>
      )}
    </main>
  );
}
