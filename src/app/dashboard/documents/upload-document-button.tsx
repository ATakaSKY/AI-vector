import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDocumentForm } from "./upload-document-form";
import { UploadIcon } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/styles";

const CreateDocumentButton = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={btnStyles}>
          <UploadIcon className={btnIconStyles} /> Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a Document</DialogTitle>
          <DialogDescription>
            Upload a team document for you to search over in the future.
          </DialogDescription>

          <UploadDocumentForm onUpload={() => setIsOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocumentButton;
