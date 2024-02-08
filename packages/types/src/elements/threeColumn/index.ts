import { GenericLezzformElement, LezzformElementCategory } from "../..";
import { GeneralStyleMetadata } from "../../styles";

export type ThreeColumnType = GenericLezzformElement<
  {},
  ThreeColumnStyleType
> & {
  type: "ThreeColumn";
  category: LezzformElementCategory.Layout;
};

export type ThreeColumnStyleType = GeneralStyleMetadata;
