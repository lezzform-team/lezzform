import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";
import { GeneralStyleMetadata } from "../../styles";

export type InputType = GenericLezzformElement<
  GenericFieldAttributes,
  InputStyleType
> & {
  type: "Input";
  category: LezzformElementCategory.Field;
  rule: InputRuleType;
};

export type InputStyleType = GeneralStyleMetadata;

export type InputRuleType = StringRule;
