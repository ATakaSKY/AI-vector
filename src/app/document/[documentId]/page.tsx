"use client";
import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import ChatPanel from "./chat-panel";
export default function DocumentPage({
  params,
}: {
  params: {
    documentId: Id<"documents">;
  };
}) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  return (
    <main className="p-24 space-y-8">
      {!document ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{document?.title}</h1>
          </div>
          <div className="flex gap-12">
            <div className="bg-gray-900 p-4 rounded flex-1 h-[400px]">
              {document?.documentUrl && (
                <iframe className="w-full h-full" src={document.documentUrl} />
              )}
            </div>
            <div className="w-[300px] bg-gray-900">
              <ChatPanel documentId={document._id} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
