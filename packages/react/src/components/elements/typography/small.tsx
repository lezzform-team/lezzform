import { cn } from "@/lib/utils";

interface TypographySmallStyles {
  root: React.CSSProperties;
}

interface TypographySmallClassNames {
  root: string;
}

interface TypographySmallProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TypographySmallStyles>;
  classNames?: Partial<TypographySmallClassNames>;
}

export function TypographySmall({
  children,
  styles,
  classNames,
  ...props
}: TypographySmallProps): React.JSX.Element {
  return (
    <small
      style={styles?.root}
      className={cn("text-sm font-medium leading-none", classNames?.root)}
      {...props}
    >
      {children}
    </small>
  );
}
