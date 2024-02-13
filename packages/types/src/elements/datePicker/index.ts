import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { DateRule } from "../../rules";
import { ElementAttributesType } from "../../shared";
import { GeneralStyleMetadata } from "../../styles";

export type DatePickerType = GenericLezzformElement<
  GenericFieldAttributes & DatePickerAttributesType,
  DatePickerStyleType
> & {
  type: "DatePicker";
  category: LezzformElementCategory.Field;
  rule: DatePickerRuleType;
};

export type DatePickerAttributesType = ElementAttributesType & {
  format: string;
};

export type DatePickerStyleType = GeneralStyleMetadata &
  DatePickerStyleMetadataValuesType;

export type DatePickerStyleMetadataValuesType = {
  input: Record<string, unknown>;
  prefixAdornment: {
    icon?: Record<string, unknown>;
    text?: Record<string, unknown>;
  };
  suffixAdornment: {
    icon?: Record<string, unknown>;
    text?: Record<string, unknown>;
  };
  content: Record<string, unknown>;
};

export type DatePickerRuleType = DateRule;
