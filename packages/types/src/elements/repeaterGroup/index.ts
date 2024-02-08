import {
  ArrayRule,
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { GeneralStyleMetadata } from "../../styles";

export type RepeaterGroupType = GenericLezzformElement<
  GenericFieldAttributes & RepeaterGroupAttributesType,
  RepeaterGroupStyleType
> & {
  type: "RepeaterGroup";
  category: LezzformElementCategory.Repeater;
  rule: RepeaterGroupRuleType;
};

export type RepeaterGroupStyleType = GeneralStyleMetadata;

export type RepeaterGroupStyleMetadataValuesType = {
  deleteButton: object;
  insertButton: object;
};

export type RepeaterGroupRuleType = ArrayRule;

export type RepeaterGroupAttributesType = {
  maxRepeat: number;
};
