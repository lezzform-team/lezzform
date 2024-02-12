import { cn } from "@/lib/utils";

interface TextHeading1Styles {
  root: React.CSSProperties;
}

interface TextHeading1ClassNames {
  root: string;
}

interface TextHeading1Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TextHeading1Styles>;
  classNames?: Partial<TextHeading1ClassNames>;
}

export function TextHeading1({
  children,
  styles,
  classNames,
  ...props
}: TextHeading1Props): React.JSX.Element {
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
