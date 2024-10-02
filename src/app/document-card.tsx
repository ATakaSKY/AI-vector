import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Doc } from "../../convex/_generated/dataModel";
import { Button } from "@/src/components/ui/button";
import { EyeIcon, Loader2 } from "lucide-react";
import Link from "next/link";

export const DocumentCard = ({ document }: { document: Doc<"documents"> }) => (
  <Card>
    <CardHeader>
      <CardTitle>{document.title}</CardTitle>
      <CardDescription />
    </CardHeader>
    <CardContent>
      <div>
        {!document.description ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          document.description
        )}
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild variant="secondary" className="flex items-center gap-2">
        <Link href={`/dashboard/document/${document._id}`}>
          <EyeIcon className="w-4 h-4" />
          View
        </Link>
      </Button>
    </CardFooter>
  </Card>
);
