import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";

export type TextAreaType = GenericLezzformElement<
  GenericFieldAttributes & TextAreaAttributesType
> & {
  type: "TextArea";
  category: LezzformElementCategory.Field;
};

export type TextAreaAttributesType = {
  rows?: number;
};
