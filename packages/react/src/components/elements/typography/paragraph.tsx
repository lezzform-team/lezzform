import { cn } from "@/lib/utils";

interface TypographyParagraphStyles {
  root: React.CSSProperties;
}

interface TypographyParagraphClassNames {
  root: string;
}

interface TypographyParagraphProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TypographyParagraphStyles>;
  classNames?: Partial<TypographyParagraphClassNames>;
}

export function TypographyParagraph({
  children,
  styles,
  classNames,
  ...props
}: TypographyParagraphProps): React.JSX.Element {
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
