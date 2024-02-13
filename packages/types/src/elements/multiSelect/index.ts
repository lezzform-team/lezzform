import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { ArrayRule } from "../../rules";
import { ElementAdornmentAttributesType } from "../../shared";
import { GeneralStyleMetadata } from "../../styles";
import { DropdownItemApi, DropdownItemStatic } from "../dropdown";

export type MultiSelectType = GenericLezzformElement<
  GenericFieldAttributes &
    MultiSelectAttributesType &
    ElementAdornmentAttributesType,
  MultiSelectStyleType
> & {
  type: "MultiSelect";
  category: LezzformElementCategory.Field;
  rule: MultiSelectRuleType;
};

export type MultiSelectAttributesType =
  | MultiSelectItemApi
  | MultiSelectItemStatic;
export type MultiSelectStyleType =
  GeneralStyleMetadata<MultiSelectStyleMetadataValuesType>;

export type MultiSelectStyleMetadataValuesType = {
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

export type MultiSelectRuleType = ArrayRule;

export type MultiSelectItemApi = DropdownItemApi;
export type MultiSelectItemStatic = DropdownItemStatic;
