import { GenericLezzformElement, LezzformElementCategory } from "../..";
import { GeneralStyleMetadata } from "../../styles";

export type TextType = GenericLezzformElement<
  TextAttributesType,
  TextStyleType
> & {
  type: "Text";
  category: LezzformElementCategory.Typography;
};

export type TextAttributesType = {
  variant: TextVariant;
  content: string;
};

export type TextStyleType = GeneralStyleMetadata;

export type TextVariant =
  | TextDefaultVariantType
  | TextHeadingVariantType
  | TextBlockquoteVariantType
  | TextParagraphVariantType
  | TextInlineCodeVariantType
  | TextSmallVariantType
  | TextLargeVariantType
  | TextMutedVariantType;

export type TextDefaultVariantType = {
  type: "Default";
};

export type TextHeadingVariantType =
  | TextHeading1VariantType
  | TextHeading2VariantType
  | TextHeading3VariantType
  | TextHeading4VariantType;

export type TextHeading1VariantType = {
  type: "Heading1";
};

export type TextHeading2VariantType = {
  type: "Heading2";
};

export type TextHeading3VariantType = {
  type: "Heading3";
};

export type TextHeading4VariantType = {
  type: "Heading4";
};

export type TextBlockquoteVariantType = {
  type: "Blockquote";
};

export type TextParagraphVariantType = {
  type: "Paragraph";
};

export type TextInlineCodeVariantType = {
  type: "InlineCode";
};

export type TextSmallVariantType = {
  type: "Small";
};

export type TextLargeVariantType = {
  type: "Large";
};

export type TextMutedVariantType = {
  type: "Muted";
};
