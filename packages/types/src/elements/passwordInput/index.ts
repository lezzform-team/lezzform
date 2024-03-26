import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";
import { ElementAdornmentAttributesType } from "../../shared";
import { GeneralStyleMetadata } from "../../styles";

export type PasswordInputType = GenericLezzformElement<
  GenericFieldAttributes & ElementAdornmentAttributesType,
  PasswordInputStyleType
> & {
  type: "PasswordInput";
  category: LezzformElementCategory.Field;
  rule: PasswordInputRuleType;
};

export type PasswordInputStyleType =
  GeneralStyleMetadata<PasswordInputStyleMetadataValuesType>;

export type PasswordInputStyleMetadataValuesType = {
  input: Record<string, unknown>;
  prefixAdornment: {
    icon?: Record<string, unknown>;
    text?: Record<string, unknown>;
  };
  suffixAdornment: {
    icon?: Record<string, unknown>;
    text?: Record<string, unknown>;
  };
};

export type PasswordInputRuleType = StringRule;
