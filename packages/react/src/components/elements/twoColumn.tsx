import { cn } from "@/lib/utils";
import React from "react";

export interface TwoColumnStyles {
  root: React.CSSProperties;
}

export interface TwoColumnClassNames {
  root: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  styles?: Partial<TwoColumnStyles>;
  classNames?: Partial<TwoColumnClassNames>;
}

export const TwoColumn = ({
  children,
  styles,
  classNames,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        "lf-w-full lf-grid lf-grid-cols-2 lf-gap-2",
        classNames?.root,
      )}
      style={styles?.root}
      {...props}
    >
      {children}
    </div>
  );
};
