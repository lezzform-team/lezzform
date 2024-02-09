import { cn } from "@/lib/utils";

interface TypographyInlineCodeStyles {
  root: React.CSSProperties;
}

interface TypographyInlineCodeClassNames {
  root: string;
}

interface TypographyInlineCodeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TypographyInlineCodeStyles>;
  classNames?: Partial<TypographyInlineCodeClassNames>;
}

export function TypographyInlineCode({
  children,
  styles,
  classNames,
  ...props
}: TypographyInlineCodeProps): React.JSX.Element {
  return (
    <code
      style={styles?.root}
      className={cn(
        "relative rounded bg-lfui-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        classNames?.root,
      )}
      {...props}
    >
      {children}
    </code>
  );
}
