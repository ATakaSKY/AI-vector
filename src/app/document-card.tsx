import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export const DocumentCard = ({ document }: { document: Doc<"documents"> }) => (
  <Card>
    <CardHeader>
      <CardTitle>{document.title}</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <Button asChild variant="secondary" className="flex items-center gap-2">
        <Link href={`/document/${document._id}`}>
          <EyeIcon className="w-4 h-4" />
          View
        </Link>
      </Button>
    </CardFooter>
  </Card>
);
