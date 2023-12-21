import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { GeneralRules } from "../../rules";

export type DateType = GenericLezzformElement<
  GenericFieldAttributes & DateAttributesType
> & {
  type: "date";
  category: LezzformElementCategory.Field;
  rule: DateRuleType;
};

export type DateAttributesType = {
  format: string;
};

export type DateRuleType = GeneralRules;
