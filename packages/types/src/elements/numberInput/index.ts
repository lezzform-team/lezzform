import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { IntegerRule } from "../../rules";
import { ElementAdornmentAttributesType } from "../../shared";
import { GeneralStyleMetadata } from "../../styles";

export type NumberInputType = GenericLezzformElement<
  GenericFieldAttributes &
    NumberInputAttributesType &
    ElementAdornmentAttributesType,
  NumberInputStyleType
> & {
  type: "NumberInput";
  category: LezzformElementCategory.Field;
  rule: NumberInputRuleType;
};

export type NumberInputAttributesType = {
  variant: NumberInputAttributesVariant;
};

export type NumberInputStyleType =
  GeneralStyleMetadata<NumberInputStyleMetadataValuesType>;

export type NumberInputStyleMetadataValuesType = {
  stepButton: Record<string, unknown>;
  valueText: Record<string, unknown>;
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
