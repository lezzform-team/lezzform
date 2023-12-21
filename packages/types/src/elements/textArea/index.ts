import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";

export type TextAreaType = GenericLezzformElement<
  GenericFieldAttributes & TextAreaAttributesType
> & {
  type: "TextArea";
  category: LezzformElementCategory.Field;
  rule: TextAreaRuleType;
};

export type TextAreaRuleType = StringRule;

export type TextAreaAttributesType = {
  rows?: number;
};
