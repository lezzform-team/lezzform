import { cn } from "@/lib/utils";

interface TypographyLargeStyles {
  root: React.CSSProperties;
}

interface TypographyLargeClassNames {
  root: string;
}

interface TypographyLargeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  styles?: Partial<TypographyLargeStyles>;
  classNames?: Partial<TypographyLargeClassNames>;
}

export function TypographyLarge({
  children,
  styles,
  classNames,
  ...props
}: TypographyLargeProps): React.JSX.Element {
  return (
    <div
      style={styles?.root}
      className={cn("text-lg font-semibold", classNames?.root)}
      {...props}
    >
      {children}
    </div>
  );
}
