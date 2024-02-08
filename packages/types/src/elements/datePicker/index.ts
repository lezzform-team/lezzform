import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { DateRule, GeneralRules } from "../../rules";
import { GeneralStyleMetadata } from "../../styles";

export type DatePickerType = GenericLezzformElement<
  GenericFieldAttributes & DatePickerAttributesType,
  DatePickerStyleType
> & {
  type: "DatePicker";
  category: LezzformElementCategory.Field;
  rule: DatePickerRuleType;
};

export type DatePickerAttributesType = {
  format: string;
};

export type DatePickerStyleType = GeneralStyleMetadata;

export type DatePickerRuleType = DateRule;
