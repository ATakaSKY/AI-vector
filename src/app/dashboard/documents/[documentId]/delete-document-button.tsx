"use client";
import { Button } from "@/components/ui/button";
import { btnIconStyles, btnStyles } from "@/styles/styles";
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

export function DeleteDocumentButton({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const deleteDocument = useMutation(api.documents.deleteDocument);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className={btnStyles}>
          <TrashIcon className={btnIconStyles} /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex gap-3">
          <DialogTitle>
            Are you sure you want to delete this document?
          </DialogTitle>
          <DialogDescription>
            Your document can not be recovered after it's been deleted.
          </DialogDescription>

          <DialogFooter className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <LoadingBtn
              onClick={() => {
                setIsLoading(true);
                deleteDocument({
                  documentId,
                })
                  .then(() => {
                    router.push("/");
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
