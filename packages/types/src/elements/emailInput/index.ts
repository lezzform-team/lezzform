import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";
import { ElementAdornmentAttributesType } from "../../shared";
import { GeneralStyleMetadata } from "../../styles";

export type EmailInputType = GenericLezzformElement<
  GenericFieldAttributes & ElementAdornmentAttributesType,
  EmailInputStyleType
> & {
  type: "EmailInput";
  category: LezzformElementCategory.Field;
  rule: EmailInputRuleType;
};

export type EmailInputStyleType = GeneralStyleMetadata;

export type EmailInputRuleType = StringRule;
