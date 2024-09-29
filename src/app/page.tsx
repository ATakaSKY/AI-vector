"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DocumentCard } from "./document-card";
import CreateDocumentButton from "./upload-document-button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>

      {!documents && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card className="h-[200px] p-6 flex flex-col justify-between">
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {documents && documents.length === 0 && (
        <div className="py-12 flex flex-col justify-center items-center gap-8">
          <Image
            src="/documents.svg"
            width="200"
            height="200"
            alt="a picture of a girl holding documents"
          />
          <h2 className="text-2xl">You have no documents</h2>
          <CreateDocumentButton />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {documents?.map((doc) => <DocumentCard document={doc} />)}
        </div>
      )}
    </main>
  );
}
