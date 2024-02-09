import { cn } from "@/lib/utils";

interface TypographyBlockquoteStyles {
  root: React.CSSProperties;
}

interface TypographyBlockquoteClassNames {
  root: string;
}

interface TypographyBlockquoteProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  > {
  styles?: Partial<TypographyBlockquoteStyles>;
  classNames?: Partial<TypographyBlockquoteClassNames>;
}

export function TypographyBlockquote({
  children,
  styles,
  classNames,
  ...props
}: TypographyBlockquoteProps): React.JSX.Element {
  return (
    <blockquote
      style={styles?.root}
      className={cn("border-l-2 pl-6 italic", classNames?.root)}
      {...props}
    >
      {children}
    </blockquote>
  );
}
