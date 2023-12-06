import { GenericLezzformElement, LezzformElementCategory } from "../..";

export type ThreeColumnType = GenericLezzformElement & {
  type: "ThreeColumn";
  category: LezzformElementCategory.Layout;
};
