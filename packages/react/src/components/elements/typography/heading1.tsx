import { cn } from "@/lib/utils";

interface TypographyHeading1Styles {
  root: React.CSSProperties;
}

interface TypographyHeading1ClassNames {
  root: string;
}

interface TypographyHeading1Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TypographyHeading1Styles>;
  classNames?: Partial<TypographyHeading1ClassNames>;
}

export function TypographyHeading1({
  children,
  styles,
  classNames,
  ...props
}: TypographyHeading1Props): React.JSX.Element {
  return (
    <h1
      style={styles?.root}
      className={cn(
        "text-4xl font-extrabold tracking-tight lg:text-5xl",
        classNames?.root,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
