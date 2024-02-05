import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { ObjectRule } from "../../rules";

export type DateRangePickerType = GenericLezzformElement<
  GenericFieldAttributes & DateRangePickerAttributesType
> & {
  type: "DateRangePicker";
  category: LezzformElementCategory.Field;
  rule: DateRangePickerRuleType;
};

export type DateRangePickerAttributesType = {
  format: string;
};

export type DateRangePickerRuleType = ObjectRule;
