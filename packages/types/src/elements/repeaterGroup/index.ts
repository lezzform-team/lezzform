import {
  ArrayRule,
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";

export type RepeaterGroupType = GenericLezzformElement<
  GenericFieldAttributes & RepeaterGroupAttributesType
> & {
  type: "RepeaterGroup";
  category: LezzformElementCategory.Repeater;
  rule: RepeaterGroupRuleType;
};

export type RepeaterGroupRuleType = ArrayRule;

export type RepeaterGroupAttributesType = {
  maxRepeat: number;
};
