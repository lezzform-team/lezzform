import { cn } from "@/lib/utils";

interface TextInlineCodeStyles {
  root: React.CSSProperties;
}

interface TextInlineCodeClassNames {
  root: string;
}

interface TextInlineCodeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TextInlineCodeStyles>;
  classNames?: Partial<TextInlineCodeClassNames>;
}

export function TextInlineCode({
  children,
  styles,
  classNames,
  ...props
}: TextInlineCodeProps): React.JSX.Element {
  return (
    <code
      style={styles?.root}
      className={cn(
        "lf-relative lf-rounded lf-bg-muted lf-px-[0.3rem] lf-py-[0.2rem] lf-font-mono lf-text-sm lf-font-semibold",
        classNames?.root,
      )}
      {...props}
    >
      {children}
    </code>
  );
}
