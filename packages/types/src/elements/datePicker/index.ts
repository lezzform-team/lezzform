import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { DateRule, GeneralRules } from "../../rules";

export type DatePickerType = GenericLezzformElement<
  GenericFieldAttributes & DatePickerAttributesType
> & {
  type: "DatePicker";
  category: LezzformElementCategory.Field;
  rule: DatePickerRuleType;
};

export type DatePickerAttributesType = {
  format: string;
};

export type DatePickerRuleType = DateRule;
