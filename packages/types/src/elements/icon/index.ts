import { GenericLezzformElement, LezzformElementCategory } from "../..";
import { GeneralStyleMetadata } from "../../styles";

export type IconType = GenericLezzformElement<
  IconAttributesType,
  IconStyleType
> & {
  type: "Icon";
  category: LezzformElementCategory.UserInterface;
};

export type IconStyleType = GeneralStyleMetadata;

export type IconAttributesType = {
  variant: IconVariant;
  name: string;
  size: number;
  color: string;
};

export type IconVariant = IconDefaultVariantType;

export type IconDefaultVariantType = {
  type: "Default";
};
