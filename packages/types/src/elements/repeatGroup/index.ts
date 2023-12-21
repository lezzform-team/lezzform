import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { GeneralRules } from "../../rules";

export type RepeatGroupType = GenericLezzformElement<
  GenericFieldAttributes & RepeatGroupAttributesType
> & {
  type: "repeatGroup";
  category: LezzformElementCategory.Field;
  rule: RepeatGroupRuleType;
};

export type RepeatGroupAttributesType = {
  maxRepeat: number;
};

export type RepeatGroupRuleType = GeneralRules;
