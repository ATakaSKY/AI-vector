import React, { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LoadingBtn = ({
  isLoading,
  loadingText,
  children,
  onClick,
}: {
  isLoading: boolean;
  loadingText: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}) => {
  return (
    <Button
      type="submit"
      className="flex gap-2"
      disabled={isLoading}
      onClick={(e) => onClick?.(e)}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default LoadingBtn;
