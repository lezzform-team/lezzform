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
        "relative rounded bg-lfui-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        classNames?.root,
      )}
      {...props}
    >
      {children}
    </code>
  );
}
