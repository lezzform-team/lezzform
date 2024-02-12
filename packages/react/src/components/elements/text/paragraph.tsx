import { cn } from "@/lib/utils";

interface TextParagraphStyles {
  root: React.CSSProperties;
}

interface TextParagraphClassNames {
  root: string;
}

interface TextParagraphProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TextParagraphStyles>;
  classNames?: Partial<TextParagraphClassNames>;
}

export function TextParagraph({
  children,
  styles,
  classNames,
  ...props
}: TextParagraphProps): React.JSX.Element {
  return (
    <p
      style={styles?.root}
      className={cn("leading-7", classNames?.root)}
      {...props}
    >
      {children}
    </p>
  );
}
