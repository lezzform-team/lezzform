import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const TwoColumn = ({ children, ...props }: Props) => {
  return (
    <div {...props} className={cn("w-full grid grid-cols-2 gap-2")}>
      {children}
    </div>
  );
};
