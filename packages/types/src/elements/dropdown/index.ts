import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";
import { ElementAdornmentAttributesType } from "../../shared";
import { GeneralStyleMetadata } from "../../styles";

export type DropdownType = GenericLezzformElement<
  GenericFieldAttributes &
    DropdownAttributesType &
    ElementAdornmentAttributesType,
  DropdownStyleType
> & {
  type: "Dropdown";
  category: LezzformElementCategory.Field;
  rule: DropdownRuleType;
};

export type DropdownAttributesType = DropdownItemApi | DropdownItemStatic;
export type DropdownStyleType =
  GeneralStyleMetadata<DropdownStyleMetadataValuesType>;

export type DropdownStyleMetadataValuesType = {
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

export type DropdownRuleType = StringRule;

export type DropdownItemApi = {
  source: "api";
  url: string;
  path: {
    value: string;
    label: string;
    data?: string;
  };
};

export type DropdownItemStatic = {
  source: "static";
  items: { value: string; label: string }[];
};
