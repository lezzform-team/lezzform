import { cn } from "@/lib/utils";

interface TextHeading4Styles {
  root: React.CSSProperties;
}

interface TextHeading4ClassNames {
  root: string;
}

interface TextHeading4Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TextHeading4Styles>;
  classNames?: Partial<TextHeading4ClassNames>;
}

export function TextHeading4({
  children,
  styles,
  classNames,
  ...props
}: TextHeading4Props): React.JSX.Element {
  return (
    <h4
      style={styles?.root}
      className={cn(
        "lf-text-xl lf-font-semibold lf-tracking-tight",
        classNames?.root,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
