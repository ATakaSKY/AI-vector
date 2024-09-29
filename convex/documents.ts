import { ConvexError, v } from "convex/values";
import {
  action,
  internalQuery,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
import OpenAI from "openai";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function hasAccessToDocument(
  ctx: MutationCtx | QueryCtx,
  documentId: Id<"documents">
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  if (!userId) {
    return null;
  }
  const document = await ctx.db.get(documentId);
  if (!document) {
    return null;
  }
  if (document.tokenIdentifier !== userId) {
    return null;
  }
  return { document, userId };
}

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await hasAccessToDocument(ctx, args.documentId);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getDocuments = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const getDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const docAccessObj = await hasAccessToDocument(ctx, args.documentId);

    if (!docAccessObj) return null;

    return {
      ...docAccessObj.document,
      documentUrl: await ctx.storage.getUrl(docAccessObj.document.fileId),
    };
  },
});

export const createDocument = mutation({
  args: { title: v.string(), fileId: v.id("_storage") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("User not authenticated");
    }

    await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
      fileId: args.fileId,
    });
  },
});

export const askQuestionAction = action({
  args: { question: v.string(), documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const docAccessObj = await ctx.runQuery(
      internal.documents.hasAccessToDocumentQuery,
      {
        documentId: args.documentId,
      }
    );

    if (!docAccessObj) return null;

    const blob = await ctx.storage.get(docAccessObj.document.fileId);

    if (!blob) {
      throw new ConvexError("File not found");
    }

    const text = await blob.text();

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion =
      await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Here is a text file: ${text}`,
          },
          {
            role: "user",
            content: `please answer this question: ${args.question}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: args.question,
      isHuman: true,
      tokenIdentifier: docAccessObj.userId,
    });

    const response =
      chatCompletion.choices[0].message.content ??
      "could not generate a response";

    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: response,
      isHuman: false,
      tokenIdentifier: docAccessObj.userId,
    });
    return response;
  },
});
