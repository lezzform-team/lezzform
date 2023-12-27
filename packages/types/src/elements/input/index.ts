import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";

export type InputType = GenericLezzformElement<GenericFieldAttributes> & {
  type: "Input";
  category: LezzformElementCategory.Field;
  rule: InputRuleType;
};

export type InputRuleType = StringRule;
