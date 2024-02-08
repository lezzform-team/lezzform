import { GenericLezzformElement, LezzformElementCategory } from "../..";
import { GeneralStyleMetadata } from "../../styles";

export type TwoColumnType = GenericLezzformElement<{}, TwoColumnStyleType> & {
  type: "TwoColumn";
  category: LezzformElementCategory.Layout;
};

export type TwoColumnStyleType = GeneralStyleMetadata;
