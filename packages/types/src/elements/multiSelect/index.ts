import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";
import { ArrayRule } from "../../rules";
import { DropdownItemApi, DropdownItemStatic } from "../dropdown";

export type MultiSelectType = GenericLezzformElement<
  GenericFieldAttributes & MultiSelectAttributesType
> & {
  type: "MultiSelect";
  category: LezzformElementCategory.Field;
  rule: MultiSelectRuleType;
};

export type MultiSelectAttributesType =
  | MultiSelectItemApi
  | MultiSelectItemStatic;
export type MultiSelectRuleType = ArrayRule;

export type MultiSelectItemApi = DropdownItemApi;
export type MultiSelectItemStatic = DropdownItemStatic;
