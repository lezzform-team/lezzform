import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { StringRule } from "../../rules";
import { GeneralStyleMetadata } from "../../styles";

export type DropdownType = GenericLezzformElement<
  GenericFieldAttributes & DropdownAttributesType,
  DropdownStyleType
> & {
  type: "Dropdown";
  category: LezzformElementCategory.Field;
  rule: DropdownRuleType;
};

export type DropdownAttributesType = DropdownItemApi | DropdownItemStatic;
export type DropdownStyleType = GeneralStyleMetadata;

export type DropdownRuleType = StringRule;

export type DropdownItemApi = {
  source: "api";
  url: string;
  path: {
    value: string;
    label: string;
  };
};

export type DropdownItemStatic = {
  source: "static";
  items: { value: string; label: string }[];
};
