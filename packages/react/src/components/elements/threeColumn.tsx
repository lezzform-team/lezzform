import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const ThreeColumn = ({ children, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn(props?.className, "w-full grid grid-cols-3 gap-2")}
    >
      {children}
    </div>
  );
};
