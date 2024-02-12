import { cn } from "@/lib/utils";

interface TextLargeStyles {
  root: React.CSSProperties;
}

interface TextLargeClassNames {
  root: string;
}

interface TextLargeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  styles?: Partial<TextLargeStyles>;
  classNames?: Partial<TextLargeClassNames>;
}

export function TextLarge({
  children,
  styles,
  classNames,
  ...props
}: TextLargeProps): React.JSX.Element {
  return (
    <div
      style={styles?.root}
      className={cn("text-lg font-semibold", classNames?.root)}
      {...props}
    >
      {children}
    </div>
  );
}
