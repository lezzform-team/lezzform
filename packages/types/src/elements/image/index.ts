import { GenericLezzformElement, LezzformElementCategory } from "../..";
import { GeneralStyleMetadata } from "../../styles";

export type ImageType = GenericLezzformElement<
  ImageAttributesType,
  ImageStyleType
> & {
  type: "Image";
  category: LezzformElementCategory.UserInterface;
};

export type ImageStyleType = GeneralStyleMetadata;

export type ImageAttributesType = {
  variant: ImageVariant;
  url: string;
};

export type ImageVariant = ImageDefaultVariantType;

export type ImageDefaultVariantType = {
  type: "Default";
};
