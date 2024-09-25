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
      <Button variant="secondary">View</Button>
    </CardFooter>
  </Card>
);
