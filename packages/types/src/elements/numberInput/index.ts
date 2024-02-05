import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { IntegerRule } from "../../rules";

export type NumberInputType = GenericLezzformElement<GenericFieldAttributes> & {
  type: "NumberInput";
  category: LezzformElementCategory.Field;
  rule: NumberInputRuleType;
};

export type NumberInputRuleType = IntegerRule;
