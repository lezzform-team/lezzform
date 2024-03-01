import { cn } from "@/lib/utils";
import React from "react";

export interface ThreeColumnStyles {
  root: React.CSSProperties;
}

export interface ThreeColumnClassNames {
  root: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  styles?: Partial<ThreeColumnStyles>;
  classNames?: Partial<ThreeColumnClassNames>;
}

export const ThreeColumn = ({
  children,
  classNames,
  styles,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        "lf-w-full lf-grid lf-grid-cols-3 lf-gap-2",
        className,
        classNames?.root,
      )}
      style={styles?.root}
      {...props}
    >
      {children}
    </div>
  );
};
