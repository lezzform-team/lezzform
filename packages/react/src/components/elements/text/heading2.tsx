import { cn } from "@/lib/utils";

interface TextHeading2Styles {
  root: React.CSSProperties;
}

interface TextHeading2ClassNames {
  root: string;
}

interface TextHeading2Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TextHeading2Styles>;
  classNames?: Partial<TextHeading2ClassNames>;
}

export function TextHeading2({
  children,
  styles,
  classNames,
  ...props
}: TextHeading2Props): React.JSX.Element {
  return (
    <h2
      style={styles?.root}
      className={cn(
        "lf-text-3xl lf-font-semibold lf-tracking-tight",
        classNames?.root,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
