import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";
import { GeneralStyleMetadata } from "../../styles";

export type TextAreaType = GenericLezzformElement<
  GenericFieldAttributes & TextAreaAttributesType,
  TextAreaStyleType
> & {
  type: "TextArea";
  category: LezzformElementCategory.Field;
  rule: TextAreaRuleType;
};

export type TextAreaStyleType = GeneralStyleMetadata;

export type TextAreaRuleType = StringRule;

export type TextAreaAttributesType = {
  rows?: number;
};
