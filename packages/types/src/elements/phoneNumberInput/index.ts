import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";

export type PhoneNumberInputType = GenericLezzformElement<
  GenericFieldAttributes & PhoneNumberInputAttributesType
> & {
  type: "PhoneNumberInput";
  category: LezzformElementCategory.Field;
  rule: PhoneNumberInputRuleType;
};

export type PhoneNumberInputAttributesType = {
  variant: PhoneNumberInputAttributesVariant;
};

export type PhoneNumberInputAttributesVariant =
  PhoneNumberInputDefaultVariantType;

export type PhoneNumberInputDefaultVariantType = {
  type: "Default";
};

export type PhoneNumberInputRuleType = StringRule;
