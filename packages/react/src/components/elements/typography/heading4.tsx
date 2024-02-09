import { cn } from "@/lib/utils";

interface TypographyHeading4Styles {
  root: React.CSSProperties;
}

interface TypographyHeading4ClassNames {
  root: string;
}

interface TypographyHeading4Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TypographyHeading4Styles>;
  classNames?: Partial<TypographyHeading4ClassNames>;
}

export function TypographyHeading4({
  children,
  styles,
  classNames,
  ...props
}: TypographyHeading4Props): React.JSX.Element {
  return (
    <h4
      style={styles?.root}
      className={cn("text-xl font-semibold tracking-tight", classNames?.root)}
      {...props}
    >
      {children}
    </h4>
  );
}
