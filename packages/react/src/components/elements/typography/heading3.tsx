import { cn } from "@/lib/utils";

interface TypographyHeading3Styles {
  root: React.CSSProperties;
}

interface TypographyHeading3ClassNames {
  root: string;
}

interface TypographyHeading3Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TypographyHeading3Styles>;
  classNames?: Partial<TypographyHeading3ClassNames>;
}

export function TypographyHeading3({
  children,
  styles,
  classNames,
  ...props
}: TypographyHeading3Props): React.JSX.Element {
  return (
    <h3
      style={styles?.root}
      className={cn("text-2xl font-semibold tracking-tight", classNames?.root)}
      {...props}
    >
      {children}
    </h3>
  );
}
