import { cn } from "@/lib/utils";

interface TextBlockquoteStyles {
  root: React.CSSProperties;
}

interface TextBlockquoteClassNames {
  root: string;
}

interface TextBlockquoteProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  > {
  styles?: Partial<TextBlockquoteStyles>;
  classNames?: Partial<TextBlockquoteClassNames>;
}

export function TextBlockquote({
  children,
  styles,
  classNames,
  ...props
}: TextBlockquoteProps): React.JSX.Element {
  return (
    <blockquote
      style={styles?.root}
      className={cn("lf-border-l-2 lf-pl-6 lf-italic", classNames?.root)}
      {...props}
    >
      {children}
    </blockquote>
  );
}
