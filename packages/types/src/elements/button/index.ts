import { GenericLezzformElement, LezzformElementCategory } from "../..";
import { GeneralStyleMetadata } from "../../styles";

export type ButtonType = GenericLezzformElement<
  ButtonAttributesType,
  ButtonStyleType
> & {
  type: "Button";
  category: LezzformElementCategory.Action;
};

export type ButtonAttributesType = {
  variant: ButtonVariant;
  type: "submit" | "button" | "reset";
};

export type ButtonStyleType = GeneralStyleMetadata;

export type ButtonVariant =
  | ButtonDefaultVariantType
  | ButtonGhostVariantType
  | ButtonOutlineVariantType
  | ButtonSecondaryVariantType
  | ButtonLinkVariantType;

export type ButtonDefaultVariantType = {
  type: "Default";
};

export type ButtonGhostVariantType = {
  type: "Ghost";
};

export type ButtonOutlineVariantType = {
  type: "Outline";
};

export type ButtonSecondaryVariantType = {
  type: "Secondary";
};

export type ButtonLinkVariantType = {
  type: "Link";
};
