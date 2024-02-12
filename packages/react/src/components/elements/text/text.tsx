import { cn } from "@/lib/utils";
import { TextHeading1 } from "./heading1";
import { TextHeading2 } from "./heading2";
import { TextHeading3 } from "./heading3";
import { TextHeading4 } from "./heading4";
import { TextLarge } from "./large";
import { TextSmall } from "./small";
import { TextParagraph } from "./paragraph";
import { TextMuted } from "./muted";
import { TextBlockquote } from "./blockquote";
import { TextInlineCode } from "./inlineCode";

interface TextStyles {
  root: React.CSSProperties;
}

interface TextClassNames {
  root: string;
}

interface TextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  styles?: Partial<TextStyles>;
  classNames?: Partial<TextClassNames>;
}

export function Text({
  children,
  styles,
  classNames,
  ...props
}: TextProps): React.JSX.Element {
  return (
    <p style={styles?.root} className={cn(classNames?.root)} {...props}>
      {children}
    </p>
  );
}

Text.Heading1 = TextHeading1;
Text.Heading2 = TextHeading2;
Text.Heading3 = TextHeading3;
Text.Heading4 = TextHeading4;
Text.Large = TextLarge;
Text.Small = TextSmall;
Text.Paragraph = TextParagraph;
Text.Muted = TextMuted;
Text.Blockquote = TextBlockquote;
Text.InlineCode = TextInlineCode;
