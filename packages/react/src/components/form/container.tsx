import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const LezzformContainer = ({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      className={cn("lf-w-full lf-flex lf-flex-col lf-gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};
