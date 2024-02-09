import { GenericLezzformElement, LezzformElementCategory } from "../..";
import { GeneralStyleMetadata } from "../../styles";

export type TypographyType = GenericLezzformElement<
  TypographyAttributesType,
  TypographyStyleType
> & {
  type: "Typography";
  category: LezzformElementCategory.Typography;
};

export type TypographyAttributesType = {
  variant: TypographyVariant;
  content: string;
};

export type TypographyStyleType = GeneralStyleMetadata;

export type TypographyVariant =
  | TypographyDefaultVariantType
  | TypographyHeadingVariantType
  | TypographyBlockquoteVariantType
  | TypographyParagraphVariantType
  | TypographyInlineCodeVariantType
  | TypographySmallVariantType
  | TypographyLargeVariantType
  | TypographyMutedVariantType;

export type TypographyDefaultVariantType = {
  type: "Default";
};

export type TypographyHeadingVariantType =
  | TypographyHeading1VariantType
  | TypographyHeading2VariantType
  | TypographyHeading3VariantType
  | TypographyHeading4VariantType;

export type TypographyHeading1VariantType = {
  type: "Heading1";
};

export type TypographyHeading2VariantType = {
  type: "Heading2";
};

export type TypographyHeading3VariantType = {
  type: "Heading3";
};

export type TypographyHeading4VariantType = {
  type: "Heading4";
};

export type TypographyBlockquoteVariantType = {
  type: "Blockquote";
};

export type TypographyParagraphVariantType = {
  type: "Paragraph";
};

export type TypographyInlineCodeVariantType = {
  type: "InlineCode";
};

export type TypographySmallVariantType = {
  type: "Small";
};

export type TypographyLargeVariantType = {
  type: "Large";
};

export type TypographyMutedVariantType = {
  type: "Muted";
};
