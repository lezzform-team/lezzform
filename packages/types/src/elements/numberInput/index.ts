import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { IntegerRule } from "../../rules";

export type NumberInputType = GenericLezzformElement<
  GenericFieldAttributes & NumberInputAttributesType
> & {
  type: "NumberInput";
  category: LezzformElementCategory.Field;
  rule: NumberInputRuleType;
};

export type NumberInputAttributesType = {
  variant: NumberInputAttributesVariant;
};

export type NumberInputAttributesVariant =
  | NumberInputDefaultVariantType
  | NumberInputStepperVariantType;

export type NumberInputDefaultVariantType = {
  type: "Default";
};

export type NumberInputStepperVariantType = {
  type: "Stepper";
  step: {
    increment: number;
    decrement: number;
  };
};

export type NumberInputRuleType = IntegerRule;
