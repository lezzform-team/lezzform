import { cn } from "@/lib/utils";

interface TextMutedStyles {
  root: React.CSSProperties;
}

interface TextMutedClassNames {
  root: string;
}

interface TextMutedProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TextMutedStyles>;
  classNames?: Partial<TextMutedClassNames>;
}

export function TextMuted({
  children,
  styles,
  classNames,
  ...props
}: TextMutedProps): React.JSX.Element {
  return (
    <p
      style={styles?.root}
      className={cn("text-sm text-lfui-muted-foreground", classNames?.root)}
      {...props}
    >
      {children}
    </p>
  );
}
