import { GenericLezzformElement, LezzformElementCategory } from "../..";
import { GeneralStyleMetadata } from "../../styles";

export type CustomLayoutType = GenericLezzformElement<
  CustomLayoutAttributesType,
  CustomLayoutStyleType
> & {
  type: "CustomLayout";
  category: LezzformElementCategory.Layout;
};

export type CustomLayoutAttributesType = {
  className?: string;
};

export type CustomLayoutStyleType = GeneralStyleMetadata;
