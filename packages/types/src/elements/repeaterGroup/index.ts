import {
  GenericFieldAttributes,
  GenericLezzformElement,
  LezzformElementCategory,
} from "../..";

export type RepeaterGroupType = GenericLezzformElement<
  GenericFieldAttributes & RepeaterGroupAttributesType
> & {
  type: "RepeaterGroup";
  category: LezzformElementCategory.Iterate;
};

export type RepeaterGroupAttributesType = {
  maxRepeat: number;
};
