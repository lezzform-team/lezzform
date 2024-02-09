import { cn } from "@/lib/utils";
import { TypographyHeading1 } from "./heading1";
import { TypographyHeading2 } from "./heading2";
import { TypographyHeading3 } from "./heading3";
import { TypographyHeading4 } from "./heading4";
import { TypographyLarge } from "./large";
import { TypographySmall } from "./small";
import { TypographyParagraph } from "./paragraph";
import { TypographyMuted } from "./muted";
import { TypographyBlockquote } from "./blockquote";
import { TypographyInlineCode } from "./inlineCode";

interface TypographyStyles {
  root: React.CSSProperties;
}

interface TypographyClassNames {
  root: string;
}

interface TypographyProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TypographyStyles>;
  classNames?: Partial<TypographyClassNames>;
}

export function Typography({
  children,
  styles,
  classNames,
  ...props
}: TypographyProps): React.JSX.Element {
  return (
    <p style={styles?.root} className={cn(classNames?.root)} {...props}>
      {children}
    </p>
  );
}

Typography.Heading1 = TypographyHeading1;
Typography.Heading2 = TypographyHeading2;
Typography.Heading3 = TypographyHeading3;
Typography.Heading4 = TypographyHeading4;
Typography.Large = TypographyLarge;
Typography.Small = TypographySmall;
Typography.Paragraph = TypographyParagraph;
Typography.Muted = TypographyMuted;
Typography.Blockquote = TypographyBlockquote;
Typography.InlineCode = TypographyInlineCode;
