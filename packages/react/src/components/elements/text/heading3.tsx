import { cn } from "@/lib/utils";

interface TextHeading3Styles {
  root: React.CSSProperties;
}

interface TextHeading3ClassNames {
  root: string;
}

interface TextHeading3Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TextHeading3Styles>;
  classNames?: Partial<TextHeading3ClassNames>;
}

export function TextHeading3({
  children,
  styles,
  classNames,
  ...props
}: TextHeading3Props): React.JSX.Element {
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
