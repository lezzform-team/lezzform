import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";

export type InputType = GenericLezzformElement<GenericFieldAttributes> & {
  type: "Input";
  category: LezzformElementCategory.Field;
};
