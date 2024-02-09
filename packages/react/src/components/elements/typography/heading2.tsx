import { cn } from "@/lib/utils";

interface TypographyHeading2Styles {
  root: React.CSSProperties;
}

interface TypographyHeading2ClassNames {
  root: string;
}

interface TypographyHeading2Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TypographyHeading2Styles>;
  classNames?: Partial<TypographyHeading2ClassNames>;
}

export function TypographyHeading2({
  children,
  styles,
  classNames,
  ...props
}: TypographyHeading2Props): React.JSX.Element {
  return (
    <h2
      style={styles?.root}
      className={cn("text-3xl font-semibold tracking-tight", classNames?.root)}
      {...props}
    >
      {children}
    </h2>
  );
}
