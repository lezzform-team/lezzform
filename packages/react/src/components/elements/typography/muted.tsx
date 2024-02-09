import { cn } from "@/lib/utils";

interface TypographyMutedStyles {
  root: React.CSSProperties;
}

interface TypographyMutedClassNames {
  root: string;
}

interface TypographyMutedProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TypographyMutedStyles>;
  classNames?: Partial<TypographyMutedClassNames>;
}

export function TypographyMuted({
  children,
  styles,
  classNames,
  ...props
}: TypographyMutedProps): React.JSX.Element {
  return (
    <p
      style={styles?.root}
      className={cn("text-sm text-lfui-muted-foreground", classNames?.root)}
      {...props}
    >
      {children}
    </p>
  );
}
