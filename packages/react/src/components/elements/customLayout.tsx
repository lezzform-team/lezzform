import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const CustomLayout = ({ children, ...props }: Props) => {
  return (
    <div {...props} className={cn("lf-w-full")}>
      {children}
    </div>
  );
};
