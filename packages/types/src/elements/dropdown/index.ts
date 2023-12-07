import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";

export type DropdownType = GenericLezzformElement<
  GenericFieldAttributes & DropdownAttributesType
> & {
  type: "Dropdown";
  category: LezzformElementCategory.Field;
};

export type DropdownAttributesType = DropdownItemApi | DropdownItemStatic;

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
