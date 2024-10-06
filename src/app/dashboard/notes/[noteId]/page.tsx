"use client";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { DeleteNoteButton } from "./delete-note-button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotePage() {
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const note = useQuery(api.notes.getNote, {
    noteId: noteId,
  });

  if (!note) {
    return (
      <Card className=" bg-slate-800 p-4 flex flex-col justify-between gap-6">
        <Skeleton className="h-[20px] bg-gray-500 rounded" />
        <Skeleton className="h-[20px] bg-gray-500  rounded" />
        <Skeleton className="h-[20px] bg-gray-500  rounded" />
      </Card>
    );
  }
  return (
    <div className="relative bg-slate-800 rounded p-4 w-full">
      <DeleteNoteButton noteId={note._id} />
      <div className="pr-3 whitespace-pre-line">{note?.text}</div>
    </div>
  );
}
