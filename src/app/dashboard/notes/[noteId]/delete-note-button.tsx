"use client";
import { Button } from "@/components/ui/button";
import { btnIconStyles } from "@/styles/styles";
import { useMutation } from "convex/react";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingBtn from "@/components/loading-button";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";

export function DeleteNoteButton({ noteId }: { noteId: Id<"notes"> }) {
  const [isLoading, setIsLoading] = useState(false);
  const deleteDocument = useMutation(api.notes.deleteNote);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="absolute -top-3 -right-3">
          <TrashIcon className={btnIconStyles} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex gap-3">
          <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
          <DialogDescription>
            Your note can not be recovered after it&apos;s been deleted.
          </DialogDescription>

          <DialogFooter className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <LoadingBtn
              onClick={() => {
                setIsLoading(true);
                deleteDocument({
                  noteId,
                })
                  .then(() => {
                    router.push("/dashboard/notes");
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}
              isLoading={isLoading}
              loadingText="Deleting..."
            >
              Delete
            </LoadingBtn>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
