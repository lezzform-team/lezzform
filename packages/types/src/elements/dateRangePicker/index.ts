import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { ObjectRule } from "../../rules";
import { GeneralStyleMetadata } from "../../styles";

export type DateRangePickerType = GenericLezzformElement<
  GenericFieldAttributes & DateRangePickerAttributesType,
  DateRangePickerStyleType
> & {
  type: "DateRangePicker";
  category: LezzformElementCategory.Field;
  rule: DateRangePickerRuleType;
};

export type DateRangePickerAttributesType = {
  format: string;
};

export type DateRangePickerStyleType = GeneralStyleMetadata;

export type DateRangePickerRuleType = ObjectRule;
