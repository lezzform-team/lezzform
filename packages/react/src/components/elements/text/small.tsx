import { cn } from "@/lib/utils";

interface TextSmallStyles {
  root: React.CSSProperties;
}

interface TextSmallClassNames {
  root: string;
}

interface TextSmallProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TextSmallStyles>;
  classNames?: Partial<TextSmallClassNames>;
}

export function TextSmall({
  children,
  styles,
  classNames,
  ...props
}: TextSmallProps): React.JSX.Element {
  return (
    <small
      style={styles?.root}
      className={cn(
        "lf-text-sm lf-font-medium lf-leading-none",
        classNames?.root,
      )}
      {...props}
    >
      {children}
    </small>
  );
}
