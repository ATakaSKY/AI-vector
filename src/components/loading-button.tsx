import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LoadingBtn = ({
  isLoading,
  loadingText,
  children,
}: {
  isLoading: boolean;
  loadingText: string;
  children: ReactNode;
}) => {
  return (
    <Button type="submit" className="flex gap-2" disabled={isLoading}>
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default LoadingBtn;
