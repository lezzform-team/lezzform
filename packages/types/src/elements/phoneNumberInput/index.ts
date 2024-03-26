import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";
import { ElementAdornmentAttributesType } from "../../shared";
import { GeneralStyleMetadata } from "../../styles";

export type PhoneNumberInputType = GenericLezzformElement<
  GenericFieldAttributes &
    PhoneNumberInputAttributesType &
    ElementAdornmentAttributesType,
  PhoneNumberInputStyleType
> & {
  type: "PhoneNumberInput";
  category: LezzformElementCategory.Field;
  rule: PhoneNumberInputRuleType;
};

export type PhoneNumberInputStyleType = GeneralStyleMetadata;

export type PhoneNumberInputAttributesType = {
  variant: PhoneNumberInputAttributesVariant;
};

export type PhoneNumberInputAttributesVariant =
  PhoneNumberInputDefaultVariantType;

export type PhoneNumberInputDefaultVariantType = {
  type: "Default";
};

export type PhoneNumberInputRuleType = StringRule;
