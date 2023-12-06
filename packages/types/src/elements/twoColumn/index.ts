import { GenericLezzformElement, LezzformElementCategory } from "../..";

export type TwoColumnType = GenericLezzformElement & {
  type: "TwoColumn";
  category: LezzformElementCategory.Layout;
};
